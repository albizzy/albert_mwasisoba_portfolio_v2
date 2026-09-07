import { siteConfig } from '@/config/site'

export function escapeHtml(value: string) {
    return value.replace(
        /[&<>"']/g,
        (character) =>
            ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;',
            })[character]!
    )
}

export function brandedEmail({
    title,
    intro,
    message,
    action,
    origin,
}: {
    title: string
    intro: string
    message: string
    action?: { label: string; url: string }
    origin: string
}) {
    const name = siteConfig.name
    const text = `${name}\nConsultant & Engineer\n\n${title}\n\n${intro}\n\n${message}${action ? `\n\n${action.label}: ${action.url}` : ''}\n\n${origin}`
    // Table layout and inline styles work in Gmail, Outlook, and Apple Mail.
    const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title></head>
<body style="margin:0;padding:24px 12px;background:#f4f4f5;color:#18181b;font-family:Arial,Helvetica,sans-serif">
<table role="presentation" style="width:100%;max-width:600px;margin:0 auto;border-collapse:collapse;background:#fff">
<tr><td style="padding:32px;background:#18181b;color:#fafafa"><a href="${escapeHtml(origin)}" style="color:#fafafa;font-size:22px;font-weight:bold;text-decoration:none">${escapeHtml(name)}<span style="color:#a1a1aa">.</span></a><p style="margin:12px 0 0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#d4d4d8">Consultant &amp; Engineer</p></td></tr>
<tr><td style="padding:32px"><h1 style="font-size:28px;line-height:1.25;margin:0 0 24px;letter-spacing:-1px">${escapeHtml(title)}</h1><p style="font-size:15px;line-height:1.8;color:#52525b">${escapeHtml(intro)}</p><div style="font-size:16px;line-height:1.8;overflow-wrap:anywhere">${escapeHtml(message).replace(/\r?\n/g, '<br>')}</div>${action ? `<p style="margin:32px 0 0"><a href="${escapeHtml(action.url)}" style="display:inline-block;padding:16px 24px;border-radius:28px;background:#18181b;color:#fff;text-decoration:none;font-size:14px;font-weight:bold">${escapeHtml(action.label)}</a></p>` : ''}</td></tr>
<tr><td style="padding:24px 32px;border-top:1px solid #e4e4e7;color:#71717a;font-size:12px;line-height:1.8">${escapeHtml(name)} &middot; Technology, design, and strategy.<br><a href="${escapeHtml(origin)}" style="color:#52525b">Visit my portfolio</a></td></tr>
</table></body></html>`
    return { html, text }
}
