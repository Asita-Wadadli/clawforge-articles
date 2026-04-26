import Head from 'next/head';
import { useState, useEffect } from 'react';
import { fetchArticles } from '../lib/api';

// Full article content stored locally since Control Board only has excerpts
const articleContent = {
  '5-minute-invoice-hack-get-paid-3x-faster': `
    <h2>The Hidden Cost of Slow Invoicing</h2>
    <p>Every day you wait to send an invoice, your chances of getting paid drop by 5%. After 30 days, you're essentially giving out interest-free loans to your clients. This is the silent killer of cash flow that most small business owners ignore.</p>
    
    <h2>The 5-Minute Solution</h2>
    <p>ClawInvoice Pro automates your entire invoicing workflow:</p>
    <ul>
      <li><strong>Auto-generate invoices</strong> from completed work</li>
      <li><strong>Send payment reminders</strong> without lifting a finger</li>
      <li><strong>Track payment status</strong> in real-time</li>
      <li><strong>Accept online payments</strong> instantly</li>
    </ul>
    
    <h2>Real Results</h2>
    <p>Businesses using automated invoicing get paid 3x faster on average. That means if you currently wait 45 days to get paid, you could be receiving payment in just 15 days.</p>
    
    <h2>Start Today</h2>
    <p>Don't let another invoice sit unsent. Automate your billing and watch your cash flow transform.</p>
  `,
  'quote-process-costing-10k-month-ai-fix': `
    <h2>The $10K You're Leaving on the Table</h2>
    <p>Every hour you spend creating quotes is an hour you're not billing clients. If you create 10 quotes per week and each takes 30 minutes, that's 5 hours of lost revenue. At $100/hour, that's $500/week or $2,000/month in opportunity cost.</p>
    
    <h2>But That's Not the Real Cost</h2>
    <p>The bigger issue is delayed quotes = lost deals. When prospects wait 24-48 hours for a quote, they:</p>
    <ul>
      <li>Find competitors who respond faster</li>
      <li>Lose excitement about your solution</li>
      <li>Question your professionalism</li>
    </ul>
    
    <h2>The AI Fix</h2>
    <p>Instant Quote Engine Pro generates professional quotes in under 60 seconds:</p>
    <ul>
      <li>Templates for your most common services</li>
      <li>Auto-calculated pricing based on scope</li>
      <li>Professional branded PDF delivery</li>
      <li>Follow-up sequences for non-responders</li>
    </ul>
    
    <h2>Get Started</h2>
    <p>Stop losing deals to slow response times. Speed is the new competitive advantage.</p>
  `,
  'automated-80-percent-admin-work-30-days': `
    <h2>The Admin Work Trap</h2>
    <p>Most small business owners spend 40% of their time on administrative tasks. Data entry, email management, scheduling, follow-ups — these don't generate revenue but they consume your most valuable resource: time.</p>
    
    <h2>The 30-Day Transformation</h2>
    <p>Here's how to automate 80% of your admin work:</p>
    
    <h3>Week 1: Document Your Tasks</h3>
    <p>Track every administrative task you do for one week. Categorize them:</p>
    <ul>
      <li>Repetitive (same process every time)</li>
      <li>Rule-based (if X, then Y)</li>
      <li>Creative (requires human judgment)</li>
    </ul>
    
    <h3>Week 2-3: Automate the Repetitive</h3>
    <p>Use ClawForge Suite to automate:</p>
    <ul>
      <li>Email responses to common questions</li>
      <li>Data entry between apps</li>
      <li>Appointment scheduling</li>
      <li>Invoice generation</li>
    </ul>
    
    <h3>Week 4: Optimize and Scale</h3>
    <p>Fine-tune your automations and reclaim 20+ hours per week.</p>
  `,
  'ai-chatbots-dead-whats-replacing-them-2026': `
    <h2>Why Chatbots Failed</h2>
    <p>Traditional chatbots were rigid, frustrating, and couldn't handle complex conversations. Customers hated them, and businesses saw them as a necessary evil.</p>
    
    <h2>Enter AI Avatars</h2>
    <p>The next generation of conversational AI uses:</p>
    <ul>
      <li><strong>Natural language understanding</strong> — No more scripted responses</li>
      <li><strong>Visual presence</strong> — Human-like avatars build trust</li>
      <li><strong>Emotional intelligence</strong> — Detects customer sentiment</li>
      <li><strong>Continuous learning</strong> — Gets better with every interaction</li>
    </ul>
    
    <h2>Use Cases</h2>
    <p>AI avatars are revolutionizing:</p>
    <ul>
      <li>Customer service (24/7 availability)</li>
      <li>Sales consultations (qualify leads automatically)</li>
      <li>Training and onboarding (personalized guidance)</li>
      <li>Healthcare triage (initial assessments)</li>
    </ul>
    
    <h2>The Future is Here</h2>
    <p>Don't get left behind with outdated chatbot technology. Upgrade to AI avatars and deliver the experience your customers expect.</p>
  `,
  '47-dollar-tool-eliminated-2000-virtual-assistant': `
    <h2>The $24,000 Question</h2>
    <p>I was paying $2,000/month for a virtual assistant to handle my email, scheduling, and data entry. That's $24,000 per year — my second-largest expense after rent.</p>
    
    <h2>The Breaking Point</h2>
    <p>My VA was great, but the costs were unsustainable. I needed a solution that could:</p>
    <ul>
      <li>Handle routine tasks without supervision</li>
      <li>Work 24/7 without breaks</li>
      <li>Scale as my business grew</li>
      <li>Cost less than $100/month</li>
    </ul>
    
    <h2>The $47 Solution</h2>
    <p>I built a custom automation system using ClawForge Suite that handles:</p>
    <ul>
      <li>Email triage and auto-responses</li>
      <li>Calendar management</li>
      <li>CRM updates</li>
      <li>Invoice generation</li>
      <li>Follow-up sequences</li>
    </ul>
    
    <h2>12 Months Later</h2>
    <p>I've saved $24,000 and my "digital assistant" never calls in sick, never takes vacation, and works while I sleep.</p>
  `,
  '7-ai-automation-tools-every-small-business-needs-2026': `
    <h2>The AI Advantage</h2>
    <p>Small businesses that leverage AI automation are growing 3x faster than those that don't. Here are the 7 tools you need to stay competitive:</p>
    
    <h2>1. Instant Quote Engine Pro</h2>
    <p>Generate professional quotes in 60 seconds. Never lose a deal to slow response times again.</p>
    
    <h2>2. ClawInvoice Pro</h2>
    <p>Automated invoicing that gets you paid 3x faster. Includes payment reminders and online payment processing.</p>
    
    <h2>3. AI Email Assistant</h2>
    <p>Auto-respond to common inquiries, triage important emails, and draft responses in your voice.</p>
    
    <h2>4. Smart Scheduler</h2>
    <p>Eliminate back-and-forth emails. Let clients book directly on your calendar with automatic timezone handling.</p>
    
    <h2>5. CRM Automation</h2>
    <p>Never let a lead fall through the cracks. Automatic follow-ups, task creation, and deal progression.</p>
    
    <h2>6. Document Generator</h2>
    <p>Create contracts, proposals, and reports automatically from templates. Just fill in the variables.</p>
    
    <h2>7. Analytics Dashboard</h2>
    <p>Real-time insights into your business metrics. Know your numbers without manual reporting.</p>
    
    <h2>Start Your Transformation</h2>
    <p>These 7 tools can save you 20+ hours per week. What will you do with that time?</p>
  `,
  'automated-payment-follow-up-system': `
    <h2>The Payment Chase</h2>
    <p>Chasing unpaid invoices is the worst part of running a business. It's awkward, time-consuming, and kills your cash flow. Yet 67% of small businesses struggle with late payments.</p>
    
    <h2>The Automated Solution</h2>
    <p>ClawInvoice Pro's automated follow-up system:</p>
    <ul>
      <li><strong>Day 1:</strong> Friendly reminder email</li>
      <li><strong>Day 7:</strong> Second reminder with payment link</li>
      <li><strong>Day 14:</strong> Phone call reminder email</li>
      <li><strong>Day 21:</strong> Final notice with late fee warning</li>
    </ul>
    
    <h2>The Psychology</h2>
    <p>Automated reminders are more effective because:</p>
    <ul>
      <li>They're consistent (never forget to follow up)</li>
      <li>They're professional (no emotional tone)</li>
      <li>They're persistent (most payments come after the 3rd reminder)</li>
    </ul>
    
    <h2>Results</h2>
    <p>Businesses using automated follow-ups recover 40% more revenue and save 10+ hours per week.</p>
    
    <h2>Stop Chasing, Start Automating</h2>
    <p>Your time is too valuable to spend chasing payments. Let automation do it for you.</p>
  `
};

