# MCP Laboratory - GitHub Pages Site

This directory contains the source code for the GitHub Pages site for the Microsoft Copilot Studio ❤️ MCP laboratory.

## 🎨 Design Theme

The site features a **cyber retro modern fluent** design with:

- **Cyber aesthetics**: Neon colors (cyan, magenta, yellow), grid backgrounds, particle effects
- **Retro elements**: Terminal-style code windows, monospace fonts, classic sci-fi vibes
- **Modern UX**: Smooth animations, responsive design, interactive elements
- **Fluent design**: Glass morphism, depth, motion, and Microsoft design principles

## 📁 Files

- `index.html` - Main HTML structure with semantic sections
- `style.css` - Comprehensive CSS with cyber theme, animations, and responsive design
- `script.js` - Interactive JavaScript for particles, animations, and UX enhancements
- `sw.js` - Service worker for offline capabilities (PWA)

## 🚀 Features

### Visual Effects
- Animated particle system with floating cyber particles
- Dynamic grid background with pulsing animation
- Smooth scroll animations and intersection observers
- Hover effects with 3D transforms and neon glows
- Code editor simulation with typing animations

### Interactive Elements
- Responsive navigation with smooth scrolling
- Interactive buttons with hover states and animations
- Tool cards with status indicators and hover effects
- Parallax scrolling effects
- Random glitch effects for cyber aesthetic

### Performance
- Optimized animations using `requestAnimationFrame`
- Efficient particle system with cleanup
- Responsive design for all screen sizes
- PWA capabilities with service worker

## 🎯 Sections

1. **Hero** - Main introduction with animated code window
2. **Features** - What is MCP and key benefits
3. **Business Tools** - Detailed tool descriptions with status indicators
4. **Getting Started** - Deployment options (local vs Azure)
5. **Footer** - Links and additional resources

## 🎨 Color Palette

```css
--primary-cyan: #00ffff      /* Main accent color */
--primary-magenta: #ff00ff   /* Secondary accent */
--primary-yellow: #ffff00    /* Highlight color */
--neon-blue: #0099ff         /* Interactive elements */
--neon-green: #00ff88        /* Success/active states */
--neon-purple: #aa00ff       /* Special highlights */
```

## 📱 Responsive Breakpoints

- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: 480px - 767px
- Small mobile: < 480px

## 🔧 GitHub Pages Setup

To enable GitHub Pages for this repository:

1. Go to repository Settings
2. Navigate to Pages section
3. Select source: "Deploy from a branch"
4. Choose branch: `main` (or your current branch)
5. Select folder: `/docs`
6. Save settings

The site will be available at: `https://dayour.github.io/copilot-dy-mcp/`

## 🛠️ Local Development

To run locally:

```bash
# Serve the docs folder with any static server
cd docs
python -m http.server 8000
# or
npx serve .
# or
php -S localhost:8000
```

Then open http://localhost:8000 in your browser.

## ♿ Accessibility

The site includes:
- Semantic HTML structure
- Proper heading hierarchy
- Alt texts for images
- Keyboard navigation support
- High contrast color combinations
- Screen reader friendly markup

## 🌟 Browser Support

Optimized for modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Legacy browser support for core functionality without advanced animations.