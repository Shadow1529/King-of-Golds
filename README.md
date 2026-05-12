# 👑 King of Golds - Premium Roblox Community Platform

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-active-brightgreen.svg)]()

A **$100K enterprise-grade** web platform for the King of Golds Roblox community. Built with modern web technologies for optimal performance, user experience, and engagement.

## 🌟 Features

### 🎮 Core Features
- **Premium Dashboard** - Real-time stats, achievements, and progress tracking
- **Global Leaderboard** - Searchable, filterable player rankings
- **Player Profiles** - Detailed stats, achievements, and activity logs
- **Tournament System** - Upcoming events and prize pool information
- **Feedback System** - Discord webhook integration for community input

### 🔐 Security & Authentication
- **Discord OAuth 2.0** - Seamless login with Discord profile
- **Auto-filled Feedback** - Username automatically filled on login
- **Session Persistence** - Remember login across sessions (localStorage)
- **Protected Features** - All premium features require authentication

### ✨ Quality of Life
- **Responsive Design** - Mobile, tablet, and desktop optimized
- **Smooth Animations** - Professional transitions and micro-interactions
- **Dark Mode** - Eye-friendly dark theme (more themes coming)
- **Search & Filter** - Find players and filter tournaments quickly
- **Real-time Updates** - Live stats and leaderboard updates

### 📊 Advanced Features
- **Detailed Stats** - Games played, win rate, K/D ratio, playtime
- **Progress Tracking** - Level progression with visual indicators
- **Achievement System** - Unlock badges and special rewards
- **Settings Panel** - Customize notifications, appearance, privacy
- **Quick Navigation** - Hamburger menu on mobile, tabs on desktop

## 🚀 Quick Start

### For Users
1. Visit the deployed site: `https://YOUR_USERNAME.github.io/king-of-golds/`
2. Click "Login with Discord"
3. Authorize the application
4. Explore your dashboard!

### For Developers
See [SETUP.md](SETUP.md) for detailed setup instructions.

## 📁 Project Structure

```
king-of-golds/
├── index.html          # Main HTML file
├── style.css           # Premium CSS styling (1000+ lines)
├── config.js           # Configuration and mock data
├── app.js              # Main application logic
├── .gitignore          # Git ignore rules
├── README.md           # This file
├── SETUP.md            # Setup instructions
└── LICENSE             # MIT License
```

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3 (modern CSS features)
- **JavaScript**: Vanilla JS (no frameworks needed)
- **Authentication**: Discord OAuth 2.0
- **Deployment**: GitHub Pages
- **Styling**: Custom CSS with CSS variables
- **Responsive**: Mobile-first approach

## 📋 File Breakdown

| File | Size | Purpose |
|------|------|---------|
| `index.html` | ~5 KB | Main page structure |
| `style.css` | ~25 KB | All styling & animations |
| `app.js` | ~20 KB | Core functionality |
| `config.js` | ~4 KB | Configuration & mock data |

## 🔧 Configuration

Before deploying, update these files:

### 1. config.js
```javascript
const CONFIG = {
  DISCORD: {
    CLIENT_ID: 'YOUR_DISCORD_CLIENT_ID',
    // ... other settings
  },
  WEBHOOK_URL: 'YOUR_DISCORD_WEBHOOK_URL',
  SERVER: {
    INVITE_URL: 'https://discord.gg/YOUR_INVITE_CODE',
  }
};
```

### 2. Get Discord Credentials
- Go to [Discord Developer Portal](https://discord.com/developers/applications)
- Create a new application
- Copy the **Client ID**
- Set up OAuth2 redirect

See [SETUP.md](SETUP.md) for detailed instructions.

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 🎨 Design Features

### Color Palette
- **Primary**: Gold (#ffd700) - Prestige & Excellence
- **Background**: Dark (#0a0a0d) - Professional & Focused
- **Accent**: Purple (#7b68ee) - Energy & Creativity
- **Text**: Light (#f0f0f5) - High Contrast

### Animations
- Smooth section transitions
- Card hover effects with glow
- Leaderboard row animations
- Progress bar fills
- Login prompt bounce effect

## 📊 Mock Data

The site includes realistic mock data for testing:
- 10 top players with stats
- Complete player profile data
- Achievement system
- Tournament information
- Real-time stats

Enable auto-login for testing by uncommenting in `app.js`:
```javascript
// autoLoginForTesting();
```

## 🔐 Discord Integration

### Login Flow
1. User clicks "Login with Discord"
2. Redirected to Discord OAuth approval
3. Discord redirects back with authorization code
4. User profile loaded and stored
5. UI updates to show logged-in state

### Feedback System
- Auto-filled with user's Discord username
- Sends to Discord webhook
- Formatted as embedded messages
- Includes type, message, and timestamp

## 📈 Future Enhancements

- [ ] Backend API integration
- [ ] Real database (MongoDB/Firebase)
- [ ] Tournament bracket system
- [ ] Streaming integration (Twitch)
- [ ] Item trading system
- [ ] Guild management tools
- [ ] Advanced analytics
- [ ] Payment integration

## 🤝 Community

- **Discord**: [Join our server](#)
- **Twitter**: [@KingOfGolds](#)
- **YouTube**: [King of Golds Channel](#)

## 📜 License

MIT License - see [LICENSE](LICENSE) file for details

## 💬 Support

For issues or questions:
1. Check [SETUP.md](SETUP.md)
2. Open an issue on GitHub
3. Join our Discord server

## 👨‍💻 Made By

King of Golds Development Team

---

**Made with ❤️ for the Roblox community**

*Enterprise-grade quality. Community-focused development.*
