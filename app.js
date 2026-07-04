// ========================================
// App Logic - Las Profesiones (Teen Edition)
// ========================================

// === Game State ===
let gameState = {
    xp: 0,
    hearts: 5,
    streak: 0,
    currentCardIndex: 0,
    currentQuizIndex: 0,
    currentClueIndex: 0,
    knownWords: [],
    difficultWords: [],
    correctAnswers: 0,
    totalQuestions: 0,
    guessCorrect: 0,
    guessWrong: 0
};

// Current word for flashcard
let currentWord = vocabulary[0];

// Quiz state
let quizAnswers = [];
let currentClues = [];

// === Initialization ===
document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    updateUI();
    
    // Start button
    document.getElementById('start-btn').addEventListener('click', () => {
        showScreen('vocabulary-screen');
        updateFlashcard();
    });
    
    // Click on flashcard - flip
    document.getElementById('flashcard').addEventListener('click', (e) => {
        if (!e.target.closest('.btn-listen')) {
            document.getElementById('flashcard').classList.toggle('flipped');
        }
    });
    
    // Show vocabulary screen if there's saved progress
    if (gameState.knownWords.length > 0) {
        showScreen('vocabulary-screen');
        updateFlashcard();
    }
});

// === Navigation between screens ===
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    updateUI();
    window.scrollTo(0, 0);
}

// === Word Pronunciation ===
function speakWord(word) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'es-ES';
        utterance.rate = 0.75;
        utterance.pitch = 1;
        speechSynthesis.speak(utterance);
        
        // Visual feedback
        const btn = document.getElementById('listen-btn');
        btn.style.transform = 'scale(1.1)';
        setTimeout(() => btn.style.transform = 'scale(1)', 300);
    }
}

// === Flashcards ===
function updateFlashcard() {
    currentWord = vocabulary[gameState.currentCardIndex];
    
    document.getElementById('card-emoji').textContent = currentWord.emoji;
    document.getElementById('card-word').textContent = currentWord.spanish;
    document.getElementById('card-emoji-back').textContent = currentWord.emoji;
    document.getElementById('card-translation').textContent = currentWord.english;
    document.getElementById('card-example').textContent = `"${currentWord.example}"`;
    document.getElementById('card-example-en').textContent = `"${currentWord.exampleEn}"`;
    
    document.getElementById('card-counter').textContent = 
        `${gameState.currentCardIndex + 1} / ${vocabulary.length}`;
    
    const progress = (gameState.currentCardIndex + 1) / vocabulary.length * 100;
    document.getElementById('vocab-progress').style.width = `${progress}%`;
    
    document.getElementById('flashcard').classList.remove('flipped');
    
    updateDifficultyDots();
    
    const finishBtn = document.getElementById('finish-vocab-btn');
    finishBtn.style.display = gameState.knownWords.length >= 6 ? 'flex' : 'none';
}

function updateDifficultyDots() {
    const dotsContainer = document.getElementById('difficulty-dots');
    dotsContainer.innerHTML = '';
    
    for (let i = 0; i < vocabulary.length; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot';
        if (gameState.knownWords.includes(vocabulary[i].id)) {
            dot.classList.add('filled');
        }
        dotsContainer.appendChild(dot);
    }
}

function nextCard() {
    if (gameState.currentCardIndex < vocabulary.length - 1) {
        gameState.currentCardIndex++;
        updateFlashcard();
        saveProgress();
    }
}

function prevCard() {
    if (gameState.currentCardIndex > 0) {
        gameState.currentCardIndex--;
        updateFlashcard();
    }
}

function markKnow() {
    if (!gameState.knownWords.includes(currentWord.id)) {
        gameState.knownWords.push(currentWord.id);
        gameState.xp += 10;
        gameState.streak++;
    }
    gameState.difficultWords = gameState.difficultWords.filter(id => id !== currentWord.id);
    
    updateUI();
    saveProgress();
    
    if (gameState.currentCardIndex < vocabulary.length - 1) {
        gameState.currentCardIndex++;
        updateFlashcard();
    }
}

function markDifficult() {
    if (!gameState.difficultWords.includes(currentWord.id)) {
        gameState.difficultWords.push(currentWord.id);
    }
    gameState.knownWords = gameState.knownWords.filter(id => id !== currentWord.id);
    gameState.streak = 0;
    
    updateUI();
    saveProgress();
    
    if (gameState.currentCardIndex < vocabulary.length - 1) {
        gameState.currentCardIndex++;
        updateFlashcard();
    }
}

