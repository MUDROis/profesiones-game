# 🎓 Las Profesiones - ¿Qué quieres ser?

Интерактивный тренажер для изучения испанских профессий (A1) с переводом на английский (B1).

## 🎮 Что включено

### 1. Карточки (Flashcards)
- 12 профессий с эмодзи
- Примеры использования
- Озвучка слов (Web Speech API)
- Отметка "знаю" / "не знаю"

### 2. Quiz (Тест)
- 10 вопросов разных типов
- Перевод испанский → английский
- Перевод английский → испанский
- Система очков XP

### 3. Ролевая игра "День на работе"
- Вы профессию: **Bombero** (Пожарный)
- Ветвящиеся сценарии
- Интерактивные диалоги
- Испанские слова в тексте

## 📁 Структура файлов

```
profesiones-game/
├── index.html      # Основная структура
├── styles.css      # Стили
├── vocabulary.js   # Словарь и вопросы
├── roleplay.js     # Сценарии ролевой игры
└── app.js          # Логика приложения
```

## 🚀 Как добавить свой контент

### Добавить новую профессию

Откройте `vocabulary.js` и добавьте объект в массив `vocabulary`:

```javascript
{
    id: 13,
    spanish: "Tu profesión",
    english: "Your profession",
    emoji: "👨‍🎨",
    example: "Ejemplo en español.",
    gender: "m"  // m = masculino, f = femenino
}
```

### Добавить вопрос в Quiz

Добавьте объект в массив `quizQuestions`:

```javascript
{
    type: "translation",
    question: 'What is "Tu palabra" in English?',
    correctAnswer: "Your answer",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"]
}
```

### Добавить сценарий в Role Play

Добавьте объект в массив `roleplayScenarios` в `roleplay.js`:

```javascript
{
    id: "unique_id",
    location: "📍 Location",
    title: "Title",
    text: "Text with <strong>highlighted words</strong>.",
    options: [
        { text: "Choice 1", nextId: "next_scene_id" },
        { text: "Choice 2", nextId: "another_scene_id" }
    ]
}
```

## 🌐 Деплой на GitHub Pages

### Шаг 1: Создайте репозиторий
1. Перейдите на [github.com](https://github.com)
2. Нажмите "+" → "New repository"
3. Назовите: `profesiones-game`
4. Выберите "Public"
5. Нажмите "Create repository"

### Шаг 2: Загрузите файлы
1. Нажмите "uploading an existing file"
2. Перетащите все файлы из папки `profesiones-game`
3. Нажмите "Commit changes"

### Шаг 3: Включите GitHub Pages
1. Перейдите в "Settings" → "Pages"
2. В "Source" выберите "main branch"
3. Нажмите "Save"
4. Через 1-2 минуты сайт будет доступен по адресу:
   `https://ваш-логин.github.io/profesiones-game/`

## 🎯 Как использовать в классе

1. **Домашнее задание**: Ученики проходят карточки и тест дома
2. **На уроке**: Ролевая игра в парах или группах
3. **Оценка**: Смотрите XP в localStorage (или добавьте экспорт в CSV)

## 🛠 Технологии

- HTML5, CSS3, Vanilla JavaScript
- Web Speech API (озвучка)
- localStorage (сохранение прогресса)
- Mobile-first дизайн

## 📝 Лицензия

Свободное использование для образовательных целей.
