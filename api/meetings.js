import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  const { method, body } = request;

  try {

    if (method === 'POST') {
      const { id, userId, title, date, points, slots } = body;
      
      await sql`
        INSERT INTO meetings (id, user_id, title, "date", points, slots)
        VALUES (${id}, ${userId}, ${title}, ${date}, ${points}, ${JSON.stringify(slots || [])});
      `;
      return response.status(200).json({ success: true });
    }


    if (method === 'PUT') {
      const { id, userId, title, date, points, slots } = body;

      await sql`
        UPDATE meetings 
        SET title = ${title}, "date" = ${date}, points = ${points}, slots = ${JSON.stringify(slots || [])}
        WHERE id = ${id} AND user_id = ${userId};
      `;
      return response.status(200).json({ success: true });
    }

    if (method === 'DELETE') {
      const { id, userId } = body;

      await sql`
        DELETE FROM meetings 
        WHERE id = ${id} AND user_id = ${userId};
      `;
      return response.status(200).json({ success: true });
    }

    return response.status(405).end();
  } catch (error) {
    console.error("Error en api/meetings:", error);
    return response.status(500).json({ error: error.message });
  }
}