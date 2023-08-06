# Input save 📥 💾
> Производительный и лёгкий (всего 666 байта) ES-модуль для сохранения и восстановления данных из полей ввода 

Добавьте для поля формы дата-атрибут `localstorage`, чтобы никогда не потерять данные пользователя.

```html
<input type="text" name="name" placeholder="Николай" data-localstorage="name">
```

Библиотека "Input save" запоминает все введёные данные пользователем во внутреннее хранилище браузера [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) и бережно их восстанавливает после перезагрузки страницы или неправильного завершения работы на странице.

## Использование в разметке
1. Скачай файл [input-save.min.js](./dist/input-save.min.js)
2. Положи файл в проект
3. Подключи к странице и запусти
```html
<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8">
    <title>Мой проект</title>
  </head>
  <body>
    ...  
    <script type="module">
      import { InputSave } from './путь-до-файла/input-save.min.js';
      new InputSave();
    </script>
  </body>
</html>
```
4. Для полей ввода добавь дата-атрибут `data-localstorage` с уникальным значением

> Библиотека автоматически игнорирует поля с типом `password`, чтобы пароль не записывался в `localStorage` в открытом виде.

```html
<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8">
    <title>Мой проект</title>
  </head>
  <body>
    <main>
      <section>
        Авторизация
        <form action="" method="post">
          <label>
            Имя:
            <input type="text" name="name" data-localstorage="name">
          </label>
        </form>
      </section>

      <section>
        Регистрация
        <form action="" method="post">
          <label>
            Имя:
            <input type="text" name="name" data-localstorage="reg-name">
          </label>
        </form>
      </section>
    </main>

    <script type="module">
      import { InputSave } from './путь-до-файла/input-save.min.js';
      new InputSave();
    </script>
  </body>
</html>
```
В этом примере, все поля ввода будут сохранять свои значения в LocalStorage при вводе пользователем данных. При следующей загрузке страницы значения этих полей будут автоматически восстановлены из LocalStorage, если они были сохранены ранее.

Обратите внимание, что использование атрибута localstorage уникально и не должно повторяться среди различных полей формы, чтобы избежать конфликтов в LocalStorage.

## Api
### Метод `destroy`
Используй метод `destroy()` если хочешь удалить слушатели, очистить localStorage и сохранённые значения инпутов.

Например, после отправки формы

```html
<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8">
    <title>Мой проект</title>
  </head>
  <body>
    <main>
      <section>
        Авторизация
        <form action="" method="post">
          <label>
            Имя:
            <input type="text" name="name" data-localstorage="name">
          </label>
          <button type="submit">Отправить</button>
        </form>
      </section>
    </main>
    
    <script type="module">
      import { InputSave } from './путь-до-файла/input-save.min.js';
      const inputSave = new InputSave();
      
      const form = document.querySelector('form');
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        inputSave.destroy(); /* удаляет слушатели, очищает localStorage и сохранённые значения инпутов */
      })
    </script>
  </body>
</html>
```
