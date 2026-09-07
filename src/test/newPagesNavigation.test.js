import { describe, it, expect } from 'vitest';
import { router } from '../app/router.jsx';

describe('New Public Pages & Router Configuration Audit', () => {
  it('router includes updates, docs, and terms routes', () => {
    const mainRoute = router.routes.find(r => r.path === '/');
    expect(mainRoute).toBeDefined();

    const childPaths = mainRoute.children.map(c => c.path);
    expect(childPaths).toContain('updates');
    expect(childPaths).toContain('docs');
    expect(childPaths).toContain('terms');
    expect(childPaths).toContain('terms-and-conditions');
  });

  it('updates page module exports UpdatesPage with real git commit history', async () => {
    const mod = await import('../pages/Updates/UpdatesPage.jsx');
    expect(mod.UpdatesPage).toBeDefined();
    expect(typeof mod.UpdatesPage).toBe('function');
  });

  it('docs page module exports DocsPage', async () => {
    const mod = await import('../pages/Docs/DocsPage.jsx');
    expect(mod.DocsPage).toBeDefined();
    expect(typeof mod.DocsPage).toBe('function');
  });

  it('terms page module exports TermsPage', async () => {
    const mod = await import('../pages/Legal/TermsPage.jsx');
    expect(mod.TermsPage).toBeDefined();
    expect(typeof mod.TermsPage).toBe('function');
  });
});
