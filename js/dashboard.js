(function() {
  const savedTheme = localStorage.getItem('logicspark_theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  init();

  async function init() {
    const session = getStoredSession();
    if (!session) {
      splashGo('login.html', 3000);
      return;
    }

    let username = 'Student';
    if (session.profile && session.profile.username) {
      username = session.profile.username;
    } else {
      try {
        const profile = await getProfile();
        if (profile && profile.username) {
          username = profile.username;
        }
      } catch (e) {
        // use default
      }
    }

    document.getElementById('welcomeMessage').textContent = 'Welcome, ' + username + '!';
    document.title = 'Dashboard - LogicSpark';

    loadStats(session.user.id);
    loadRecentQuizzes(session.user.id);
  }

  async function loadStats(userId) {
    const client = getSupabase();
    try {
      const { data: attempts, error } = await client
        .from('quiz_attempts')
        .select('score, total_questions, correct_answers, incorrect_answers, percentage')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const totalQuizzes = attempts.length;
      const totalQuestions = attempts.reduce((sum, a) => sum + a.total_questions, 0);
      const totalCorrect = attempts.reduce((sum, a) => sum + a.correct_answers, 0);
      const accuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
      const bestScore = attempts.length > 0
        ? Math.max(...attempts.map(a => a.percentage))
        : 0;

      document.getElementById('statQuizzes').textContent = totalQuizzes;
      document.getElementById('statQuestions').textContent = totalQuestions;
      document.getElementById('statCorrect').textContent = totalCorrect;
      document.getElementById('statAccuracy').textContent = accuracy + '%';
      document.getElementById('statBest').textContent = bestScore > 0 ? Math.round(bestScore) + '%' : '--';
    } catch (e) {
      console.error('Error loading stats:', e);
    }
  }

  async function loadRecentQuizzes(userId) {
    const client = getSupabase();
    const container = document.getElementById('recentQuizzes');

    try {
      const { data: attempts, error } = await client
        .from('quiz_attempts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      if (!attempts || attempts.length === 0) {
        container.innerHTML = '<div class="empty-state"><span class="empty-icon">&#128218;</span><p>No quizzes completed yet. Start your first practice session!</p><a href="quiz.html" class="btn btn-primary mt-16">Start Practice</a></div>';
        return;
      }

      let html = '<ul class="quiz-list">';
      attempts.forEach(function(quiz) {
        const pct = Math.round(quiz.percentage);
        let scoreClass = 'needs-work';
        if (pct >= 70) scoreClass = 'good';
        else if (pct >= 40) scoreClass = 'okay';

        const date = new Date(quiz.created_at);
        const dateStr = date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
        const timeStr = quiz.time_taken ? formatTime(quiz.time_taken) : '';

        html += '<li class="quiz-list-item">';
        html += '<div class="quiz-list-info">';
        html += '<div class="quiz-list-category">' + escapeHtml(quiz.category) + '</div>';
        html += '<div class="quiz-list-meta">';
        html += '<span class="difficulty-badge ' + quiz.difficulty.toLowerCase() + '">' + quiz.difficulty + '</span>';
        html += ' &middot; ' + quiz.correct_answers + '/' + quiz.total_questions + ' correct';
        html += ' &middot; ' + dateStr;
        if (timeStr) html += ' &middot; ' + timeStr;
        html += '</div></div>';
        html += '<div class="quiz-list-score ' + scoreClass + '">' + pct + '%</div>';
        html += '</li>';
      });
      html += '</ul>';

      container.innerHTML = html;
    } catch (e) {
      container.innerHTML = '<div class="empty-state"><span class="empty-icon">&#128528;</span><p>Could not load quiz history.</p></div>';
    }
  }

  function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
})();
