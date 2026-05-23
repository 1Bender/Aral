import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  const { method, body } = request;

  try {
    if (method === 'POST') {
      const { id, userId, desc, priority, type } = body;
      await sql`
        INSERT INTO tasks (id, user_id, "desc", priority, type, completed, archived)
        VALUES (${id}, ${userId}, ${desc}, ${priority}, ${type}, false, false);
      `;
      return response.status(200).json({ success: true });
    } 
    
    if (method === 'PUT') { 
      const { id, userId, completed, notes, archived } = body;
      
      if (archived !== undefined) {
        await sql`UPDATE tasks SET archived = ${archived} WHERE id = ${id} AND user_id = ${userId};`;
      } else {
        await sql`UPDATE tasks SET completed = ${completed}, notes = ${notes} WHERE id = ${id};`;
      }
      return response.status(200).json({ success: true });
    }

    return response.status(405).end();
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}