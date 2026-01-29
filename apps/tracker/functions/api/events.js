// GET /api/events - Get all events with favorite status
export async function onRequestGet(context) {
  const { env } = context;
  
  try {
    const result = await env.DB.prepare(`
      SELECT 
        e.*,
        CASE WHEN f.id IS NOT NULL THEN 1 ELSE 0 END as is_favorite
      FROM events e
      LEFT JOIN favorites f ON f.item_type = 'event' AND f.item_id = e.id
      ORDER BY e.date DESC
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
