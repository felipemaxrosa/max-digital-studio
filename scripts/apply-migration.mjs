// Aplica um arquivo .sql no Postgres (Neon) via driver HTTP — sem psql.
// Uso: node --env-file=.env.local scripts/apply-migration.mjs db/migrations/0001_briefings.sql
import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
if (!url) {
  console.error("✗ DATABASE_URL (ou DATABASE_URL_UNPOOLED) ausente no ambiente.");
  process.exit(1);
}

const file = process.argv[2];
if (!file) {
  console.error("✗ Informe o arquivo .sql. Ex.: scripts/apply-migration.mjs db/migrations/0001_briefings.sql");
  process.exit(1);
}

/** Divide em statements respeitando strings '...', comentários -- e dollar-quoting $$...$$. */
function splitStatements(input) {
  const out = [];
  let cur = "";
  let i = 0;
  let inString = false;
  let inLineComment = false;
  let dollarTag = null;

  while (i < input.length) {
    const ch = input[i];
    const two = input.slice(i, i + 2);

    if (inLineComment) {
      cur += ch;
      if (ch === "\n") inLineComment = false;
      i++;
      continue;
    }
    if (inString) {
      cur += ch;
      if (ch === "'") inString = false;
      i++;
      continue;
    }
    if (dollarTag) {
      if (input.startsWith(dollarTag, i)) {
        cur += dollarTag;
        i += dollarTag.length;
        dollarTag = null;
      } else {
        cur += ch;
        i++;
      }
      continue;
    }
    if (two === "--") {
      inLineComment = true;
      cur += two;
      i += 2;
      continue;
    }
    if (ch === "'") {
      inString = true;
      cur += ch;
      i++;
      continue;
    }
    if (ch === "$") {
      const m = input.slice(i).match(/^\$[A-Za-z0-9_]*\$/);
      if (m) {
        dollarTag = m[0];
        cur += m[0];
        i += m[0].length;
        continue;
      }
    }
    if (ch === ";") {
      if (cur.trim()) out.push(cur.trim());
      cur = "";
      i++;
      continue;
    }
    cur += ch;
    i++;
  }
  if (cur.trim()) out.push(cur.trim());
  // descarta blocos que são só comentário/espaço
  return out.filter((s) => s.replace(/--[^\n]*/g, "").trim().length > 0);
}

const sql = neon(url);
const text = readFileSync(file, "utf8");
const statements = splitStatements(text);

console.log(`→ ${statements.length} instruções em ${file}`);
let n = 0;
for (const stmt of statements) {
  await sql.query(stmt);
  n++;
  process.stdout.write(`  ✓ ${n}/${statements.length}\r`);
}
console.log(`\n✅ Migração aplicada (${n} instruções).`);
