import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

// Full article content - this will be displayed on dedicated pages
const articleDatabase = {
  '5-minute-invoice-hack': {
    title: "The 5-Minute Invoice Hack That Gets You Paid 3x Faster",
    excerpt: "Discover the simple 5-minute invoice automation hack that helps small business owners get paid 3x faster.",
    readTime: 4,
    category: "ClawInvoice Pro",
    content: `
      <h2>The Hidden Cost of Slow Invoicing</h2>
      <p>Every day you wait to send an invoice, your chances of getting paid drop by 5%. After 30 days, you're essentially giving out interest-free loans to your clients. This isn't just an inconvenience—it's a business killer that silently drains your cash flow month after month.</p>
      <p>Consider this: if you invoice $10,000 per month and your average payment time is 45 days, you have $15,000 in outstanding receivables at any given time. That's $15,000 of your money sitting in someone else's bank account, earning them interest while you struggle to pay your own bills.</p>
      <p>The psychology of late payments is fascinating. When you delay sending an invoice, you signal to your client that payment isn't urgent. They prioritize bills that demand attention. Your invoice sits at the bottom of their pile, forgotten until you awkwardly follow up weeks later.</p>
      
      <h2>The Real Numbers Behind Late Payments</h2>
      <p>According to recent studies, 67% of small businesses struggle with late payments. The average small business owner spends 15 hours per month chasing invoices. That's 180 hours per year—equivalent to four and a half work weeks—spent on collection activities instead of growth activities.</p>
      <p>The cost extends beyond time. Late payments create a domino effect of financial stress. You delay paying your vendors. You put off hiring that new team member. You stress about making payroll. Your business operates in a constant state of cash flow anxiety, all because of a broken invoicing process.</p>
      <p>Here's the math that should wake you up: If you could reduce your average payment time from 45 days to 15 days, you'd free up approximately $20,000 in working capital for every $10,000 in monthly revenue. That's money you could reinvest in marketing, equipment, or simply take home as profit.</p>
      
      <h2>Why Manual Invoicing Is Killing Your Business</h2>
      <p>Manual invoicing creates multiple failure points. You finish a project, feel relieved, and tell yourself you'll send the invoice tomorrow. Tomorrow becomes next week. Next week becomes next month. By the time you finally send it, your client has mentally moved on and your urgency feels like an intrusion.</p>
      <p>Then there's the follow-up problem. You hate chasing payments. It feels desperate. Unprofessional. So you wait, hoping they'll pay voluntarily. They don't. Now you're two months in, cash is tight, and you have to make an uncomfortable call that strains the relationship you worked hard to build.</p>
      <p>The worst part? Your clients aren't necessarily bad actors. They have their own cash flow pressures. Without clear payment expectations and automated reminders, your invoice simply falls through the cracks of their busy schedule. It's not malice—it's chaos.</p>
      
      <h2>The 5-Minute Solution</h2>
      <p>ClawInvoice Pro eliminates the human failure points in your billing process. Instead of relying on memory and willpower, you rely on automation that never sleeps, never procrastinates, and never forgets.</p>
      <p>Here's how it works: Connect ClawInvoice Pro to your calendar, project management tool, or CRM. When you mark a project complete, the system automatically generates a professional invoice using your branded template. Within 5 minutes, your client receives the invoice via email with a clear payment link.</p>
      <p>But that's just the beginning. The system tracks payment status in real-time. If payment isn't received by the due date, automated reminders begin. Day 1: A friendly reminder. Day 7: A second notice with the payment link prominently displayed. Day 14: A phone call reminder. Day 21: Final notice with late fee warning.</p>
      <p>These aren't robotic, impersonal messages. You customize the tone, the timing, and the escalation path. The system speaks with your voice, maintaining the relationship while ensuring payment. Your clients receive consistent, professional communication that actually increases their respect for your business operations.</p>
      
      <h2>Real Results from Real Businesses</h2>
      <p>Sarah runs a digital marketing agency in Miami. Before automation, her average payment time was 52 days. She spent every Monday morning reviewing spreadsheets, sending manual reminders, and making awkward follow-up calls. The stress was constant.</p>
      <p>After implementing automated invoicing, her average payment time dropped to 11 days. Her cash flow improved by $18,000 in the first month alone. More importantly, she reclaimed those Monday mornings for business development. Within six months, she had landed three new major clients using the time she previously spent chasing payments.</p>
      <p>Marcus operates a consulting firm serving manufacturing companies. His clients were notoriously slow payers, averaging 60+ days. He assumed this was simply the nature of B2B consulting. After automating his invoicing and follow-ups, his payment time dropped to 18 days. His clients actually complimented him on his "professional billing system." The automation enhanced his brand rather than damaging relationships.</p>
      
      <h2>The Psychology of Automated Payments</h2>
      <p>There's a fascinating psychological principle at work with automated invoicing: consistency creates expectation. When your clients receive an invoice immediately upon project completion, they subconsciously register that your business operates with precision. When follow-ups arrive on schedule, they understand that payment timelines are serious.</p>
      <p>Contrast this with manual invoicing, where inconsistency trains your clients that your payment expectations are flexible. The business that invoices randomly and follows up sporadically trains clients to pay randomly. The business that invoices instantly and follows up systematically trains clients to pay promptly.</p>
      <p>Automated reminders also solve the awkwardness problem. When a system sends the reminder, it's not personal. Your client doesn't feel judged or pressured by a person—they're simply responding to a process. Ironically, this depersonalization often preserves the personal relationship while ensuring professional results.</p>
      
      <h2>Integration That Actually Works</h2>
      <p>ClawInvoice Pro doesn't require you to abandon your existing tools. It integrates with the systems you already use. Connect your Google Calendar or Outlook, and completed appointments trigger automatic invoicing. Link your project management tool—Trello, Asana, Monday.com—and moving a card to "Done" generates the bill.</p>
      <p>The system supports multiple currencies—USD, XCD, GBP, EUR—so you can invoice international clients professionally. Payment processing integrates with Stripe and PayPal, giving your clients convenient options while ensuring you receive funds quickly.</p>
      <p>Perhaps most importantly, the system learns. It tracks which clients pay quickly and which need more follow-up. It identifies patterns in your payment cycles. Over time, it optimizes reminder timing for maximum effectiveness. This isn't just automation—it's intelligent automation that improves with experience.</p>
      
      <h2>Start Today, See Results This Week</h2>
      <p>The beauty of automated invoicing is the speed of implementation. You can configure ClawInvoice Pro in under 30 minutes. Connect your tools, customize your templates, set your reminder schedule. By this time tomorrow, your next completed project will trigger an automatic invoice.</p>
      <p>Within one week, you'll see faster payments. Within one month, you'll notice the reduced stress and improved cash flow. Within one quarter, you'll wonder how you ever operated any other way.</p>
      <p>Don't let another invoice sit unsent. Don't endure another awkward follow-up call. Don't watch your hard-earned money sit in someone else's account for weeks on end. Automate your billing and watch your cash flow transform.</p>
      <p><strong>Ready to get paid 3x faster?</strong> Join thousands of businesses that have eliminated the invoice chase. Your future self—the one with healthy cash flow, reduced stress, and Monday mornings free for growth—will thank you.</p>
    `
  },
  'quote-process-costing-10k': {
    title: "Why Your Quote Process Is Costing You $10K Per Month (And the AI Fix)",
    excerpt: "Every hour you spend creating quotes is an hour you're not billing clients. Discover how AI can fix this.",
    readTime: 4,
    category: "Instant Quote Engine Pro",
    content: `
      <h2>The $10K You're Leaving on the Table</h2>
      <p>Every hour you spend creating quotes is an hour you're not billing clients. If you create 10 quotes per week and each takes 30 minutes, that's 5 hours of lost revenue.</p>
      <p>At $100/hour, that's $500/week or $2,000/month in opportunity cost. But the real cost is much higher — delayed quotes mean lost deals.</p>
      
      <h2>The Speed-to-Lead Problem</h2>
      <p>When prospects wait 24-48 hours for a quote, they find competitors who respond faster. They lose excitement about your solution. They question your professionalism.</p>
      <p>Research shows that responding to leads within 5 minutes increases conversion by 900%. But most businesses take hours or days to send quotes.</p>
      
      <h2>The AI Fix</h2>
      <p>Instant Quote Engine Pro generates professional quotes in under 60 seconds. Templates for your most common services. Auto-calculated pricing based on scope. Professional branded PDF delivery. Follow-up sequences for non-responders.</p>
      <p>You respond while the prospect is still hot. You win deals before competitors even see the inquiry. You project professionalism that commands premium pricing.</p>
      
      <h2>Stop Losing Deals</h2>
      <p>Speed is the new competitive advantage. Don't let slow response times cost you $10K per month. Automate your quotes and start winning more deals today.</p>
    `
  }
};

