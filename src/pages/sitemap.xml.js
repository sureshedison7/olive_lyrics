export const prerender = false;

export async function GET({ locals }) {
  const siteUrl = "https://my-doc.sureshedison77.workers.dev";
  
  let songs = [];
  try {
    const DB = locals.runtime.env.DB;
    const { results } = await DB.prepare("SELECT url, pub_date, title FROM songs ORDER BY pub_date DESC").all();
    songs = results;
  } catch (error) {
    console.error("Error fetching songs for sitemap:", error);
  }

  const staticPages = [
    { url: "", priority: "1.0", changefreq: "daily" },
    { url: "/lyrics", priority: "0.9", changefreq: "daily" },
    { url: "/chords", priority: "0.9", changefreq: "daily" },
    { url: "/search", priority: "0.8", changefreq: "weekly" },
    { url: "/about", priority: "0.6", changefreq: "monthly" },
    { url: "/privacy", priority: "0.3", changefreq: "yearly" },
    { url: "/terms", priority: "0.3", changefreq: "yearly" }
  ];

  const currentDate = new Date().toISOString().split('T')[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${staticPages.map(page => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
${songs.map(song => {
    const lastmod = song.pub_date ? new Date(song.pub_date).toISOString().split('T')[0] : currentDate;
    return `  <url>
    <loc>${siteUrl}/lyrics/${song.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${siteUrl}/chords/${song.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}