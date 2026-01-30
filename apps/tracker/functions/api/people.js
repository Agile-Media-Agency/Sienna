// GET /api/people - Get all people with favorite status and membership info
export async function onRequestGet(context) {
  const { env } = context;

  try {
    // Get people with their tags, favorite status, and membership info
    const result = await env.DB.prepare(`
      SELECT
        p.*,
        GROUP_CONCAT(DISTINCT t.name) as tags,
        CASE WHEN f.id IS NOT NULL THEN 1 ELSE 0 END as is_favorite,
        m.joined_date,
        m.left_date,
        m.role,
        m.group_id
      FROM people p
      LEFT JOIN people_tags pt ON p.id = pt.person_id
      LEFT JOIN tags t ON pt.tag_id = t.id
      LEFT JOIN favorites f ON f.item_type = 'person' AND f.item_id = p.id
      LEFT JOIN memberships m ON p.id = m.person_id
      GROUP BY p.id
      ORDER BY p.birthday ASC
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