export async function getStaticProps() {
  const articles = await fetchArticles();
  
  // Merge local content with API data
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      // Generate PDF from content using browser print to PDF
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
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
            body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 800px; margin: 40px auto; padding: 20px; }
            h1 { font-size: 28px; font-weight: 700; margin-bottom: 20px; color: #111; }
            h2 { font-size: 20px; font-weight: 600; margin-top: 30px; margin-bottom: 15px; color: #2563eb; }
            h3 { font-size: 16px; font-weight: 600; margin-top: 20px; margin-bottom: 10px; }
            p { margin-bottom: 15px; }
            ul { margin-bottom: 15px; padding-left: 25px; }
            li { margin-bottom: 8px; }
            strong { color: #2563eb; }
            .header { border-bottom: 3px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
            .logo { font-size: 24px; font-weight: 700; color: #2563eb; }
            .footer { margin-top: 50px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">☀️ ClawForge</div>
          </div>
          <h1>${title}</h1>
          ${content}
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
      setPdfLoading(prev => ({ ...prev, [articleId]: false }));
    }
  };

  return (
    <>
      <Head>
        <title>Blog — ClawForge</title>
        <meta name="description" content="Thoughts on automation, AI, and building efficient business systems." />
        <link rel="canonical" href="https://clawforge-article-site.vercel.app" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
        {/* Navigation - Fixed Mobile */}
        <nav className="border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-50 shadow-sm">
          <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
            <a href="https://hemisphere-claw-agency.vercel.app" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white text-sm font-bold">C</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white">ClawForge</span>
            </a>
            
            {/* Desktop Nav */}
            <div className="hidden sm:flex items-center gap-6">
              <a href="/" className="text-sm font-semibold text-blue-600 dark:text-blue-400">Blog</a>
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
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
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
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-blue-600 text-white"
                aria-label="Toggle menu"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg">
              <div className="px-4 py-3 space-y-1">
                <a href="/" className="block py-2 px-3 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg">Blog</a>
                <a href="https://hemisphere-claw-agency.vercel.app" className="block py-2 px-3 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">Home</a>
              </div>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
          {/* Header */}
          <header className="mb-8 sm:mb-12 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Blog
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed">
              Thoughts on automation, AI, and building efficient business systems. 
              {articles.length > 0 && (
                <span className="text-blue-600 dark:text-blue-400 font-medium"> {articles.length} articles</span>
              )}
            </p>
          </header>

          {/* Articles List */}
          <div className="space-y-4">
            {articles.length === 0 ? (
              <p className="py-8 text-gray-500 dark:text-gray-500 text-center">No articles yet. Check back soon.</p>
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
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {/* Article Header - Always Visible */}
                    <div 
                      className="p-4 sm:p-6 cursor-pointer"
                      onClick={() => toggleArticle(article.id)}
                    >
                      <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 leading-snug">
                        {article.title}
                      </h2>
                      
                      {!isExpanded && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                          {article.excerpt}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
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
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div style={{ background: darkMode ? '#1f2937' : '#f3f4f6', padding: '20px', borderTop: '1px solid ' + (darkMode ? '#374151' : '#e5e7eb') }}>
                        <div 
                          style={{ lineHeight: 1.7 }}
                          dangerouslySetInnerHTML={{ __html: article.fullContent }}
                        />
                        
                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                          {/* PDF Download Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              downloadPDF(article.id, article.slug, article.title, article.fullContent);
                            }}
                            disabled={pdfLoading[article.id]}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-semibold shadow-md hover:shadow-lg"
                          >
                            {pdfLoading[article.id] ? (
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
                          
                          {/* Close Button */}
                          <button
                            onClick={() => toggleArticle(article.id)}
                            className="inline-flex items-center gap-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                            Close
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Read More Button (when collapsed) */}
                    {!isExpanded && (
                      <div style={{ padding: '0 16px 16px' }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleArticle(article.id);
                          }}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '8px 16px',
                            fontSize: '13px',
                            fontWeight: '600',
                            color: 'white',
                            background: 'linear-gradient(135deg, #2563eb, #9333ea)',
                            border: 'none',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                          }}
                        >
                          Read Article
                          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
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
        <footer className="border-t border-gray-200 dark:border-gray-700 mt-12 sm:mt-20 bg-white dark:bg-gray-900">
          <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">C</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">ClawForge</span>
              </div>
              <div className="flex items-center gap-4">
                <a href="https://hemisphere-claw-agency.vercel.app" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Website</a>
                <a href="https://github.com/Asita-Wadadli" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">GitHub</a>
              </div>
            </div>
            <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">
              © {new Date().getFullYear()} ClawForge Systems. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}