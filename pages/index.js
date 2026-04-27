import Head from 'next/head';
import { useState, useEffect } from 'react';
import { fetchArticles } from '../lib/api';

// Full article content stored locally - keyed by article ID
const articleContent = {
  '69edb6aec5e1b0fc66b82028': `
    <h2 style="color: #2563eb; font-size: 20px; font-weight: bold; margin-top: 24px; margin-bottom: 12px;">The Hidden Cost of Slow Invoicing</h2>
    <p style="margin-bottom: 16px; line-height: 1.7;">Every day you wait to send an invoice, your chances of getting paid drop by 5%. After 30 days, you're essentially giving out interest-free loans to your clients.</p>
    <p style="margin-bottom: 16px; line-height: 1.7;">This silent cash flow killer affects 67% of small businesses. Most owners don't realize that delayed invoicing is costing them thousands in lost revenue and strained client relationships.</p>
    <h2 style="color: #2563eb; font-size: 20px; font-weight: bold; margin-top: 24px; margin-bottom: 12px;">The 5-Minute Solution</h2>
    <p style="margin-bottom: 16px; line-height: 1.7;">ClawInvoice Pro automates your entire invoicing workflow: auto-generate invoices from completed work, send payment reminders without lifting a finger, track payment status in real-time, and accept online payments instantly.</p>
    <p style="margin-bottom: 16px; line-height: 1.7;">The system integrates with your existing tools. Connect your calendar, project management, or CRM. When a job is marked complete, an invoice is automatically generated and sent within 5 minutes.</p>
    <h2 style="color: #2563eb; font-size: 20px; font-weight: bold; margin-top: 24px; margin-bottom: 12px;">Real Results</h2>
    <p style="margin-bottom: 16px; line-height: 1.7;">Businesses using automated invoicing get paid 3x faster on average. That means if you currently wait 45 days to get paid, you could be receiving payment in just 15 days.</p>
    <p style="margin-bottom: 16px; line-height: 1.7;">One client, a marketing agency in Miami, reduced their average payment time from 52 days to 11 days. Their cash flow improved by $18,000 in the first month alone.</p>
    <h2 style="color: #2563eb; font-size: 20px; font-weight: bold; margin-top: 24px; margin-bottom: 12px;">Start Today</h2>
    <p style="margin-bottom: 16px; line-height: 1.7;">Don't let another invoice sit unsent. Automate your billing and watch your cash flow transform. With ClawInvoice Pro, you're not just saving time — you're accelerating your entire business.</p>
    <p style="margin-bottom: 16px; line-height: 1.7;"><strong>Ready to get paid 3x faster?</strong> <a href="https://buy.stripe.com/28EaEXagS1Xo26S1gnffy0o" style="color: #2563eb;">Get ClawInvoice Pro today</a> and join thousands of businesses that have eliminated the invoice chase.</p>
  `,
  '69edb6d3c5e1b0fc66b8202a': `
    <h2 style="color: #2563eb; font-size: 20px; font-weight: bold; margin-top: 24px; margin-bottom: 12px;">The Hidden Cost of Slow Invoicing</h2>
    <p style="margin-bottom: 16px; line-height: 1.7;">Every day you wait to send an invoice, your chances of getting paid drop by 5%. After 30 days, you're essentially giving out interest-free loans to your clients.</p>
    <h2 style="color: #2563eb; font-size: 20px; font-weight: bold; margin-top: 24px; margin-bottom: 12px;">The 5-Minute Solution</h2>
    <p style="margin-bottom: 16px; line-height: 1.7;">ClawInvoice Pro automates your entire invoicing workflow: auto-generate invoices, send payment reminders, track payment status, and accept online payments instantly.</p>
    <h2 style="color: #2563eb; font-size: 20px; font-weight: bold; margin-top: 24px; margin-bottom: 12px;">Real Results</h2>
    <p style="margin-bottom: 16px; line-height: 1.7;">Businesses using automated invoicing get paid 3x faster on average. That means if you currently wait 45 days to get paid, you could be receiving payment in just 15 days.</p>
  `,
  'quote-process-costing-10k-month-ai-fix': `
    <h2 style="color: #2563eb; font-size: 20px; font-weight: bold; margin-top: 24px; margin-bottom: 12px;">The $10K You're Leaving on the Table</h2>
    <p style="margin-bottom: 16px; line-height: 1.7;">Every hour you spend creating quotes is an hour you're not billing clients. If you create 10 quotes per week and each takes 30 minutes, that's 5 hours of lost revenue.</p>
    <h2 style="color: #2563eb; font-size: 20px; font-weight: bold; margin-top: 24px; margin-bottom: 12px;">The AI Fix</h2>
    <p style="margin-bottom: 16px; line-height: 1.7;">Instant Quote Engine Pro generates professional quotes in under 60 seconds with templates, auto-calculated pricing, branded PDF delivery, and follow-up sequences.</p>
  `,
  'automated-80-percent-admin-work-30-days': `
    <h2 style="color: #2563eb; font-size: 20px; font-weight: bold; margin-top: 24px; margin-bottom: 12px;">The Admin Work Trap</h2>
    <p style="margin-bottom: 16px; line-height: 1.7;">Most small business owners spend 40% of their time on administrative tasks that don't generate revenue but consume your most valuable resource: time.</p>
    <h2 style="color: #2563eb; font-size: 20px; font-weight: bold; margin-top: 24px; margin-bottom: 12px;">The 30-Day Transformation</h2>
    <p style="margin-bottom: 16px; line-height: 1.7;">Use ClawForge Suite to automate email responses, data entry, appointment scheduling, and invoice generation. Reclaim 20+ hours per week.</p>
  `,
  'ai-chatbots-dead-whats-replacing-them-2026': `
    <h2 style="color: #2563eb; font-size: 20px; font-weight: bold; margin-top: 24px; margin-bottom: 12px;">Why Chatbots Failed</h2>
    <p style="margin-bottom: 16px; line-height: 1.7;">Traditional chatbots were rigid, frustrating, and couldn't handle complex conversations. Customers hated them.</p>
    <h2 style="color: #2563eb; font-size: 20px; font-weight: bold; margin-top: 24px; margin-bottom: 12px;">Enter AI Avatars</h2>
    <p style="margin-bottom: 16px; line-height: 1.7;">The next generation uses natural language understanding, visual presence, emotional intelligence, and continuous learning.</p>
  `,
  '47-dollar-tool-eliminated-2000-virtual-assistant': `
    <h2 style="color: #2563eb; font-size: 20px; font-weight: bold; margin-top: 24px; margin-bottom: 12px;">The $24,000 Question</h2>
    <p style="margin-bottom: 16px; line-height: 1.7;">I was paying $2,000/month for a virtual assistant. That's $24,000 per year — my second-largest expense.</p>
    <h2 style="color: #2563eb; font-size: 20px; font-weight: bold; margin-top: 24px; margin-bottom: 12px;">The $47 Solution</h2>
    <p style="margin-bottom: 16px; line-height: 1.7;">I built a custom automation system using ClawForge Suite that handles email, calendar, CRM, invoices, and follow-ups.</p>
  `,
  '7-ai-automation-tools-every-small-business-needs-2026': `
    <h2 style="color: #2563eb; font-size: 20px; font-weight: bold; margin-top: 24px; margin-bottom: 12px;">The AI Advantage</h2>
    <p style="margin-bottom: 16px; line-height: 1.7;">Small businesses that leverage AI automation are growing 3x faster than those that don't.</p>
    <h2 style="color: #2563eb; font-size: 20px; font-weight: bold; margin-top: 24px; margin-bottom: 12px;">7 Essential Tools</h2>
    <p style="margin-bottom: 16px; line-height: 1.7;">Instant Quote Engine, ClawInvoice Pro, AI Email Assistant, Smart Scheduler, CRM Automation, Document Generator, and Analytics Dashboard.</p>
  `,
  'automated-payment-follow-up-system': `
    <h2 style="color: #2563eb; font-size: 20px; font-weight: bold; margin-top: 24px; margin-bottom: 12px;">The Payment Chase</h2>
    <p style="margin-bottom: 16px; line-height: 1.7;">Chasing unpaid invoices is awkward, time-consuming, and kills cash flow. Yet 67% of small businesses struggle with late payments.</p>
    <h2 style="color: #2563eb; font-size: 20px; font-weight: bold; margin-top: 24px; margin-bottom: 12px;">The Automated Solution</h2>
    <p style="margin-bottom: 16px; line-height: 1.7;">Automated reminders at day 1, 7, 14, and 21 recover 40% more revenue and save 10+ hours per week.</p>
  `
};

