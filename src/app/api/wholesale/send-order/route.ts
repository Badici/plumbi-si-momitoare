import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  WHOLESALE_AUTH_COOKIE,
  WHOLESALE_AUTH_COOKIE_VALUE,
  WHOLESALE_EMAIL_RECIPIENTS,
  WHOLESALE_FORMSUBMIT_ENDPOINT,
} from "@/data/wholesale";

export const runtime = "nodejs";

type OrderLine = {
  productName: string;
  variantLabel: string;
  quantity: number;
  unitPriceRon: number;
};

type ClientData = {
  clientName?: string;
  clientSurname?: string;
  companyName?: string;
  address?: string;
};

type Payload = {
  orderNumber?: string;
  totalRon?: number;
  message?: string;
  pdfFileName?: string;
  pdfBase64?: string;
  client?: ClientData;
  lines?: OrderLine[];
};

export async function POST(request: NextRequest) {
  const hasAccess = request.cookies.get(WHOLESALE_AUTH_COOKIE)?.value === WHOLESALE_AUTH_COOKIE_VALUE;
  if (!hasAccess) {
    return NextResponse.json({ ok: false, message: "Acces neautorizat." }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as Payload;
  const lines = (body.lines ?? []).filter(
    (line): line is OrderLine =>
      Boolean(
        line &&
          typeof line.productName === "string" &&
          typeof line.variantLabel === "string" &&
          typeof line.quantity === "number" &&
          typeof line.unitPriceRon === "number",
      ),
  );

  if (lines.length === 0) {
    return NextResponse.json({ ok: false, message: "Comanda nu conține produse." }, { status: 400 });
  }

  if (!body.pdfBase64 || !body.message) {
    return NextResponse.json({ ok: false, message: "Date incomplete pentru trimitere." }, { status: 400 });
  }

  try {
    const payload = new FormData();
    payload.append("_subject", `Comanda en-gros ${body.orderNumber ?? "EG"}`);
    payload.append("_cc", WHOLESALE_EMAIL_RECIPIENTS[1]);
    payload.append("_captcha", "false");
    payload.append("message", body.message);
    payload.append("order_number", body.orderNumber ?? "EG");
    payload.append("total_ron", String(body.totalRon ?? 0));
    payload.append("client_name", body.client?.clientName?.trim() || "-");
    payload.append("client_surname", body.client?.clientSurname?.trim() || "-");
    payload.append("company_name", body.client?.companyName?.trim() || "-");
    payload.append("client_address", body.client?.address?.trim() || "-");

    lines.forEach((line, index) => {
      payload.append(
        `line_${index + 1}`,
        `${line.productName} | ${line.variantLabel} | cant ${line.quantity} | pret ${line.unitPriceRon} RON`,
      );
    });

    const pdfBuffer = Buffer.from(body.pdfBase64, "base64");
    const pdfBlob = new Blob([pdfBuffer], { type: "application/pdf" });
    payload.append("attachment", pdfBlob, body.pdfFileName || `${body.orderNumber || "comanda"}.pdf`);

    const response = await fetch(WHOLESALE_FORMSUBMIT_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: payload,
    });

    const data = (await response.json().catch(() => ({}))) as { success?: string; message?: string };
    if (!response.ok || data.success !== "true") {
      return NextResponse.json(
        {
          ok: false,
          message: data.message ?? "FormSubmit a respins trimiterea. Confirmă activarea emailului principal.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Eroare de conexiune către FormSubmit. Verifică internetul sau încearcă din nou.",
      },
      { status: 502 },
    );
  }
}