// === Quiz ===
function startQuiz() {
    quizAnswers = shuffleArray([...quizQuestions]).slice(0, 10);
    gameState.currentQuizIndex = 0;
    gameState.correctAnswers = 0;
    gameState.totalQuestions = quizAnswers.length;
    
    showScreen('quiz-screen');
    updateQuiz();
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function updateQuiz() {
    const question = quizAnswers[gameState.currentQuizIndex];
    
    document.getElementById('question-number').textContent = `Q${gameState.currentQuizIndex + 1}`;
    document.getElementById('quiz-question').querySelector('.question-text').textContent = question.question;
    
    const shuffledOptions = shuffleArray(question.options);
    
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';
    
    shuffledOptions.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.textContent = option;
        btn.onclick = () => checkAnswer(btn, option);
        optionsContainer.appendChild(btn);
    });
    
    document.getElementById('quiz-feedback').classList.remove('show');
    document.getElementById('next-question-btn').style.display = 'none';
    
    const progress = (gameState.currentQuizIndex + 1) / quizAnswers.length * 100;
    document.getElementById('quiz-progress').style.width = `${progress}%`;
}

function checkAnswer(btn, selectedAnswer) {
    const question = quizAnswers[gameState.currentQuizIndex];
    const isCorrect = selectedAnswer === question.correctAnswer;
    
    document.querySelectorAll('.quiz-option').forEach(b => {
        b.disabled = true;
    });
    
    if (isCorrect) {
        btn.classList.add('correct');
        gameState.correctAnswers++;
        gameState.xp += 20;
        gameState.streak++;
        
        document.getElementById('feedback-icon').textContent = '✓';
        document.getElementById('feedback-text').textContent = '¡Correcto! +20 XP';
        document.getElementById('quiz-feedback').className = 'quiz-feedback correct show';
    } else {
        btn.classList.add('incorrect');
        gameState.hearts--;
        gameState.streak = 0;
        
        document.querySelectorAll('.quiz-option').forEach(b => {
            if (b.textContent === question.correctAnswer) {
                b.classList.add('correct');
            }
        });
        
        document.getElementById('feedback-icon').textContent = '✗';
        document.getElementById('feedback-text').textContent = `The answer is: ${question.correctAnswer}`;
        document.getElementById('quiz-feedback').className = 'quiz-feedback incorrect show';
    }
    
    updateUI();
    saveProgress();
    document.getElementById('next-question-btn').style.display = 'flex';
}

function nextQuestion() {
    gameState.currentQuizIndex++;
    
    if (gameState.currentQuizIndex >= quizAnswers.length) {
        startGuessGame();
    } else {
        updateQuiz();
    }
}

// === Guess Game ===
function startGuessGame() {
    currentClues = shuffleArray([...guessClues]).slice(0, 8);
    gameState.currentClueIndex = 0;
    gameState.guessCorrect = 0;
    gameState.guessWrong = 0;
    
    showScreen('guess-screen');
    updateClue();
}

function updateClue() {
    const clue = currentClues[gameState.currentClueIndex];
    
    document.getElementById('clue-emoji').textContent = clue.emoji;
    document.getElementById('clue-text').textContent = clue.clueEs;
    document.getElementById('clue-hint').textContent = clue.clueEn;
    
    // Auto-speak the clue in Spanish
    setTimeout(() => speakClue(clue.clueEs), 500);
    
    const shuffledOptions = shuffleArray(clue.options);
    
    const optionsContainer = document.getElementById('guess-options');
    optionsContainer.innerHTML = '';
    
    shuffledOptions.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'guess-option';
        btn.textContent = option;
        btn.onclick = () => checkGuess(btn, option);
        optionsContainer.appendChild(btn);
    });
    
    document.getElementById('guess-correct').textContent = gameState.guessCorrect;
    document.getElementById('guess-wrong').textContent = gameState.guessWrong;
    
    document.getElementById('next-clue-btn').style.display = 'none';
    
    const progress = (gameState.currentClueIndex + 1) / currentClues.length * 100;
    document.getElementById('guess-progress').style.width = `${progress}%`;
}

