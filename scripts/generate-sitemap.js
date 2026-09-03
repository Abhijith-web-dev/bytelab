import fs from 'fs';
import path from 'path';

// Define the base URL of the site
const BASE_URL = 'https://bytelab-lms.sparklabinfo1.workers.dev';

// Core public routes
const staticRoutes = [
  '/',
  '/courses',
];

// Helper to format date
const today = new Date().toISOString().split('T')[0];

function generateSitemap() {
  console.log('Generating sitemap...');
  
  const urls = [...staticRoutes];
  
  // Read course directory
  const coursesDir = path.join(process.cwd(), 'content', 'courses');
  
  if (fs.existsSync(coursesDir)) {
    const courses = fs.readdirSync(coursesDir).filter(f => fs.statSync(path.join(coursesDir, f)).isDirectory());
    
    for (const courseId of courses) {
      urls.push(`/courses/${courseId}`);
      
      const courseJsonPath = path.join(coursesDir, courseId, 'course.json');
      if (fs.existsSync(courseJsonPath)) {
        const courseData = JSON.parse(fs.readFileSync(courseJsonPath, 'utf-8'));
        
        // Add Units and Chapters
        courseData.units.forEach(unit => {
          urls.push(`/courses/${courseId}/unit/${unit.id}`);
          
          unit.chapters.forEach(chapterId => {
            urls.push(`/courses/${courseId}/chapter/${chapterId}`);
          });
        });
      }
    }
  }

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${BASE_URL}${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url === '/' ? '1.0' : url.includes('/chapter/') ? '0.8' : '0.9'}</priority>
  </url>`).join('\n')}
</urlset>`;

  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }
  
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml);
  console.log(`Generated sitemap with ${urls.length} URLs at public/sitemap.xml`);

  // Also generate robots.txt
  const robotsTxt = `User-agent: *
Allow: /

# Exclude auth and user-specific routes
Disallow: /login
Disallow: /register
Disallow: /progress
Disallow: /profile
Disallow: /*/test
Disallow: /*/practice

Sitemap: ${BASE_URL}/sitemap.xml
`;
  
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);
  console.log('Generated public/robots.txt');
}

generateSitemap();
