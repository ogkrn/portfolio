# Karan Joshi Portfolio

A modern, dark-themed developer portfolio built with Next.js, React, and TypeScript.

## Features
- Beautiful dark UI with green accent and glassmorphism effects
- **PillNav** - Animated pill-style navigation imported from [React Bits](https://reactbits.dev/components/pill-nav)
- Animated background particles
- Responsive navigation bar and sidebar
- Hero section with code preview
- About, Projects, Skills, and Contact sections
- Local Like button (no backend required)
- Fully responsive and mobile-friendly

## Credits
- **PillNav Component**: Imported from [React Bits](https://reactbits.dev/components/pill-nav) - An animated pill-style navigation with GSAP animations.

## Getting Started

### Prerequisites
- Node.js (v18 or newer recommended)
- npm

### Dependencies
- `gsap` - Used for PillNav animations

### Installation
1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd portfolio
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization
- Update your name, bio, and social links in `app/page.tsx`.
- Add your own projects and skills in the respective sections.
- The Like button uses localStorage for per-user likes (no backend required).
- Customize PillNav colors via props in `app/page.tsx`.

## Folder Structure
```
portfolio/
├── app/
│   ├── elements/
│   │   ├── likebutton.tsx
│   │   └── PillNav.tsx       # Imported from React Bits
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
├── assets/
├── package.json
├── README.md
└── ...
```

## License
This project is open source and free to use for personal portfolios.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
