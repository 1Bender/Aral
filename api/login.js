import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

export default async function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).end();

  const { username, password } = request.body;

  try {
    const result = await sql`SELECT * FROM users WHERE username = ${username};`;
    const user = result.rows[0];

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        return response.status(200).json({ 
          success: true, 
          userId: user.id, 
          username: user.username 
        });
      }
    }
    
    return response.status(401).json({ success: false, message: "Credenciales inválidas" });

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}