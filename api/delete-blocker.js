import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send();
  const { id } = req.body;
  try {
    await sql`DELETE FROM blockers WHERE id = ${id}`;
    res.status(200).json({ success: true });
  } catch (error) { res.status(500).json({ error: error.message }); }
}