# 🔋 Electrones - Gamification Platform for Electrotecnia

Electrones is a **virtual wallet and reward system** designed to gamify the teaching of electrical engineering (electrotecnia). Built with modern web technologies, it helps educators motivate students through a points-based economy, achievements, leaderboards, and team-based competitions.

## ✨ Key Features

### For Students
- **Virtual Wallet**: Earn and spend "Electrones" (virtual currency) through attendance, achievements, and course activities
- **Global Rankings**: Compete in individual and team-based leaderboards across different "leagues"
- **Achievement System**: Unlock badges and rewards by completing challenges across multiple categories:
  - Consistency (Constancia)
  - Cooperation (Cooperación)
  - Exploration (Exploración)
  - Special Bonuses (Bonus)
- **Shop & Trading**: Purchase rewards using earned Electrones or participate in collective crowdfunding campaigns
- **QR Code Scanning**: Teachers can scan QR codes to award points directly to students
- **Inventory System**: Collect items, manage lootboxes, and track earned rewards
- **PWA Support**: Works as a Progressive Web App—install it on your phone like a native app
- **Team Factions**: Join one of 4 themed leagues with unique visual identities

### For Teachers/Admins
- **Admin Dashboard**: Manage students, distribute Electrones, and monitor performance
- **Statistics & Analytics**: 
  - Real-time KPIs (total students, Electrones in circulation, keys distributed)
  - Student performance correlation charts (attendance vs. Electrones balance)
  - Economy flow visualization
  - Crowdfunding campaign tracking
- **QR Code Generation**: Create customized QR codes for different activity categories (Attendance, Participation, Homework, Problems, Lab Work)
- **Bulk Management**: Edit student achievements, create transactions, and manage team assignments
- **Hall of Fame**: View detailed student achievement histories

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or compatible runtime (Bun, pnpm, yarn)
- npm, Yarn, pnpm, or Bun package manager
- Supabase account for backend services (authentication, database, real-time features)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/TamaritJorge/electrones.git
cd electrones
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
electrones/
├── app/                          # Next.js App Router pages
│   ├── login/                    # Authentication page
│   ├── page.tsx                  # Home/Dashboard
│   ├── leaderboard/              # Rankings (individual & team)
│   ├── achievements/             # Hall of Trophies
│   ├── shop/                     # Product shop & crowdfunding
│   ├── inventory/                # Student backpack/inventory
│   ├── history/                  # Transaction history
│   ├── scan/                     # QR code scanner
│   ├── admin/                    # Admin dashboard & tools
│   │   ├── qr/                   # QR code generation
│   │   ├── stats/                # Analytics & charts
│   │   └── achievements/         # Achievement management
│   ├── layout.tsx                # Root layout
│   └── manifest.ts               # PWA manifest
│
├── components/                   # Reusable React components
│   ├── admin/                    # Admin-specific components
│   │   ├── stats/                # Analytics components
│   │   ├── AdminDashboard.tsx
│   │   └── StudentCard.tsx
│   ├── leaderboard/              # Leaderboard components
│   ├── shop/                     # Shop components
│   ├── inventory/                # Inventory components
│   ├── dashboard/                # Dashboard components
│   └── ui/                       # Shared UI components
│
├── context/                      # React Context (state management)
├── utils/                        # Utility functions
│   ├── supabase/                 # Supabase client configuration
│   ├── leagues.ts                # League/team configuration
│   └── ...
│
├── public/                       # Static assets
│   └── icons/                    # PWA icons
│
├── package.json                  # Dependencies & scripts
├── tsconfig.json                 # TypeScript configuration
├── next.config.ts                # Next.js configuration
├── tailwind.config.js            # Tailwind CSS configuration
└── eslint.config.mjs             # ESLint configuration
```

## 🛠 Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) - React framework with App Router
- **UI Framework**: [React 19](https://react.dev/) - UI library
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/) - Icon library
- **Charts**: [Recharts](https://recharts.org/) - React charting library
- **QR Codes**: 
  - [@yudiel/react-qr-scanner](https://github.com/yudiel/react-qr-scanner) - Camera QR scanning
  - [qrcode.react](https://github.com/davidroyer/qrcode.react) - QR code generation

### Backend & Services
- **Authentication & Database**: [Supabase](https://supabase.com/) - PostgreSQL + Auth.

### Utilities
- **PDF Generation**: [pdf-lib](https://pdfjs.example.com/) - PDF creation
- **Animations**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) - Celebratory effects
- **PWA**: [@ducanh2912/next-pwa](https://github.com/ducanh2912/next-pwa) - Progressive Web App support
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) - Type-safe JavaScript

## 📜 Available Scripts

```bash
# Development server with Webpack
npm run dev

# Production build with Webpack
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## 🎮 Key Pages & Routes

| Route | Description | Access |
|-------|-------------|--------|
| `/` | Dashboard/Home | Students |
| `/login` | Authentication | Public |
| `/leaderboard` | Individual & team rankings | Students |
| `/achievements` | Hall of Trophies | Students |
| `/shop` | Buy items & crowdfunding | Students |
| `/inventory` | Backpack & items | Students |
| `/history` | Transaction history | Students |
| `/scan` | QR code scanner | Students |
| `/admin` | Admin dashboard | Teachers/Admins |
| `/admin/qr` | QR code generator | Admins |
| `/admin/stats` | Analytics & charts | Admins |
| `/admin/achievements` | Achievement management | Admins |

## 🔐 Authentication & Authorization

The app uses Supabase Auth with role-based access control:
- **Students**: Can earn Electrones, view rankings, unlock achievements
- **Teachers/Admins**: Full access to admin panel, student management, and analytics
- **Public**: Login page only

Protected routes redirect unauthorized users to the login page.

## 🎨 Design & UX

- **Dark Theme**: Slate-based color scheme optimized for mobile and desktop
- **Mobile-First**: Responsive design that works seamlessly on all devices
- **PWA Ready**: Installable as a native app on iOS and Android
- **Accessibility**: Built with semantic HTML and proper color contrast
- **Performance**: Optimized images, lazy loading, and efficient state management

## 📊 Data & Database

Electrones uses Supabase (PostgreSQL) to manage:
- User profiles and authentication
- Student earnings and transactions
- Product catalog and purchases
- Achievements and unlock history
- Team assignments and rankings
- Crowdfunding campaigns
- QR code activity logs
For detailed information about the database schema and how to set up Supabase, please refer to the [supabaseData/README.md](supabaseData/README.md) file.

## 🚀 Deployment

### Deploy on Vercel (Recommended)

The easiest way to deploy Electrones is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your Supabase environment variables
4. Vercel automatically deploys on every push

[See Vercel's Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Other Platforms

Electrones can also be deployed to:
- Netlify
- Render
- Self-hosted servers (Node.js)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code:
- Follows the existing code style
- Passes ESLint checks (`npm run lint`)
- Includes appropriate comments for complex logic
- Is tested if applicable

## 📝 License

This project is private. Please contact the maintainers for licensing questions.

## 👨‍💼 Maintainer

**Jorge Tamarit** - [@TamaritJorge](https://github.com/TamaritJorge) [Institutional Website](https://www.uji.es/institucional/estructura/personal?p_departamento=2102&p_profesor=233411)

## 📚 Resources & Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🐛 Support

For bugs, feature requests, or questions, please open an issue on the [GitHub repository](https://github.com/TamaritJorge/electrones/issues).

---

**Built for educators and students passionate about electrical engineering.**
