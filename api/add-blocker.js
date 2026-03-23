import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).end();

  const { id, userId, content, category, severity } = request.body;

  try {
    await sql`
      INSERT INTO blockers (id, user_id, content, category, severity)
      VALUES (${id}, ${userId}, ${content}, ${category}, ${severity});
    `;
    return response.status(200).json({ message: "Bloqueo registrado" });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}