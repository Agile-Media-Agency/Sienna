// GET /api/groups - Get all groups with favorite status
export async function onRequestGet(context) {
  const { env } = context;
  
  try {
    const result = await env.DB.prepare(`
      SELECT 
        g.*,
        CASE WHEN f.id IS NOT NULL THEN 1 ELSE 0 END as is_favorite
      FROM groups g
      LEFT JOIN favorites f ON f.item_type = 'group' AND f.item_id = g.id
      ORDER BY g.name ASC
    `).all();

    return new Response(JSON.stringify(result.results), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
