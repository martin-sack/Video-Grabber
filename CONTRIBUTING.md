# Contributing to VideoGrabber

Thank you for your interest in contributing to VideoGrabber! This document provides guidelines and instructions for contributing.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- System information (OS, version, etc.)

### Suggesting Features

Feature requests are welcome! Please create an issue with:
- Clear description of the feature
- Use case and benefits
- Possible implementation approach
- Examples from other apps (if applicable)

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/martin-sack/Video-Grabber.git
   cd Video-Grabber
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test your changes**
   ```bash
   npm start  # Test in development
   npm run build:mac  # Test build
   ```

5. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Create a Pull Request**
   - Describe your changes
   - Reference any related issues
   - Include screenshots if UI changes

## 📝 Code Style

### JavaScript
- Use ES6+ features
- Use `const` and `let`, avoid `var`
- Use arrow functions where appropriate
- Add JSDoc comments for functions
- Keep functions small and focused

### HTML/CSS
- Use semantic HTML
- Follow BEM naming convention for CSS
- Keep styles modular
- Use CSS variables for colors

### Commits
- Use clear, descriptive commit messages
- Start with a verb (Add, Fix, Update, Remove)
- Reference issues when applicable

## 🏗️ Project Structure

```
videograbber/
├── main.js                 # Electron main process
├── preload.js              # IPC security bridge
├── renderer.js             # Frontend logic
├── queue.js                # Download queue manager
├── getYtDlpExecutable.js   # Binary path resolver
├── index.html              # UI markup
├── styles.css              # Styling
└── resources/bin/          # yt-dlp binaries
```

## 🧪 Testing

Before submitting a PR:
1. Test in development mode (`npm start`)
2. Test built app (`npm run build:mac`)
3. Test all features work
4. Check console for errors
5. Test on different platforms if possible

## 📚 Documentation

When adding features:
- Update README.md
- Add to FEATURES.md
- Update relevant guides
- Add code comments
- Update CHANGELOG.md

## 🎯 Areas for Contribution

### High Priority
- [ ] Windows pause/resume support
- [ ] Drag-and-drop URL support
- [ ] Multiple simultaneous downloads
- [ ] Download resume capability
- [ ] Better error handling

### Medium Priority
- [ ] Video trimming/cutting
- [ ] Subtitle download
- [ ] Browser extension
- [ ] Scheduled downloads
- [ ] Bandwidth limiting

### Low Priority
- [ ] Dark/light theme toggle
- [ ] Custom keyboard shortcuts
- [ ] Download statistics
- [ ] Cloud storage integration

## 🐛 Bug Fixes

Bug fixes are always welcome! Please:
1. Create an issue first (if not exists)
2. Reference the issue in your PR
3. Add tests if applicable
4. Verify the fix works

## 💡 Feature Requests

Before implementing a feature:
1. Create an issue to discuss
2. Wait for feedback
3. Get approval from maintainers
4. Then start implementation

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You!

Every contribution helps make VideoGrabber better. Thank you for your time and effort!

## 📞 Questions?

- Create an issue for questions
- Check existing documentation
- Review closed issues for similar questions

---

**Happy Contributing!** 🚀
