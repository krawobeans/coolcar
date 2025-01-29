const fs = require('fs');
const prettier = require('prettier');

// TODO: Replace with your actual domain when live
const DOMAIN = 'https://coolcarautogarage.com';

const pages = [
  '',  // home page
  '/about',
  '/services',
  '/reviews',
  '/contact',
  '/booking'
];

const generateSitemap = () => {
  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map(page => {
          return `
            <url>
              <loc>${DOMAIN}${page}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>weekly</changefreq>
              <priority>${page === '' ? '1.0' : '0.8'}</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

  const formatted = prettier.format(sitemap, { parser: 'html' });
  
  fs.writeFileSync('public/sitemap.xml', formatted);
};

generateSitemap(); 