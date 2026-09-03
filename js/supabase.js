let supabaseInstance = null;

function getSupabase() {
  if (!supabaseInstance) {
    supabaseInstance = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return supabaseInstance;
}

async function getCurrentUser() {
  const client = getSupabase();
  const { data: { user } } = await client.auth.getUser();
  return user;
}

async function getCurrentSession() {
  const client = getSupabase();
  const { data: { session } } = await client.auth.getSession();
  return session;
}

async function getUserProfile(userId) {
  const client = getSupabase();
  const { data, error } = await client
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data;
}

function requireAuth() {
  const session = localStorage.getItem('logicspark_session');
  if (!session) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

function getStoredSession() {
  const session = localStorage.getItem('logicspark_session');
  return session ? JSON.parse(session) : null;
}

function storeSession(session) {
  localStorage.setItem('logicspark_session', JSON.stringify(session));
}

function clearSession() {
  localStorage.removeItem('logicspark_session');
}

function showLoading(containerId) {
  const el = document.getElementById(containerId);
  if (el) {
    el.innerHTML = '<div class="loader"><div class="spinner"></div><p>Loading...</p></div>';
  }
}

function showError(containerId, message) {
  const el = document.getElementById(containerId);
  if (el) {
    el.innerHTML = '<div class="empty-state"><span class="empty-icon">&#9888;</span><p>' + message + '</p></div>';
  }
}

function showEmpty(containerId, message) {
  const el = document.getElementById(containerId);
  if (el) {
    el.innerHTML = '<div class="empty-state"><span class="empty-icon">&#128269;</span><p>' + message + '</p></div>';
  }
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return mins + 'm ' + secs + 's';
}

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getBaseUrl() {
  return window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '/');
}
