(function() {
  const savedTheme = localStorage.getItem('logicspark_theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  let session = null;
  let questions = [];
  let currentQuestionIndex = 0;
  let score = 0;
  let selectedAnswer = null;
  let hasAnswered = false;
  let quizStartTime = 0;
  let timerInterval = null;
  let quizAnswers = [];
  let quizConfig = { category: 'All', difficulty: 'Mixed', count: 10 };

  const els = {
    quizConfig: document.getElementById('quizConfig'),
    quizPlayer: document.getElementById('quizPlayer'),
    selectCategory: document.getElementById('selectCategory'),
    selectDifficulty: document.getElementById('selectDifficulty'),
    selectCount: document.getElementById('selectCount'),
    startBtn: document.getElementById('startQuizBtn'),
    configMsg: document.getElementById('configMessage'),
    questionCounter: document.getElementById('questionCounter'),
    questionDifficulty: document.getElementById('questionDifficulty'),
    currentScore: document.getElementById('currentScore'),
    timerDisplay: document.getElementById('timerDisplay'),
    progressFill: document.getElementById('progressFill'),
    questionText: document.getElementById('questionText'),
    questionImage: document.getElementById('questionImage'),
    questionImg: document.getElementById('questionImg'),
    hintToggle: document.getElementById('hintToggle'),
    questionHint: document.getElementById('questionHint'),
    hintText: document.getElementById('hintText'),
    optionsGrid: document.getElementById('optionsGrid'),
    feedback: document.getElementById('quizFeedback'),
    feedbackText: document.getElementById('feedbackText'),
    feedbackExplanation: document.getElementById('feedbackExplanation'),
    nextBtn: document.getElementById('nextBtn')
  };

  init();

  async function init() {
    session = getStoredSession();
    if (!session) {
      window.location.href = 'login.html';
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const view = params.get('view');
    const category = params.get('category');

    if (category) {
      els.selectCategory.value = category;
    }

    els.startBtn.addEventListener('click', function() {
      disableButton(els.startBtn);
      startQuiz();
    });
    els.nextBtn.addEventListener('click', nextQuestion);
    els.hintToggle.addEventListener('click', toggleHint);
  }

  async function startQuiz() {
    const category = els.selectCategory.value;
    const difficulty = els.selectDifficulty.value;
    const count = parseInt(els.selectCount.value);

    quizConfig = { category, difficulty, count };

    els.configMsg.innerHTML = '<div class="loader"><div class="spinner"></div><p>Loading questions...</p></div>';
    disableButton(els.startBtn);

    try {
      questions = await loadQuestions(category, difficulty, count);

      if (questions.length === 0) {
        els.configMsg.innerHTML = '<div class="form-message error">No questions available for this combination. Try another category or difficulty.</div>';
        enableButton(els.startBtn);
        return;
      }

      startQuizPlayer();
    } catch (e) {
      console.error('Error loading questions:', e);
      els.configMsg.innerHTML = '<div class="form-message error">Could not load questions. Please try again.</div>';
      enableButton(els.startBtn);
    }
  }

  async function loadQuestions(category, difficulty, count) {
    const client = getSupabase();
    let query = client
      .from('questions')
      .select('*')
      .eq('is_active', true);

    if (category !== 'All') {
      query = query.eq('category', category);
    }

    if (difficulty !== 'Mixed') {
      query = query.eq('difficulty', difficulty);
    }

    const { data, error } = await query;
    if (error) throw error;

    const shuffled = shuffleArray(data || []);
    return shuffled.slice(0, count);
  }

  function startQuizPlayer() {
    els.quizConfig.classList.add('hidden');
    els.quizPlayer.classList.remove('hidden');

    currentQuestionIndex = 0;
    score = 0;
    quizAnswers = [];
    quizStartTime = Date.now();

    els.currentScore.textContent = '0';
    els.timerDisplay.textContent = '0:00';

    timerInterval = setInterval(updateTimer, 1000);

    displayQuestion();
  }

  function displayQuestion() {
    const q = questions[currentQuestionIndex];
    hasAnswered = false;
    selectedAnswer = null;

    els.questionCounter.textContent = 'Question ' + (currentQuestionIndex + 1) + ' of ' + questions.length;
    els.progressFill.style.width = ((currentQuestionIndex / questions.length) * 100) + '%';
    els.currentScore.textContent = score;

    els.questionDifficulty.textContent = q.difficulty;
    els.questionDifficulty.className = 'difficulty-badge ' + q.difficulty.toLowerCase();

    els.questionText.textContent = q.question_text;

    if (q.image_url) {
      els.questionImage.classList.remove('hidden');
      els.questionImg.src = q.image_url;
      els.questionImg.alt = 'Question image';
    } else {
      els.questionImage.classList.add('hidden');
    }

    if (q.hint) {
      els.hintToggle.classList.remove('hidden');
      els.hintText.textContent = q.hint;
      els.questionHint.classList.add('hidden');
      els.hintToggle.textContent = '\uD83D\uDCA1 Show Hint';
    } else {
      els.hintToggle.classList.add('hidden');
      els.questionHint.classList.add('hidden');
    }

    els.feedback.classList.remove('show', 'correct', 'incorrect');
    els.feedbackText.textContent = '';
    els.feedbackExplanation.textContent = '';
    els.nextBtn.classList.add('hidden');

    const options = [
      { label: 'A', value: q.option_a },
      { label: 'B', value: q.option_b },
      { label: 'C', value: q.option_c },
      { label: 'D', value: q.option_d }
    ];

    let html = '';
    options.forEach(function(opt) {
      html += '<button class="option-btn" data-answer="' + opt.label + '" data-value="' + escapeHtml(opt.value) + '">';
      html += '<span class="option-label">' + opt.label + '</span>';
      html += '<span>' + escapeHtml(opt.value) + '</span>';
      html += '</button>';
    });

    els.optionsGrid.innerHTML = html;

    els.optionsGrid.querySelectorAll('.option-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        if (hasAnswered) return;
        selectAnswer(btn.dataset.answer);
      });
    });
  }

  function selectAnswer(answer) {
    hasAnswered = true;
    selectedAnswer = answer;

    const q = questions[currentQuestionIndex];
    const correctAnswer = q.correct_answer;
    const isCorrect = answer === correctAnswer;

    if (isCorrect) {
      score++;
      els.currentScore.textContent = score;
    }

    els.optionsGrid.querySelectorAll('.option-btn').forEach(function(btn) {
      btn.disabled = true;
      if (btn.dataset.answer === correctAnswer) {
        btn.classList.add('correct');
      }
      if (btn.dataset.answer === answer && !isCorrect) {
        btn.classList.add('incorrect');
      }
    });

    if (isCorrect) {
      els.feedback.className = 'quiz-feedback show correct';
      els.feedbackText.textContent = '\u2705 Correct! Well done!';
    } else {
      els.feedback.className = 'quiz-feedback show incorrect';
      els.feedbackText.textContent = '\u274C Incorrect. The correct answer is ' + correctAnswer + '.';
    }

    if (q.explanation) {
      els.feedbackExplanation.textContent = q.explanation;
    }

    quizAnswers.push({
      question_id: q.id,
      selected_answer: answer,
      correct_answer: correctAnswer,
      is_correct: isCorrect
    });

    if (currentQuestionIndex < questions.length - 1) {
      els.nextBtn.textContent = 'Next Question \u27A1';
    } else {
      els.nextBtn.textContent = 'See Results \u27A1';
    }
    els.nextBtn.classList.remove('hidden');
  }

  function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex >= questions.length) {
      finishQuiz();
      return;
    }

    displayQuestion();
  }

  async function finishQuiz() {
    clearInterval(timerInterval);
    const timeTaken = Math.floor((Date.now() - quizStartTime) / 1000);
    const correctAnswers = quizAnswers.filter(function(a) { return a.is_correct; }).length;
    const incorrectAnswers = quizAnswers.length - correctAnswers;
    const percentage = Math.round((correctAnswers / questions.length) * 100);

    try {
      const client = getSupabase();
      const { data: attempt, error: attemptError } = await client
        .from('quiz_attempts')
        .insert([{
          user_id: session.user.id,
          score: score,
          total_questions: questions.length,
          correct_answers: correctAnswers,
          incorrect_answers: incorrectAnswers,
          percentage: percentage,
          category: quizConfig.category,
          difficulty: quizConfig.difficulty,
          time_taken: timeTaken
        }])
        .select()
        .single();

      if (attemptError) throw attemptError;

      if (attempt && quizAnswers.length > 0) {
        const answerRows = quizAnswers.map(function(a) {
          return {
            attempt_id: attempt.id,
            question_id: a.question_id,
            selected_answer: a.selected_answer,
            correct_answer: a.correct_answer,
            is_correct: a.is_correct
          };
        });

        await client.from('quiz_answers').insert(answerRows);
      }

      const resultData = {
        attemptId: attempt ? attempt.id : null,
        score: score,
        total: questions.length,
        correct: correctAnswers,
        incorrect: incorrectAnswers,
        percentage: percentage,
        timeTaken: timeTaken,
        category: quizConfig.category,
        difficulty: quizConfig.difficulty,
        answers: quizAnswers,
        questions: questions
      };

      localStorage.setItem('logicspark_last_result', JSON.stringify(resultData));
      window.location.href = 'results.html';

    } catch (e) {
      console.error('Error saving quiz results:', e);

      const resultData = {
        attemptId: null,
        score: score,
        total: questions.length,
        correct: correctAnswers,
        incorrect: incorrectAnswers,
        percentage: percentage,
        timeTaken: timeTaken,
        category: quizConfig.category,
        difficulty: quizConfig.difficulty,
        answers: quizAnswers,
        questions: questions
      };

      localStorage.setItem('logicspark_last_result', JSON.stringify(resultData));
      window.location.href = 'results.html';
    }
  }

  function updateTimer() {
    const elapsed = Math.floor((Date.now() - quizStartTime) / 1000);
    els.timerDisplay.textContent = formatTime(elapsed);
  }

  function toggleHint() {
    if (els.questionHint.classList.contains('hidden')) {
      els.questionHint.classList.remove('hidden');
      els.hintToggle.textContent = '\uD83D\uDCA1 Hide Hint';
    } else {
      els.questionHint.classList.add('hidden');
      els.hintToggle.textContent = '\uD83D\uDCA1 Show Hint';
    }
  }

  function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  window.addEventListener('beforeunload', function() {
    if (hasAnswered && currentQuestionIndex < questions.length - 1) {
      return 'You have an ongoing quiz. Are you sure you want to leave?';
    }
  });
})();
