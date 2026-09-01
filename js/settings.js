(function() {
  init();

  async function init() {
    const session = getStoredSession();
    if (!session) {
      window.location.href = '';;
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

    const particleToggle = document.getElementById('particleToggle');
    particleToggle.checked = localStorage.getItem('logicspark_particles') !== 'off';
    particleToggle.addEventListener('change', function() {
      localStorage.setItem('logicspark_particles', particleToggle.checked ? 'on' : 'off');
      if (window.LogicSparkParticles) {
        window.LogicSparkParticles.refresh();
      }
    });

    logoutBtn.addEventListener('click', function() {
      disableButton(logoutBtn);
      signOut().catch(function() {
        clearSession();
        window.location.href = '';;
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
