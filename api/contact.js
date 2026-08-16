import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  try {
    const data = await resend.emails.send({
      from: 'Portfolio Contact Form <onboarding@resend.dev>',
      to: ['swagatadolui.art09@gmail.com'],
      replyTo: email,
      subject: `New Portfolio Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 24px; color: #18181b; background-color: #fdfcf8; border-radius: 12px; border: 2px solid #18181b;">
          <h2 style="margin-top: 0; color: #8b5cf6;">New Message from Portfolio Contact Form</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message:</strong></p>
          <blockquote style="background: #f4f4f5; padding: 16px; border-left: 4px solid #8b5cf6; margin: 0; white-space: pre-wrap;">${message}</blockquote>
        </div>
      `
    });

    if (data.error) {
      console.error('Resend API returned error:', data.error);
      return res.status(400).json({ error: data.error.message || 'Failed to send email' });
    }

    return res.status(200).json({ success: true, id: data.id });
  } catch (error) {
    console.error('Server error sending email via Resend:', error);
    return res.status(500).json({ error: error.message || 'Server error sending email' });
  }
}
