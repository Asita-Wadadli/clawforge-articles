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
      <h2>Why Most Invoices Never Get Paid on Time</h2>
      <p>Let me be brutally honest with you. If you're still creating invoices manually, you're leaving money on the table. Not just a little money—a LOT of money. Studies show that 82% of small businesses fail due to cash flow problems, and the #1 cause of cash flow problems is late payments.</p>
      <p>Here's the kicker: It's not that your clients don't want to pay you. It's that you're making it too hard for them to do so. You're creating friction at every step of the process, and friction kills conversions.</p>
      <p>But today, I'm going to show you a <strong>5-minute invoice hack</strong> that will change everything. This isn't theory. This is a simple, actionable change you can make today that will get you paid up to <strong>3x faster</strong>.</p>
      
      <h2>The 5-Minute Invoice Hack Explained</h2>
      <p>Here's the hack in its simplest form: <strong>Automate your invoice follow-up sequence before you even send the first invoice.</strong></p>
      <p><strong>Step 1:</strong> Create a professional invoice template that builds trust.<br>
      <strong>Step 2:</strong> Include multiple payment options.<br>
      <strong>Step 3:</strong> Set up automated payment reminders.<br>
      <strong>Step 4:</strong> Add late fees automatically.<br>
      <strong>Step 5:</strong> Make it mobile-friendly.</p>
      <p>This entire system takes less than 5 minutes to set up once, and then it runs on autopilot forever.</p>
      
      <h2>Why This Works: The Data Doesn't Lie</h2>
      <p>• Invoices with automated reminders get paid <strong>35% faster</strong> on average<br>
      • Invoices sent with online payment options are paid <strong>2x faster</strong><br>
      • Businesses reduce their days sales outstanding by <strong>15-25 days</strong></p>
      
      <h2>Introducing ClawInvoice Pro</h2>
      <p>Everything I just described—the automated reminders, the multiple payment options, the professional templates—you could try to piece this together with spreadsheets and calendar reminders.</p>
      <p>Or you could just use <strong>ClawInvoice Pro</strong>. It was built specifically for small business owners who are tired of the invoicing headache.</p>
      <p><strong>Get ClawInvoice Pro today and start getting paid 3x faster.</strong></p>
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
      <p>When prospects wait 24-48 hours for a quote, they find competitors who respond faster. They lose excitement about your solution.</p>
      <p><strong>Industry data shows that 35% of prospects who request quotes go with the FIRST business that responds.</strong> Not the cheapest. Not the best. The fastest.</p>
      
      <h2>The AI Fix: Instant Quote Automation</h2>
      <p>You don't need to hire a team working around the clock. You need <strong>Instant Quote Engine Pro</strong>.</p>
      <p>• Responds in under 60 seconds<br>
      • Handles complex pricing logic<br>
      • Works 24/7/365<br>
      • Captures leads while they're hot</p>
      
      <h2>Real Numbers</h2>
      <p>Implement instant quoting and you could double your conversion rate. At $2,000 average value per customer, that's an additional <strong>$20,000 per month in revenue.</strong></p>
      <p><strong>Get Instant Quote Engine Pro today and stop losing deals to slow response times.</strong></p>
    `
  },
  'automated-80-percent-admin': {
    title: "How I Automated 80% of My Admin Work in 30 Days (Without Hiring)",
    excerpt: "Most business owners spend 40% of their time on admin tasks. Learn the 30-day transformation that reclaims 20+ hours per week.",
    readTime: 5,
    category: "ClawForge Suite",
    content: `
      <h2>The Admin Trap That's Killing Your Business</h2>
      <p>It's 6 PM. You've been "working" since 8 AM. But you didn't do a single thing that actually grows your business. You answered emails, sent invoices, chased payments—but nothing that moves the needle.</p>
      <p>Studies show that <strong>small business owners spend an average of 40% of their time on administrative tasks</strong>. That's 16 hours per week consumed by work that doesn't generate revenue.</p>
      
      <h2>The 30-Day Automation Transformation</h2>
      <p><strong>Week 1:</strong> Invoice automation with ClawInvoice Pro. Time dropped from 6-8 hours to 30 minutes per week.</p>
      <p><strong>Week 2:</strong> Quote automation with Instant Quote Engine Pro. Time dropped from 7-10 hours to under 1 hour per week.</p>
      <p><strong>Week 3:</strong> Email automation. Time dropped from 15+ hours to 3-4 hours per week.</p>
      <p><strong>Week 4:</strong> Integration and optimization.</p>
      
      <h2>The Numbers Don't Lie</h2>
      <p><strong>Before:</strong> 28-33 hours/week on admin (70% of work time)<br>
      <strong>After:</strong> 5.5 hours/week on admin (14% of work time)<br>
      <strong>Result:</strong> Reclaimed 22+ hours per week</p>
      
      <h2>What I Did With The Extra Time</h2>
      <p>• Doubled content output, attracting 3x more leads<br>
      • Launched a new service adding $8K/month<br>
      • Actually took weekends off</p>
      
      <h2>Get Started Today</h2>
      <p>The <strong>ClawForge Business Suite</strong> includes everything you need. Each tool takes less than 30 minutes to set up.</p>
      <p><strong>Get the ClawForge Business Suite today and start your 30-day automation transformation.</strong></p>
    `
  },
  'ai-chatbots-dead': {
    title: "AI Chatbots Are Dead—Here's What's Replacing Them in 2026",
    excerpt: "Traditional chatbots failed because they were rigid and frustrating. Discover how AI avatars are revolutionizing customer service.",
    readTime: 4,
    category: "AI Avatar Pack",
    content: `
      <h2>Let's Be Brutally Honest</h2>
      <p>Those clunky, robotic chatbots you've been using? They're dead. Buried. Gone. And good riddance.</p>
      <p>We're in 2026 now. If you're still relying on traditional AI chatbots, you're using a flip phone in the smartphone era.</p>
      
      <h2>Why Traditional Bots Failed</h2>
      <p>Traditional chatbots were built on decision trees and keyword matching. They could handle exactly what they were programmed to handle—and nothing more.</p>
      <p>Customers caught on fast. They learned to work around chatbots, hammering "0" to reach a human.</p>
      
      <h2>Enter AI Avatars</h2>
      <p>AI Avatars aren't just an upgrade—they're a complete paradigm shift. Visual, voice-capable, emotionally intelligent digital beings.</p>
      <p>• <strong>Visual Presence:</strong> Lifelike digital representatives with facial expressions<br>
      • <strong>Voice Intelligence:</strong> Natural cadence, emotion, and personality<br>
      • <strong>Contextual Understanding:</strong> Understands nuance, slang, and intent<br>
      • <strong>Brand Consistency:</strong> Same face, voice, and personality every time</p>
      
      <h2>The Business Case</h2>
      <p>Companies switching to AI Avatars see:<br>
      • 3-5x higher engagement rates<br>
      • 40-60% increase in conversion<br>
      • 70% reduction in support tickets</p>
      
      <h2>Introducing ClawCast AI Avatar Pack</h2>
      <p>Create, customize, and deploy AI Avatars in minutes—not months. No coding required.</p>
      <p><strong>Get ClawCast AI Avatar Pack today and deploy your first AI Avatar in under 30 minutes.</strong></p>
    `
  },
  '47-dollar-tool-eliminated-2000-va': {
    title: "The $47 Tool That Eliminated My $2,000/Month Virtual Assistant",
    excerpt: "I was paying $24,000/year for a VA until I built an automation system that handles 80% of the work.",
    readTime: 4,
    category: "ClawForge Suite",
    content: `
      <h2>The $24,000 Question</h2>
      <p>I was paying $2,000 per month for a virtual assistant. That's $24,000 per year. She was great—reliable, competent, hardworking.</p>
      <p>But then I realized: <strong>80% of what she was doing could be automated.</strong> Data entry. Email sorting. Appointment scheduling. Invoice creation.</p>
      
      <h2>The Automation Audit</h2>
      <p>I tracked her work for a week:<br>
      • Monday: 3 hours on routine emails<br>
      • Tuesday: 4 hours on invoices and payments<br>
      • Wednesday: 2 hours scheduling appointments<br>
      • Thursday: 3 hours generating quotes<br>
      • Friday: 2 hours on spreadsheets</p>
      <p>Total: 14 hours per week on purely transactional tasks.</p>
      
      <h2>The $47 Solution</h2>
      <p>I found the <strong>ClawForge Business Suite</strong>. For $47/month:</p>
      <p>• ClawInvoice Pro — Automated invoicing<br>
      • Instant Quote Engine Pro — Instant quotes<br>
      • AI Avatar Pack — Automated communication</p>
      <p>That's $564/year instead of $24,000.</p>
      
      <h2>The Results</h2>
      <p><strong>Before:</strong> $34,000/year total admin costs<br>
      <strong>After:</strong> $15,000/year total admin costs<br>
      <strong>Savings:</strong> $19,000+ annually</p>
      
      <h2>The New Arrangement</h2>
      <p>My VA now works 20 hours/week from home, focusing on high-value work: building client relationships, creating content, and handling complex issues. Her hourly rate effectively doubled.</p>
      
      <h2>Your Turn</h2>
      <p><strong>Get the ClawForge Business Suite today.</strong> Automate your admin work. Reclaim your time. Redirect your human resources to high-value work.</p>
    `
  },
  '7-ai-automation-tools': {
    title: "7 AI Automation Tools Every Small Business Needs in 2026",
    excerpt: "Small businesses using AI automation grow 3x faster. Discover the 7 essential tools that can save you 20+ hours per week.",
    readTime: 5,
    category: "ClawForge Suite",
    content: `
      <h2>The Automation Advantage</h2>
      <p>Here's a stat that should wake you up: <strong>Small businesses using AI automation grow 3x faster than those that don't.</strong></p>
      <p>Not 10% faster. 3x faster.</p>
      
      <h2>1. Automated Invoicing: ClawInvoice Pro</h2>
      <p>• Instant invoice generation<br>
      • Automated payment reminders<br>
      • Late fee automation<br>
      • Multiple payment options<br>
      <strong>Time saved: 5-8 hours/week</strong></p>
      
      <h2>2. Instant Quote Generation: Instant Quote Engine Pro</h2>
      <p>• Professional quotes in under 60 seconds<br>
      • Complex pricing logic<br>
      • Works 24/7/365<br>
      <strong>Time saved: 4-6 hours/week + 2-3x higher conversion</strong></p>
      
      <h2>3. AI Customer Communication: AI Avatar Pack</h2>
      <p>• Visual, voice-capable digital representatives<br>
      • Natural language understanding<br>
      • 24/7 customer service<br>
      <strong>Time saved: 6-10 hours/week</strong></p>
      
      <h2>4-7. Additional Tools</h2>
      <p>Email automation, appointment scheduling, document automation, and social media automation can save an additional 10-15 hours per week.</p>
      
      <h2>Total Transformation</h2>
      <p><strong>Total time saved: 28-44 hours per week</strong></p>
      <p>That's nearly a full-time employee's worth of work, automated.</p>
      
      <h2>The ClawForge Advantage</h2>
      <p>Tools #1, #2, and #3 are all included in the <strong>ClawForge Business Suite</strong> for $47/month.</p>
      <p><strong>Get the ClawForge Business Suite today.</strong></p>
    `
  },
  'automated-payment-follow-up': {
    title: "Stop Chasing Payments: The Automated Follow-Up System That Actually Works",
    excerpt: "Chasing invoices is awkward and kills cash flow. Learn how automated follow-ups recover 40% more revenue while saving 10+ hours per week.",
    readTime: 4,
    category: "ClawInvoice Pro",
    content: `
      <h2>The Hidden Cost of Manual Payment Chasing</h2>
      <p>Every hour you spend chasing unpaid invoices is an hour you're NOT spending on growing your business. The average small business owner spends <strong>10-15 hours per week</strong> on invoicing and payment follow-ups.</p>
      <p>Nobody likes being the "bad guy." Asking for money feels uncomfortable, so many entrepreneurs avoid it altogether.</p>
      
      <h2>Why Automated Follow-Up Changes Everything</h2>
      <p>Most late payments aren't malicious. They're simply busy people who forgot. <strong>A simple, well-timed reminder often gets you paid within 24-48 hours.</strong></p>
      
      <h2>The Winning Follow-Up Sequence</h2>
      <p><strong>3 days before due:</strong> Friendly heads-up<br>
      <strong>Day of:</strong> Professional notice<br>
      <strong>3 days past:</strong> First follow-up<br>
      <strong>7 days past:</strong> Second follow-up<br>
      <strong>14 days past:</strong> Final notice</p>
      <p><strong>80% of late payments get resolved in the first two follow-ups.</strong></p>
      
      <h2>Introducing ClawInvoice Pro</h2>
      <p>• Smart scheduling for perfect timing<br>
      • Customizable templates<br>
      • Multi-channel follow-up (email + SMS)<br>
      • Payment integration<br>
      • Full visibility dashboard</p>
      
      <h2>The ROI</h2>
      <p>If automated follow-up helps you collect on just 3 invoices per month that would have gone unpaid, at $1,000 each, that's <strong>$3,000 in recovered revenue.</strong></p>
      <p><strong>Get ClawInvoice Pro today and stop chasing payments forever.</strong></p>
    `
  },
  'from-chaos-to-cash-flow': {
    title: "From Chaos to Cash Flow: A Small Business Automation Success Story",
    excerpt: "How one entrepreneur transformed their chaotic business operations into a streamlined cash flow machine using the ClawForge Business Suite.",
    readTime: 5,
    category: "ClawForge Suite",
    content: `
      <h2>The Breaking Point</h2>
      <p>It was 11 PM on a Tuesday. I was still at my desk, surrounded by coffee cups, chasing yet another late payment, and wondering how I'd ended up here.</p>
      <p>My business was "successful" on paper. Revenue was growing. Clients were happy. But I was drowning in admin work, working 70-hour weeks, and barely making ends meet because of cash flow problems.</p>
      
      <h2>The Chaos</h2>
      <p>My daily reality looked like this:<br>
      • 20+ unanswered emails<br>
      • 5 invoices overdue by 30+ days<br>
      • 3 quote requests I hadn't responded to yet<br>
      • A calendar full of appointments I'd forgotten to confirm</p>
      <p>I was spending 60% of my time on admin and only 40% on actual revenue-generating work.</p>
      
      <h2>The Transformation</h2>
      <p>I discovered the <strong>ClawForge Business Suite</strong> and committed to a 30-day automation overhaul.</p>
      <p><strong>Week 1:</strong> Implemented ClawInvoice Pro. Invoices went from taking 2 hours to 10 minutes.</p>
      <p><strong>Week 2:</strong> Set up Instant Quote Engine Pro. Quotes now generate in 60 seconds.</p>
      <p><strong>Week 3:</strong> Deployed AI Avatar Pack for customer communication.</p>
      <p><strong>Week 4:</strong> Connected everything into a seamless workflow.</p>
      
      <h2>The Results After 90 Days</h2>
      <p>• <strong>Admin time:</strong> Dropped from 40 hours/week to 8 hours/week<br>
      • <strong>Average payment time:</strong> Went from 45 days to 12 days<br>
      • <strong>Quote conversion:</strong> Doubled from 20% to 40%<br>
      • <strong>Weekly hours:</strong> Cut from 70 to 45<br>
      • <strong>Monthly revenue:</strong> Increased by $15,000</p>
      
      <h2>The Cash Flow Machine</h2>
      <p>Today, my business runs like a well-oiled machine. Invoices go out automatically. Payments come in faster. Quotes convert higher. And I actually have time to think strategically about growth.</p>
      <p>But the best part? I sleep through the night. I take weekends off. I spend time with my family. The business serves me now—not the other way around.</p>
      
      <h2>Your Turn</h2>
      <p>If you're stuck in chaos, there's a way out. The tools exist. The roadmap is clear. You just need to take the first step.</p>
      <p><strong>Get the ClawForge Business Suite today and start your transformation from chaos to cash flow.</strong></p>
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
      
      printWindow.document.write(\`
        <!DOCTYPE html>
        <html>
        <head>
          <title>\${article.title}</title>
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
          <h1>\${article.title}</h1>
          \${article.content}
          <div class="footer">
            <p>© \${new Date().getFullYear()} ClawForge Systems. All rights reserved.</p>
            <p>https://clawforge.com</p>
          </div>
          <script>window.print();</script>
        </body>
        </html>
      \`);
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