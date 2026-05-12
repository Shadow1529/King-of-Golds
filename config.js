/* ════════════════════════════════════════════════════════════════════════════ */
/* KING OF GOLDS - CONFIGURATION FILE */
/* ════════════════════════════════════════════════════════════════════════════ */

const CONFIG = {
  // Discord OAuth Settings
  DISCORD: {
    CLIENT_ID: 'YOUR_DISCORD_CLIENT_ID', // Replace with your Discord Client ID
    REDIRECT_URI: window.location.origin + window.location.pathname,
    SCOPE: 'identify email guilds',
  },

  // Discord Webhook for Feedback (optional - for production)
  WEBHOOK_URL: 'YOUR_DISCORD_WEBHOOK_URL', // Replace with your Discord webhook URL

  // Server Settings
  SERVER: {
    NAME: 'King of Golds',
    DESCRIPTION: 'The World\'s Premier Roblox Community',
    INVITE_URL: 'https://discord.gg/YOUR_INVITE_CODE', // Replace with your Discord invite
  },

  // Mock Data for Testing (remove in production)
  MOCK_DATA: {
    LEADERBOARD: [
      { rank: 1, name: 'ShadowKing', level: 50, score: 125000, avatar: '👤' },
      { rank: 2, name: 'GoldenAce', level: 48, score: 118500, avatar: '⚔️' },
      { rank: 3, name: 'NovaStrike', level: 47, score: 112300, avatar: '🌟' },
      { rank: 4, name: 'PhantomFury', level: 46, score: 108900, avatar: '👻' },
      { rank: 5, name: 'CrimsonBlade', level: 45, score: 104200, avatar: '🔴' },
      { rank: 6, name: 'VoidWalker', level: 44, score: 99500, avatar: '⚫' },
      { rank: 7, name: 'EchoLegend', level: 43, score: 95000, avatar: '🎵' },
      { rank: 8, name: 'IceForce', level: 42, score: 90200, avatar: '❄️' },
      { rank: 9, name: 'ThunderKing', level: 41, score: 85600, avatar: '⚡' },
      { rank: 10, name: 'InfernoMaster', level: 40, score: 81000, avatar: '🔥' },
    ],

    PROFILE: {
      username: 'YourUsername',
      level: 47,
      rank: 'Gold Tier',
      joinDate: 'January 2024',
      totalGames: 2847,
      winRate: 68.5,
      ranking: 'Gold II',
      goldTokens: 12500,
      pendingRewards: '$250',
      friends: 342,
      onlineFriends: 18,
      levelProgress: 73,
      achievements: [
        { icon: '🏆', name: 'Champion' },
        { icon: '🎯', name: 'Marksman' },
        { icon: '⚡', name: 'Speed Runner' },
        { icon: '🛡️', name: 'Tank Master' },
        { icon: '✨', name: 'Rare Finder' },
        { icon: '🎪', name: 'Events Hero' },
      ],
      stats: {
        kills: 45000,
        deaths: 12000,
        assists: 8900,
        playtime: '1,244 hours',
      },
      nextEvent: {
        name: 'King of Golds Championship',
        startsIn: 'Tomorrow 6PM UTC',
        prizePool: '$50,000',
      },
    }
  }
};

// Verify Configuration
window.addEventListener('load', function() {
  if (CONFIG.DISCORD.CLIENT_ID === 'YOUR_DISCORD_CLIENT_ID') {
    console.warn('⚠️ Discord Client ID not configured. Please update config.js');
  }
});
