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

  const subject = `New portfolio inquiry from ${name}`
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    '',
    'Message:',
    message,
  ].join('\n')

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
