async function signUp(username, email, password) {
  const client = getSupabase();

  const { data, error } = await client.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        username: username
      }
    }
  });

  if (error) throw error;

  if (data.user) {
    const profile = {
      id: data.user.id,
      username: username,
      email: email
    };

    const { error: profileError } = await client
      .from('profiles')
      .upsert(profile, { onConflict: 'id' });

    if (profileError) {
      console.error('Profile creation error:', profileError);
    }

    if (data.session) {
      storeSession({
        user: data.user,
        profile: { username: username, email: email }
      });
    }
  }

  return data;
}

async function signIn(emailOrUsername, password) {
  const client = getSupabase();
  let email = emailOrUsername;

  if (!emailOrUsername.includes('@')) {
    const { data: profiles, error: lookupError } = await client
      .from('profiles')
      .select('email')
      .eq('username', emailOrUsername)
      .single();

    if (lookupError || !profiles) {
      throw new Error('No account found with that username.');
    }
    email = profiles.email;
  }

  const { data, error } = await client.auth.signInWithPassword({
    email: email,
    password: password
  });

  if (error) throw error;

  let profile = null;
  if (data.user) {
    try {
      profile = await getUserProfile(data.user.id);
    } catch (e) {
      profile = { username: emailOrUsername, email: email };
    }
  }

  storeSession({
    user: data.user,
    profile: profile
  });

  return { user: data.user, profile };
}

async function signOut() {
  const client = getSupabase();
  await client.auth.signOut();
  clearSession();
  window.location.href = 'login.html';
}

async function getProfile() {
  const session = getStoredSession();
  if (!session) return null;

  if (session.profile) return session.profile;

  try {
    const profile = await getUserProfile(session.user.id);
    session.profile = profile;
    storeSession(session);
    return profile;
  } catch (e) {
    return { username: 'Student', email: session.user.email };
  }
}

async function ensureAuth() {
  const session = getStoredSession();
  if (!session) {
    window.location.href = 'login.html';
    return null;
  }
  return session;
}

function disableButton(btn) {
  btn.disabled = true;
  btn.classList.add('btn-loading');
}

function enableButton(btn) {
  btn.disabled = false;
  btn.classList.remove('btn-loading');
}

function showFieldError(fieldId, message) {
  const el = document.getElementById(fieldId);
  if (el) {
    let err = el.parentElement.querySelector('.field-error');
    if (!err) {
      err = document.createElement('div');
      err.className = 'field-error';
      el.parentElement.appendChild(err);
    }
    err.textContent = message;
  }
}

function clearFieldErrors(formId) {
  const form = document.getElementById(formId);
  if (form) {
    form.querySelectorAll('.field-error').forEach(e => e.remove());
  }
}
