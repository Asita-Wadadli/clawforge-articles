// API utilities for fetching articles from Control Board
// Using placeholder data for now - will connect to Control Board API later

const placeholderArticles = [
  {
    id: '1',
    slug: 'future-of-automation-2024',
    title: 'The Future of Automation: Trends Shaping 2024 and Beyond',
    excerpt: 'Discover the key automation trends that will transform businesses in 2024. From AI-powered workflows to intelligent process automation, learn what\'s next.',
    content: `
      <p>The automation landscape is evolving at an unprecedented pace. As we move through 2024, businesses that embrace intelligent automation will gain significant competitive advantages.</p>
      
      <h2>The Rise of AI-Powered Automation</h2>
      <p>Artificial Intelligence is no longer just a buzzword—it's becoming the backbone of modern automation. From predictive analytics to natural language processing, AI is enabling automation systems to handle increasingly complex tasks with human-like understanding.</p>
      
      <h2>Hyperautomation Takes Center Stage</h2>
      <p>Gartner's concept of hyperautomation—combining multiple machine learning, packaged software, and automation tools to deliver work—is becoming reality. Organizations are moving beyond simple task automation to end-to-end process automation.</p>
      
      <h2>Key Trends to Watch</h2>
      <ul>
        <li><strong>Intelligent Document Processing:</strong> AI can now extract, understand, and process information from documents with near-human accuracy.</li>
        <li><strong>Low-Code/No-Code Platforms:</strong> Democratizing automation development, allowing business users to create workflows without IT dependency.</li>
        <li><strong>Process Mining:</strong> Using data to discover, validate, and improve workflows automatically.</li>
        <li><strong>Cloud-Native Automation:</strong> Scalable, flexible automation infrastructure that grows with your business.</li>
      </ul>
      
      <h2>Preparing Your Business</h2>
      <p>To capitalize on these trends, organizations should:</p>
      <ol>
        <li>Audit current processes to identify automation opportunities</li>
        <li>Invest in employee training and change management</li>
        <li>Start with pilot projects before scaling</li>
        <li>Choose scalable, integrable automation platforms</li>
      </ol>
      
      <blockquote>
        "The question is no longer whether to automate, but how quickly you can do it effectively."
      </blockquote>
      
      <h2>Conclusion</h2>
      <p>The future of automation is intelligent, integrated, and accessible. Businesses that start their automation journey now will be well-positioned to thrive in an increasingly competitive landscape.</p>
    `,
    heroImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=600&fit=crop',
    category: 'Automation',
    tags: ['automation', 'AI', 'trends', 'future', 'business'],
    publishedAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    readTime: 8,
    author: {
      name: 'Vance Joseph',
      avatar: null,
      bio: 'Founder of ClawForge. Building a more efficient Caribbean through automation and AI. Passionate about leveraging technology for social and economic development.',
      twitter: '@vancejoseph',
      linkedin: 'vancejoseph'
    }
  },
  {
    id: '2',
    slug: 'ai-small-business-practical-guide',
    title: 'AI for Small Business: A Practical Guide to Getting Started',
    excerpt: 'Small businesses can leverage AI without massive budgets. Here\'s a practical roadmap to implementing AI tools that deliver real ROI.',
    content: `
      <p>Artificial Intelligence isn't just for tech giants anymore. Small businesses across the Caribbean and beyond are discovering how AI can level the playing field and drive growth.</p>
      
      <h2>Start with the Basics</h2>
      <p>You don't need a data science team to benefit from AI. Start with these accessible applications:</p>
      
      <h3>1. Customer Service Automation</h3>
      <p>AI-powered chatbots can handle routine inquiries 24/7, freeing up your team for complex issues. Modern solutions are affordable and easy to implement.</p>
      
      <h3>2. Content Creation</h3>
      <p>AI writing assistants can help draft emails, social media posts, and marketing copy. They're not replacements for human creativity, but powerful accelerators.</p>
      
      <h3>3. Data Analysis</h3>
      <p>Turn your business data into insights. AI tools can identify trends, predict customer behavior, and highlight opportunities you might miss.</p>
      
      <h2>Building Your AI Strategy</h2>
      <p>Before diving in, consider these steps:</p>
      <ul>
        <li><strong>Identify Pain Points:</strong> Where are you spending too much time on repetitive tasks?</li>
        <li><strong>Set Clear Goals:</strong> What does success look like? Reduced response times? Increased sales?</li>
        <li><strong>Start Small:</strong> Pick one area to automate, measure results, then expand.</li>
        <li><strong>Train Your Team:</strong> AI is a tool—your people need to know how to use it effectively.</li>
      </ul>
      
      <h2>Affordable AI Tools to Consider</h2>
      <p>Here are some budget-friendly options:</p>
      <ol>
        <li><strong>ChatGPT/Claude:</strong> For content creation and research</li>
        <li><strong>Zapier:</strong> For workflow automation</li>
        <li><strong>Canva AI:</strong> For design and visual content</li>
        <li><strong>HubSpot CRM:</strong> For customer relationship management with AI features</li>
      </ol>
      
      <h2>Measuring Success</h2>
      <p>Track these metrics to ensure your AI investments pay off:</p>
      <ul>
        <li>Time saved on repetitive tasks</li>
        <li>Customer satisfaction scores</li>
        <li>Revenue per employee</li>
        <li>Error rates in automated processes</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>AI is accessible to businesses of all sizes. The key is starting with clear objectives, choosing the right tools, and measuring your results. The businesses that embrace AI today will be the leaders of tomorrow.</p>
    `,
    heroImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop',
    category: 'AI Strategy',
    tags: ['AI', 'small business', 'guide', 'ROI', 'productivity'],
    publishedAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-12T09:00:00Z',
    readTime: 6,
    author: {
      name: 'Vance Joseph',
      avatar: null,
      bio: 'Founder of ClawForge. Building a more efficient Caribbean through automation and AI. Passionate about leveraging technology for social and economic development.',
      twitter: '@vancejoseph',
      linkedin: 'vancejoseph'
    }
  },
  {
    id: '3',
    slug: 'digital-transformation-caribbean',
    title: 'Digital Transformation in the Caribbean: Challenges and Opportunities',
    excerpt: 'The Caribbean is at a crossroads. Explore how digital transformation can drive economic growth while addressing unique regional challenges.',
    content: `
      <p>The Caribbean region faces unique challenges—and opportunities—in the digital age. From small island developing states to emerging economies, digital transformation isn't just an option; it's a necessity for sustainable growth.</p>
      
      <h2>The Current Landscape</h2>
      <p>Caribbean nations have made significant strides in digital infrastructure, but gaps remain. Internet connectivity varies widely, and many businesses still rely on manual processes that limit their competitiveness.</p>
      
      <h2>Key Challenges</h2>
      
      <h3>1. Infrastructure Limitations</h3>
      <p>Island geography makes infrastructure development expensive. However, satellite internet and mobile networks are bridging the gap, bringing connectivity to previously underserved areas.</p>
      
      <h3>2. Skills Gap</h3>
      <p>There's a shortage of digital skills in the workforce. Addressing this requires investment in education and training programs that prepare workers for the digital economy.</p>
      
      <h3>3. Regulatory Frameworks</h3>
      <p>Many Caribbean nations are still developing regulations around data protection, e-commerce, and digital signatures. Clear, business-friendly policies are essential for growth.</p>
      
      <h2>Opportunities Abound</h2>
      <p>Despite challenges, the Caribbean has unique advantages:</p>
      <ul>
        <li><strong>Tourism Tech:</strong> Digital solutions for booking, experiences, and customer service</li>
        <li><strong>Fintech:</strong> Mobile money and digital payments for the unbanked</li>
        <li><strong>AgTech:</strong> Precision agriculture for small-scale farmers</li>
        <li><strong>Remote Work:</strong> Caribbean lifestyle attracts digital nomads and remote workers</li>
      </ul>
      
      <h2>Success Stories</h2>
      <p>Several Caribbean initiatives show what's possible:</p>
      <ol>
        <li><strong>Barbados' Digital Nomad Visa:</strong> Attracting remote workers and their spending power</li>
        <li><strong>Jamaica's Jam-Dex:</strong> Central bank digital currency pioneering financial inclusion</li>
        <li><strong>Estonia-style E-Residency:</strong> Potential for Caribbean nations to attract global entrepreneurs</li>
      </ol>
      
      <h2>A Path Forward</h2>
      <p>For the Caribbean to thrive digitally, stakeholders must:</p>
      <ul>
        <li>Invest in resilient, redundant internet infrastructure</li>
        <li>Create regional frameworks for digital trade</li>
        <li>Support startups and innovation hubs</li>
        <li>Prioritize cybersecurity and data protection</li>
        <li>Develop public-private partnerships for digital projects</li>
      </ul>
      
      <blockquote>
        "The Caribbean doesn't have to follow the digital transformation playbook of larger nations. We can leapfrog, innovate, and create models that work for our unique context."
      </blockquote>
      
      <h2>Conclusion</h2>
      <p>Digital transformation in the Caribbean isn't just about technology—it's about economic resilience, competitiveness, and creating opportunities for the next generation. The time to act is now.</p>
    `,
    heroImage: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=600&fit=crop',
    category: 'Digital Transformation',
    tags: ['Caribbean', 'digital transformation', 'economic development', 'innovation'],
    publishedAt: '2024-01-05T11:00:00Z',
    updatedAt: '2024-01-05T11:00:00Z',
    readTime: 10,
    author: {
      name: 'Vance Joseph',
      avatar: null,
      bio: 'Founder of ClawForge. Building a more efficient Caribbean through automation and AI. Passionate about leveraging technology for social and economic development.',
      twitter: '@vancejoseph',
      linkedin: 'vancejoseph'
    }
  },
  {
    id: '4',
    slug: 'workflow-automation-productivity',
    title: '5 Workflow Automations That Will 10x Your Productivity',
    excerpt: 'Stop wasting time on repetitive tasks. These five workflow automations will free up hours every week for high-value work.',
    content: `
      <p>Time is your most valuable resource. Yet, most professionals spend hours each week on repetitive tasks that could be automated. Here are five automations that will dramatically boost your productivity.</p>
      
      <h2>1. Email Management Automation</h2>
      <p>Email doesn't have to consume your day. Set up filters, auto-responders, and integration tools to:</p>
      <ul>
        <li>Automatically sort incoming emails by priority</li>
        <li>Create tasks from emails in your project management tool</li>
        <li>Send follow-up reminders for unanswered emails</li>
        <li>Auto-archive newsletters and promotional emails</li>
      </ul>
      <p><strong>Tools to use:</strong> Gmail filters, Zapier, Superhuman</p>
      
      <h2>2. Meeting Scheduling Automation</h2>
      <p>Stop the back-and-forth of scheduling. Use tools that:</p>
      <ul>
        <li>Share your availability with one link</li>
        <li>Automatically add video conferencing links</li>
        <li>Send reminders to reduce no-shows</li>
        <li>Block focus time on your calendar</li>
      </ul>
      <p><strong>Tools to use:</strong> Calendly, SavvyCal, Reclaim.ai</p>
      
      <h2>3. Social Media Automation</h2>
      <p>Maintain a consistent social presence without the daily grind:</p>
      <ul>
        <li>Schedule posts in batches</li>
        <li>Automatically repost evergreen content</li>
        <li>Cross-post between platforms</li>
        <li>Generate performance reports automatically</li>
      </ul>
      <p><strong>Tools to use:</strong> Buffer, Hootsuite, Later</p>
      
      <h2>4. Data Entry Automation</h2>
      <p>Manual data entry is error-prone and time-consuming. Automate it with:</p>
      <ul>
        <li>Form integrations that populate spreadsheets automatically</li>
        <li>Invoice parsing that extracts data to accounting software</li>
        <li>CRM updates triggered by email interactions</li>
        <li>Database synchronization between tools</li>
      </ul>
      <p><strong>Tools to use:</strong> Zapier, Make, n8n</p>
      
      <h2>5. Report Generation Automation</h2>
      <p>Stop building reports manually. Set up systems that:</p>
      <ul>
        <li>Pull data from multiple sources automatically</li>
        <li>Generate visualizations and dashboards</li>
        <li>Email reports to stakeholders on schedule</li>
        <li>Alert you to anomalies or important changes</li>
      </ul>
      <p><strong>Tools to use:</strong> Google Data Studio, Tableau, Power BI</p>
      
      <h2>Getting Started</h2>
      <p>Don't try to automate everything at once. Follow this process:</p>
      <ol>
        <li><strong>Track your time:</strong> Identify where you're spending the most hours on repetitive tasks</li>
        <li><strong>Pick one:</strong> Choose the automation that will save you the most time</li>
        <li><strong>Build it:</strong> Set up the automation and test thoroughly</li>
        <li><strong>Measure:</strong> Track time saved and adjust as needed</li>
        <li><strong>Expand:</strong> Move to the next automation on your list</li>
      </ol>
      
      <h2>The Compound Effect</h2>
      <p>Each automation might save you 30 minutes a day. But combined, they can reclaim hours. That's time you can invest in strategic thinking, creative work, or simply enjoying life.</p>
      
      <blockquote>
        "The best automation is the one you never have to think about—it just works, silently giving you back your time."
      </blockquote>
      
      <h2>Conclusion</h2>
      <p>Productivity isn't about working harder; it's about working smarter. These five automations are just the beginning. Audit your workflows, identify repetitive tasks, and start reclaiming your time today.</p>
    `,
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop',
    category: 'Productivity',
    tags: ['productivity', 'workflow', 'automation', 'efficiency', 'time management'],
    publishedAt: '2023-12-28T09:00:00Z',
    updatedAt: '2023-12-28T09:00:00Z',
    readTime: 7,
    author: {
      name: 'Vance Joseph',
      avatar: null,
      bio: 'Founder of ClawForge. Building a more efficient Caribbean through automation and AI. Passionate about leveraging technology for social and economic development.',
      twitter: '@vancejoseph',
      linkedin: 'vancejoseph'
    }
  },
  {
    id: '5',
    slug: 'building-automation-agency',
    title: 'How to Build a Profitable Automation Agency from Scratch',
    excerpt: 'The demand for automation services is exploding. Learn how to build a successful agency that helps businesses streamline their operations.',
    content: `
      <p>The automation industry is booming. Businesses everywhere are looking for experts to help them streamline operations, reduce costs, and increase efficiency. If you have technical skills and a problem-solving mindset, building an automation agency could be your path to financial freedom.</p>
      
      <h2>Why Now Is the Perfect Time</h2>
      <p>Several factors are driving unprecedented demand:</p>
      <ul>
        <li>Labor shortages forcing businesses to do more with less</li>
        <li>AI making advanced automation accessible to smaller businesses</li>
        <li>Remote work normalizing distributed teams and digital tools</li>
        <li>Economic pressure to reduce operational costs</li>
      </ul>
      
      <h2>Step 1: Define Your Niche</h2>
      <p>Don't try to serve everyone. Specialize in:</p>
      <ul>
        <li><strong>Industry:</strong> E-commerce, healthcare, real estate, professional services</li>
        <li><strong>Function:</strong> Marketing automation, operations, customer service, finance</li>
        <li><strong>Platform:</strong> Salesforce, HubSpot, Zapier, custom solutions</li>
      </ul>
      <p>A focused niche makes marketing easier and allows you to command premium pricing.</p>
      
      <h2>Step 2: Build Your Toolkit</h2>
      <p>Master the tools your target market uses:</p>
      <ol>
        <li><strong>Integration Platforms:</strong> Zapier, Make, n8n</li>
        <li><strong>CRM Systems:</strong> HubSpot, Salesforce, Pipedrive</li>
        <li><strong>Marketing Tools:</strong> Mailchimp, ActiveCampaign, Klaviyo</li>
        <li><strong>AI Tools:</strong> OpenAI API, Claude, automation-specific AI</li>
        <li><strong>Development:</strong> Python, JavaScript, APIs</li>
      </ol>
      
      <h2>Step 3: Create Service Packages</h2>
      <p>Productize your services to simplify sales:</p>
      <ul>
        <li><strong>Audit:</strong> Process analysis and automation roadmap ($1,500-$5,000)</li>
        <li><strong>Quick Wins:</strong> 3-5 simple automations ($2,500-$7,500)</li>
        <li><strong>Transformation:</strong> End-to-end process overhaul ($10,000-$50,000+)</li>
        <li><strong>Retainer:</strong> Ongoing optimization and support ($1,500-$5,000/month)</li>
      </ul>
      
      <h2>Step 4: Get Your First Clients</h2>
      <p>Start with your network and expand:</p>
      <ol>
        <li>Offer free audits to businesses in your network</li>
        <li>Share case studies and automation tips on LinkedIn</li>
        <li>Partner with complementary service providers (web developers, consultants)</li>
        <li>Join industry groups and forums where your target clients hang out</li>
        <li>Run targeted ads showcasing specific automation solutions</li>
      </ol>
      
      <h2>Step 5: Deliver Exceptional Results</h2>
      <p>Your reputation is everything:</p>
      <ul>
        <li>Document everything thoroughly</li>
        <li>Train client teams on new systems</li>
        <li>Measure and report ROI clearly</li>
        <li>Provide responsive support</li>
        <li>Ask for testimonials and referrals</li>
      </ul>
      
      <h2>Scaling Your Agency</h2>
      <p>Once you have consistent clients:</p>
      <ol>
        <li>Hire automation specialists (start with contractors)</li>
        <li>Develop reusable templates and frameworks</li>
        <li>Create training programs for new team members</li>
        <li>Build strategic partnerships with software vendors</li>
        <li>Consider productizing popular solutions</li>
      </ol>
      
      <h2>Pricing Strategies</h2>
      <p>Don't compete on price. Compete on value:</p>
      <ul>
        <li>Price based on value created, not hours worked</li>
        <li>Offer ROI guarantees when possible</li>
        <li>Create tiered packages for different budgets</li>
        <li>Require deposits to ensure commitment</li>
      </ul>
      
      <blockquote>
        "The most successful automation agencies don't sell tools—they sell transformation. They sell time back to their clients."
      </blockquote>
      
      <h2>Common Pitfalls to Avoid</h2>
      <ul>
        <li>Taking on projects outside your expertise</li>
        <li>Underpricing your services</li>
        <li>Neglecting documentation and handover</li>
        <li>Over-promising and under-delivering</li>
        <li>Ignoring ongoing maintenance needs</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Building a profitable automation agency requires technical skill, business acumen, and relentless focus on client results. The opportunity is massive—businesses desperately need help navigating the automation landscape. Position yourself as the expert guide, deliver exceptional value, and you'll build a thriving business.</p>
    `,
    heroImage: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=600&fit=crop',
    category: 'Business',
    tags: ['agency', 'business', 'automation', 'entrepreneurship', 'consulting'],
    publishedAt: '2023-12-20T13:00:00Z',
    updatedAt: '2023-12-22T10:00:00Z',
    readTime: 12,
    author: {
      name: 'Vance Joseph',
      avatar: null,
      bio: 'Founder of ClawForge. Building a more efficient Caribbean through automation and AI. Passionate about leveraging technology for social and economic development.',
      twitter: '@vancejoseph',
      linkedin: 'vancejoseph'
    }
  },
  {
    id: '6',
    slug: 'chatgpt-business-applications',
    title: '10 Practical ChatGPT Applications for Your Business',
    excerpt: 'Beyond the hype: real ways businesses are using ChatGPT to save time, reduce costs, and improve customer experiences.',
    content: `
      <p>ChatGPT and similar AI language models are transforming how businesses operate. But beyond the buzz, what are the practical applications that actually deliver value? Here are ten ways businesses are using ChatGPT right now.</p>
      
      <h2>1. Content Creation at Scale</h2>
      <p>Generate first drafts, outlines, and ideas for:</p>
      <ul>
        <li>Blog posts and articles</li>
        <li>Social media content calendars</li>
        <li>Email newsletters</li>
        <li>Product descriptions</li>
        <li>Ad copy variations</li>
      </ul>
      <p><strong>Pro tip:</strong> Use ChatGPT for drafts, but always add human editing and brand voice.</p>
      
      <h2>2. Customer Support Automation</h2>
      <p>Train ChatGPT on your knowledge base to:</p>
      <ul>
        <li>Answer common questions instantly</li>
        <li>Route complex issues to the right team</li>
        <li>Provide 24/7 support coverage</li>
        <li>Generate FAQ documentation</li>
      </ul>
      
      <h2>3. Code Generation and Debugging</h2>
      <p>Developers are using ChatGPT to:</p>
      <ul>
        <li>Generate boilerplate code</li>
        <li>Explain complex code snippets</li>
        <li>Debug errors faster</li>
        <li>Write documentation</li>
        <li>Convert code between languages</li>
      </ul>
      
      <h2>4. Data Analysis and Reporting</h2>
      <p>Turn raw data into insights:</p>
      <ul>
        <li>Summarize spreadsheet data</li>
        <li>Generate report narratives</li>
        <li>Identify trends and anomalies</li>
        <li>Create executive summaries</li>
      </ul>
      
      <h2>5. Meeting Summaries and Action Items</h2>
      <p>After meetings, use ChatGPT to:</p>
      <ul>
        <li>Transcribe recordings (with other tools)</li>
        <li>Extract key decisions and action items</li>
        <li>Generate follow-up emails</li>
        <li>Create project task lists</li>
      </ul>
      
      <h2>6. Sales Enablement</h2>
      <p>Empower your sales team with:</p>
      <ul>
        <li>Personalized outreach emails</li>
        <li>Objection handling scripts</li>
        <li>Proposal templates</li>
        <li>Competitive battle cards</li>
        <li>Follow-up sequences</li>
      </ul>
      
      <h2>7. Training and Onboarding</h2>
      <p>Create educational content:</p>
      <ul>
        <li>Training manuals and guides</li>
        <li>Quiz questions and assessments</li>
        <li>Role-play scenarios</li>
        <li>Knowledge base articles</li>
        <li>Video scripts</li>
      </ul>
      
      <h2>8. Research and Competitive Analysis</h2>
      <p>Accelerate research tasks:</p>
      <ul>
        <li>Summarize long articles and reports</li>
        <li>Compare competitors</li>
        <li>Generate market analysis</li>
        <li>Find relevant statistics</li>
        <li>Create research briefs</li>
      </ul>
      
      <h2>9. Email Management</h2>
      <p>Tame your inbox:</p>
      <ul>
        <li>Draft responses to common inquiries</li>
        <li>Rewrite emails for clarity and tone</li>
        <li>Summarize long email threads</li>
        <li>Generate professional out-of-office messages</li>
      </ul>
      
      <h2>10. Creative Brainstorming</h2>
      <p>Overcome creative blocks:</p>
      <ul>
        <li>Generate campaign ideas</li>
        <li>Brainstorm product names</li>
        <li>Create story angles</li>
        <li>Develop workshop agendas</li>
        <li>Design thinking exercises</li>
      </ul>
      
      <h2>Implementation Tips</h2>
      <p>To get the most from ChatGPT:</p>
      <ol>
        <li><strong>Be specific:</strong> The more context you provide, the better the output</li>
        <li><strong>Iterate:</strong> Refine prompts based on initial results</li>
        <li><strong>Verify:</strong> Always fact-check important information</li>
        <li><strong>Customize:</strong> Train on your brand voice and terminology</li>
        <li><strong>Integrate:</strong> Use the API to embed in your workflows</li>
      </ol>
      
      <h2>Privacy and Security Considerations</h2>
      <p>When using ChatGPT for business:</p>
      <ul>
        <li>Never share sensitive customer data</li>
        <li>Use enterprise versions with data protection</li>
        <li>Review OpenAI's data usage policies</li>
        <li>Consider self-hosted alternatives for sensitive use cases</li>
      </ul>
      
      <blockquote>
        "ChatGPT is a force multiplier, not a replacement. The businesses that thrive will be those that combine AI efficiency with human creativity and judgment."
      </blockquote>
      
      <h2>Conclusion</h2>
      <p>ChatGPT is a powerful tool, but it's just that—a tool. The real value comes from thoughtfully integrating it into your workflows to augment human capabilities. Start with one or two applications, measure the results, and expand from there.</p>
    `,
    heroImage: 'https://images.unsplash.com/photo-1676299081847-824916de030a?w=1200&h=600&fit=crop',
    category: 'AI Strategy',
    tags: ['ChatGPT', 'AI', 'business', 'productivity', 'applications'],
    publishedAt: '2023-12-15T10:30:00Z',
    updatedAt: '2023-12-15T10:30:00Z',
    readTime: 9,
    author: {
      name: 'Vance Joseph',
      avatar: null,
      bio: 'Founder of ClawForge. Building a more efficient Caribbean through automation and AI. Passionate about leveraging technology for social and economic development.',
      twitter: '@vancejoseph',
      linkedin: 'vancejoseph'
    }
  }
];

export async function fetchArticles() {
  // TODO: Replace with actual Control Board API call
  // const response = await fetch('https://control-board-api.com/articles');
  // return response.json();
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return placeholderArticles;
}

export async function fetchArticleBySlug(slug) {
  // TODO: Replace with actual Control Board API call
  // const response = await fetch(`https://control-board-api.com/articles/${slug}`);
  // return response.json();
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  return placeholderArticles.find(article => article.slug === slug) || null;
}

export async function fetchArticleById(id) {
  // TODO: Replace with actual Control Board API call
  // const response = await fetch(`https://control-board-api.com/articles/id/${id}`);
  // return response.json();
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  return placeholderArticles.find(article => article.id === id) || null;
}