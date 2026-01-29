// POST /api/favorite - Toggle favorite status
export async function onRequestPost(context) {
  const { env, request } = context;
  
  try {
    const { item_type, item_id } = await request.json();
    
    // Check if already favorited
    const existing = await env.DB.prepare(
      'SELECT id FROM favorites WHERE item_type = ? AND item_id = ?'
    ).bind(item_type, item_id).first();

    if (existing) {
      // Remove favorite
      await env.DB.prepare(
        'DELETE FROM favorites WHERE item_type = ? AND item_id = ?'
      ).bind(item_type, item_id).run();
      
      return new Response(JSON.stringify({ favorited: false }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      // Add favorite
      await env.DB.prepare(
        'INSERT INTO favorites (item_type, item_id) VALUES (?, ?)'
      ).bind(item_type, item_id).run();
      
      return new Response(JSON.stringify({ favorited: true }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
