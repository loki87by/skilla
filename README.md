# SkillaJs

## Техническое задание

<details>

### Требуется взять из фигмы проект и разработать часть на реакте

### Данные можно взять с бека по апи [отсюда:](https://api.skilla.ru/testapi)

### Тестовый токен — testtoken

### Часть из фигмы, которую берем в разработку

* листинг звонков с выборкой по датам
* выбор входящих, исходящих или всех звонков
* проигрывание записи (если есть)
* сортировка на клиенте
* меню - статика без функционала, активный раздел "Звонки"

### [Фигма тут:](https://www.figma.com/file/ZMa8t9WrBvtwL2rigfrKHS/Test-task-for-the-developer-2023?type=design&node-id=0%3A1&t=VqpmXS3vFW140ZeN-1)

</details>

## Реализованный функционал

<details>

## *В виду того, что я месяц находился в командировке, без прямого доступа к ПК,*

## *большую часть времени приходилось работать удаленно с телефона.*

## *Из-за этого пропустил строку: "Часть из фигмы, которую берем в разработку"*

## *По этому функционал немного превышает необходимый минимум. Далее подробно:*

* листинг звонков с выборкой по датам.
* **Тк не было конкретных указаний, добавлен календарь для выбора произвольной даты**
* выбор входящих, исходящих или всех звонков
* **Аналогично настроены остальные фильтры из фигмы**
* проигрывание записи (если есть)
* **А так же возможность скачть как одну так и архив**
* сортировка на клиенте
**В макете видно что сортировка есть только в оценке звонков, она и реализована**
* меню - статика без функционала, активный раздел "Звонки"

## Дополнительно реализован следующий функционал

* Всё, что кликабельно в макете, имеет отклик и в проекте
* Реализован поиск в режиме онлайн
**Поиск по номерам работает отлично**
**Поиск по менеджерам нет, т.к. API отвечает ошибкой 403**
* Реализовано оценивание звонков с последующей фильтрацией звонков по оценкам
**Из-за отсутствия данных осуществляется нажатием на "Распознать" / "Распознать все"**
кнопка "распознать все" появляется если отметить несколько строк
содержащих аудио и нажать на закрыть(крестик) в правой части проигрывателя.

</details>

## Запуск приложения

<details>
- Открыть терминал
- Скачать репозиторий командой: _git clone https://github.com/loki87by/skilla_
- Установить зависимости командой:_npm install_
- Запустить проект командой: _npm start_
- Если спустя пару минут проект не открылся самостоятельно, открыть в браузере: [localhost:3000](localhost:3000)

Либо открыть [деплой проекта](https://loki87by.github.io/skilla/)

</details>
