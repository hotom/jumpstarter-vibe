# Jumpstarter Vibe Coding Training

A modern React-based landing page for Jumpstarter Vibe Coding Training, featuring social sharing with preview popups.

## 🚀 Features

- **React 18** with Vite for fast development
- **React Router** for smooth page navigation
- **React Share** library for social sharing with beautiful preview popups
- **Supabase** integration for contact form submissions
- **Supabase Auth** for user authentication (Email/Password)
- Social platforms: WhatsApp, Facebook, LinkedIn, and X (Twitter)
- Fully responsive design
- Jumpstarter brand styling (Orange & Black theme)
- Smooth animations and transitions

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

## 🛠 Technologies

- React 18.2
- React Router DOM 6.20
- React Share 5.1
- Supabase (for contact form database and authentication)
- Vite 5.0
- Modern CSS with animations

## 🔐 Supabase Auth Setup

To enable authentication, you need to ensure Email authentication is enabled in your Supabase project:

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Providers**
3. Ensure the **Email** provider is enabled (it's enabled by default)
4. No additional configuration is needed for basic email/password authentication

### Redirect URLs

For email authentication, no special redirect URLs are needed. The authentication happens directly within the application.

## 📦 Supabase Setup

1. Create a Supabase account at [supabase.com](https://supabase.com/)
2. Create a new project
3. Get your project URL and anon key from the project settings
4. Update the `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url_here
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```
5. Create a table named `contact_submissions` with the following columns:
   - `id` (int8, primary key, auto-increment)
   - `name` (text)
   - `email` (text)
   - `message` (text)
   - `submitted_at` (timestamptz, default: now())

## 🏃 Running the App

### Development Mode
```bash
npm run dev
```
The app will open at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
Project_2/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation component
│   │   ├── Footer.jsx          # Footer component
│   │   └── SocialShare.jsx     # Social sharing buttons with popups
│   ├── pages/
│   │   ├── Home.jsx            # Home page
│   │   └── LearnMore.jsx       # Learn More page
│   ├── App.jsx                 # Main app component with routing
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles
├── index-react.html            # HTML entry point
├── vite.config.js              # Vite configuration
└── package.json                # Dependencies
```

## 🎨 Social Sharing

The app uses **react-share** library which provides:
- Native share dialogs for each platform
- Preview messages with custom titles and descriptions
- Beautiful icons (round style)
- Mobile-optimized sharing experience

### Supported Platforms
- 📘 **Facebook** - Share with quote
- 🐦 **X (Twitter)** - Share with title
- 💼 **LinkedIn** - Share with title and summary
- 💬 **WhatsApp** - Share with title and URL

## 🎯 Pages

1. **Home** (`/`) - Main landing page with hero, features, courses, and contact sections
2. **Learn More** (`/learn-more`) - Detailed page about how vibe coding can change the world

## 🔗 Links

- [Jumpstarter HK Official Site](https://www.jumpstarter.hk/)

## 📝 Notes

- The old HTML files (`index.html`, `learn-more.html`) are kept for reference
- Use `index-react.html` as the entry point for the React app (Vite handles this automatically)
- Social sharing requires the app to be served over HTTP/HTTPS (won't work with `file://` protocol)
