import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { POST } from "../route";

const { sendMock } = vi.hoisted(() => ({ sendMock: vi.fn() }));

vi.mock("resend", () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));

vi.mock("@neondatabase/serverless", () => ({
  // tag de template que devolve a linha inserida
  neon: () => async () => [{ id: "id-1", protocol: "MDS-STORED" }],
}));

function payload(overrides: Record<string, unknown> = {}) {
  return {
    schemaVersion: 1,
    service: "diagnostico",
    locale: "pt-BR",
    privacyNoticeVersion: "2026-11-27",
    privacyAccepted: true,
    idempotencyKey: "abcdefgh-1234",
    source: {},
    answers: {
      responsavel: "Maria Silva",
      empresa: "Estética Bela",
      email: "maria@bela.com",
      whatsapp: "+55 11 99999-9999",
      pais: "BR",
      segmento: "Estética",
      dificuldade: "sem-website",
    },
    website: "",
    ...overrides,
  };
}

function request(body: unknown) {
  return new Request("http://localhost/api/briefing", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  sendMock.mockReset();
  delete process.env.DATABASE_URL;
  delete process.env.RESEND_API_KEY;
});

afterEach(() => {
  delete process.env.DATABASE_URL;
  delete process.env.RESEND_API_KEY;
});

describe("POST /api/briefing", () => {
  it("discards honeypot submissions silently", async () => {
    const res = await POST(request(payload({ website: "http://spam" })));
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.ok).toBe(true);
    expect(json.persisted).toBe(false);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejects an invalid payload with 422", async () => {
    const bad = payload();
    delete (bad.answers as Record<string, unknown>).email;
    const res = await POST(request(bad));
    expect(res.status).toBe(422);
    const json = await res.json();
    expect(json.ok).toBe(false);
  });

  it("returns 502 when neither persistence nor email is configured", async () => {
    const res = await POST(request(payload()));
    expect(res.status).toBe(502);
    const json = await res.json();
    expect(json.ok).toBe(false);
    expect(json.error).toBe("delivery_failed");
  });

  it("succeeds via email when Resend is configured", async () => {
    process.env.RESEND_API_KEY = "re_test";
    sendMock.mockResolvedValue({ id: "e1" });
    const res = await POST(request(payload()));
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.ok).toBe(true);
    expect(json.emailed).toBe(true);
    // interno + confirmação ao cliente
    expect(sendMock).toHaveBeenCalledTimes(2);
  });

  it("succeeds via persistence when the database is configured", async () => {
    process.env.DATABASE_URL = "postgres://test";
    const res = await POST(request(payload()));
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.ok).toBe(true);
    expect(json.persisted).toBe(true);
    expect(json.protocol).toBe("MDS-STORED");
  });

  it("still succeeds when the client confirmation email fails but the internal one sends", async () => {
    process.env.RESEND_API_KEY = "re_test";
    sendMock.mockResolvedValueOnce({ id: "internal" }).mockRejectedValueOnce(new Error("bounce"));
    const res = await POST(request(payload()));
    const json = await res.json();
    expect(json.ok).toBe(true);
    expect(json.emailed).toBe(true);
  });
});