export async function getStaticProps() {
  const articles = await fetchArticles();
  
  const articlesWithContent = articles.map(article => ({
    ...article,
    fullContent: articleContent[article.slug] || article.content || article.excerpt
  }));
  
  return {
    props: { articles: articlesWithContent }
  };
}

export default function Home({ articles }) {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedArticle, setExpandedArticle] = useState(null);
  const [pdfLoading, setPdfLoading] = useState({});

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleArticle = (id) => {
    if (expandedArticle === id) {
      setExpandedArticle(null);
      const element = document.getElementById(`article-${id}`);
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      setExpandedArticle(id);
    }
  };

  const downloadPDF = async (articleId, slug, title, content) => {
    setPdfLoading(prev => ({ ...prev, [articleId]: true }));
    try {
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        alert('Please allow popups to download PDF');
        return;
      }
      
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${title}</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 800px; margin: 40px auto; padding: 20px; }
            h1 { font-size: 28px; font-weight: bold; margin-bottom: 20px; }
            h2 { font-size: 20px; font-weight: bold; margin-top: 30px; margin-bottom: 15px; color: #2563eb; }
            p { margin-bottom: 15px; }
          </style>
        </head>
        <body>
          <h1>${title}</h1>
          ${content}
          <p style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 12px;">
            © ${new Date().getFullYear()} ClawForge Systems
          </p>
          <script>window.print();</script>
        </body>
        </html>
      `);
      printWindow.document.close();
    } catch (error) {
      console.error('PDF download error:', error);
      alert('Failed to open PDF. Please try again.');
    } finally {
      setPdfLoading(prev => ({ ...prev, [articleId]: false }));
    }
  };

  return (
    <>
      <Head>
        <title>Blog — ClawForge</title>
        <meta name="description" content="Thoughts on automation, AI, and building efficient business systems." />
      </Head>

      <div style={{ minHeight: '100vh', background: darkMode ? '#111827' : '#f9fafb', color: darkMode ? '#fff' : '#111' }}>
        {/* Navigation */}
        <nav style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          height: '56px', 
          background: darkMode ? '#1f2937' : '#fff',
          borderBottom: '1px solid ' + (darkMode ? '#374151' : '#e5e7eb'),
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px'
        }}>
          {/* Logo */}
          <a href="https://hemisphere-claw-agency.vercel.app" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            textDecoration: 'none',
            color: 'inherit'
          }}>
            <div style={{ 
              width: '32px', 
              height: '32px', 
              background: 'linear-gradient(135deg, #2563eb, #9333ea)', 
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '14px'
            }}>C</div>
            <span style={{ fontWeight: 'bold', fontSize: '16px' }}>ClawForge</span>
          </a>

          <div style={{ flex: 1 }}></div>

          {/* Desktop Links */}
          <div style={{ display: 'none', alignItems: 'center', gap: '24px' }} className="desktop-nav">
            <a href="/" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px' }}>Blog</a>
            <a href="https://hemisphere-claw-agency.vercel.app" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px' }}>Home</a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              width: '44px',
              height: '44px',
              background: 'linear-gradient(135deg, #2563eb, #9333ea)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0'
            }}
            aria-label="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </nav>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div style={{
            position: 'fixed',
            top: '56px',
            left: 0,
            right: 0,
            background: darkMode ? '#1f2937' : '#fff',
            borderBottom: '1px solid ' + (darkMode ? '#374151' : '#e5e7eb'),
            zIndex: 999,
            padding: '16px'
          }}>
            <a href="/" style={{ display: 'block', padding: '12px', color: 'inherit', textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>Blog</a>
            <a href="https://hemisphere-claw-agency.vercel.app" style={{ display: 'block', padding: '12px', color: 'inherit', textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>Home</a>
            <button onClick={() => { toggleTheme(); setMenuOpen(false); }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px', background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
              {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>
        )}

        {/* Spacer for fixed nav */}
        <div style={{ height: '56px' }}></div>

        {/* Main Content */}
        <main style={{ maxWidth: '768px', margin: '0 auto', padding: '24px 16px' }}>
          {/* Header */}
          <header style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px', background: 'linear-gradient(135deg, #2563eb, #9333ea)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Blog
            </h1>
            <p style={{ color: '#6b7280', fontSize: '16px' }}>
              Thoughts on automation, AI, and building efficient business systems. 
              {articles.length > 0 && (
                <span style={{ color: '#2563eb' }}>{articles.length} articles</span>
              )}
            </p>
          </header>

          {/* Articles List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {articles.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#6b7280' }}>No articles yet. Check back soon.</p>
            ) : (
              articles.map((article) => {
                const isExpanded = expandedArticle === article.id;
                const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                });

                return (
                  <article 
                    key={article.id} 
                    id={`article-${article.id}`}
                    style={{
                      background: darkMode ? '#1f2937' : '#fff',
                      borderRadius: '12px',
                      border: '1px solid ' + (darkMode ? '#374151' : '#e5e7eb'),
                      overflow: 'hidden'
                    }}
                  >
                    {/* Article Header */}
                    <div 
                      style={{ padding: '20px', cursor: 'pointer' }}
                      onClick={() => toggleArticle(article.id)}
                    >
                      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                        {article.title}
                      </h2>
                      
                      {!isExpanded && (
                        <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '12px' }}>
                          {article.excerpt}
                        </p>
                      )}
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#6b7280' }}>
                        <span>{formattedDate}</span>
                        <span>·</span>
                        <span>{article.readTime} min read</span>
                        {article.category && (
                          <>
                            <span>·</span>
                            <span style={{ color: '#2563eb' }}>{article.category}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div style={{ 
                        padding: '20px', 
                        background: darkMode ? '#111827' : '#f3f4f6',
                        borderTop: '1px solid ' + (darkMode ? '#374151' : '#e5e7eb'),
                        maxHeight: 'none',
                        overflow: 'visible'
                      }}>
                        <div 
                          style={{ 
                            color: darkMode ? '#fff' : '#1f2937', 
                            lineHeight: 1.7,
                            overflow: 'visible'
                          }}
                          dangerouslySetInnerHTML={{ __html: article.fullContent }}
                        />
                        
                        {/* Action Buttons */}
                        <div style={{ display: 'flex', gap: '12px', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid ' + (darkMode ? '#374151' : '#e5e7eb') }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              downloadPDF(article.id, article.slug, article.title, article.fullContent);
                            }}
                            disabled={pdfLoading[article.id]}
                            style={{
                              padding: '10px 20px',
                              background: 'linear-gradient(135deg, #2563eb, #9333ea)',
                              color: 'white',
                              border: 'none',
                              borderRadius: '8px',
                              cursor: pdfLoading[article.id] ? 'not-allowed' : 'pointer',
                              opacity: pdfLoading[article.id] ? 0.7 : 1,
                              fontSize: '14px',
                              fontWeight: '600'
                            }}
                          >
                            {pdfLoading[article.id] ? 'Opening...' : 'Download PDF'}
                          </button>
                          
                          <button
                            onClick={() => toggleArticle(article.id)}
                            style={{
                              padding: '10px 20px',
                              background: darkMode ? '#374151' : '#e5e7eb',
                              color: darkMode ? '#fff' : '#374151',
                              border: 'none',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              fontSize: '14px',
                              fontWeight: '600'
                            }}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Read More Button */}
                    {!isExpanded && (
                      <div style={{ padding: '0 20px 20px' }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleArticle(article.id);
                          }}
                          style={{
                            padding: '10px 20px',
                            background: 'linear-gradient(135deg, #2563eb, #9333ea)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '600'
                          }}
                        >
                          Read Article
                        </button>
                      </div>
                    )}
                  </article>
                );
              })
            )}
          </div>
        </main>

        {/* Footer */}
        <footer style={{ 
          borderTop: '1px solid ' + (darkMode ? '#374151' : '#e5e7eb'), 
          background: darkMode ? '#1f2937' : '#fff', 
          marginTop: '48px' 
        }}>
          <div style={{ maxWidth: '768px', margin: '0 auto', padding: '32px 16px', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ 
                width: '24px', 
                height: '24px', 
                background: 'linear-gradient(135deg, #2563eb, #9333ea)', 
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '12px'
              }}>C</div>
              <span style={{ fontWeight: '600' }}>ClawForge</span>
            </div>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>© {new Date().getFullYear()} ClawForge Systems</p>
          </div>
        </footer>
      </div>
    </>
  );
}