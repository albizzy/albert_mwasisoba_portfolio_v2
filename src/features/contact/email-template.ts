import { siteConfig } from '@/config/site'

const emailPalette = {
    ink: '#141413',
    muted: '#6b6357',
    line: '#dbddd3',
    paper: '#f7f8f2',
    yellow: '#dfad49',
    pink: '#eb4f68',
    blue: '#3b6b88',
} as const

const emailFont = "'Unbounded', Arial, Helvetica, sans-serif"

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
    const safeTitle = escapeHtml(title)
    const safeOrigin = escapeHtml(origin)
    const safeName = escapeHtml(name)
    const safeIntro = escapeHtml(intro)
    const safeMessage = escapeHtml(message).replace(/\r?\n/g, '<br>')
    const actionHtml = action
        ? `<tr><td style="padding:28px 32px 36px">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td bgcolor="${emailPalette.blue}" style="padding:15px 20px;border:2px solid ${emailPalette.ink};border-radius:12px;background-color:${emailPalette.blue}">
                <a href="${escapeHtml(action.url)}" style="color:#ffffff;font-family:${emailFont};font-size:14px;font-weight:600;line-height:1.4;text-decoration:none">${escapeHtml(action.label)} &nbsp;&#8599;</a>
            </td></tr></table>
        </td></tr>`
        : '<tr><td style="height:36px;font-size:0;line-height:0">&nbsp;</td></tr>'

    const html = `<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="color-scheme" content="light">
    <title>${safeTitle}</title>
    <style>@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;500;600;700&display=swap');</style>
</head>
<body bgcolor="${emailPalette.paper}" style="margin:0;padding:0;background-color:${emailPalette.paper};color:${emailPalette.ink};font-family:${emailFont}">
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="${emailPalette.paper}" style="width:100%;border-collapse:collapse;background-color:${emailPalette.paper}">
<tr><td align="center" style="padding:28px 12px 36px">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="width:100%;max-width:600px;border-collapse:separate;border-spacing:0">
        <tr><td style="padding:0 0 0 20px">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td bgcolor="${emailPalette.yellow}" style="padding:9px 16px;border:2px solid ${emailPalette.ink};border-bottom:0;border-radius:12px 12px 0 0;background-color:${emailPalette.yellow};color:${emailPalette.ink};font-family:${emailFont};font-size:11px;font-weight:600;line-height:1.4;letter-spacing:1.5px;text-transform:uppercase">From the portfolio</td></tr></table>
        </td></tr>
        <tr><td bgcolor="${emailPalette.yellow}" style="padding:0 7px 7px 0;border-radius:0 22px 22px 22px;background-color:${emailPalette.yellow}">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff" style="width:100%;border:2px solid ${emailPalette.ink};border-collapse:separate;border-spacing:0;border-radius:0 20px 20px 20px;background-color:#ffffff">
                <tr><td bgcolor="${emailPalette.ink}" style="padding:28px 32px 26px;border-radius:0 18px 0 0;background-color:${emailPalette.ink};color:#ffffff">
                    <p style="margin:0 0 14px;color:${emailPalette.yellow};font-family:${emailFont};font-size:11px;font-weight:600;line-height:1.5;letter-spacing:2px;text-transform:uppercase">Correspondence / Direct line</p>
                    <a href="${safeOrigin}" style="color:#ffffff;font-family:${emailFont};font-size:20px;font-weight:600;line-height:1.3;letter-spacing:-0.8px;text-decoration:none">${safeName}<span style="color:${emailPalette.pink}">.</span></a>
                    <p style="margin:8px 0 0;color:#e6e6e2;font-family:${emailFont};font-size:11px;font-weight:400;line-height:1.6;letter-spacing:1.3px;text-transform:uppercase">Consultant &amp; Engineer</p>
                </td></tr>
                <tr><td style="padding:0;font-size:0;line-height:0">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"><tr>
                        <td width="34%" bgcolor="${emailPalette.yellow}" style="height:5px;background-color:${emailPalette.yellow}"></td>
                        <td width="33%" bgcolor="${emailPalette.pink}" style="height:5px;background-color:${emailPalette.pink}"></td>
                        <td width="33%" bgcolor="${emailPalette.blue}" style="height:5px;background-color:${emailPalette.blue}"></td>
                    </tr></table>
                </td></tr>
                <tr><td style="padding:34px 32px 10px">
                    <p style="margin:0 0 15px;color:${emailPalette.blue};font-family:${emailFont};font-size:11px;font-weight:600;line-height:1.5;letter-spacing:1.8px;text-transform:uppercase">A note in the inbox</p>
                    <h1 style="margin:0 0 20px;color:${emailPalette.ink};font-family:${emailFont};font-size:27px;font-weight:600;line-height:1.3;letter-spacing:-1.4px">${safeTitle}</h1>
                    <p style="margin:0;color:${emailPalette.muted};font-family:${emailFont};font-size:14px;font-weight:400;line-height:1.8;word-break:break-word">${safeIntro}</p>
                </td></tr>
                <tr><td style="padding:20px 32px 0">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="${emailPalette.paper}" style="width:100%;border:1px solid ${emailPalette.line};border-collapse:separate;border-spacing:0;border-radius:14px;background-color:${emailPalette.paper}"><tr><td style="padding:22px 24px;border-left:5px solid ${emailPalette.pink}">
                        <p style="margin:0 0 11px;color:${emailPalette.blue};font-family:${emailFont};font-size:11px;font-weight:600;line-height:1.5;letter-spacing:1.5px;text-transform:uppercase">The message</p>
                        <div style="color:${emailPalette.ink};font-family:${emailFont};font-size:16px;font-weight:400;line-height:1.7;word-break:break-word">${safeMessage}</div>
                    </td></tr></table>
                </td></tr>
                ${actionHtml}
                <tr><td bgcolor="${emailPalette.paper}" style="padding:24px 32px 28px;border-top:1px solid ${emailPalette.line};border-radius:0 0 18px 18px;background-color:${emailPalette.paper}">
                    <p style="margin:0 0 9px;color:${emailPalette.muted};font-family:${emailFont};font-size:11px;font-weight:600;line-height:1.5;letter-spacing:1.4px;text-transform:uppercase">${safeName} / Frontend &amp; design</p>
                    <p style="margin:0 0 12px;color:${emailPalette.muted};font-family:${emailFont};font-size:12px;font-weight:400;line-height:1.7">Engineering thoughtful experiences for the web.</p>
                    <a href="${safeOrigin}" style="color:${emailPalette.ink};font-family:${emailFont};font-size:12px;font-weight:600;line-height:1.5;text-decoration:underline;text-decoration-color:${emailPalette.pink}">Visit the portfolio &#8599;</a>
                </td></tr>
            </table>
        </td></tr>
    </table>
</td></tr>
</table>
</body>
</html>`
    return { html, text }
}
