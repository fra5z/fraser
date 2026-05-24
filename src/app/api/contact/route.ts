import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, business, email, phone, service, message } = await req.json();

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_key: process.env.WEB3FORMS_KEY,
      subject: `New enquiry from ${name}${business ? ` — ${business}` : ""}`,
      from_name: "Frazs Website",
      replyto: email,
      name,
      business: business || "",
      email,
      phone: phone || "",
      service: service || "",
      message: message || "",
    }),
  });

  const data = await res.json();

  if (!data.success) {
    return NextResponse.json({ error: data.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
