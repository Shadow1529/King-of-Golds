export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'No authorization code' });
  }

  const CLIENT_ID = '1503065084237451476';
  const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
  const REDIRECT_URI = 'https://king-of-golds-xxxxx.vercel.app/api/auth'; // Replace xxxxx with your Vercel name

  try {
    // Exchange code for token
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      throw new Error('Failed to get access token');
    }

    // Get user info
    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const user = await userResponse.json();

    // Redirect back to main page with user info in URL
    res.redirect(`/?user=${encodeURIComponent(user.username)}&id=${user.id}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
