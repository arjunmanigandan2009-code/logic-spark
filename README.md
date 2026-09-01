# LogicSpark - Kids' Logical Reasoning Quiz App

LogicSpark is an educational quiz platform focused **exclusively on logical reasoning and aptitude-style reasoning questions** for competitive exam preparation. It is powered by Supabase for authentication and data storage.

## Features

- **Authentication**: Sign up (username + email + password) and login (email or username)
- **Quiz Selection**: Choose category, difficulty (Easy/Medium/Hard/Expert/Mixed), and number of questions (5/10/15/20)
- **Quiz Experience**: Numbered questions, progress bar, score tracking, optional timer, hints, and explanations
- **Scoring & Results**: Automatic scoring with accuracy percentage, time tracking, full answer review
- **Dashboard**: Track quizzes completed, questions attempted, correct answers, accuracy, best score, and recent results
- **Settings**: Light/Dark theme toggle (persisted locally), profile info, logout
- **Responsive**: Optimized for mobile, tablet, and desktop with bottom nav on mobile
- **Kid-friendly**: Clean modern design, large touch-friendly buttons, encouraging feedback

## Project Structure

```
/logicspark
    index.html          # Landing page
    login.html          # Login page
    signup.html         # Signup page
    dashboard.html      # Student dashboard
    quiz.html           # Quiz config + quiz player
    results.html        # Results + answer review
    settings.html       # Settings, profile, theme, logout

    /css
        style.css       # Main styles, theme variables, components
        responsive.css  # Responsive breakpoints

    /js
        config.js       # Supabase URL + anon key (config file)
        supabase.js     # Supabase client + shared helpers
        auth.js         # Login, signup, logout, profile helpers
        dashboard.js    # Dashboard stats loading
        quiz.js         # Quiz config, question loading, quiz logic
        results.js      # Results display and review
        settings.js     # Theme toggle, profile, logout

    /assets
        /images         # (Placeholder - add question images here)
        /icons          # (Placeholder)

    /database
        schema.sql      # Tables, RLS policies, triggers
        seed.sql        # Preloaded questions (100+)

    README.md
```

## Setup Guide

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. Once created, go to **Project Settings > API** to find your project URL and anon/public key.

### 2. Configure the Database

1. Open **SQL Editor** in your Supabase dashboard.
2. Run the contents of `database/schema.sql` to create the tables, RLS policies, and triggers.
3. Run the contents of `database/seed.sql` to load the preloaded questions.

### 3. Configure the Frontend

1. Open `js/config.js`.
2. Replace the placeholders:
   ```js
   const SUPABASE_URL = 'https://your-project.supabase.co';
   const SUPABASE_ANON_KEY = 'your-anon-key';
   ```
3. **Important**: Use the **anon/public key**, never the service-role key.

### 4. Enable Email Authentication

1. In Supabase dashboard, go to **Authentication > Providers**.
2. Ensure **Email** is enabled.
3. (Optional) Disable "Confirm email" for instant signup without email confirmation.

### 5. Run the App

Open `index.html` in a browser, or serve with any static file server:

```bash
# Python
python -m http.server 8000

# Node
npx serve
```

Then visit `http://localhost:8000`.

## Database Tables

### profiles
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Associated with auth user |
| username | text | Unique username |
| email | text | User email |
| created_at | timestamptz | Creation timestamp |

### questions
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| question_text | text | The question |
| category | text | Question category |
| difficulty | text | Easy / Medium / Hard / Expert |
| option_a-d | text | The 4 answer choices |
| correct_answer | text | A, B, C, or D |
| explanation | text | Answer explanation |
| hint | text | Optional hint |
| image_url | text | Optional image URL |
| is_active | boolean | Whether visible |
| created_at | timestamptz | Creation timestamp |

### quiz_attempts
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | FK to auth.users |
| score | integer | Total score |
| total_questions | integer | Questions in quiz |
| correct_answers | integer | Correct count |
| incorrect_answers | integer | Incorrect count |
| percentage | numeric | Accuracy % |
| category | text | Quiz category |
| difficulty | text | Quiz difficulty |
| time_taken | integer | Time in seconds |
| created_at | timestamptz | Creation timestamp |

### quiz_answers
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| attempt_id | uuid | FK to quiz_attempts |
| question_id | uuid | FK to questions |
| selected_answer | text | User's answer (A-D) |
| correct_answer | text | Correct answer (A-D) |
| is_correct | boolean | Whether answer was correct |

## Security

- **Row Level Security (RLS)** is enabled on all tables.
- Users can only access **their own** profiles, quiz attempts, and quiz answers.
- Questions are readable by all authenticated users (only active ones).
- Passwords are never stored in the database - handled by Supabase Auth.
- Only the anon key (public) is in the frontend code. Never expose the service-role key.

## Adding Questions

To add more questions, insert rows into the `questions` table:

```sql
insert into questions (question_text, category, difficulty, option_a, option_b, option_c, option_d, correct_answer, explanation, hint)
values (
  'Your question here',
  'Verbal Reasoning',
  'Easy',
  'Option A',
  'Option B',
  'Option C',
  'Option D',
  'A',
  'Explanation of the answer',
  'Optional hint'
);
```

For image-based questions, provide an `image_url` (host images somewhere accessible, e.g. Supabase Storage).

## Useful Tips

- For instant signup without email verification, go to **Authentication > Providers** in Supabase and toggle off "Confirm email".
- The seed data includes a broad range of questions. For a production app, add more questions per category and difficulty.
- Quiz progress is stored locally during a session; results are saved to Supabase when the quiz completes.

## License

All Rights Reserved. Developed by ARJUN M. This project is for educational purposes. Built for competitive exam preparation.
