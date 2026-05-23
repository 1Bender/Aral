import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  const { method, body } = request;

  try {
    // 🟢 CREAR NECESIDAD (Antes api/add-need.js)
    if (method === 'POST') {
      const { id, userId, content, tag, type, assignedTo } = body;
      
      await sql`
        INSERT INTO needs (id, user_id, content, tag, type, "assignedTo")
        VALUES (${id}, ${userId}, ${content}, ${tag}, ${type}, ${assignedTo});
      `;
      return response.status(200).json({ success: true });
    }

    // 🔴 ELIMINAR NECESIDAD (Antes api/delete-need.js)
    if (method === 'DELETE') {
      const { id, userId } = body;

      await sql`
        DELETE FROM needs 
        WHERE id = ${id} AND user_id = ${userId};
      `;
      return response.status(200).json({ success: true });
    }

    return response.status(405).end();
  } catch (error) {
    console.error("Error en api/needs:", error);
    return response.status(500).json({ error: error.message });
  }
}