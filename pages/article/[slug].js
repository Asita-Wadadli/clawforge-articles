import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { fetchArticleBySlug, fetchArticles } from '../../lib/api';

// Full article content
const articleContent = {
  '5-minute-invoice-hack-get-paid-3x-faster': `
    <h2>The Hidden Cost of Slow Invoicing</h2>
    <p>Every day you wait to send an invoice, your chances of getting paid drop by 5%. After 30 days, you're essentially giving out interest-free loans to your clients.</p>
    <h2>The 5-Minute Solution</h2>
    <p>ClawInvoice Pro automates your entire invoicing workflow: auto-generate invoices, send payment reminders, track payment status, and accept online payments instantly.</p>
    <h2>Real Results</h2>
    <p>Businesses using automated invoicing get paid 3x faster on average. That means if you currently wait 45 days to get paid, you could be receiving payment in just 15 days.</p>
  `,
  'quote-process-costing-10k-month-ai-fix': `
    <h2>The $10K You're Leaving on the Table</h2>
    <p>Every hour you spend creating quotes is an hour you're not billing clients. If you create 10 quotes per week and each takes 30 minutes, that's 5 hours of lost revenue.</p>
    <h2>The AI Fix</h2>
    <p>Instant Quote Engine Pro generates professional quotes in under 60 seconds with templates, auto-calculated pricing, branded PDF delivery, and follow-up sequences.</p>
  `,
  'automated-80-percent-admin-work-30-days': `
    <h2>The Admin Work Trap</h2>
    <p>Most small business owners spend 40% of their time on administrative tasks that don't generate revenue but consume your most valuable resource: time.</p>
    <h2>The 30-Day Transformation</h2>
    <p>Use ClawForge Suite to automate email responses, data entry, appointment scheduling, and invoice generation. Reclaim 20+ hours per week.</p>
  `,
  'ai-chatbots-dead-whats-replacing-them-2026': `
    <h2>Why Chatbots Failed</h2>
    <p>Traditional chatbots were rigid, frustrating, and couldn't handle complex conversations. Customers hated them.</p>
    <h2>Enter AI Avatars</h2>
    <p>The next generation uses natural language understanding, visual presence, emotional intelligence, and continuous learning.</p>
  `,
  '47-dollar-tool-eliminated-2000-virtual-assistant': `
    <h2>The $24,000 Question</h2>
    <p>I was paying $2,000/month for a virtual assistant. That's $24,000 per year — my second-largest expense.</p>
    <h2>The $47 Solution</h2>
    <p>I built a custom automation system using ClawForge Suite that handles email, calendar, CRM, invoices, and follow-ups.</p>
  `,
  '7-ai-automation-tools-every-small-business-needs-2026': `
    <h2>The AI Advantage</h2>
    <p>Small businesses that leverage AI automation are growing 3x faster than those that don't.</p>
    <h2>7 Essential Tools</h2>
    <p>Instant Quote Engine, ClawInvoice Pro, AI Email Assistant, Smart Scheduler, CRM Automation, Document Generator, and Analytics Dashboard.</p>
  `,
  'automated-payment-follow-up-system': `
    <h2>The Payment Chase</h2>
    <p>Chasing unpaid invoices is awkward, time-consuming, and kills cash flow. Yet 67% of small businesses struggle with late payments.</p>
    <h2>The Automated Solution</h2>
    <p>Automated reminders at day 1, 7, 14, and 21 recover 40% more revenue and save 10+ hours per week.</p>
  `
};

export async function getStaticPaths() {
  const articles = await fetchArticles();
  const paths = articles.map(article => ({
    params: { slug: article.slug }
  }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const article = await fetchArticleBySlug(params.slug);
  const allArticles = await fetchArticles();
  
  if (!article) {
    return { notFound: true };
  }
  
  const relatedArticles = allArticles
    .filter(a => a.id !== article.id)
    .slice(0, 3);
    
  return {
    props: { 
      article: {
        ...article,
        fullContent: articleContent[article.slug] || article.content || article.excerpt
      }, 
      relatedArticles 
    }
  };
}

export default function ArticlePage({ article, relatedArticles }) {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 800px; margin: 40px auto; padding: 20px; }
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
          ${article.fullContent}
          <div class="footer">
            <p>© ${new Date().getFullYear()} ClawForge Systems</p>
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
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Article Not Found</h1>
          <a href="/" className="text-blue-600 hover:text-blue-700">← Back to Blog</a>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <Head>
        <title>{article.title} — ClawForge Blog</title>
        <meta name="description" content={article.excerpt} />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Navigation - Fixed Mobile */}
        <nav className="border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md z-50 shadow-sm">
          <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
            <a href="https://hemisphere-claw-agency.vercel.app" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white text-sm font-bold">C</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white">ClawForge</span>
            </a>
            
            {/* Desktop Nav */}
            <div className="hidden sm:flex items-center gap-6">
              <a href="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Blog</a>
              <a href="https://hemisphere-claw-agency.vercel.app" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</a>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {darkMode ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                aria-label="Toggle menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg">
              <div className="px-4 py-3 space-y-1">
                <a href="/" className="block py-2 px-3 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">Blog</a>
                <a href="https://hemisphere-claw-agency.vercel.app" className="block py-2 px-3 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">Home</a>
              </div>
            </div>
          )}
        </nav>

        {/* Article */}
        <article className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
          {/* Back Link */}
          <a href="/" className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to blog
          </a>

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span>{formattedDate}</span>
              <span>·</span>
              <span>{article.readTime} min read</span>
              {article.category && (
                <>
                  <span>·</span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">{article.category}</span>
                </>
              )}
            </div>
          </header>

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sm:p-8">
            <div 
              className="prose prose-base dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-blue-600 dark:prose-h2:text-blue-400 prose-a:text-blue-600 dark:prose-a:text-blue-400"
              dangerouslySetInnerHTML={{ __html: article.fullContent }}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-8">
            <button
              onClick={downloadPDF}
              disabled={pdfLoading}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all text-sm font-semibold shadow-md"
            >
              {pdfLoading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Opening...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download PDF
                </>
              )}
            </button>
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
              <h2 className="text-lg font-bold mb-6">More articles</h2>
              <div className="space-y-4">
                {relatedArticles.map(related => (
                  <a 
                    key={related.id}
                    href={`/article/${related.slug}/`}
                    className="block p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{related.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{related.excerpt}</p>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">C</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">ClawForge</span>
              </div>
              <a href="https://hemisphere-claw-agency.vercel.app" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Website</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}