import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).send();

  const { id, notes, completed, archived } = request.body;

  try {
    // Actualizamos dinámicamente según lo que nos llegue
    if (archived !== undefined) {
      await sql`UPDATE tasks SET archived = ${archived} WHERE id = ${id}`;
    } else {
      await sql`
        UPDATE tasks 
        SET completed = ${completed}, notes = ${notes} 
        WHERE id = ${id}
      `;
    }
    
    return response.status(200).json({ success: true });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}