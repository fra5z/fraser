import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, business, email, phone, service, message } = await req.json();

  const { error } = await resend.emails.send({
    from: "Frazs Website <onboarding@resend.dev>",
    to: "frazsagency@outlook.com",
    replyTo: email,
    subject: `New enquiry from ${name}${business ? ` — ${business}` : ""}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#0f172a">
        <h2 style="margin:0 0 24px;font-size:20px">New enquiry via Frazs website</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;width:140px">Name</td><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-weight:600">${name}</td></tr>
          ${business ? `<tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b">Business</td><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-weight:600">${business}</td></tr>` : ""}
          <tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b">Email</td><td style="padding:10px 0;border-bottom:1px solid #e2e8f0"><a href="mailto:${email}" style="color:#3b6ff5">${email}</a></td></tr>
          ${phone ? `<tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b">Phone</td><td style="padding:10px 0;border-bottom:1px solid #e2e8f0"><a href="tel:${phone}" style="color:#3b6ff5;font-weight:600">${phone}</a></td></tr>` : ""}
          ${service ? `<tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b">Interested in</td><td style="padding:10px 0;border-bottom:1px solid #e2e8f0">${service}</td></tr>` : ""}
          ${message ? `<tr><td style="padding:10px 0;color:#64748b;vertical-align:top">Message</td><td style="padding:10px 0;line-height:1.6">${message.replace(/\n/g, "<br>")}</td></tr>` : ""}
        </table>
        <p style="margin:24px 0 0;font-size:13px;color:#94a3b8">Sent from frazs.co.uk contact form · Reply directly to this email to respond</p>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
