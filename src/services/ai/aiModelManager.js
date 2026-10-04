/**
 * AI Model Manager Singleton
 * 
 * Central orchestrator for Chrome Built-in AI (Gemini Nano) using the
 * standards-track Prompt API (Chrome 138/148+ LanguageModel global).
 * 
 * Capabilities:
 * 1. Standards-track availability checks with fallbacks (LanguageModel -> window.ai -> heuristic).
 * 2. Download progress observation via ProgressEvent monitors.
 * 3. Shared session pooling to prevent redundant on-device model initializations.
 * 4. Structured JSON Schema output constraint orchestration (responseConstraint).
 */

export class AIModelManager {
  constructor() {
    this._session = null;
    this._sessionConfig = null;
    this._downloadProgress = 0; // 0 - 100
    this._listeners = new Set();
    this._isDownloading = false;
  }

  /**
   * Checks whether Chrome Built-in AI (Gemini Nano) is available in the current browser.
   * Targets globalThis.LanguageModel with backwards-compatible fallbacks.
   * 
   * @returns {Promise<{
   *   available: 'readily' | 'after-download' | 'no',
   *   status: 'available' | 'downloadable' | 'downloading' | 'unavailable',
   *   model: string,
   *   downloadProgress?: number,
   *   defaultTemperature?: number,
   *   maxTopK?: number
   * }>}
   */
  async checkAvailability() {
    if (typeof window === 'undefined' && typeof globalThis === 'undefined') {
      return { available: 'no', status: 'unavailable', model: 'none' };
    }

    const scope = typeof window !== 'undefined' ? window : globalThis;

    try {
      // 1. Standards-Track Prompt API (Chrome 138/148+ global LanguageModel)
      if (typeof scope.LanguageModel !== 'undefined' && typeof scope.LanguageModel.availability === 'function') {
        const avail = await scope.LanguageModel.availability();
        // availability() returns: "available" | "downloadable" | "downloading" | "unavailable"
        if (avail === 'available') {
          return {
            available: 'readily',
            status: 'available',
            model: 'Gemini Nano (LanguageModel)',
            downloadProgress: 100
          };
        }
        if (avail === 'downloadable') {
          return {
            available: 'after-download',
            status: 'downloadable',
            model: 'Gemini Nano (LanguageModel)',
            downloadProgress: this._downloadProgress
          };
        }
        if (avail === 'downloading') {
          return {
            available: 'after-download',
            status: 'downloading',
            model: 'Gemini Nano (LanguageModel)',
            downloadProgress: this._downloadProgress
          };
        }
        return { available: 'no', status: 'unavailable', model: 'none' };
      }

      // 2. W3C Prompt API (Chrome 127-137 window.ai.languageModel)
      if (scope.ai && scope.ai.languageModel && typeof scope.ai.languageModel.capabilities === 'function') {
        const caps = await scope.ai.languageModel.capabilities();
        const available = caps.available || 'no';
        return {
          available,
          status: available === 'readily' ? 'available' : available === 'after-download' ? 'downloading' : 'unavailable',
          model: 'Gemini Nano (window.ai)',
          defaultTemperature: caps.defaultTemperature,
          maxTopK: caps.maxTopK,
          downloadProgress: available === 'readily' ? 100 : this._downloadProgress
        };
      }

      // 3. Early Canary interface (window.ai.assistant)
      if (scope.ai && scope.ai.assistant && typeof scope.ai.assistant.capabilities === 'function') {
        const caps = await scope.ai.assistant.capabilities();
        const available = caps.available || 'no';
        return {
          available,
          status: available === 'readily' ? 'available' : available === 'after-download' ? 'downloading' : 'unavailable',
          model: 'Chrome Assistant Nano',
          defaultTemperature: caps.defaultTemperature,
          downloadProgress: available === 'readily' ? 100 : this._downloadProgress
        };
      }

      // 4. Experimental chrome.aiOriginTrial namespace
      if (scope.chrome?.aiOriginTrial?.languageModel?.capabilities) {
        const caps = await scope.chrome.aiOriginTrial.languageModel.capabilities();
        const available = caps.available || 'no';
        return {
          available,
          status: available === 'readily' ? 'available' : available === 'after-download' ? 'downloading' : 'unavailable',
          model: 'Chrome Origin Trial Nano',
          downloadProgress: available === 'readily' ? 100 : this._downloadProgress
        };
      }

      return { available: 'no', status: 'unavailable', model: 'none' };
    } catch (err) {
      console.warn('[AIModelManager] Error checking availability:', err);
      return { available: 'no', status: 'unavailable', model: 'none', error: err.message };
    }
  }

  /**
   * Subscribes a listener to download progress changes.
   * Listener signature: (progressPercent: number, rawEvent?: { loaded: number, total: number }) => void
   * 
   * @param {Function} listener
   * @returns {Function} unsubscribe function
   */
  subscribeDownloadProgress(listener) {
    if (typeof listener !== 'function') return () => {};
    this._listeners.add(listener);
    try {
      listener(this._downloadProgress);
    } catch (_) {}

    return () => {
      this._listeners.delete(listener);
    };
  }

