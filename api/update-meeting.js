import { sql } from '@vercel/postgres';
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send();
  const { id, title, date, points, slots } = req.body;
  try {
    await sql`
      UPDATE meetings 
      SET title = ${title}, "date" = ${date}, points = ${points}, slots = ${JSON.stringify(slots)}
      WHERE id = ${id};
    `;
    res.status(200).json({ success: true });
  } catch (error) { res.status(500).json({ error: error.message }); }
}