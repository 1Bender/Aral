import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).end();
  
  // Ahora recibimos el userId desde el cuerpo del mensaje (body)
  const { id, userId, desc, notes, date, priority, type } = request.body;

  try {
    await sql`
      INSERT INTO tasks (id, user_id, "desc", notes, "date", priority, type, completed, archived)
      VALUES (${id}, ${userId}, ${desc}, ${notes}, ${date}, ${priority}, ${type}, false, false);
    `;
    return response.status(200).json({ message: "Tarea guardada con éxito" });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}