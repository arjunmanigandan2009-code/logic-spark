(function() {
  init();

  async function init() {
    const session = getStoredSession();
    if (!session) {
      splashGo('login.html', 5000);
      return;
    }

    const themeToggle = document.getElementById('themeToggle');
    const logoutBtn = document.getElementById('logoutBtn');

    const savedTheme = localStorage.getItem('logicspark_theme');
    document.documentElement.setAttribute('data-theme', savedTheme === 'dark' ? 'dark' : 'light');
    themeToggle.checked = savedTheme === 'dark';

    themeToggle.addEventListener('change', function() {
      const theme = themeToggle.checked ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('logicspark_theme', theme);
    });

    logoutBtn.addEventListener('click', function() {
      disableButton(logoutBtn);
      signOut().catch(function() {
        clearSession();
        splashGo('login.html', 5000);
      });
    });

    loadProfile();
  }

  async function loadProfile() {
    try {
      const profile = await getProfile();
      const username = profile.username;
      const email = profile.email;

      document.getElementById('profileName').textContent = 'Welcome, ' + username + '!';
      document.getElementById('profileEmail').textContent = email;
      document.getElementById('profileAvatar').textContent = (username || '?').charAt(0).toUpperCase();
      document.getElementById('profileInfo').textContent = '@' + username;
    } catch (e) {
      document.getElementById('profileName').textContent = 'Welcome, Student!';
      document.getElementById('profileInfo').textContent = 'Profile';
    }
  }
})();
