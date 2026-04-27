#!/bin/bash

# Template header with dark mode and styling
HEADER='<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ARTICLE_TITLE | ClawForge</title>
    <meta name="description" content="ARTICLE_DESC">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, '"'"'Segoe UI'"'"', Roboto, sans-serif; background: #f9fafb; color: #111; line-height: 1.6; transition: background 0.3s, color 0.3s; }
        body.dark { background: #111827; color: #fff; }
        nav { position: sticky; top: 0; height: 56px; background: #fff; border-bottom: 1px solid #e5e7eb; display: flex; align-items: center; padding: 0 16px; z-index: 1000; transition: background 0.3s, border-color 0.3s; }
        body.dark nav { background: #1f2937; border-color: #374151; }
        nav a { display: flex; align-items: center; gap: 8px; text-decoration: none; color: inherit; }
        .logo { width: 32px; height: 32px; background: linear-gradient(135deg, #2563eb, #9333ea); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px; }
        .theme-toggle { margin-left: auto; padding: 8px 16px; background: #f3f4f6; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; transition: background 0.3s; }
        body.dark .theme-toggle { background: #374151; }
        main { max-width: 768px; margin: 0 auto; padding: 32px 16px; }
        .back-link { display: inline-flex; align-items: center; gap: 8px; color: #2563eb; text-decoration: none; margin-bottom: 24px; font-weight: 500; }
        .meta { display: flex; align-items: center; gap: 8px; font-size: 14px; color: #6b7280; margin-bottom: 16px; }
        body.dark .meta { color: #9ca3af; }
        .meta .cat { color: #2563eb; }
        h1 { font-size: 32px; font-weight: bold; margin-bottom: 24px; line-height: 1.3; }
        h2 { font-size: 24px; font-weight: 600; margin-top: 32px; margin-bottom: 16px; color: #2563eb; }
        p { margin-bottom: 16px; font-size: 16px; }
        strong { font-weight: 600; }
        .actions { display: flex; gap: 12px; margin-top: 48px; padding-top: 32px; border-top: 1px solid #e5e7eb; }
        body.dark .actions { border-color: #374151; }
        .btn { padding: 12px 24px; background: linear-gradient(135deg, #2563eb, #9333ea); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; }
        .btn-secondary { background: #f3f4f6; color: #111; }
        body.dark .btn-secondary { background: #374151; color: #fff; }
        footer { border-top: 1px solid #e5e7eb; background: #fff; margin-top: 64px; padding: 32px 16px; text-align: center; color: #6b7280; transition: background 0.3s, border-color 0.3s; }
        body.dark footer { background: #1f2937; border-color: #374151; }
    </style>
</head>
<body>
    <nav>
        <a href="https://hemisphere-claw-agency.vercel.app">
            <div class="logo">C</div>
            <span style="font-weight: bold; font-size: 16px;">ClawForge</span>
        </a>
        <button class="theme-toggle" onclick="toggleTheme()">☀️</button>
    </nav>

    <main>
        <a href="index.html" class="back-link">← Back to Blog</a>
        
        <div class="meta">
            <span>Apr 26, 2026</span>
            <span>·</span>
            <span>ARTICLE_READTIME min read</span>
            <span>·</span>
            <span class="cat">ARTICLE_CATEGORY</span>
        </div>

        <h1>ARTICLE_TITLE</h1>
'

# Template footer
FOOTER='
        <div class="actions">
            <button class="btn" onclick="window.print()">📄 Download PDF</button>
            <a href="index.html" class="btn btn-secondary">← Back to Blog</a>
        </div>
    </main>

    <footer>
        <p>© 2026 ClawForge Systems</p>
    </footer>

    <script>
        function toggleTheme() {
            document.body.classList.toggle("dark");
            const btn = document.querySelector(".theme-toggle");
            btn.textContent = document.body.classList.contains("dark") ? "🌙" : "☀️";
            localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
        }
        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.add("dark");
            document.querySelector(".theme-toggle").textContent = "🌙";
        }
    </script>
</body>
</html>'

echo "Template created"
