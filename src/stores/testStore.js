import { create } from 'zustand';
import { RandomTestEngine } from '../features/assessment/randomTestEngine.js';
import { useProgressStore } from './progressStore.js';
import { storage } from '../services/storage/localStorage.js';

export const useTestStore = create((set, get) => ({
  activeSession: null,
  currentQuestionIndex: 0,
  userAnswers: {}, // questionId -> optionId
  timeRemainingSeconds: 0,
  isSubmitted: false,
  evaluationResult: null,

  startTest: ({ courseId, unitId, chapterId, count = 5, timeLimitMinutes = 10 }) => {
    const { completedChapters } = useProgressStore.getState();
    const session = RandomTestEngine.generateTestSession({
      courseId,
      unitId,
      chapterId,
      count,
      timeLimitMinutes,
      completedChapters
    });

    set({
      activeSession: session,
      currentQuestionIndex: 0,
      userAnswers: {},
      timeRemainingSeconds: session.timeLimitSeconds,
      isSubmitted: false,
      evaluationResult: null
    });

    storage.set(`test_session:${session.sessionId}`, {
      session,
      startedAt: Date.now()
    });
  },

  selectAnswer: (questionId, optionId) => {
    set((state) => ({
      userAnswers: {
        ...state.userAnswers,
        [questionId]: optionId
      }
    }));
  },

  nextQuestion: () => {
    const state = get();
    if (state.activeSession && state.currentQuestionIndex < state.activeSession.questions.length - 1) {
      set({ currentQuestionIndex: state.currentQuestionIndex + 1 });
    }
  },

  prevQuestion: () => {
    const state = get();
    if (state.currentQuestionIndex > 0) {
      set({ currentQuestionIndex: state.currentQuestionIndex - 1 });
    }
  },

  goToQuestion: (index) => {
    set({ currentQuestionIndex: index });
  },

  decrementTimer: () => {
    const state = get();
    if (state.isSubmitted) return;

    if (state.timeRemainingSeconds <= 1) {
      get().submitTest();
    } else {
      set({ timeRemainingSeconds: state.timeRemainingSeconds - 1 });
    }
  },

  submitTest: () => {
    const state = get();
    if (!state.activeSession || state.isSubmitted) return;

    const evaluation = RandomTestEngine.evaluate(
      state.activeSession.questions,
      state.userAnswers
    );

    set({
      isSubmitted: true,
      evaluationResult: evaluation
    });

    // Record in progress store
    useProgressStore.getState().recordTestResult(
      state.activeSession.sessionId,
      evaluation.score,
      evaluation.maxScore,
      state.activeSession.unitId,
      state.activeSession.chapterId
    );
  },

  resetTest: () => {
    set({
      activeSession: null,
      currentQuestionIndex: 0,
      userAnswers: {},
      timeRemainingSeconds: 0,
      isSubmitted: false,
      evaluationResult: null
    });
  }
}));
