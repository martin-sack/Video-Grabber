# 📂 File Guide

Complete guide to every file in the VideoGrabber project.

## 📁 Project Structure

```
videograbber/
├── 🎯 Core Application Files
│   ├── main.js              # Electron main process (backend)
│   ├── preload.js           # IPC security bridge
│   ├── renderer.js          # Frontend logic
│   ├── index.html           # UI markup
│   └── styles.css           # Modern styling
│
├── ⚙️ Configuration Files
│   ├── package.json         # Dependencies & build config
│   └── .gitignore          # Git ignore rules
│
├── 🔧 Setup Scripts
│   ├── setup-binaries.sh    # macOS/Linux binary downloader
│   └── setup-binaries.bat   # Windows binary downloader
│
├── 📚 Documentation
│   ├── README.md            # Main documentation
│   ├── QUICKSTART.md        # Fast setup guide
│   ├── INSTALL.md           # Installation instructions
│   ├── ARCHITECTURE.md      # Technical details
│   ├── FEATURES.md          # Feature list
│   ├── COMMANDS.md          # Command reference
│   ├── PROJECT_SUMMARY.md   # Project overview
│   └── FILE_GUIDE.md        # This file
│
└── 📦 Generated Folders (after setup)
    ├── node_modules/        # npm dependencies
    ├── binaries/            # yt-dlp executables
    └── dist/                # Built applications
```

## 📄 File Descriptions

### Core Application Files

#### main.js (Backend)
**Purpose**: Electron main process - handles all backend operations

**Key Features**:
- Window creation and management
- yt-dlp process spawning
- Download queue management
- Progress parsing from stdout
- IPC request handlers
- File system operations

**Size**: ~150 lines
**Language**: JavaScript (Node.js)

#### preload.js (Security Bridge)
**Purpose**: Secure communication layer between frontend and backend

**Key Features**:
- Context bridge setup
- IPC method exposure
- Security isolation
- Safe API surface

**Size**: ~20 lines
**Language**: JavaScript

#### renderer.js (Frontend Logic)
**Purpose**: UI interactions and state management

**Key Features**:
- Event listeners
- URL validation
- Video preview fetching
- Progress bar updates
- History management
- Settings control

**Size**: ~200 lines
**Language**: JavaScript (Browser)

#### index.html (UI Markup)
**Purpose**: Application user interface structure

**Key Features**:
- Header with settings
- URL input section
- Video preview card
- Progress display
- History list
- Settings modal

**Size**: ~100 lines
**Language**: HTML5

#### styles.css (Styling)
**Purpose**: Modern visual design

**Key Features**:
- Purple gradient theme
- Glass-morphism effects
- Smooth animations
- Responsive layout
- Custom scrollbars

**Size**: ~300 lines
**Language**: CSS3

### Configuration Files

#### package.json
**Purpose**: Project configuration and dependencies

**Contains**:
- Project metadata
- npm scripts
- Dependencies (electron)
- Dev dependencies (electron-builder)
- Build configuration
- Platform-specific settings

**Size**: ~50 lines
**Language**: JSON

#### .gitignore
**Purpose**: Git version control exclusions

**Excludes**:
- node_modules/
- dist/
- binaries/
- Log files
- System files

**Size**: ~10 lines
**Language**: Text

### Setup Scripts

#### setup-binaries.sh
**Purpose**: Download yt-dlp binaries for distribution (Unix)

**Actions**:
- Creates binaries/ folder
- Downloads yt-dlp for macOS/Linux
- Downloads yt-dlp.exe for Windows
- Sets executable permissions

**Size**: ~30 lines
**Language**: Bash

#### setup-binaries.bat
**Purpose**: Download yt-dlp binaries for distribution (Windows)

**Actions**:
- Creates binaries/ folder
- Downloads yt-dlp.exe
- Downloads yt-dlp for cross-platform builds

**Size**: ~30 lines
**Language**: Batch

### Documentation Files

#### README.md
**Purpose**: Main project documentation

**Sections**:
- Feature overview
- Quick start guide
- Installation instructions
- Building for distribution
- Supported platforms
- Usage guide
- Troubleshooting
- Credits

**Size**: ~200 lines
**Language**: Markdown

#### QUICKSTART.md
**Purpose**: Fast setup for developers

**Sections**:
- Development setup (3 steps)
- Distribution setup (4 steps)
- Usage tips
- Troubleshooting

**Size**: ~100 lines
**Language**: Markdown

#### INSTALL.md
**Purpose**: Detailed installation guide

**Sections**:
- Prerequisites
- Installation methods
- Platform-specific instructions
- Verification steps
- Troubleshooting
- Updating
- Uninstalling

