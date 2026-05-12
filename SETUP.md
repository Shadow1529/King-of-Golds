# 🚀 King of Golds - Complete Setup Guide

**Complete guide for deploying to GitHub Pages with Discord OAuth**

---

## ⚡ Quick Setup (5 minutes)

### Step 1: Download Your Files

You have 4 main files:
- `index.html` - Main page
- `style.css` - Styling
- `app.js` - Functionality
- `config.js` - Configuration
- `.gitignore` - Git rules
- `README.md` - Documentation

### Step 2: Create a GitHub Repository

1. Go to [github.com](https://github.com)
2. Click **+ New** → **New repository**
3. Name it: `king-of-golds` (or your preferred name)
4. Click **Create repository**

### Step 3: Upload Your Files

#### Option A: Using Git (Recommended for Developers)

```bash
# Open Terminal/Command Prompt
cd king-of-golds

# Initialize git
git init

# Add all files
git add .

# Make first commit
git commit -m "Initial commit: King of Golds website"

# Rename branch to main (if needed)
git branch -M main

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/king-of-golds.git

# Push to GitHub
git push -u origin main
```

#### Option B: Using GitHub Web Interface (Easier for Beginners)

1. Go to your new repository on GitHub
2. Click **Add file** → **Upload files**
3. Drag and drop all your files
4. Click **Commit changes**

### Step 4: Enable GitHub Pages

1. Go to your repository **Settings**
2. Scroll to **Pages** section (left sidebar)
3. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: **main** / **root**
4. Click **Save**
5. Wait 2-3 minutes
6. Your site will be live at: `https://YOUR_USERNAME.github.io/king-of-golds/`

---

## 🔐 Discord OAuth Setup (Important!)

### Get Your Discord Client ID

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **New Application**
3. Name it: `King of Golds`
4. Agree to terms and click **Create**
5. Go to **General Information**
6. Copy your **CLIENT ID**

### Configure OAuth2

1. In Developer Portal, go to **OAuth2** (left sidebar)
2. Click **General** submenu
3. Under "REDIRECTS", click **Add Redirect**
4. Add this URL: `https://YOUR_USERNAME.github.io/king-of-golds/`
5. Click **Save**

### Update config.js

1. Open `config.js` in your repository
2. Find this line:
   ```javascript
   CLIENT_ID: 'YOUR_DISCORD_CLIENT_ID',
   ```
3. Replace `YOUR_DISCORD_CLIENT_ID` with your actual Client ID from step 6
4. Commit and push the changes:
   ```bash
   git add config.js
   git commit -m "Add Discord Client ID"
   git push
   ```

---

## 💬 Discord Webhook Setup (Optional - for Feedback)

### Create a Discord Webhook

1. Open your Discord server
2. Go to a channel (like `#feedback` or `#announcements`)
3. Right-click channel → **Edit Channel**
4. Go to **Integrations** → **Webhooks**
5. Click **New Webhook**
6. Copy the **Webhook URL**

### Update config.js with Webhook

1. Open `config.js`
2. Find:
   ```javascript
   WEBHOOK_URL: 'YOUR_DISCORD_WEBHOOK_URL',
   ```
3. Replace with your webhook URL
4. Save and commit:
   ```bash
   git add config.js
   git commit -m "Add Discord webhook"
   git push
   ```

---

## 📝 Making Changes After Deployment

### Using Git (Terminal)

```bash
# Make your changes in the files
# Then:

git add .
git commit -m "Description of changes"
git push
```

Your site updates automatically in 30 seconds!

### Using GitHub Web Interface

1. Go to your repository
2. Click on the file to edit
3. Click the pencil icon ✏️
4. Make changes
5. Click **Commit changes**

---

## ✅ Testing Your Site

### Before Going Live

1. Open your site: `https://YOUR_USERNAME.github.io/king-of-golds/`
2. Test the **Login with Discord** button
3. Try logging in
4. Check if dashboard loads
5. Test the feedback form
6. Check mobile responsiveness

### Common Issues

| Issue | Solution |
|-------|----------|
| Login button doesn't work | Check Client ID in config.js |
| Redirect error | Make sure redirect URL matches exactly in Discord settings |
| Feedback not sending | Check webhook URL in config.js (can be left as placeholder) |
| Styles not loading | Make sure style.css is in the same folder as index.html |
| Scripts not working | Check browser console (F12) for errors |

---

## 🎯 File Organization

Your GitHub repository should look like this:

```
king-of-golds/
├── index.html          ← Main file (open this in browser)
├── style.css           ← Styling
├── app.js              ← Logic
├── config.js           ← Configuration (UPDATE THIS!)
├── .gitignore          ← Git ignore
├── README.md           ← Project info
└── SETUP.md            ← This file
```

**All files must be in the root folder (not in subfolders)**

---

## 📱 Mobile Testing

To test on your phone:

1. Get your GitHub Pages URL
2. Open it on your phone
3. Should work perfectly!

Or use your computer's DevTools:
- Chrome/Edge: Press **F12** → Click device icon (top-left)
- Firefox: Press **F12** → Click responsive design mode

---

## 🔄 How to Update Your Site

### Quick Steps for Any Change

1. **Edit files** on your computer or GitHub web interface
2. **Commit changes** (save to GitHub)
3. **Wait 30 seconds** (GitHub Pages rebuilds)
4. **Refresh your browser** (Ctrl+F5 or Cmd+Shift+R)

### Example: Changing Server Name

1. Open `index.html`
2. Find `<div class="nav-logo">👑 KING OF GOLDS</div>`
3. Change to your server name
4. Commit and push
5. Done!

---

## 🚀 Advanced: Using Git Locally

### First Time Setup

```bash
# Download and install Git from git-scm.com
# Then:

# Clone your repository
git clone https://github.com/YOUR_USERNAME/king-of-golds.git

# Go to folder
cd king-of-golds

# Make changes to files
# Then:

git status                    # See what changed
git add .                     # Stage changes
git commit -m "Your message"  # Commit changes
git push                      # Upload to GitHub
```

### Common Git Commands

```bash
git status              # See current status
git add .              # Add all changes
git commit -m "msg"    # Save changes locally
git push               # Upload to GitHub
git pull               # Download latest from GitHub
git log                # See commit history
```

---

## 🎨 Customization Guide

### Change Colors

Open `style.css` and find `:root` section:

```css
:root {
  --accent: #ffd700;        /* Change gold color */
  --bg: #0a0a0d;            /* Change background */
  --text: #f0f0f5;          /* Change text color */
  /* ... other colors ... */
}
```

### Change Server Name

In `index.html`, find:
```html
<div class="nav-logo">👑 KING OF GOLDS</div>
```

And in `config.js`:
```javascript
NAME: 'King of Golds',
DESCRIPTION: 'The World\'s Premier Roblox Community',
```

### Add Your Discord Invite Link

In `config.js`:
```javascript
INVITE_URL: 'https://discord.gg/YOUR_INVITE_CODE',
```

---

## 🐛 Debugging

### Check Browser Console

1. Press **F12** or **Ctrl+Shift+I**
2. Go to **Console** tab
3. Look for red error messages
4. Common errors:
   - `CLIENT_ID not configured` - Update config.js
   - CORS error - Check webhook URL
   - 404 error - File not found

### Common Errors & Fixes

```
❌ "CLIENT_ID not configured"
✅ Update config.js with your Discord Client ID

❌ "Cannot reach Discord"
✅ Check internet connection and Discord settings

❌ "Redirect URI mismatch"
✅ Make sure GitHub Pages URL matches Discord settings exactly

❌ Styles not loading
✅ Make sure style.css is in root folder with index.html
```

---

## 💡 Pro Tips

1. **Use .gitignore** - Prevents accidental uploads of sensitive files
2. **Commit often** - Makes it easy to revert bad changes
3. **Clear cache** - Use Ctrl+Shift+R to force refresh
4. **Test mobile** - Always check on phone before sharing
5. **Read error messages** - They tell you what's wrong!

---

## 📚 Additional Resources

- [GitHub Pages Docs](https://pages.github.com/)
- [Discord Developer Docs](https://discord.com/developers/docs)
- [Git Tutorial](https://git-scm.com/book)
- [Web Development MDN](https://developer.mozilla.org/en-US/docs/web/)

---

## 🎯 Next Steps

1. ✅ Set up GitHub repository
2. ✅ Upload files to GitHub
3. ✅ Get Discord Client ID
4. ✅ Update config.js
5. ✅ Enable GitHub Pages
6. ✅ Test login
7. ✅ Share with community!

---

## ❓ Questions?

**Still stuck?** Try:
1. Check the error in browser console (F12)
2. Re-read the relevant section above
3. Make sure all files are in the root folder
4. Verify Discord settings match exactly
5. Clear browser cache (Ctrl+Shift+Delete)

---

**Happy deploying! Your $100K website is ready to impress! 🚀**
