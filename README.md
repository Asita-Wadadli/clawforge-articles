# ClawForge Article Site

A modern, professional article and blog platform built with Next.js, featuring dark/light mode, SEO optimization, and PDF generation.

## Features

- **Modern Design**: Clean, professional layout with dark/light mode support
- **SEO Optimized**: Proper meta tags, structured data, and canonical URLs
- **Mobile Responsive**: Fully responsive design for all devices
- **PDF Generation**: On-demand PDF downloads for articles
- **Social Sharing**: Share buttons for Twitter, LinkedIn, and Facebook
- **Fast Loading**: Static site generation for optimal performance

## Tech Stack

- Next.js 14
- React 18
- Tailwind CSS
- Puppeteer (for PDF generation)
- @sparticuz/chromium (Vercel-compatible Chromium)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy!

The site will be available at `https://hemisphere-claw-agency.vercel.app`

### Environment Variables

No environment variables are required for basic functionality. When connecting to the Control Board API, add:

```
CONTROL_BOARD_API_URL=https://your-api-url.com
CONTROL_BOARD_API_KEY=your-api-key
```

## Project Structure

```
├── components/         # React components
│   ├── ArticleCard.js  # Article listing card
│   ├── AuthorBio.js    # Author bio section
│   └── ShareButtons.js # Social share buttons
├── lib/                # Utility functions
│   └── api.js          # API functions (placeholder data)
├── pages/              # Next.js pages
│   ├── api/            # API routes
│   │   └── articles/
│   │       └── [id]/
│   │           └── pdf.js  # PDF generation endpoint
│   ├── article/
│   │   └── [slug].js   # Individual article page
│   └── index.js        # Home page
├── public/             # Static assets
├── styles/             # Global styles
│   └── globals.css
├── next.config.js      # Next.js configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── vercel.json         # Vercel deployment config
```

## PDF Generation

The PDF generation endpoint is available at:
```
GET /api/articles/{id}/pdf
```

This generates a professionally formatted PDF with:
- Article title and metadata
- Hero image
- Formatted content
- Tags
- Footer with source URL

## API Integration

Currently using placeholder data. To connect to the Control Board API:

1. Update `lib/api.js` to make actual API calls
2. Add environment variables for API credentials
3. Update the fetch functions to use real endpoints

## License

MIT