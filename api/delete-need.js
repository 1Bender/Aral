import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).send();

  const { id } = request.body;

  try {
    await sql`DELETE FROM needs WHERE id = ${id}`;
    return response.status(200).json({ success: true });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}