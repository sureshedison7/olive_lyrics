export const prerender = false;

export async function GET({ locals, site }) {
  const siteUrl = site || "https://my-doc.sureshedison77.workers.dev";
  
  let songs = [];
  try {
    const DB = locals.runtime.env.DB;
    const { results } = await DB.prepare("SELECT url, title, pub_date FROM songs ORDER BY pub_date DESC LIMIT 50").all();
    songs = results;
  } catch (error) {
    console.error("Error fetching songs for RSS:", error);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Olive Lyrics - Christian Worship Songs</title>
    <description>Latest Christian worship lyrics and chords for musicians and worship leaders</description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>Olive Lyrics</generator>
    <webMaster>sureshedison77@gmail.com (Olive Lyrics)</webMaster>
    <managingEditor>sureshedison77@gmail.com (Olive Lyrics)</managingEditor>
    <category>Music</category>
    <category>Christian</category>
    <category>Worship</category>
    <ttl>1440</ttl>
${songs.map(song => `    <item>
      <title>${song.title || 'Untitled Song'}</title>
      <link>${siteUrl}/lyrics/${song.url}</link>
      <guid isPermaLink="true">${siteUrl}/lyrics/${song.url}</guid>
      <description>Christian worship song lyrics and chords for ${song.title || 'worship song'}</description>
      <pubDate>${song.pub_date ? new Date(song.pub_date).toUTCString() : new Date().toUTCString()}</pubDate>
      <category>Worship</category>
    </item>`).join('\n')}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
