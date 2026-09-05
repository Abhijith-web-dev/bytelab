import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { App } from './App.jsx';
import { RouteErrorBoundary } from '../components/RouteErrorBoundary.jsx';

// Lazy loaded page components
const HomePage = lazy(() => import('../pages/Home/HomePage.jsx').then(m => ({ default: m.HomePage })));
const CourseCatalogPage = lazy(() => import('../pages/Courses/CourseCatalogPage.jsx').then(m => ({ default: m.CourseCatalogPage })));
const CourseOverviewPage = lazy(() => import('../pages/Course/CourseOverviewPage.jsx').then(m => ({ default: m.CourseOverviewPage })));
const UnitOverviewPage = lazy(() => import('../pages/Course/UnitOverviewPage.jsx').then(m => ({ default: m.UnitOverviewPage })));
const LessonPage = lazy(() => import('../pages/Lesson/LessonPage.jsx').then(m => ({ default: m.LessonPage })));
const PracticePage = lazy(() => import('../pages/Practice/PracticePage.jsx').then(m => ({ default: m.PracticePage })));
const TestSessionPage = lazy(() => import('../pages/Tests/TestSessionPage.jsx').then(m => ({ default: m.TestSessionPage })));
const ProgressDashboardPage = lazy(() => import('../pages/Progress/ProgressDashboardPage.jsx').then(m => ({ default: m.ProgressDashboardPage })));
const LeaderboardPage = lazy(() => import('../pages/Leaderboard/LeaderboardPage.jsx').then(m => ({ default: m.LeaderboardPage })));
const ProfilePage = lazy(() => import('../pages/Profile/ProfilePage.jsx').then(m => ({ default: m.ProfilePage })));
const LoginPage = lazy(() => import('../pages/Auth/LoginPage.jsx').then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('../pages/Auth/RegisterPage.jsx').then(m => ({ default: m.RegisterPage })));
const BlogIndexPage = lazy(() => import('../pages/Blog/BlogIndexPage.jsx').then(m => ({ default: m.BlogIndexPage })));
const BlogPostPage = lazy(() => import('../pages/Blog/BlogPostPage.jsx').then(m => ({ default: m.BlogPostPage })));
const NotFoundPage = lazy(() => import('../pages/Error/NotFoundPage.jsx').then(m => ({ default: m.NotFoundPage })));

// Generic Loading Fallback for Suspense
const PageLoader = () => (
  <div className="flex-1 flex items-center justify-center min-h-[50vh]">
    <div className="w-8 h-8 rounded-full border-2 border-[#e5e5e5] border-t-black animate-spin" />
  </div>
);

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <RouteErrorBoundary />,
      children: [
        { index: true, element: <Suspense fallback={<PageLoader />}><HomePage /></Suspense> },
        { path: 'courses', element: <Suspense fallback={<PageLoader />}><CourseCatalogPage /></Suspense> },
        { path: 'courses/:courseId', element: <Suspense fallback={<PageLoader />}><CourseOverviewPage /></Suspense> },
        { path: 'courses/:courseId/unit/:unitId', element: <Suspense fallback={<PageLoader />}><UnitOverviewPage /></Suspense> },
        { path: 'courses/:courseId/chapter/:chapterId', element: <Suspense fallback={<PageLoader />}><LessonPage /></Suspense> },
        { path: 'courses/:courseId/unit/:unitId/chapter/:chapterId', element: <Suspense fallback={<PageLoader />}><LessonPage /></Suspense> },
        { path: 'practice', element: <Suspense fallback={<PageLoader />}><PracticePage /></Suspense> },
        { path: 'practice/:problemId', element: <Suspense fallback={<PageLoader />}><PracticePage /></Suspense> },
        { path: 'tests', element: <Suspense fallback={<PageLoader />}><TestSessionPage /></Suspense> },
        { path: 'progress', element: <Suspense fallback={<PageLoader />}><ProgressDashboardPage /></Suspense> },
        { path: 'leaderboard', element: <Suspense fallback={<PageLoader />}><LeaderboardPage /></Suspense> },
        { path: 'profile', element: <Suspense fallback={<PageLoader />}><ProfilePage /></Suspense> },
        { path: 'blog', element: <Suspense fallback={<PageLoader />}><BlogIndexPage /></Suspense> },
        { path: 'blog/:slug', element: <Suspense fallback={<PageLoader />}><BlogPostPage /></Suspense> },
        { path: 'login', element: <Suspense fallback={<PageLoader />}><LoginPage /></Suspense> },
        { path: 'register', element: <Suspense fallback={<PageLoader />}><RegisterPage /></Suspense> },
        { path: '*', element: <Suspense fallback={<PageLoader />}><NotFoundPage /></Suspense> }
      ]
    }
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_startTransition: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true
    }
  }
);
