import { create } from 'zustand';
import { getCourse, getAllCourses } from '../content/loader/index.js';

export const useCourseStore = create((set, get) => ({
  activeCourseId: 'python-programming',
  activeUnitId: 'unit-01',
  activeChapterId: '01-interpreter',
  activeLessonId: 'introduction',
  courses: getAllCourses(),

  setCourse: (courseId) => set({ activeCourseId: courseId }),
  setUnit: (unitId) => set({ activeUnitId: unitId }),
  setChapter: (chapterId) => set({ activeChapterId: chapterId }),
  setLesson: (lessonId) => set({ activeLessonId: lessonId }),

  getActiveCourse: () => getCourse(get().activeCourseId)
}));
