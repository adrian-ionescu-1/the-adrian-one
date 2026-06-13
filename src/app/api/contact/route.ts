import { Resend } from 'resend';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  budget: z.string().min(1),
  projectType: z.string().min(1),
  message: z.string().min(20),
});

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    console.error('[contact] RESEND_API_KEY is not set in .env.local');
    return Response.json({ error: 'Email service not configured' }, { status: 500 });
  }

  let data: z.infer<typeof schema>;
  try {
    const body = await request.json();
    data = schema.parse(body);
  } catch {
    return Response.json({ error: 'Invalid request data' }, { status: 400 });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: ['theadrianone.dev@gmail.com'],
      replyTo: data.email,
      subject: `New inquiry from ${data.name} — ${data.projectType}`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:28px;background:#09070f;color:#e1e1e1;border-radius:14px;border:1px solid #1f1033;">
          <div style="margin-bottom:24px;">
            <div style="display:inline-block;padding:6px 14px;background:#1a0b35;border:1px solid #4a1d96;border-radius:999px;font-size:12px;font-weight:600;color:#a855f7;letter-spacing:.08em;margin-bottom:16px;">NEW PROJECT INQUIRY</div>
            <h1 style="margin:0;font-size:22px;font-weight:700;color:#f3f0ff;">Message from ${data.name}</h1>
          </div>
          <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
            <tr style="border-bottom:1px solid #1f1033;">
              <td style="padding:10px 0;font-size:13px;color:#7c6f9f;width:130px;font-weight:500;">Name</td>
              <td style="padding:10px 0;font-size:14px;font-weight:600;color:#f3f0ff;">${data.name}</td>
            </tr>
            <tr style="border-bottom:1px solid #1f1033;">
              <td style="padding:10px 0;font-size:13px;color:#7c6f9f;font-weight:500;">Email</td>
              <td style="padding:10px 0;font-size:14px;color:#e1e1e1;"><a href="mailto:${data.email}" style="color:#a855f7;text-decoration:none;">${data.email}</a></td>
            </tr>
            ${data.phone ? `
            <tr style="border-bottom:1px solid #1f1033;">
              <td style="padding:10px 0;font-size:13px;color:#7c6f9f;font-weight:500;">Phone</td>
              <td style="padding:10px 0;font-size:14px;color:#e1e1e1;"><a href="tel:${data.phone}" style="color:#a855f7;text-decoration:none;">${data.phone}</a></td>
            </tr>` : ''}
            ${data.company ? `
            <tr style="border-bottom:1px solid #1f1033;">
              <td style="padding:10px 0;font-size:13px;color:#7c6f9f;font-weight:500;">Company</td>
              <td style="padding:10px 0;font-size:14px;color:#e1e1e1;">${data.company}</td>
            </tr>` : ''}
            <tr style="border-bottom:1px solid #1f1033;">
              <td style="padding:10px 0;font-size:13px;color:#7c6f9f;font-weight:500;">Project type</td>
              <td style="padding:10px 0;font-size:14px;color:#e1e1e1;">${data.projectType}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;font-size:13px;color:#7c6f9f;font-weight:500;">Budget</td>
              <td style="padding:10px 0;font-size:14px;font-weight:600;color:#a855f7;">${data.budget}</td>
            </tr>
          </table>
          <div style="padding:18px;background:#13092a;border-radius:10px;border-left:3px solid #7c3aed;">
            <p style="margin:0 0 10px;font-size:12px;font-weight:600;color:#7c6f9f;text-transform:uppercase;letter-spacing:.1em;">Message</p>
            <p style="margin:0;font-size:14px;line-height:1.75;color:#d4ccee;white-space:pre-wrap;">${data.message}</p>
          </div>
          <div style="margin-top:24px;padding-top:20px;border-top:1px solid #1f1033;text-align:center;">
            <a href="mailto:${data.email}" style="display:inline-block;padding:12px 28px;background:#7c3aed;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">Reply to ${data.name}</a>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('[contact] Resend error:', error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return Response.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
