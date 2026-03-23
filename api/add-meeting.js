import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  const { id, userId, title, date, points, slots } = request.body;
  try {
    await sql`
      INSERT INTO meetings (id, user_id, title, "date", points, slots)
      VALUES (${id}, ${userId}, ${title}, ${date}, ${points}, ${JSON.stringify(slots || [])});
    `;
    return response.status(200).json({ message: "Reunión guardada" });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}