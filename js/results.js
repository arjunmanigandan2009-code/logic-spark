(function() {
  const savedTheme = localStorage.getItem('logicspark_theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  init();

  function init() {
    const session = getStoredSession();
    if (!session) {
      window.location.href = 'login.html';
      return;
    }

    const resultData = localStorage.getItem('logicspark_last_result');
    if (!resultData) {
      document.getElementById('resultsContent').innerHTML =
        '<div class="empty-state"><span class="empty-icon">&#128528;</span><p>No quiz results found. Complete a quiz first!</p><a href="quiz.html" class="btn btn-primary mt-16">Start Quiz</a></div>';
      return;
    }

    const results = JSON.parse(resultData);
    displayResults(results);
  }

  function displayResults(results) {
    const container = document.getElementById('resultsContent');
    const pct = results.percentage;
    const timeStr = formatTime(results.timeTaken);

    let emoji, title, subtitle;
    if (pct >= 80) {
      emoji = '\uD83C\uDF1F';
      title = 'Great Job!';
      subtitle = 'You are doing amazing!';
    } else if (pct >= 60) {
      emoji = '\uD83D\uDC4D';
      title = 'Good Work!';
      subtitle = 'Keep practicing to improve!';
    } else if (pct >= 40) {
      emoji = '\uD83D\uDCAA';
      title = 'Keep Going!';
      subtitle = 'Practice makes perfect!';
    } else {
      emoji = '\uD83D\uDE80';
      title = 'Keep Learning!';
      subtitle = 'Every attempt makes you stronger!';
    }

    let barClass = 'high';
    if (pct < 50) barClass = 'low';
    else if (pct < 70) barClass = 'medium';

    let html = '';

    html += '<div class="results-summary">';
    html += '<div class="results-icon">' + emoji + '</div>';
    html += '<h1 class="results-title">' + title + '</h1>';
    html += '<p class="results-subtitle">' + subtitle + '</p>';

    html += '<div class="score-display">';
    html += '<div class="score-item"><span class="score-num">' + results.correct + '/' + results.total + '</span><span class="score-label">Score</span></div>';
    html += '<div class="score-item"><span class="score-num">' + pct + '%</span><span class="score-label">Accuracy</span></div>';
    html += '<div class="score-item"><span class="score-num">' + timeStr + '</span><span class="score-label">Time Taken</span></div>';
    html += '</div>';

    html += '<div class="accuracy-bar">';
    html += '<div class="bar"><div class="bar-fill ' + barClass + '" style="width: ' + pct + '%"></div></div>';
    html += '<small>' + pct + '% accuracy</small>';
    html += '</div>';

    if (results.category !== 'All' || results.difficulty !== 'Mixed') {
      html += '<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:16px;">';
      if (results.category !== 'All') {
        html += '<span class="category-badge">' + escapeHtml(results.category) + '</span>';
      }
      if (results.difficulty !== 'Mixed') {
        html += '<span class="difficulty-badge ' + results.difficulty.toLowerCase() + '">' + results.difficulty + '</span>';
      }
      html += '</div>';
    }

    html += '<div class="results-actions">';
    html += '<a href="quiz.html" class="btn btn-primary">Retry Quiz</a>';
    html += '<a href="quiz.html?view=categories" class="btn btn-secondary">Start New Quiz</a>';
    html += '<a href="dashboard.html" class="btn btn-outline">Home</a>';
    html += '</div>';
    html += '</div>';

    html += '<div class="review-section">';
    html += '<h2 class="page-title mb-24">Review Answers</h2>';

    if (results.questions && results.answers) {
      results.questions.forEach(function(q, i) {
        const answer = results.answers[i];
        if (!answer) return;

        const isCorrect = answer.is_correct;
        const answerClass = isCorrect ? 'correct-answer' : 'incorrect-answer';

        html += '<div class="review-item ' + answerClass + '">';
        html += '<div class="review-question">';
        html += '<span class="category-badge">' + escapeHtml(q.category) + '</span> ';
        html += '<span class="difficulty-badge ' + q.difficulty.toLowerCase() + '">' + q.difficulty + '</span>';
        html += '</div>';
        html += '<div class="review-question">' + (i + 1) + '. ' + escapeHtml(q.question_text) + '</div>';

        if (q.image_url) {
          html += '<div class="question-image mb-16"><img src="' + escapeHtml(q.image_url) + '" alt="Question image" style="max-height:200px;border-radius:8px;"></div>';
        }

        html += '<div class="review-answers">';
        var opts = [
          { label: 'A', value: q.option_a },
          { label: 'B', value: q.option_b },
          { label: 'C', value: q.option_c },
          { label: 'D', value: q.option_d }
        ];

        opts.forEach(function(opt) {
          var classes = 'review-answer';
          if (opt.label === answer.selected_answer && isCorrect) {
            classes += ' user-correct';
          } else if (opt.label === answer.selected_answer && !isCorrect) {
            classes += ' user-incorrect';
          }
          if (opt.label === q.correct_answer && !isCorrect) {
            classes += ' correct-reveal';
          }
          html += '<div class="' + classes + '">';
          html += opt.label + ') ' + escapeHtml(opt.value);
          if (opt.label === q.correct_answer) html += ' &#10003;';
          if (opt.label === answer.selected_answer && !isCorrect) html += ' &#10007;';
          html += '</div>';
        });
        html += '</div>';

        html += '<div style="margin-top:8px;font-size:0.85rem;color:var(--text-muted);">';
        html += 'Your answer: <strong>' + answer.selected_answer + '</strong>';
        if (!isCorrect) {
          html += ' | Correct answer: <strong style="color:var(--success);">' + q.correct_answer + '</strong>';
        }
        html += '</div>';

        if (q.explanation) {
          html += '<div class="review-explanation"><strong>Explanation:</strong> ' + escapeHtml(q.explanation) + '</div>';
        }

        html += '</div>';
      });
    }

    html += '</div>';

    container.innerHTML = html;
  }

  function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
})();