  /**
   * Internal dispatcher for download progress.
   */
  _emitDownloadProgress(loaded, total) {
    if (typeof loaded === 'number' && typeof total === 'number' && total > 0) {
      this._downloadProgress = Math.min(100, Math.max(0, Math.round((loaded / total) * 100)));
    }
    for (const listener of this._listeners) {
      try {
        listener(this._downloadProgress, { loaded, total });
      } catch (err) {
        console.error('[AIModelManager] Error in download progress listener:', err);
      }
    }
  }

  /**
   * Retrieves or creates a LanguageModel session with system prompt and download monitoring.
   * 
   * @param {object} options
   * @param {string} [options.systemPrompt]
   * @param {Array<object>} [options.initialPrompts]
   * @param {number} [options.temperature=0.2]
   * @param {number} [options.topK=3]
   * @returns {Promise<object|null>} The active session or null
   */
  async getOrCreateSession(options = {}) {
    const scope = typeof window !== 'undefined' ? window : globalThis;
    const systemPrompt = options.systemPrompt || '';
    const temperature = options.temperature ?? 0.2;
    const topK = options.topK ?? 3;

    // Reuse session if configuration matches
    if (this._session && this._sessionConfig === systemPrompt) {
      return this._session;
    }

    // Free existing session if re-configuring
    this.destroySession();

    const monitorCallback = (monitor) => {
      if (!monitor || typeof monitor.addEventListener !== 'function') return;
      monitor.addEventListener('downloadprogress', (e) => {
        this._isDownloading = true;
        this._emitDownloadProgress(e.loaded, e.total);
      });
    };

    try {
      // 1. Standards-Track global LanguageModel.create (Chrome 138/148+)
      if (typeof scope.LanguageModel !== 'undefined' && typeof scope.LanguageModel.create === 'function') {
        const createParams = {
          temperature,
          topK,
          monitor: monitorCallback
        };

        if (systemPrompt) {
          createParams.initialPrompts = [{ role: 'system', content: systemPrompt }];
        } else if (options.initialPrompts) {
          createParams.initialPrompts = options.initialPrompts;
        }

        this._session = await scope.LanguageModel.create(createParams);
        this._sessionConfig = systemPrompt;
        return this._session;
      }

      // 2. W3C Prompt API window.ai.languageModel.create
      if (scope.ai?.languageModel?.create) {
        this._session = await scope.ai.languageModel.create({
          systemPrompt,
          temperature,
          topK,
          monitor: monitorCallback
        });
        this._sessionConfig = systemPrompt;
        return this._session;
      }

      // 3. Early Canary window.ai.assistant.create
      if (scope.ai?.assistant?.create) {
        this._session = await scope.ai.assistant.create({
          systemPrompt,
          temperature,
          monitor: monitorCallback
        });
        this._sessionConfig = systemPrompt;
        return this._session;
      }
    } catch (err) {
      console.warn('[AIModelManager] Failed to create LanguageModel session:', err);
      this.destroySession();
      return null;
    }

    return null;
  }

  /**
   * Prompts the session with optional JSON Schema structured output constraint.
   * If responseConstraint is supported by the browser, it enforces strict JSON structure.
   * Gracefully parses JSON string outputs into JavaScript objects.
   * 
   * @param {object} session - Active LanguageModel session
   * @param {string} promptText - User prompt text
   * @param {object} [schema] - JSON Schema for responseConstraint
   * @returns {Promise<{ raw: string, parsed: object | null }>}
   */
  async promptWithConstraint(session, promptText, schema = null) {
    if (!session || typeof session.prompt !== 'function') {
      throw new Error('Invalid or uninitialized LanguageModel session');
    }

    let rawOutput = '';

    try {
      if (schema) {
        // Attempt standards-track responseConstraint execution
        try {
          rawOutput = await session.prompt(promptText, { responseConstraint: schema });
        } catch (constraintErr) {
          // If responseConstraint is not yet supported in this browser version, fall back to free prompt
          console.warn('[AIModelManager] responseConstraint option failed, falling back to unconstrained prompt:', constraintErr);
          rawOutput = await session.prompt(promptText);
        }
      } else {
        rawOutput = await session.prompt(promptText);
      }
    } catch (err) {
      console.error('[AIModelManager] session.prompt error:', err);
      throw err;
    }

    if (typeof rawOutput !== 'string') {
      rawOutput = String(rawOutput || '');
    }

    // Attempt to parse JSON if output looks like JSON
    let parsed = null;
    const trimmed = rawOutput.trim();
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
      try {
        parsed = JSON.parse(trimmed);
      } catch (_) {
        // Not clean JSON
      }
    } else {
      // Look for embedded JSON markdown block ```json ... ```
      const jsonMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (jsonMatch && jsonMatch[1]) {
        try {
          parsed = JSON.parse(jsonMatch[1]);
        } catch (_) {}
      }
    }

    return { raw: rawOutput, parsed };
  }

  /**
   * Destroys active session to release GPU memory and RAM.
   */
  destroySession() {
    if (this._session) {
      try {
        if (typeof this._session.destroy === 'function') {
          this._session.destroy();
        }
      } catch (err) {
        console.warn('[AIModelManager] Error destroying session:', err);
      }
      this._session = null;
      this._sessionConfig = null;
    }
  }

  /**
   * Current download progress percentage (0 - 100).
   */
  get downloadProgress() {
    return this._downloadProgress;
  }

  /**
   * Whether model is currently downloading.
   */
  get isDownloading() {
    return this._isDownloading;
  }
}

export const aiModelManager = new AIModelManager();
export default aiModelManager;
