import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).end();

  const { name, userId, action } = request.body;

  try {
    if (action === 'ADD') {
      await sql`
        INSERT INTO personnel (name, user_id) 
        VALUES (${name}, ${userId})
        ON CONFLICT (name) DO NOTHING;
      `;
      return response.status(200).json({ message: "Personal añadido" });
    } 
    
    if (action === 'DELETE') {
      await sql`
        DELETE FROM personnel 
        WHERE name = ${name} AND user_id = ${userId};
      `;
      return response.status(200).json({ message: "Personal eliminado" });
    }
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}