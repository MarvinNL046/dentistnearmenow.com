import fs from 'fs';
import path from 'path';
import { getAllDentists, US_STATES } from '../lib/dentist-data';

const BASE_URL = 'https://dentistnearmenow.com';
const SITEMAPS_DIR = path.join(process.cwd(), 'public', 'sitemaps');
const MAX_URLS = 5000;

function url(loc: string, freq: string, pri: number, date: string) {
  return `  <url><loc>${loc}</loc><lastmod>${date}</lastmod><changefreq>${freq}</changefreq><priority>${pri}</priority></url>`;
}

async function main() {
  console.log('Generating static sitemaps...');
  const today = new Date().toISOString().split('T')[0];

  if (!fs.existsSync(SITEMAPS_DIR)) fs.mkdirSync(SITEMAPS_DIR, { recursive: true });
  fs.readdirSync(SITEMAPS_DIR).filter(f => f.endsWith('.xml')).forEach(f => fs.unlinkSync(path.join(SITEMAPS_DIR, f)));

  const dentists = await getAllDentists();
  console.log(`Loaded ${dentists.length} dentists`);

  // Static pages
  const staticUrls = [
    url(BASE_URL, 'daily', 1.0, today),
    url(`${BASE_URL}/search`, 'daily', 0.8, today),
    url(`${BASE_URL}/emergency-dentist`, 'weekly', 0.9, today),
    url(`${BASE_URL}/best-dentists`, 'weekly', 0.8, today),
    url(`${BASE_URL}/guides`, 'weekly', 0.7, today),
    url(`${BASE_URL}/faq`, 'monthly', 0.5, today),
    url(`${BASE_URL}/about`, 'monthly', 0.4, today),
    url(`${BASE_URL}/contact`, 'monthly', 0.4, today),
  ];

  // State pages
  const stateUrls: string[] = [];
  for (const s of US_STATES) {
    stateUrls.push(url(`${BASE_URL}/state/${s.slug}`, 'weekly', 0.8, today));
  }

  // City + dentist pages
  const citySet = new Set<string>();
  const dentistUrls: string[] = [];
  for (const d of dentists) {
    if (d.city && d.stateAbbr) {
      const slug = `${d.city}-${d.stateAbbr}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      if (!citySet.has(slug)) { citySet.add(slug); stateUrls.push(url(`${BASE_URL}/city/${slug}`, 'weekly', 0.7, today)); }
    }
    if (d.slug) dentistUrls.push(url(`${BASE_URL}/dentist/${d.slug}`, 'monthly', 0.6, today));
  }

  // Write files
  const wrap = (urls: string[]) => `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;
  
  fs.writeFileSync(path.join(SITEMAPS_DIR, 'sitemap-static.xml'), wrap(staticUrls));
  fs.writeFileSync(path.join(SITEMAPS_DIR, 'sitemap-states.xml'), wrap(stateUrls));

  const chunks: string[][] = [];
  for (let i = 0; i < dentistUrls.length; i += MAX_URLS) chunks.push(dentistUrls.slice(i, i + MAX_URLS));
  chunks.forEach((c, i) => fs.writeFileSync(path.join(SITEMAPS_DIR, `sitemap-dentists-${i + 1}.xml`), wrap(c)));

  // Index
  const entries = ['sitemap-static.xml', 'sitemap-states.xml', ...chunks.map((_, i) => `sitemap-dentists-${i + 1}.xml`)];
  const index = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.map(f => `  <sitemap><loc>${BASE_URL}/sitemaps/${f}</loc><lastmod>${today}</lastmod></sitemap>`).join('\n')}\n</sitemapindex>`;
  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), index);

  console.log(`Static: ${staticUrls.length} | States+Cities: ${stateUrls.length} | Dentists: ${dentistUrls.length} in ${chunks.length} files`);
  console.log(`Total: ${staticUrls.length + stateUrls.length + dentistUrls.length} URLs in ${entries.length} sitemaps`);
}
main().catch(console.error);
