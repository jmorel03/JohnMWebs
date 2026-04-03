const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function sanitize(value) {
  return (value || '').toString().trim()
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  const name = sanitize(req.body?.name)
  const email = sanitize(req.body?.email)
  const message = sanitize(req.body?.message)

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please complete all fields.' })
  }

  if (!EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email.' })
  }

  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL || 'jmorel@johnmweb.com'
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev'

  if (!apiKey) {
    return res.status(500).json({
      error: 'Server email provider is not configured yet.',
    })
  }

  const subject = `New inquiry from ${name} — JohnMWebs`

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#f6efe2;font-family:'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(8,34,43,0.10);">

          <!-- Header -->
          <tr>
            <td style="background:#11262e;padding:28px 36px;">
              <p style="margin:0;font-size:20px;font-weight:800;color:#fff8f0;letter-spacing:0.02em;">JohnMWebs</p>
              <p style="margin:6px 0 0;font-size:13px;color:rgba(255,248,240,0.65);letter-spacing:0.04em;text-transform:uppercase;">New Portfolio Inquiry</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 36px;">
              <p style="margin:0 0 24px;font-size:15px;color:#2a3d45;line-height:1.6;">
                You have received a new message through your portfolio contact form.
              </p>

              <!-- Sender details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f6efe2;border-radius:10px;margin-bottom:24px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 12px;font-size:13px;color:#7a6e62;text-transform:uppercase;letter-spacing:0.08em;">From</p>
                    <p style="margin:0 0 4px;font-size:16px;font-weight:700;color:#11262e;">${name}</p>
                    <a href="mailto:${email}" style="font-size:14px;color:#de5f3b;text-decoration:none;">${email}</a>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <p style="margin:0 0 8px;font-size:13px;color:#7a6e62;text-transform:uppercase;letter-spacing:0.08em;">Message</p>
              <div style="background:#fafaf8;border-left:3px solid #de5f3b;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:28px;">
                <p style="margin:0;font-size:15px;color:#2a3d45;line-height:1.7;white-space:pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
              </div>

              <!-- Reply CTA -->
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#de5f3b;border-radius:999px;">
                    <a href="mailto:${email}" style="display:inline-block;padding:12px 24px;font-size:14px;font-weight:700;color:#fff8f0;text-decoration:none;">Reply to ${name}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 36px;border-top:1px solid #ede8df;">
              <p style="margin:0;font-size:12px;color:#a8a099;">Sent via the contact form on <strong>JohnMWebs</strong> portfolio site.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  const text = `New inquiry from ${name}\n\nEmail: ${email}\n\nMessage:\n${message}`

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject,
        html,
        text,
      }),
    })

    if (!response.ok) {
      return res.status(502).json({ error: 'Unable to send email right now.' })
    }

    return res.status(200).json({ ok: true })
  } catch {
    return res.status(500).json({ error: 'Unexpected server error.' })
  }
}
