# 📋 Kanban Board — Управление задачами на React

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/ru/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/ru/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/ru/docs/Web/CSS)
[![GitHub last commit](https://img.shields.io/github/last-commit/ТВОЙ_ЛОГИН/kanban-board)](https://github.com/ТВОЙ_ЛОГИН/kanban-board)
[![GitHub repo size](https://img.shields.io/github/repo-size/ТВОЙ_ЛОГИН/kanban-board)](https://github.com/ТВОЙ_ЛОГИН/kanban-board)

---

## 📖 Описание проекта

**Kanban Board** — это SPA-приложение для управления задачами, построенное на React. Проект реализует классическую канбан-доску с тремя колонками:

- **📌 К выполнению** — новые задачи
- **🔄 В процессе** — задачи в работе
- **✅ Готово** — выполненные задачи

Приложение создано в учебных целях для отработки навыков работы с React-хуками, компонентным подходом и хранением состояния в браузере.

---

## 🚀 Функционал

### Основные возможности:

- ➕ **Создание задач** — добавление новых задач через форму с заголовком, описанием и приоритетом.
- ✏️ **Редактирование** — изменение заголовка и описания задачи прямо в карточке.
- 🗑️ **Удаление** — удаление задач с модальным окном подтверждения.
- 🔀 **Перемещение** — изменение статуса задачи через выпадающий список (кнопки в карточке).
- 💾 **Сохранение** — все задачи автоматически сохраняются в LocalStorage при каждом изменении.
- 🔍 **Фильтрация** — поиск задач по заголовку.
- 📊 **Статистика** — отображение количества задач в каждой колонке.

### Дополнительные возможности:

- 🎨 **Приоритеты** — цветовая индикация (Красный — высокий, Желтый — средний, Зеленый — низкий)
- 🕐 **Дата создания** — каждая задача содержит метку времени
- ♻️ **Автосохранение** — данные не теряются при перезагрузке страницы

---

## 🛠️ Стек технологий

| Технология | Назначение |
|------------|------------|
| **React 18** | Библиотека для построения пользовательских интерфейсов |
| **React Hooks** | Управление состоянием (`useState`, `useEffect`) |
| **JavaScript (ES6+)** | Логика приложения |
| **CSS3** | Стилизация (Flexbox/Grid, адаптивная верстка) |
| **HTML5** | Семантическая разметка |
| **LocalStorage** | Хранение данных в браузере |

---

## ⚙️ Установка и запуск

### Требования:
- Node.js (версия 14 или выше)
- npm или yarn

### 1. Склонируйте репозиторий
```bash
git clone https://github.com/ТВОЙ_ЛОГИН/kanban-board.git
