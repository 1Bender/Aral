import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).end();

  const { id, userId, content, tag, type, assignedTo } = request.body;

  try {
    await sql`
      INSERT INTO needs (id, user_id, content, tag, type, "assignedTo")
      VALUES (${id}, ${userId}, ${content}, ${tag}, ${type}, ${assignedTo});
    `;
    return response.status(200).json({ message: "Necesidad guardada" });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}