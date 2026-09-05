import { getAnalytics, isSupported, logEvent, setUserId, setUserProperties } from "firebase/analytics";
import { app, isFirebaseConfigured } from "./config.js";

let analyticsInstance = null;
let initPromise = null;

/**
 * Initialize Firebase Analytics safely in browser environment
 */
export async function getAnalyticsInstance() {
  if (analyticsInstance) return analyticsInstance;
  if (!isFirebaseConfigured || typeof window === "undefined") return null;

  if (!initPromise) {
    initPromise = (async () => {
      try {
        const supported = await isSupported();
        if (supported && app) {
          analyticsInstance = getAnalytics(app);
          return analyticsInstance;
        }
      } catch (err) {
        if (import.meta.env?.DEV) {
          console.warn("[ByteLab Analytics] Init note:", err?.message || err);
        }
      }
      return null;
    })();
  }

  return initPromise;
}

/**
 * Generic event logger with safety checks and development logging
 */
export async function trackEvent(eventName, eventParams = {}) {
  if (typeof window === "undefined") return;

  try {
    const analytics = await getAnalyticsInstance();
    if (analytics) {
      logEvent(analytics, eventName, {
        app_name: "ByteLab LMS",
        timestamp: new Date().toISOString(),
        ...eventParams
      });
    }

    if (import.meta.env?.DEV) {
      console.log(`📊 [Analytics Event] ${eventName}:`, eventParams);
    }
  } catch (err) {
    if (import.meta.env?.DEV) {
      console.warn(`[Analytics Event Error] ${eventName}:`, err);
    }
  }
}

/**
 * Track route & page views for user monitoring
 */
export function trackPageView(pagePath, pageTitle) {
  trackEvent("page_view", {
    page_path: pagePath || (typeof window !== "undefined" ? window.location.pathname : ""),
    page_title: pageTitle || (typeof document !== "undefined" ? document.title : ""),
    page_location: typeof window !== "undefined" ? window.location.href : ""
  });
}

/**
 * Track user authentication lifecycle
 */
export function trackUserLogin(method = "google") {
  trackEvent("login", { method });
}

export function trackUserSignUp(method = "google") {
  trackEvent("sign_up", { method });
}

export function trackUserSignOut() {
  trackEvent("sign_out");
}

/**
 * Set user identity and persistent user properties
 */
export async function setUserMonitoringProfile(uid, properties = {}) {
  if (!uid || typeof window === "undefined") return;

  try {
    const analytics = await getAnalyticsInstance();
    if (analytics) {
      setUserId(analytics, uid);
      if (Object.keys(properties).length > 0) {
        setUserProperties(analytics, properties);
      }
    }
  } catch (err) {
    if (import.meta.env?.DEV) {
      console.warn("[Analytics User Profile Error]:", err);
    }
  }
}

/**
 * Track learning & curriculum actions
 */
export function trackLessonView({ courseId, unitId, chapterId, dayNumber, title }) {
  trackEvent("view_lesson", {
    course_id: courseId,
    unit_id: unitId,
    chapter_id: chapterId,
    day_number: dayNumber,
    lesson_title: title
  });
}

export function trackLessonComplete({ courseId, unitId, chapterId, dayNumber, pointsEarned }) {
  trackEvent("complete_lesson", {
    course_id: courseId,
    unit_id: unitId,
    chapter_id: chapterId,
    day_number: dayNumber,
    points_earned: pointsEarned || 10
  });
}

export function trackUnitNavigation({ courseId, unitId, fromSource }) {
  trackEvent("navigate_unit", {
    course_id: courseId,
    unit_id: unitId,
    from_source: fromSource || "progress_dashboard"
  });
}

export function trackCodeRun({ language = "python", executionTimeMs, success }) {
  trackEvent("code_execution", {
    language,
    execution_time_ms: executionTimeMs || 0,
    success: Boolean(success)
  });
}

export function trackProblemSolved({ problemId, courseId, difficulty, points }) {
  trackEvent("problem_solved", {
    problem_id: problemId,
    course_id: courseId,
    difficulty,
    points: points || 20
  });
}

export function trackQuizSubmitted({ quizId, score, maxScore, percentage, passed }) {
  trackEvent("quiz_submission", {
    quiz_id: quizId,
    score,
    max_score: maxScore,
    percentage,
    passed: Boolean(passed)
  });
}

export function trackAssessmentComplete({ unitId, score, maxScore, percentage, passed }) {
  trackEvent("assessment_complete", {
    unit_id: unitId || "full_course",
    score,
    max_score: maxScore,
    percentage,
    passed: Boolean(passed)
  });
}

export function trackSearchQuery({ query, resultCount }) {
  trackEvent("search", {
    search_term: query,
    result_count: resultCount || 0
  });
}
