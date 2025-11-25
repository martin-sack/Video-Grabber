# 🚀 VideoGrabber Deployment Guide

## Automated Builds & Professional Landing Page

---

## ✅ What's Been Set Up

### 1. GitHub Actions CI/CD
- ✅ Automated builds for macOS, Windows, and Linux
- ✅ Triggers on version tags (v1.0.0, v1.1.0, etc.)
- ✅ Automatically creates GitHub Releases
- ✅ Uploads all installers (.dmg, .exe, .AppImage, .deb)

### 2. Professional Landing Page
- ✅ Next.js + Tailwind CSS + Framer Motion
- ✅ Dark mode with purple gradients
- ✅ Glassmorphism effects
- ✅ Fully responsive
- ✅ SEO optimized
- ✅ Ready for Vercel deployment

---

## 🎯 Part 1: Create Your First Release

### Step 1: Tag a Version

```bash
# Create and push a version tag
git tag v1.0.0
git push origin v1.0.0
```

### Step 2: Watch the Magic

1. Go to: https://github.com/martin-sack/Video-Grabber/actions
2. You'll see the "Build and Release" workflow running
3. Wait ~10-15 minutes for all platforms to build
4. Go to: https://github.com/martin-sack/Video-Grabber/releases
5. Your release is ready with all installers!

### What Gets Built

- **macOS**: 
  - `VideoGrabber-1.0.0-arm64.dmg` (installer)
  - `VideoGrabber-1.0.0-arm64-mac.zip` (portable)

- **Windows**:
  - `VideoGrabber Setup 1.0.0.exe` (installer)
  - `VideoGrabber 1.0.0.exe` (portable)

- **Linux**:
  - `VideoGrabber-1.0.0.AppImage` (universal)
  - `VideoGrabber_1.0.0_amd64.deb` (Debian/Ubuntu)

---

## 🌐 Part 2: Deploy Landing Page

### Option A: Deploy to Vercel (Recommended)

1. **Create a new repository for the landing page**
   ```bash
   cd landing-page
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/videograbber-landing.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your `videograbber-landing` repository
   - Click "Deploy"
   - Done! Your site is live at `https://videograbber-landing.vercel.app`

3. **Add Custom Domain (Optional)**
   - In Vercel dashboard, go to Settings → Domains
   - Add your custom domain (e.g., `videograbber.com`)
   - Follow DNS instructions

### Option B: Deploy to GitHub Pages

1. **Update next.config.js** (already done)
   ```javascript
   output: 'export'
   ```

2. **Build and deploy**
   ```bash
   cd landing-page
   npm install
   npm run build
   ```

3. **Push to gh-pages branch**
   ```bash
   git subtree push --prefix landing-page/out origin gh-pages
   ```

4. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: gh-pages branch
   - Your site: `https://martin-sack.github.io/Video-Grabber/`

---

## 🎨 Customize Landing Page

### Update GitHub Links

Edit `landing-page/app/page.tsx`:
```typescript
const GITHUB_REPO = 'https://github.com/martin-sack/Video-Grabber'
```

### Add Real Screenshot

1. Take a screenshot of your app
2. Save as `landing-page/public/screenshot.png`
3. Replace placeholder in `page.tsx`:
   ```tsx
   <img 
     src="/screenshot.png" 
     alt="VideoGrabber Interface" 
     className="rounded-xl shadow-2xl"
   />
   ```

### Change Colors

Edit `landing-page/tailwind.config.js`:
```javascript
colors: {
  primary: {
    // Your custom colors
  }
}
```

---

## 🔄 Release Workflow

### For Future Releases

1. **Make your changes**
   ```bash
   git add .
   git commit -m "Add new feature"
   git push
   ```

2. **Create new version tag**
   ```bash
   git tag v1.1.0
   git push origin v1.1.0
   ```

3. **GitHub Actions automatically:**
   - Builds for all platforms
   - Creates GitHub Release
   - Uploads all installers
   - Generates release notes

### Version Numbering

- **Major**: `v2.0.0` - Breaking changes
- **Minor**: `v1.1.0` - New features
- **Patch**: `v1.0.1` - Bug fixes

---

## 📊 Monitor Your Release

### Check Build Status

1. Go to: https://github.com/martin-sack/Video-Grabber/actions
2. Click on the running workflow
3. See real-time logs for each platform

### If Build Fails

Common issues:
- **Missing dependencies**: Check package.json
- **Binary not found**: Ensure yt-dlp downloads correctly
- **Build timeout**: Increase timeout in workflow

Fix and push a new tag:
```bash
git tag -d v1.0.0  # Delete local tag
git push origin :refs/tags/v1.0.0  # Delete remote tag
# Fix the issue
git tag v1.0.0  # Create tag again
git push origin v1.0.0
```

---

## 🎯 Complete Launch Checklist

### Pre-Launch
- [ ] Test app on all platforms
- [ ] Update version in package.json
- [ ] Write release notes
- [ ] Take screenshots
- [ ] Record demo video

### Launch
- [ ] Create version tag: `git tag v1.0.0 && git push origin v1.0.0`
- [ ] Wait for GitHub Actions to complete
- [ ] Verify all installers in Releases
- [ ] Deploy landing page to Vercel
- [ ] Add real screenshot to landing page
- [ ] Test download links

### Post-Launch
- [ ] Share on social media
- [ ] Post on Reddit
- [ ] Submit to Product Hunt
- [ ] Email tech blogs
- [ ] Monitor GitHub issues
- [ ] Respond to feedback

---

## 🚀 Quick Commands

### Create Release
```bash
git tag v1.0.0
git push origin v1.0.0
```

### Deploy Landing Page
```bash
cd landing-page
npm install
npm run build
# Then deploy to Vercel or GitHub Pages
```

### Update Landing Page
```bash
cd landing-page
# Make changes
git add .
git commit -m "Update landing page"
git push
# Vercel auto-deploys!
```

---

## 🎉 You're Ready!

Everything is set up for automated releases and professional deployment:

✅ **GitHub Actions** - Automated builds
✅ **Landing Page** - Professional website
✅ **Documentation** - Complete guides
✅ **Screenshots** - Real interface images

**Next step:** Create your first release!

```bash
git tag v1.0.0
git push origin v1.0.0
```

Then watch the magic happen at:
- Actions: https://github.com/martin-sack/Video-Grabber/actions
- Releases: https://github.com/martin-sack/Video-Grabber/releases

---

**Questions?** Check the workflow file at `.github/workflows/release.yml`
