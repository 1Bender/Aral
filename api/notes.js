import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  const { method, body, query } = request;
  
  const userId = body.userId || query.userId;
  if (!userId) return response.status(400).json({ error: "Identificación de usuario requerida" });

  try {
    switch (method) {
      case 'GET': 
        const notes = await sql`SELECT * FROM notes WHERE user_id = ${userId} ORDER BY id DESC;`;
        return response.status(200).json(notes.rows);

      case 'POST': 
        const newNote = await sql`
          INSERT INTO notes (user_id, title, content) 
          VALUES (${userId}, 'Nueva Nota', '') 
          RETURNING *;
        `;
        return response.status(200).json(newNote.rows[0]);

      case 'PUT': 
        const updated = await sql`
          UPDATE notes 
          SET title = ${body.title}, content = ${body.content}, updated_at = CURRENT_TIMESTAMP
          WHERE id = ${body.id} AND user_id = ${userId}
          RETURNING *;
        `;
        return response.status(200).json(updated.rows[0]);

      case 'DELETE': // Eliminar el post-it
        await sql`DELETE FROM notes WHERE id = ${query.id} AND user_id = ${userId};`;
        return response.status(200).json({ success: true });

      default:
        return response.status(405).end();
    }
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}