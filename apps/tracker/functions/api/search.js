// GET /api/search?q=... - Search across people, events, groups
export async function onRequestGet(context) {
  const { env, request } = context;
  
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get('q') || '';
    const searchTerm = `%${query}%`;

    // Search people
    const people = await env.DB.prepare(`
      SELECT id, name, nickname, emoji, 'person' as type 
      FROM people 
      WHERE name LIKE ? OR nickname LIKE ?
      LIMIT 10
    `).bind(searchTerm, searchTerm).all();

    // Search events
    const events = await env.DB.prepare(`
      SELECT id, name, emoji, 'event' as type 
      FROM events 
      WHERE name LIKE ?
      LIMIT 10
    `).bind(searchTerm).all();

    // Search groups
    const groups = await env.DB.prepare(`
      SELECT id, name, emoji, 'group' as type 
      FROM groups 
      WHERE name LIKE ?
      LIMIT 10
    `).bind(searchTerm).all();

    const results = [
      ...people.results,
      ...events.results,
      ...groups.results
    ];

    return new Response(JSON.stringify(results), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
