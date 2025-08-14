// Скрипт для запуска SQL миграции локально через DATABASE_URL
import fs from 'fs';
import path from 'path';
import pool from '../lib/db';

async function run() {
  const sqlPath = path.join(__dirname, '..', 'migrations', '001_create_news_table.sql');
  const sql = fs.readFileSync(sqlPath, 'utf-8');
  await pool.query(sql);
  console.log('Migration executed');
  await pool.end();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});