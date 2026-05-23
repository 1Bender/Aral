import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  const { userId } = request.query;

  if (!userId) {
    return response.status(400).json({ error: "Falta el ID de usuario" });
  }

  try {
    const [tasks, needs, staff, blockers, meetings, notes] = await Promise.all([
      sql`SELECT * FROM tasks WHERE user_id = ${userId} ORDER BY id ASC;`,
      sql`SELECT * FROM needs WHERE user_id = ${userId} ORDER BY id ASC;`,
      sql`SELECT * FROM personnel WHERE user_id = ${userId} ORDER BY name ASC;`,
      sql`SELECT * FROM blockers WHERE user_id = ${userId} ORDER BY id ASC;`,
      sql`SELECT * FROM meetings WHERE user_id = ${userId} ORDER BY id ASC;`,
      sql`SELECT * FROM notes WHERE user_id = ${userId} ORDER BY id ASC;`
    ]);

    return response.status(200).json({
      tasks: tasks.rows || [],
      needs: needs.rows || [],
      personnel: staff.rows ? staff.rows.map(r => r.name) : [],
      blockers: blockers.rows || [],
      meetings: meetings.rows || [],
      notes: notes.rows || []
    });
  } catch (error) {
    return response.status(500).json({ 
      error: "Error en el servidor de Frankfurt", 
      message: error.message, 
      stack: error.stack 
    });
  }
}