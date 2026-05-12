/* ════════════════════════════════════════════════════════════════════════════ */
/* KING OF GOLDS - MAIN APPLICATION FILE */
/* ════════════════════════════════════════════════════════════════════════════ */

let currentUser = null;
let leaderboardData = [...CONFIG.MOCK_DATA.LEADERBOARD];

// ════════════════ INITIALIZATION ════════════════
document.addEventListener('DOMContentLoaded', function() {
  initializeEventListeners();
  document.getElementById('footerYear').textContent = new Date().getFullYear();
  
  // Check if user is already logged in (from localStorage)
  const savedUser = localStorage.getItem('kogUser');
  if (savedUser) {
    try {
      currentUser = JSON.parse(savedUser);
      updateUIForLoggedInUser();
    } catch (e) {
      localStorage.removeItem('kogUser');
    }
  }
});

// ════════════════ EVENT LISTENERS ════════════════
function initializeEventListeners() {
  const hamburger = document.getElementById('hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', toggleHamburger);
  }

  // Leaderboard search and filter
  const searchLB = document.getElementById('searchLeaderboard');
  const filterPeriod = document.getElementById('filterPeriod');
  if (searchLB) {
    searchLB.addEventListener('input', (e) => {
      if (currentUser) renderLeaderboard(e.target.value);
    });
  }
  if (filterPeriod) {
    filterPeriod.addEventListener('change', () => {
      if (currentUser) renderLeaderboard();
    });
  }
}

