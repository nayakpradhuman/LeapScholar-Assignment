# LeapScholar AI Profile Evaluation Agent 🎓

A modern, animated landing page for an AI-powered university matching platform built with React, Vite, Tailwind CSS, and Framer Motion.

## ✨ Features

- **Hero Section** with animated AI agent preview
- **AI Profile Evaluation Modal** with:
  - Multi-phase animation (Boot → Chat → Analyze → Results)
  - Typewriter effect for AI messages
  - Model selector (GPT-4, Claude, Gemini, etc.)
  - Progress indicators and task checklist
  - University match results with animated bars
- **Stats Section** with animated counters
- **Features Grid** showcasing platform capabilities
- **University Showcase** with partner institutions
- **Testimonials Carousel**
- **Floating CTA** for mobile users

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/nayakpradhuman/Leapscholar.git
cd Leapscholar

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open http://localhost:5173 in your browser
```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` folder.

---

## 🌐 Deploy to Vercel (Recommended)

### Option 1: One-Click Deploy
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"Add New Project"**
4. Import `nayakpradhuman/Leapscholar`
5. Click **Deploy** — done! ✅

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (follow prompts)
vercel

# Deploy to production
vercel --prod
```

---

## 🌐 Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --dir=dist --prod
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── App.tsx                    # Main app component
│   └── components/
│       ├── AIAgentScreen.tsx      # 🤖 AI agent with animations
│       ├── Hero.tsx               # Hero section
│       ├── Navbar.tsx             # Navigation bar
│       ├── Stats.tsx              # Stats section
│       ├── Features.tsx           # Features grid
│       ├── HowItWorks.tsx         # How it works section
│       ├── Universities.tsx       # Partner universities
│       ├── Testimonials.tsx       # Testimonials carousel
│       ├── ProfileEvalModal.tsx   # Profile evaluation modal
│       ├── ProfileEvalCTA.tsx     # CTA sections
│       ├── FloatingCTA.tsx        # Mobile floating button
│       ├── LogoBar.tsx            # Partner logos
│       └── Footer.tsx             # Footer
├── styles/
│   ├── index.css                  # Global styles
│   ├── tailwind.css               # Tailwind imports
│   ├── fonts.css                  # Font definitions
│   └── theme.css                  # Theme variables
└── assets/                        # Images and icons
```

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework |
| **Vite** | Build tool & dev server |
| **Tailwind CSS 4** | Utility-first styling |
| **Motion (Framer)** | Animations |
| **Radix UI** | Accessible components |
| **Lucide React** | Icons |
| **Shadcn/ui** | Pre-built components |

---

## 🎨 AI Agent Animation Phases

The AI Agent Screen (`AIAgentScreen.tsx`) features a sophisticated multi-phase animation:

1. **Boot Phase** — Initialization animation with progress bar
2. **Chat Phase** — Typewriter effect for AI messages, user responses
3. **Analyze Phase** — Task checklist with progress indicators
4. **Results Phase** — University cards slide in with match percentages

---

## 📝 Credits

- Built with [Figma Make](https://figma.com/make)
- Original design: [AI Profile Evaluation Agent](https://www.figma.com/design/GoQFcpfuzHzUaJIZDxB9sG/AI-Profile-Evaluation-Agent)
- Developed by [@nayakpradhuman](https://github.com/nayakpradhuman)

## 📄 License

MIT License — feel free to use this for your own projects!