**Size**: ~200 lines
**Language**: Markdown

#### ARCHITECTURE.md
**Purpose**: Technical architecture documentation

**Sections**:
- Project structure
- Architecture overview
- Data flow diagrams
- yt-dlp integration
- Security model
- Build process
- Performance optimizations

**Size**: ~300 lines
**Language**: Markdown

#### FEATURES.md
**Purpose**: Complete feature list

**Sections**:
- Core features (✅ implemented)
- Platform support
- User experience
- Documentation
- Security
- Future enhancements (⏳ planned)

**Size**: ~250 lines
**Language**: Markdown

#### COMMANDS.md
**Purpose**: Command reference cheat sheet

**Sections**:
- Development commands
- Build commands
- Setup commands
- Troubleshooting commands
- Quick workflows
- Platform-specific commands

**Size**: ~150 lines
**Language**: Markdown

#### PROJECT_SUMMARY.md
**Purpose**: High-level project overview

**Sections**:
- Deliverables list
- Features implemented
- Architecture summary
- Usage instructions
- Quality assurance
- Technical highlights

**Size**: ~300 lines
**Language**: Markdown

#### FILE_GUIDE.md
**Purpose**: This file - explains every file in the project

**Sections**:
- Project structure
- File descriptions
- File purposes
- File relationships

**Size**: ~200 lines
**Language**: Markdown

## 🔗 File Relationships

### Execution Flow
```
index.html
    ↓ loads
renderer.js
    ↓ calls via IPC
preload.js
    ↓ forwards to
main.js
    ↓ spawns
yt-dlp binary
```

### Build Flow
```
package.json
    ↓ configures
electron-builder
    ↓ bundles
main.js + preload.js + renderer.js + index.html + styles.css
    ↓ includes
binaries/yt-dlp
    ↓ creates
dist/VideoGrabber.dmg (or .exe)
```

### Documentation Flow
```
README.md (start here)
    ↓
QUICKSTART.md (quick setup)
    ↓
INSTALL.md (detailed setup)
    ↓
COMMANDS.md (command reference)
    ↓
ARCHITECTURE.md (technical details)
    ↓
FEATURES.md (feature list)
```

## 📊 File Statistics

| Category | Files | Lines |
|----------|-------|-------|
| Core Code | 5 | ~770 |
| Config | 2 | ~60 |
| Scripts | 2 | ~60 |
| Docs | 8 | ~1,700 |
| **Total** | **17** | **~2,590** |

## 🎯 Which File to Edit

### To Change UI Appearance
- **styles.css** - Colors, layout, animations
- **index.html** - Structure, elements

### To Change UI Behavior
- **renderer.js** - Button clicks, input handling

### To Change Backend Logic
- **main.js** - Download logic, yt-dlp integration

### To Add Security Features
- **preload.js** - IPC methods, security bridge

### To Change Build Settings
- **package.json** - Build config, dependencies

### To Update Documentation
- **README.md** - Main docs
- **QUICKSTART.md** - Quick guide
- **INSTALL.md** - Installation
- **ARCHITECTURE.md** - Technical details

## 🚀 Quick File Access

### Most Important Files (Start Here)
1. **README.md** - Read first
2. **QUICKSTART.md** - Setup guide
3. **main.js** - Backend code
4. **renderer.js** - Frontend code
5. **package.json** - Configuration

### For Development
- **main.js** - Backend logic
- **renderer.js** - Frontend logic
- **styles.css** - Styling

### For Building
- **package.json** - Build config
- **setup-binaries.sh** - Binary setup

### For Learning
- **ARCHITECTURE.md** - How it works
- **FEATURES.md** - What it does
- **FILE_GUIDE.md** - This file

## 💡 File Tips

### Don't Edit
- ❌ node_modules/ (auto-generated)
- ❌ dist/ (build output)
- ❌ package-lock.json (auto-generated)

### Safe to Edit
- ✅ All .js files
- ✅ index.html
- ✅ styles.css
- ✅ All .md files

### Edit with Caution
- ⚠️ package.json (breaks builds if wrong)
- ⚠️ preload.js (security implications)

## 🔍 Finding Things

### To Find a Feature
1. Check **FEATURES.md** for feature list
2. Look in **renderer.js** for UI features
3. Look in **main.js** for backend features

### To Find a Command
1. Check **COMMANDS.md** for command list
2. Check **package.json** for npm scripts

### To Find Documentation
1. Start with **README.md**
2. Use **FILE_GUIDE.md** (this file) to navigate
3. Check specific docs for details

---

**Pro Tip**: Use your editor's file search (Cmd+P or Ctrl+P) to quickly jump to any file! 🔍
