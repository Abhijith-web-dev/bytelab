import { create } from 'zustand';

const getInitialStoryMode = () => {
  try {
    const saved = localStorage.getItem('bytelab_story_mode');
    return saved === 'true';
  } catch (e) {
    return false;
  }
};

export const useUIStore = create((set) => ({
  isCmdKOpen: false,
  isMobileNavOpen: false,
  isSidebarOpen: true,
  isStoryMode: getInitialStoryMode(),
  isMobileCurriculumOpen: false,

  openCmdK: () => set({ isCmdKOpen: true }),
  closeCmdK: () => set({ isCmdKOpen: false }),
  toggleCmdK: () => set((s) => ({ isCmdKOpen: !s.isCmdKOpen })),

  openMobileNav: () => set({ isMobileNavOpen: true }),
  closeMobileNav: () => set({ isMobileNavOpen: false }),
  toggleMobileNav: () => set((s) => ({ isMobileNavOpen: !s.isMobileNavOpen })),

  isFocusMode: false,
  setFocusMode: (enabled) => set({ isFocusMode: enabled }),
  toggleFocusMode: () => set((s) => ({ isFocusMode: !s.isFocusMode })),

  toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),

  toggleMobileCurriculum: () => set((s) => ({ isMobileCurriculumOpen: !s.isMobileCurriculumOpen })),
  closeMobileCurriculum: () => set({ isMobileCurriculumOpen: false }),

  setStoryMode: (enabled) => {
    try {
      localStorage.setItem('bytelab_story_mode', String(enabled));
    } catch (e) {}
    set({ isStoryMode: enabled });
  },

  toggleStoryMode: () => set((s) => {
    const next = !s.isStoryMode;
    try {
      localStorage.setItem('bytelab_story_mode', String(next));
    } catch (e) {}
    return { isStoryMode: next };
  })
}));