function checkGuess(btn, selectedAnswer) {
    const clue = currentClues[gameState.currentClueIndex];
    const isCorrect = selectedAnswer === clue.answer;
    
    document.querySelectorAll('.guess-option').forEach(b => {
        b.disabled = true;
    });
    
    // Always speak the correct answer
    speakWord(clue.answer);
    
    if (isCorrect) {
        btn.classList.add('correct');
        gameState.guessCorrect++;
        gameState.xp += 25;
        gameState.streak++;
    } else {
        btn.classList.add('incorrect');
        gameState.guessWrong++;
        gameState.hearts--;
        gameState.streak = 0;
        
        document.querySelectorAll('.guess-option').forEach(b => {
            if (b.textContent === clue.answer) {
                b.classList.add('correct');
            }
        });
    }
    
    document.getElementById('guess-correct').textContent = gameState.guessCorrect;
    document.getElementById('guess-wrong').textContent = gameState.guessWrong;
    
    updateUI();
    saveProgress();
    document.getElementById('next-clue-btn').style.display = 'flex';
}

function nextClue() {
    gameState.currentClueIndex++;
    
    if (gameState.currentClueIndex >= currentClues.length) {
        showSummary();
    } else {
        updateClue();
    }
}

// Speak clue in Spanish
function speakClue(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-ES';
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
    }
}

// === Summary ===
function showSummary() {
    showScreen('summary-screen');
    
    document.getElementById('total-xp').textContent = gameState.xp;
    document.getElementById('correct-answers').textContent = gameState.correctAnswers + gameState.guessCorrect;
    document.getElementById('words-learned').textContent = gameState.knownWords.length;
    
    const vocabProgress = (gameState.knownWords.length / vocabulary.length) * 100;
    const quizProgress = (gameState.correctAnswers / gameState.totalQuestions) * 100;
    const guessProgress = (gameState.guessCorrect / currentClues.length) * 100;
    
    document.getElementById('vocab-bar').style.width = `${vocabProgress}%`;
    document.getElementById('quiz-bar').style.width = `${quizProgress}%`;
    document.getElementById('guess-bar').style.width = `${guessProgress}%`;
    
    document.getElementById('vocab-percent').textContent = `${Math.round(vocabProgress)}%`;
    document.getElementById('quiz-percent').textContent = `${Math.round(quizProgress)}%`;
    document.getElementById('guess-percent').textContent = `${Math.round(guessProgress)}%`;
    
    const summaryEmoji = document.getElementById('summary-emoji');
    const summaryTitle = document.getElementById('summary-title');
    
    if (gameState.xp >= 200) {
        summaryEmoji.textContent = '🏆';
        summaryTitle.textContent = '¡Increíble! You are a star!';
    } else if (gameState.xp >= 150) {
        summaryEmoji.textContent = '⭐';
        summaryTitle.textContent = '¡Muy bien! Great job!';
    } else if (gameState.xp >= 100) {
        summaryEmoji.textContent = '🎉';
        summaryTitle.textContent = '¡Buen trabajo! Keep going!';
    } else {
        summaryEmoji.textContent = '💪';
        summaryTitle.textContent = 'Good start! Practice more!';
    }
    
    saveProgress();
}

// === Progress (localStorage) ===
function saveProgress() {
    localStorage.setItem('profesionesProgress', JSON.stringify(gameState));
}

function loadProgress() {
    const saved = localStorage.getItem('profesionesProgress');
    if (saved) {
        const parsed = JSON.parse(saved);
        gameState = { ...gameState, ...parsed };
    }
}

// === Update UI ===
function updateUI() {
    document.getElementById('xp-display').textContent = `⭐ ${gameState.xp} XP`;
    document.getElementById('streak-display').textContent = `🔥 ${gameState.streak}`;
    document.getElementById('hearts-display').textContent = `❤️ ${gameState.hearts}`;
    
    if (gameState.hearts <= 2) {
        document.getElementById('hearts-display').style.color = '#FF6B6B';
    } else {
        document.getElementById('hearts-display').style.color = 'inherit';
    }
}

// === Restart Game ===
function restartGame() {
    gameState = {
        xp: 0,
        hearts: 5,
        streak: 0,
        currentCardIndex: 0,
        currentQuizIndex: 0,
        currentClueIndex: 0,
        knownWords: [],
        difficultWords: [],
        correctAnswers: 0,
        totalQuestions: 0,
        guessCorrect: 0,
        guessWrong: 0
    };
    
    localStorage.removeItem('profesionesProgress');
    showScreen('welcome-screen');
    updateUI();
}

// === Export functions for HTML ===
window.showScreen = showScreen;
window.speakWord = speakWord;
window.speakClue = speakClue;
window.nextCard = nextCard;
window.prevCard = prevCard;
window.markKnow = markKnow;
window.markDifficult = markDifficult;
window.startQuiz = startQuiz;
window.nextQuestion = nextQuestion;
window.nextClue = nextClue;
window.restartGame = restartGame;
