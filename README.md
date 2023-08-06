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
      const inputSave = new InputSave();
    </script>
  </body>
</html>
```
В этом примере, все поля ввода будут сохранять свои значения в LocalStorage при вводе пользователем данных. При следующей загрузке страницы значения этих полей будут автоматически восстановлены из LocalStorage, если они были сохранены ранее.

Обратите внимание, что использование атрибута localstorage уникально и не должно повторяться среди различных полей формы, чтобы избежать конфликтов в LocalStorage.

## Использование в сборке
```bash
npm i --save input-save
```

```js
import { InputSave} from "input-save";
const inputSave = new InputSave();
```

## Api
### Метод `destroy`
Метод `destroy(form)` может принимать элемент формы для отчистки конкретной формы или использоваться `destroy()` без аргументов, чтобы отчистить все формы.

Используй метод `destroy` если хочешь удалить слушатели, очистить localStorage и сохранённые значения полей формы.

Например, после отправки формы

```html
<section>
  <h2>Авторизация</h2>
  <form id="form-name" action="" method="post">
    <label>
      Имя:
      <input type="text" name="name" data-localstorage="name">
    </label>
    <button type="submit">Отправить</button>
  </form>
</section>
```

```js
import { InputSave } from './путь-до-файла/input-save.min.js';

const inputSave = new InputSave();

const form = document.querySelector('#form-name');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  inputSave.destroy(form); /* удаляет слушатели, очищает localStorage и сохранённые значения инпутов у конкретной формы с id="form-name" */
});
```

Если нужно очистить любую форму или все, то вызывай `destroy()` без параметров
```js
form.addEventListener('submit', (event) => {
  event.preventDefault();

  inputSave.destroy(); /* удаляет слушатели, очищает localStorage и сохранённые значения инпутов */
});
```
