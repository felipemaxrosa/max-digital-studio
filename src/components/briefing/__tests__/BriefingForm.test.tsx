import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BriefingForm } from "../BriefingForm";

const { pushMock } = vi.hoisted(() => ({ pushMock: vi.fn() }));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: pushMock }) }));

const fetchMock = vi.fn();

beforeEach(() => {
  pushMock.mockReset();
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
  vi.stubGlobal("scrollTo", vi.fn());
  window.localStorage.clear();
  window.sessionStorage.clear();
});

async function fillContactStep(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Nome do responsável"), "Maria Silva");
  await user.type(screen.getByLabelText("Nome do negócio"), "Estética Bela");
  await user.type(screen.getByLabelText("E-mail"), "maria@bela.com");
  await user.type(screen.getByLabelText("WhatsApp"), "11999998888");
  await user.selectOptions(screen.getByLabelText("País"), "BR");
  await user.type(screen.getByLabelText("Segmento"), "Estética");
}

describe("BriefingForm (diagnostico)", () => {
  it("blocks advancing a step with invalid required fields", async () => {
    const user = userEvent.setup();
    render(<BriefingForm service="diagnostico" />);

    await user.click(screen.getByRole("button", { name: /Continuar/ }));

    // continua na etapa 1 e mostra erros
    expect(screen.getByRole("heading", { name: /Seu negócio/ })).toBeInTheDocument();
    expect(screen.getAllByText(/Campo obrigatório/).length).toBeGreaterThan(0);
  });

  it("advances once valid and preserves answers when going back", async () => {
    const user = userEvent.setup();
    render(<BriefingForm service="diagnostico" />);

    await fillContactStep(user);
    await user.click(screen.getByRole("button", { name: /Continuar/ }));

    expect(await screen.findByRole("heading", { name: /Presença digital atual/ })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Voltar/ }));
    expect(screen.getByLabelText("Nome do responsável")).toHaveValue("Maria Silva");
  });

  it("requires privacy consent and then submits, redirecting on success", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true, protocol: "MDS-OK123" }),
    });
    const user = userEvent.setup();
    render(<BriefingForm service="diagnostico" />);

    // etapa 1
    await fillContactStep(user);
    await user.click(screen.getByRole("button", { name: /Continuar/ }));

    // etapa 2: dificuldade (obrigatória)
    await screen.findByRole("heading", { name: /Presença digital atual/ });
    await user.click(
      screen.getByRole("radio", { name: "Meu negócio ainda não possui website" }),
    );
    await user.click(screen.getByRole("button", { name: /Continuar/ }));

    // revisão
    await screen.findByRole("heading", { name: /Revise antes de enviar/ });
    const submit = screen.getByRole("button", { name: /Solicitar avaliação gratuita/ });

    // sem consentimento → não envia
    await user.click(submit);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByText(/ciência da política/)).toBeInTheDocument();

    // com consentimento → envia
    await user.click(screen.getByLabelText(/estou ciente/));
    await user.click(submit);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const body = JSON.parse((fetchMock.mock.calls[0][1] as RequestInit).body as string);
    expect(body.service).toBe("diagnostico");
    expect(body.answers.responsavel).toBe("Maria Silva");
    expect(body.privacyAccepted).toBe(true);

    await waitFor(() => expect(pushMock).toHaveBeenCalledWith("/briefing/sucesso"));
    expect(window.sessionStorage.getItem("mds-briefing-success")).toContain("MDS-OK123");
  });
});
