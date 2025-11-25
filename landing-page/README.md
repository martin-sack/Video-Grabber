# VideoGrabber Landing Page

Modern, high-converting landing page for VideoGrabber built with Next.js, Framer Motion, and Tailwind CSS.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📦 Deploy to Vercel

1. Push this folder to a new GitHub repository
2. Go to [Vercel](https://vercel.com)
3. Click "Add New Project"
4. Import your repository
5. Deploy!

Your site will be live at `https://your-project.vercel.app`

## 🎨 Customization

### Update GitHub Links
Edit `app/page.tsx` and change:
```typescript
const GITHUB_REPO = 'https://github.com/YOUR_USERNAME/YOUR_REPO'
```

### Add Screenshots
Replace the placeholder in the hero section with your actual screenshot:
```tsx
<img src="/screenshot.png" alt="VideoGrabber" className="rounded-xl" />
```

### Change Colors
Edit `tailwind.config.js` to customize the color scheme.

## 🌟 Features

- ✅ Responsive design (mobile-friendly)
- ✅ Dark mode with purple gradients
- ✅ Glassmorphism effects
- ✅ Smooth animations with Framer Motion
- ✅ SEO optimized
- ✅ Fast loading
- ✅ Static export ready

## 📝 License

MIT
