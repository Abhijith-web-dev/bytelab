/**
 * @abstract
 * Base Language Runtime Interface for multi-language execution
 */
export class LanguageRuntime {
  constructor(id, name, version) {
    this.id = id;
    this.name = name;
    this.version = version;
    this.isReady = false;
  }

  async init() {
    throw new Error('init() must be implemented by runtime subclass');
  }

  /**
   * @param {Object} request
   * @param {string} request.sourceCode
   * @param {string} [request.stdin]
   * @param {number} [request.timeoutMs]
   * @returns {Promise<ExecutionResult>}
   */
  async execute(request) {
    throw new Error('execute() must be implemented by runtime subclass');
  }

  validate(sourceCode) {
    return { isValid: true, errors: [] };
  }

  terminate() {}
}
