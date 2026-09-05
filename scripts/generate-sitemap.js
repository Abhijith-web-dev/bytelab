import fs from 'fs';
import path from 'path';

// Define the base URL of the site
const BASE_URL = 'https://bytelab-lms.sparklabinfo1.workers.dev';

// Core public routes
const staticRoutes = [
  '/',
  '/courses',
  '/courses/python-programming',
  '/practice',
  '/tests',
  '/leaderboard',
  '/blog',
  '/blog/zero-backend-wasm-python',
  '/blog/optimizing-web-vitals-sub-2s',
  '/blog/memory-tracer-python-stack',
  '/blog/curriculum-design-first-principles'
];

// Helper to format date
const today = new Date().toISOString().split('T')[0];

function generateSitemap() {
  console.log('Generating sitemap, robots.txt, and llms.txt...');
  
  const urls = [...staticRoutes];
  
  // Read course directory
  const coursesDir = path.join(process.cwd(), 'content', 'courses');
  const unitList = [];
  const chapterList = [];
  
  if (fs.existsSync(coursesDir)) {
    const courses = fs.readdirSync(coursesDir).filter(f => fs.statSync(path.join(coursesDir, f)).isDirectory());
    
    for (const courseId of courses) {
      if (!urls.includes(`/courses/${courseId}`)) {
        urls.push(`/courses/${courseId}`);
      }
      
      const courseJsonPath = path.join(coursesDir, courseId, 'course.json');
      if (fs.existsSync(courseJsonPath)) {
        const courseData = JSON.parse(fs.readFileSync(courseJsonPath, 'utf-8'));
        
        // Add Units and Chapters
        courseData.units.forEach(unit => {
          const unitUrl = `/courses/${courseId}/unit/${unit.id}`;
          if (!urls.includes(unitUrl)) urls.push(unitUrl);
          unitList.push({ id: unit.id, title: unit.title, url: unitUrl, periods: unit.periods });
          
          unit.chapters.forEach(chapterId => {
            const chUrl = `/courses/${courseId}/chapter/${chapterId}`;
            if (!urls.includes(chUrl)) urls.push(chUrl);
            chapterList.push({ unitId: unit.id, chapterId, url: chUrl });
          });
        });
      }
    }
  }

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => {
  let priority = '0.7';
  let changefreq = 'weekly';
  if (url === '/') {
    priority = '1.0';
    changefreq = 'daily';
  } else if (url === '/courses/python-programming' || url === '/blog') {
    priority = '0.9';
    changefreq = 'daily';
  } else if (url.includes('/unit/') || url.includes('/blog/')) {
    priority = '0.8';
    changefreq = 'weekly';
  }
  return `  <url>
    <loc>${BASE_URL}${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}).join('\n')}
</urlset>`;

  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml);
  console.log(`Generated sitemap with ${urls.length} URLs at public/sitemap.xml`);

  // Generate robots.txt
  const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /
Allow: /llms.txt
Allow: /sitemap.xml
Allow: /courses/
Allow: /blog/
Allow: /practice
Allow: /tests
Allow: /leaderboard

# Exclude private and user-authenticated routes
Disallow: /login
Disallow: /register
Disallow: /profile
Disallow: /progress

# AI Crawlers Specific Directives
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;
  
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);
  console.log('Generated public/robots.txt');

  // Generate llms.txt (LLM and AI Search Engine Manifest)
  const llmsTxt = `# ByteLab LMS — Technical Computing & Interactive CodePath Laboratory
> Autonomous computer science laboratory & interactive curriculum engine for Python 3.11 (Anna University 19AI301 / CS3301). Zero-backend client architecture with isolated browser WebAssembly sandboxes and cloud synchronization.

## Platform & Developer Information
- **Founder & Lead Architect**: Abhijith S
- **Developer Portfolio**: https://abhijith-dev-io.web.app/
- **Platform Name**: ByteLab Core LMS
- **Architecture**: Zero-backend client-side execution via Pyodide (Python 3.11 WebAssembly inside dedicated Web Workers), React 19, Tailwind CSS v4.
- **Privacy & Execution Model**: 100% in-browser client code compilation and execution. Zero server queue latency, zero code transmitted to external servers.

## Core Curricula Tracks
- [Python 46-Day Curriculum](${BASE_URL}/courses/python-programming): Comprehensive Anna University 19AI301/CS3301 Python programming track covering 5 units and 46 structured lecture days mapped to Bloom's taxonomy outcomes CO1 through CO5.
- [Unit I: Problem Solving & Python Basics (Days 1–12)](${BASE_URL}/courses/python-programming/unit/unit-01): Algorithmic problem solving, building blocks of algorithms, Python interpreter, variables, expressions, and statements.
- [Unit II: Conditionals & Loops (Days 13–20)](${BASE_URL}/courses/python-programming/unit/unit-02): Boolean expressions, chained/nested conditionals, while and for iterations, break/continue statements.
- [Unit III: Functions, Recursion & Strings (Days 21–26)](${BASE_URL}/courses/python-programming/unit/unit-03): Function definition, parameters, return values, recursion, and string slice operations.
- [Unit IV: Lists, Tuples & Dictionaries (Days 27–36)](${BASE_URL}/courses/python-programming/unit/unit-04): Mutability, list operations, tuple packing/unpacking, dictionaries, sorting algorithms (Selection, Bubble, Merge).
- [Unit V: Files, Modules & Packages (Days 37–46)](${BASE_URL}/courses/python-programming/unit/unit-05): File I/O, format operators, command line arguments, exception handling, modules, packages, NumPy and Pandas.

## Developer Journal & Technical Research
- [Zero-Backend Python in the Browser](${BASE_URL}/blog/zero-backend-wasm-python): Deep dive into executing Pyodide in WebAssembly Web Workers without server compute costs by Abhijith S.
- [Architecting for Sub-2s Load Times](${BASE_URL}/blog/optimizing-web-vitals-sub-2s): Code splitting, asset budgets, and Vite manual chunk tuning by Abhijith S.
- [CPython Memory Model & Stack Tracing](${BASE_URL}/blog/memory-tracer-python-stack): Visualizing variable references, stack frames, and garbage collection in educational tools by Abhijith S.
- [Designing a 46-Day Curriculum from First Principles](${BASE_URL}/blog/curriculum-design-first-principles): Pedagogical scaffolding, dual-mode learning (Standard vs Story Mode), and Bloom's taxonomy alignment by Abhijith S.

## Interactive Tools & Endpoints
- [Interactive Python Sandbox](${BASE_URL}/practice): In-browser Monaco editor + Pyodide runtime with line-by-line syntax diagnostics.
- [Unit Diagnostic Tests](${BASE_URL}/tests): Randomized question pools with instant grading and explanations.
- [Outcome Analytics Dashboard](${BASE_URL}/progress): CO1–CO5 mastery radar and chapter completion tracking.
- [Global Real-Time Leaderboard](${BASE_URL}/leaderboard): Real authenticated learner XP, streaks, and problem-solving rankings.

## Sitemap & Direct Manifests
- [XML Sitemap](${BASE_URL}/sitemap.xml)
- [Robots Directives](${BASE_URL}/robots.txt)
- [Developer Portfolio](https://abhijith-dev-io.web.app/)
`;

  fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsTxt);
  console.log('Generated public/llms.txt');
}

generateSitemap();