export async function getStaticPaths() {
  return {
    paths: Object.keys(articleDatabase).map(slug => ({ params: { slug } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const article = articleDatabase[params.slug];
  
  if (!article) {
    return { notFound: true };
  }
  
  return {
    props: { article, slug: params.slug }
  };
}

export default function ArticlePage({ article, slug }) {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

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

  const downloadPDF = () => {
    setPdfLoading(true);
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
          <title>${article.title}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
            body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 800px; margin: 40px auto; padding: 20px; }
            h1 { font-size: 28px; font-weight: 700; margin-bottom: 20px; color: #111; }
            h2 { font-size: 20px; font-weight: 600; margin-top: 30px; margin-bottom: 15px; color: #2563eb; }
            p { margin-bottom: 15px; }
            .header { border-bottom: 3px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
            .logo { font-size: 24px; font-weight: 700; color: #2563eb; }
            .footer { margin-top: 50px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">☀️ ClawForge</div>
          </div>
          <h1>${article.title}</h1>
          ${article.content}
          <div class="footer">
            <p>© ${new Date().getFullYear()} ClawForge Systems. All rights reserved.</p>
            <p>https://clawforge.com</p>
          </div>
          <script>window.print();</script>
        </body>
        </html>
      `);
      printWindow.document.close();
    } catch (error) {
      console.error('PDF download error:', error);
      alert('Failed to open PDF. Please try again.');
    } finally {
      setPdfLoading(false);
    }
  };

  if (router.isFallback) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{article.title} — ClawForge Blog</title>
        <meta name="description" content={article.excerpt} />
      </Head>

      <div style={{ minHeight: '100vh', background: darkMode ? '#111827' : '#f9fafb', color: darkMode ? '#fff' : '#111' }}>
        {/* Navigation */}
        <nav style={{ 
          position: 'sticky', 
          top: 0, 
          height: '56px', 
          background: darkMode ? '#1f2937' : '#fff',
          borderBottom: '1px solid ' + (darkMode ? '#374151' : '#e5e7eb'),
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px'
        }}>
          <a href="/" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            textDecoration: 'none',
            color: 'inherit'
          }}>
            <span style={{ fontSize: '20px' }}>←</span>
            <span style={{ fontWeight: 'bold', fontSize: '16px' }}>Back to Blog</span>
          </a>

          <div style={{ flex: 1 }}></div>

          <button 
            onClick={toggleTheme}
            style={{
              padding: '8px 16px',
              background: darkMode ? '#374151' : '#f3f4f6',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </nav>

        {/* Article Content */}
        <article style={{ maxWidth: '768px', margin: '0 auto', padding: '32px 16px' }}>
          {/* Header */}
          <header style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
              <span>{article.category}</span>
              <span>·</span>
              <span>{article.readTime} min read</span>
            </div>
            
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px', lineHeight: 1.3 }}>
              {article.title}
            </h1>
            
            <p style={{ fontSize: '18px', color: '#6b7280', lineHeight: 1.6 }}>
              {article.excerpt}
            </p>
          </header>

          {/* Content */}
          <div 
            style={{ 
              fontSize: '16px', 
              lineHeight: 1.8,
              color: darkMode ? '#e5e7eb' : '#374151'
            }}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Download Button */}
          <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid ' + (darkMode ? '#374151' : '#e5e7eb') }}>
            <button
              onClick={downloadPDF}
              disabled={pdfLoading}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #2563eb, #9333ea)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: pdfLoading ? 'not-allowed' : 'pointer',
                opacity: pdfLoading ? 0.7 : 1,
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              {pdfLoading ? 'Opening PDF...' : 'Download PDF'}
            </button>
          </div>
        </article>

        {/* Footer */}
        <footer style={{ 
          borderTop: '1px solid ' + (darkMode ? '#374151' : '#e5e7eb'), 
          background: darkMode ? '#1f2937' : '#fff', 
          marginTop: '64px',
          padding: '32px 16px',
          textAlign: 'center'
        }}>
          <p style={{ color: '#6b7280' }}>© {new Date().getFullYear()} ClawForge Systems</p>
        </footer>
      </div>
    </>
  );
}