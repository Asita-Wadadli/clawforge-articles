const puppeteer = require('puppeteer-core');
const chromium = require('@sparticuz/chromium');

module.exports = async (req, res) => {
  const { id } = req.query;
  
  if (!id) {
    return res.status(400).json({ error: 'Article ID required' });
  }

  try {
    // Fetch article from Control Board
    const articleRes = await fetch(`https://control.clawlauncher.io/api/articles/${id}`, {
      headers: {
        'Authorization': `Bearer ${process.env.CONTROLBOARD_API_TOKEN}`,
        'X-Workspace-Id': process.env.CONTROLBOARD_WORKSPACE_ID
      }
    });
    
    if (!articleRes.ok) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    const article = await articleRes.json();
    
    // Generate HTML for PDF
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${article.title}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Inter', -apple-system, sans-serif; 
            line-height: 1.6; 
            color: #1a1a1a;
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
          }
          .header {
            border-bottom: 3px solid #0074d4;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .logo {
            font-size: 24px;
            font-weight: 700;
            color: #0074d4;
          }
          h1 {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 10px;
            line-height: 1.2;
          }
          .meta {
            color: #666;
            font-size: 14px;
            margin-bottom: 30px;
          }
          h2 {
            font-size: 24px;
            font-weight: 600;
            margin: 30px 0 15px;
            color: #1a1a1a;
          }
          p {
            margin-bottom: 16px;
            font-size: 16px;
          }
          strong {
            font-weight: 600;
            color: #0074d4;
          }
          .cta-box {
            background: #f0f7ff;
            border-left: 4px solid #0074d4;
            padding: 20px;
            margin: 30px 0;
            border-radius: 4px;
          }
          .footer {
            margin-top: 50px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            text-align: center;
            color: #666;
            font-size: 12px;
          }
          a { color: #0074d4; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">☀️ ClawForge Systems</div>
        </div>
        <h1>${article.title}</h1>
        <div class="meta">
          Published: ${new Date(article.updated_at || article.created_at).toLocaleDateString()} | 
          ClawForge Blog
        </div>
        <div class="content">
          ${article.content?.body || article.description || ''}
        </div>
        <div class="footer">
          <p>© 2026 ClawForge Systems. All rights reserved.</p>
          <p>https://clawforge.com</p>
        </div>
      </body>
      </html>
    `;
    
    // Launch browser and generate PDF
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
    
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    const pdf = await page.pdf({
      format: 'Letter',
      printBackground: true,
      margin: { top: '0.5in', right: '0.5in', bottom: '0.5in', left: '0.5in' }
    });
    
    await browser.close();
    
    // Set headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${article.slug || id}.pdf"`);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    
    res.send(pdf);
    
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ error: 'Failed to generate PDF', details: error.message });
  }
};