// ════════════════ NAVIGATION ════════════════
function show(id, btn) {
  if (btn) {
    document.querySelectorAll('.mobile-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  document.querySelectorAll('.section').forEach(s => s.classList.remove('visible'));
  document.getElementById(id).classList.add('visible');
  window.scrollTo(0, 0);
}

function toggleHamburger() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
}

function closeMobileMenu() {
  document.getElementById('hamburger').classList.remove('active');
  document.getElementById('mobileMenu').classList.remove('active');
}

// ════════════════ LOGIN / LOGOUT ════════════════
function handleLoginClick() {
  if (currentUser) {
    logout();
  } else {
    loginWithDiscord();
  }
}

function loginWithDiscord() {
  const authURL = `https://discord.com/api/oauth2/authorize?client_id=${CONFIG.DISCORD.CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(CONFIG.DISCORD.REDIRECT_URI)}&scope=${CONFIG.DISCORD.SCOPE}`;
  window.location.href = authURL;
}

function setUserLoggedIn(username, userId, avatar) {
  currentUser = {
    username: username,
    userId: userId,
    avatar: avatar || username.charAt(0).toUpperCase()
  };

  // Save to localStorage for persistence
  localStorage.setItem('kogUser', JSON.stringify(currentUser));

  updateUIForLoggedInUser();
}

function updateUIForLoggedInUser() {
  const navRight = document.getElementById('navRight');
  navRight.innerHTML = `
    <div class="user-profile">
      <div class="user-avatar">${currentUser.avatar}</div>
      <div style="font-size: 0.9rem; color: var(--text);">${currentUser.username}</div>
      <button class="logout-btn" onclick="logout()">Logout</button>
    </div>
  `;

  // Update mobile menu
  const mobileLoginBtn = document.querySelector('.mobile-menu .mobile-tab:last-child');
  if (mobileLoginBtn) {
    mobileLoginBtn.textContent = '🚪 Logout';
    mobileLoginBtn.onclick = () => { logout(); closeMobileMenu(); };
  }

  // Update all sections with logged-in content
  renderDashboard();
  renderLeaderboard();
  renderProfile();
  renderSettings();
  renderFeedbackForm();
}

function logout() {
  currentUser = null;
  localStorage.removeItem('kogUser');

  const navRight = document.getElementById('navRight');
  navRight.innerHTML = '<button class="login-btn" onclick="handleLoginClick()">🔐 Login with Discord</button>';

  const mobileLoginBtn = document.querySelector('.mobile-menu .mobile-tab:last-child');
  if (mobileLoginBtn) {
    mobileLoginBtn.textContent = '🔐 Login with Discord';
    mobileLoginBtn.onclick = () => { handleLoginClick(); closeMobileMenu(); };
  }

  // Reset all sections to login prompts
  document.getElementById('dashboardContent').innerHTML = createLoginPrompt();
  document.getElementById('leaderboardContent').innerHTML = createLoginPrompt();
  document.getElementById('profileContent').innerHTML = createLoginPrompt();
  document.getElementById('settingsContent').innerHTML = createLoginPrompt();
  document.getElementById('feedbackContent').innerHTML = createLoginPrompt() + '<button class="hero-join" onclick="handleLoginClick()" style="margin-top: 1rem;">Login with Discord</button>';
}

// ════════════════ DASHBOARD ════════════════
function renderDashboard() {
  if (!currentUser) {
    document.getElementById('dashboardContent').innerHTML = createLoginPrompt();
    return;
  }

  const stats = CONFIG.MOCK_DATA.PROFILE;
  const html = `
    <div class="dashboard-grid">
      <div class="dashboard-card">
        <h3>📊 Your Stats</h3>
        <p><strong>Games Played:</strong> <span style="color: var(--accent); font-size: 1.2rem;">${stats.totalGames.toLocaleString()}</span></p>
        <p style="margin-top: 0.5rem;"><strong>Win Rate:</strong> <span style="color: var(--accent);">${stats.winRate}%</span></p>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${stats.winRate}%"></div>
        </div>
      </div>

      <div class="dashboard-card">
        <h3>🏆 Achievements</h3>
        <p>✓ Top 100 Player</p>
        <p>✓ Tournament Winner</p>
        <p>✓ Community Star</p>
      </div>

      <div class="dashboard-card">
        <h3>💎 Rewards</h3>
        <p><strong>Gold Tokens:</strong> <span style="color: var(--accent); font-size: 1.2rem;">${stats.goldTokens.toLocaleString()}</span></p>
        <p style="margin-top: 0.5rem;"><strong>Pending:</strong> <span style="color: var(--success);">${stats.pendingRewards}</span></p>
      </div>

      <div class="dashboard-card">
        <h3>🎮 Next Event</h3>
        <p><strong>${stats.nextEvent.name}</strong></p>
        <p style="color: var(--muted); font-size: 0.9rem;">Starts: ${stats.nextEvent.startsIn}</p>
        <p style="color: var(--accent); font-weight: 700;">Prize: ${stats.nextEvent.prizePool}</p>
      </div>

      <div class="dashboard-card">
        <h3>👥 Friends</h3>
        <p><strong>Online:</strong> <span style="color: var(--success);">${stats.onlineFriends}</span></p>
        <p style="margin-top: 0.5rem;"><strong>Total:</strong> <span style="color: var(--accent);">${stats.friends}</span></p>
      </div>

      <div class="dashboard-card">
        <h3>📈 Progression</h3>
        <p><strong>Level:</strong> <span style="color: var(--accent); font-size: 1.2rem;">${stats.level}</span></p>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${stats.levelProgress}%"></div>
        </div>
        <p style="font-size: 0.85rem; color: var(--muted);">${stats.levelProgress}% to next level</p>
      </div>
    </div>

    <div style="margin-top: 3rem; background: linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%); border: 1px solid var(--border); border-radius: 16px; padding: 2rem;">
      <h2 style="margin-bottom: 1.5rem;">📈 Session Stats</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1.5rem;">
        <div>
          <div style="color: var(--accent); font-size: 1.8rem; font-weight: 900;">${stats.stats.kills.toLocaleString()}</div>
          <div style="color: var(--muted); font-size: 0.9rem;">Total Kills</div>
        </div>
        <div>
          <div style="color: var(--accent); font-size: 1.8rem; font-weight: 900;">${stats.stats.assists.toLocaleString()}</div>
          <div style="color: var(--muted); font-size: 0.9rem;">Total Assists</div>
        </div>
        <div>
          <div style="color: var(--accent); font-size: 1.8rem; font-weight: 900;">${(stats.stats.kills / stats.stats.deaths).toFixed(2)}</div>
          <div style="color: var(--muted); font-size: 0.9rem;">K/D Ratio</div>
        </div>
        <div>
          <div style="color: var(--accent); font-size: 1.8rem; font-weight: 900;">${stats.stats.playtime}</div>
          <div style="color: var(--muted); font-size: 0.9rem;">Total Playtime</div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('dashboardContent').innerHTML = html;
}

// ════════════════ LEADERBOARD ════════════════
function renderLeaderboard(searchQuery = '') {
  if (!currentUser) {
    document.getElementById('leaderboardContent').innerHTML = createLoginPrompt();
    return;
  }

  let filtered = leaderboardData;

  if (searchQuery) {
    filtered = leaderboardData.filter(player =>
      player.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  let html = filtered.map((player, index) => {
    let medalEmoji = '';
    if (player.rank === 1) medalEmoji = '🥇';
    else if (player.rank === 2) medalEmoji = '🥈';
    else if (player.rank === 3) medalEmoji = '🥉';

    return `
      <div class="leaderboard-row" style="animation-delay: ${index * 0.05}s;">
        <div class="rank-badge top${player.rank || ''}">${medalEmoji} #${player.rank}</div>
        <div class="player-info">
          <div class="player-name">${player.name}</div>
          <div class="player-level">Level ${player.level}</div>
        </div>
        <div class="player-score">
          <div class="score-value">${player.score.toLocaleString()}</div>
          <div class="score-label">Points</div>
        </div>
      </div>
    `;
  }).join('');

  if (!html) {
    html = '<div class="login-prompt"><p>No players found matching your search.</p></div>';
  }

  document.getElementById('leaderboardContent').innerHTML = html;
}

// ════════════════ PROFILE ════════════════
function renderProfile() {
  if (!currentUser) {
    document.getElementById('profileContent').innerHTML = createLoginPrompt();
    return;
  }

  const stats = CONFIG.MOCK_DATA.PROFILE;
  const achievementsList = stats.achievements.map(ach => `
    <div class="achievement">
      <div class="achievement-icon">${ach.icon}</div>
      <div class="achievement-name">${ach.name}</div>
    </div>
  `).join('');

  const html = `
    <div class="profile-container">
      <div class="profile-sidebar">
        <div class="profile-avatar">${currentUser.avatar}</div>
        <div class="profile-name">${currentUser.username}</div>
        <div class="profile-tag">${stats.rank}</div>

        <div class="profile-stat">
          <div class="profile-stat-label">Level</div>
          <div class="profile-stat-value">${stats.level}</div>
        </div>
        <div class="profile-stat">
          <div class="profile-stat-label">Rank</div>
          <div class="profile-stat-value">#47</div>
        </div>
        <div class="profile-stat">
          <div class="profile-stat-label">Joined</div>
          <div class="profile-stat-value">${stats.joinDate}</div>
        </div>
        <div class="profile-stat">
          <div class="profile-stat-label">Friends</div>
          <div class="profile-stat-value">${stats.friends}</div>
        </div>
      </div>

      <div class="profile-content">
        <div class="profile-section">
          <h3>🏆 Achievements</h3>
          <div class="achievement-grid">${achievementsList}</div>
        </div>

        <div class="profile-section">
          <h3>📊 Detailed Stats</h3>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
            <div>
              <div style="color: var(--muted); font-size: 0.9rem;">Total Games</div>
              <div style="color: var(--accent); font-size: 1.5rem; font-weight: 700;">${stats.totalGames.toLocaleString()}</div>
            </div>
            <div>
              <div style="color: var(--muted); font-size: 0.9rem;">Win Rate</div>
              <div style="color: var(--accent); font-size: 1.5rem; font-weight: 700;">${stats.winRate}%</div>
            </div>
            <div>
              <div style="color: var(--muted); font-size: 0.9rem;">Total Kills</div>
              <div style="color: var(--accent); font-size: 1.5rem; font-weight: 700;">${stats.stats.kills.toLocaleString()}</div>
            </div>
            <div>
              <div style="color: var(--muted); font-size: 0.9rem;">Playtime</div>
              <div style="color: var(--accent); font-size: 1.5rem; font-weight: 700;">${stats.stats.playtime}</div>
            </div>
          </div>
        </div>

        <div class="profile-section">
          <h3>🎯 Recent Activity</h3>
          <p style="color: var(--muted);">✓ Won 5 consecutive matches</p>
          <p style="color: var(--muted);">✓ Reached Gold Tier II</p>
          <p style="color: var(--muted);">✓ Unlocked "Speed Runner" achievement</p>
        </div>
      </div>
    </div>
  `;

  document.getElementById('profileContent').innerHTML = html;
}

// ════════════════ SETTINGS ════════════════
function renderSettings() {
  if (!currentUser) {
    document.getElementById('settingsContent').innerHTML = createLoginPrompt();
    return;
  }

  const html = `
    <div class="settings-section">
      <h3>🎮 Game Preferences</h3>
      <div class="setting-item">
        <div class="setting-label">
          <div class="setting-name">Auto-Accept Invites</div>
          <div class="setting-desc">Automatically join game sessions from friends</div>
        </div>
        <div class="toggle-switch active" onclick="toggleSetting(this)"></div>
      </div>
      <div class="setting-item">
        <div class="setting-label">
          <div class="setting-name">Enable Voice Chat</div>
          <div class="setting-desc">Allow voice communication during matches</div>
        </div>
        <div class="toggle-switch active" onclick="toggleSetting(this)"></div>
      </div>
      <div class="setting-item">
        <div class="setting-label">
          <div class="setting-name">Show Player Stats</div>
          <div class="setting-desc">Display stats on opponent profiles</div>
        </div>
        <div class="toggle-switch active" onclick="toggleSetting(this)"></div>
      </div>
    </div>

    <div class="settings-section">
      <h3>🔔 Notifications</h3>
      <div class="setting-item">
        <div class="setting-label">
          <div class="setting-name">Tournament Notifications</div>
          <div class="setting-desc">Get notified about upcoming tournaments</div>
        </div>
        <div class="toggle-switch active" onclick="toggleSetting(this)"></div>
      </div>
      <div class="setting-item">
        <div class="setting-label">
          <div class="setting-name">Friend Requests</div>
          <div class="setting-desc">Notifications when friends want to play</div>
        </div>
        <div class="toggle-switch active" onclick="toggleSetting(this)"></div>
      </div>
      <div class="setting-item">
        <div class="setting-label">
          <div class="setting-name">Reward Notifications</div>
          <div class="setting-desc">Get alerted when rewards are available</div>
        </div>
        <div class="toggle-switch active" onclick="toggleSetting(this)"></div>
      </div>
    </div>

    <div class="settings-section">
      <h3>🌙 Appearance</h3>
      <div class="setting-item">
        <div class="setting-label">
          <div class="setting-name">Dark Mode</div>
          <div class="setting-desc">Use dark theme (currently enabled)</div>
        </div>
        <div class="toggle-switch active" onclick="toggleSetting(this)"></div>
      </div>
      <div class="setting-item">
        <div class="setting-label">
          <div class="setting-name">Compact View</div>
          <div class="setting-desc">Reduce spacing and padding</div>
        </div>
        <div class="toggle-switch" onclick="toggleSetting(this)"></div>
      </div>
    </div>

    <div class="settings-section">
      <h3>⚙️ Privacy & Security</h3>
      <div class="setting-item">
        <div class="setting-label">
          <div class="setting-name">Public Profile</div>
          <div class="setting-desc">Allow others to view your profile</div>
        </div>
        <div class="toggle-switch active" onclick="toggleSetting(this)"></div>
      </div>
      <div class="setting-item">
        <div class="setting-label">
          <div class="setting-name">Show Online Status</div>
          <div class="setting-desc">Let friends see when you're playing</div>
        </div>
        <div class="toggle-switch active" onclick="toggleSetting(this)"></div>
      </div>
    </div>
  `;

  document.getElementById('settingsContent').innerHTML = html;
}

function toggleSetting(element) {
  element.classList.toggle('active');
}

// ════════════════ FEEDBACK FORM ════════════════
function renderFeedbackForm() {
  if (!currentUser) {
    document.getElementById('feedbackContent').innerHTML = `
      <div class="login-prompt">
        <p>⚠️ Login required to send feedback</p>
        <button class="hero-join" onclick="handleLoginClick()">Login with Discord</button>
      </div>
    `;
    return;
  }

  const html = `
    <div class="feedback-form">
      <div class="form-group">
        <label>Your Username (Auto-filled)</label>
        <input type="text" value="${currentUser.username}" disabled style="background: var(--surface2); cursor: not-allowed;" />
      </div>
      
      <div class="form-group">
        <label>Feedback Type</label>
        <select id="fb-type">
          <option value="Suggestion">💡 Suggestion</option>
          <option value="Bug">🐛 Bug Report</option>
          <option value="Complaint">⚠️ Complaint</option>
          <option value="Compliment">❤️ Compliment</option>
          <option value="Partnership">🤝 Partnership</option>
          <option value="Other">📝 Other</option>
        </select>
      </div>
      
      <div class="form-group">
        <label>Your Message</label>
        <textarea id="fb-message" placeholder="Tell us what you think..." maxlength="1000"></textarea>
        <small style="color: var(--muted); margin-top: 0.3rem;">Character count: <span id="charCount">0</span>/1000</small>
      </div>
      
      <button class="submit-btn" onclick="sendFeedback()">Send Feedback</button>
      <div class="feedback-status" id="fb-status"></div>
    </div>
  `;

  document.getElementById('feedbackContent').innerHTML = html;

  // Character counter
  const textarea = document.getElementById('fb-message');
  if (textarea) {
    textarea.addEventListener('input', function() {
      document.getElementById('charCount').textContent = this.value.length;
    });
  }
}

async function sendFeedback() {
  const type = document.getElementById('fb-type')?.value;
  const message = document.getElementById('fb-message')?.value.trim();
  const status = document.getElementById('fb-status');
  const btn = event.target;

  if (!message) {
    showStatus(status, 'error', '❌ Please write a message');
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Sending...';
  showStatus(status, '', '');

  const payload = {
    username: 'King of Golds Feedback',
    embeds: [{
      title: `📬 New Feedback — ${type}`,
      color: 0xffd700,
      fields: [
        { name: 'From', value: currentUser.username, inline: true },
        { name: 'Type', value: type, inline: true },
        { name: 'Message', value: message || 'No message' }
      ],
      footer: { text: 'King of Golds Community' },
      timestamp: new Date().toISOString()
    }]
  };

  try {
    if (CONFIG.WEBHOOK_URL === 'YOUR_DISCORD_WEBHOOK_URL') {
      // No webhook configured - just show success locally
      showStatus(status, 'success', '✓ Feedback received! Thank you.');
    } else {
      const res = await fetch(CONFIG.WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        showStatus(status, 'success', '✓ Feedback sent! Thank you.');
        document.getElementById('fb-message').value = '';
        document.getElementById('fb-type').selectedIndex = 0;
        document.getElementById('charCount').textContent = '0';
      } else {
        throw new Error('Network response was not ok');
      }
    }
  } catch (e) {
    showStatus(status, 'error', '❌ Error sending feedback. Try again.');
  }

  btn.disabled = false;
  btn.textContent = 'Send Feedback';
}

function showStatus(element, className, message) {
  if (!element) return;
  element.className = `feedback-status ${className}`;
  element.textContent = message;
}

// ════════════════ UTILITIES ════════════════
function createLoginPrompt() {
  return `
    <div class="login-prompt">
      <div class="lock-icon">🔒</div>
      <h2>Login Required</h2>
      <p>Sign in with Discord to unlock premium features and track your progress.</p>
      <button class="hero-join" onclick="handleLoginClick()">Login with Discord</button>
    </div>
  `;
}

// ════════════════ SIMULATION ════════════════
// For testing purposes - automatically log in a demo user
function autoLoginForTesting() {
  setUserLoggedIn('TestPlayer', '123456789', '⭐');
}

// Uncomment the line below to auto-login for testing
// autoLoginForTesting();
