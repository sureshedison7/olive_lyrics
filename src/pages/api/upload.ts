import type { APIRoute } from 'astro';

export const prerender = false; // Make this a server route

export const POST: APIRoute = async ({ request, locals }) => {
  const formData = await request.formData();

  const song = {
    url: formData.get('url')?.toString(),
    title: formData.get('title')?.toString(),
    lyrics: formData.get('lyrics')?.toString(),
    chords: formData.get('chords')?.toString() || null,
    description: formData.get('description')?.toString() || null,
    album: formData.get('album')?.toString() || null,
    artist: formData.get('artist')?.toString() || null,
    category: formData.get('category')?.toString() || null,
    pub_date: formData.get('pub_date')?.toString() || null,
    key: formData.get('key')?.toString() || null,
    tags: formData.get('tags')?.toString() || null,
  };

  try {
    const db = locals.runtime.env.DB as D1Database;

    await db
      .prepare(`INSERT INTO songs 
        (url, title, lyrics, chords, description, album, artist, category, pub_date, key, tags)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .bind(
        song.url,
        song.title,
        song.lyrics,
        song.chords,
        song.description,
        song.album,
        song.artist,
        song.category,
        song.pub_date,
        song.key,
        song.tags
      )
      .run();

    return new Response('Song uploaded successfully!', { status: 200 });
  } catch (err: any) {
    return new Response(`Error uploading song: ${err.message}`, { status: 500 });
  }
};
