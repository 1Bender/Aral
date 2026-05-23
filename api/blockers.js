import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  const { method, body } = request;

  try {
    // 🟢 CREAR BLOQUEADOR (Antes api/add-blocker.js)
    if (method === 'POST') {
      const { id, userId, content, category, severity } = body;
      
      await sql`
        INSERT INTO blockers (id, user_id, content, category, severity)
        VALUES (${id}, ${userId}, ${content}, ${category}, ${severity});
      `;
      return response.status(200).json({ success: true });
    }

    // 🔴 ELIMINAR BLOQUEADOR (Antes api/delete-blocker.js)
    if (method === 'DELETE') {
      const { id, userId } = body;

      await sql`
        DELETE FROM blockers 
        WHERE id = ${id} AND user_id = ${userId};
      `;
      return response.status(200).json({ success: true });
    }

    // Si llega otro método no soportado
    return response.status(405).end();
  } catch (error) {
    console.error("Error en api/blockers:", error);
    return response.status(500).json({ error: error.message });
  }
}