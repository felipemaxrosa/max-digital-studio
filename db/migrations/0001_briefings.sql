-- Central de Briefings — tabela de solicitações comerciais.
-- Postgres (Neon). Aplicar via Neon SQL Editor ou `psql "$DATABASE_URL" -f db/migrations/0001_briefings.sql`.
-- O acesso é feito apenas pelo servidor, com a connection string (nunca exposta ao client).

create table if not exists briefings (
  id                     uuid primary key default gen_random_uuid(),
  -- Protocolo público e curto mostrado ao cliente (não é PII).
  protocol               text not null unique,
  service                text not null check (service in (
                           'landing-page','identidade-visual','projeto-completo','diagnostico')),
  locale                 text not null default 'pt-BR',
  country                text,
  -- Pipeline comercial (§21). Novos briefings entram como 'briefing_received'.
  status                 text not null default 'briefing_received',
  contact                jsonb not null default '{}'::jsonb,  -- nome, email, whatsapp, empresa
  payload                jsonb not null default '{}'::jsonb,  -- respostas completas
  source                 jsonb not null default '{}'::jsonb,  -- utm_*, referrer sanitizados
  privacy_notice_version text not null,
  -- Dedup de submissões (uma submissão confirmada = uma linha).
  idempotency_key        text not null unique,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);

create index if not exists briefings_created_at_idx on briefings (created_at desc);
create index if not exists briefings_service_idx on briefings (service);
create index if not exists briefings_status_idx on briefings (status);

-- Mantém updated_at coerente em updates futuros (ex.: avanço no pipeline).
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists briefings_set_updated_at on briefings;
create trigger briefings_set_updated_at
  before update on briefings
  for each row execute function set_updated_at();
