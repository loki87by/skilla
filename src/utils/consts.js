export const MONTHS = [
  "январь",
  "февраль",
  "март",
  "апрель",
  "май",
  "июнь",
  "июль",
  "август",
  "сентябрь",
  "октябрь",
  "ноябрь",
  "декабрь",
];

export const WEEK_DAYS = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

export const CALENDAR_ITEMS = [
  "3 дня",
  "Неделя",
  "Месяц",
  "Год",
  "Указать даты",
];

export const HEADER_DATE_OPTIONS = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  weekday: "long",
  hour12: false,
};

export const API_ERROR = "API не предоставил данных";

export const DATE_OPTIONS = {
  year: "2-digit",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  weekday: "long",
  hour12: false,
};

export const BASIC_FILTERS_TEXT = [
  "Все типы",
  "Все звонки",
  "Все сотрудники",
  "Все источники",
  "Все оценки",
  "Все ошибки",
];

export const TYPES = [
  { text: "Все типы", active: "reset", keys: ["in_out"] },
  { text: "Входящие звонки", active: "post", key: "in_out", value: 1 },
  { text: "Исходящие звонки", active: "post", key: "in_out", value: 0 },
];

export const CALLS = [
  { text: "Все звонки", active: "reset", keys: ["from_type[]"] },
  { text: "Клиенты", active: "post", key: "from_type[]", value: "clients" },
  {
    text: "Новые клиенты",
    active: "post",
    key: "from_type[]",
    value: "new_clients",
    decorate: "yellowCircle",
  },
  { text: "Рабочие", active: "post", key: "from_type[]", value: "workers" },
  {
    text: "Через приложение",
    active: "post",
    key: "from_type[]",
    value: "app",
  },
  /* {text: 'Прочие звонки', active: 'filter', key: 'not', values: ['clients', 'new_clients', 'workers', 'app']}, */
];

export const SOURCES = [
  { text: "Все источники", active: "reset", keys: ["sources[]"] },
  { text: "С сайта", active: "post", key: "sources[]", value: "from_site" },
  { text: "Yandex номер", active: "post", key: "sources[]", value: "yandex" },
  { text: "Google номер", active: "post", key: "sources[]", value: "google" },
  { text: "Без источника", active: "post", key: "sources[]", value: "empty" },
];

export const RATES = [
  { text: "Все оценки", active: "reset", keys: ["errors[]"] },
  {
    text: "Распознать",
    active: "filter",
    key: "is",
    values: ["errors[]"],
    outer: [
      { key: "not", params: ["record", ""] },
      { key: "not", params: ["errors", ["Скрипт не использован"]] },
    ],
    inner: [
      { key: "not", params: ["rate", "good"] },
      { key: "not", params: ["rate", "bad"] },
      { key: "not", params: ["rate", "awesome"] },
    ],
  },
  {
    text: "Скрипт не использован",
    active: "post",
    key: "errors[]",
    value: "noscript",
  },
  { text: "Плохо", active: "none", decorate: "pinkStyle" },
  { text: "Хорошо", active: "none", decorate: "greyStyle" },
  { text: "Отлично", active: "none", decorate: "greenStyle" },
  { active: "none", decorate: "redCircle" },
  { active: "none", decorate: "greyCircles" },
  { active: "none", decorate: "greenCircles" },
];

export const ERRORS = [
  { text: "Все ошибки", active: "reset", keys: [] },
  { text: "Приветствие", active: "none" },
  { text: "Имя", active: "none" },
  { text: "Цена", active: "none" },
  { text: "Скидка", active: "none" },
  { text: "Предзаказ", active: "none" },
  { text: "Благодарность", active: "none" },
  { text: "Стоп слова", active: "none" },
];

export const HEADER_CELLS = [
  { text: `Приветствовал \n клиента`, data: "94px", key: "hello" },
  { text: `Спросил \n имя`, data: "78px", key: "name" },
  { text: `Правильно \n озвучил цену`, data: "83px", key: "coast" },
  { text: `Сказал \n про скидку`, data: "63px", key: "sale" },
  { text: `Сохранил \n предзаказ`, data: "64px", key: "save" },
  { text: `Поблагодарил \n за звонок`, data: "92px", key: "thanx" },
  { text: `Без стоп \n слов`, data: "57px", key: "non-stop" },
];

export const WORKERS = [
  {
    title: "operator",
    list: ["Мирон Батонов", "Алексей Ильин", "Милана Константинопольская"],
  },
  {
    title: "frmanager",
    list: ["Александра Сизых", "Илья Алексеев", "Владимир Петров"],
  },
  {
    title: "accountant",
    list: [
      "Полина Калинина",
      "Наталья Натальева",
      "Константин Константинопольский",
    ],
  },
];

export function debounce(f, t, args) {
  let lastCall = Date.now();
  let lastCallTimer = setTimeout(() => f(args), t);
  return function () {
    const previousCall = lastCall;
    lastCall = Date.now();

    if (previousCall && lastCall - previousCall <= t) {
      clearTimeout(lastCallTimer);
    }
    lastCallTimer = setTimeout(() => f(args), t);
  };
}

export function getRateColor(num) {
  if (num < 0) {
    return "#ea1a4f";
  } else if (num > 0) {
    return "#28a879";
  } else {
    return "#d8e4fb";
  }
}

export function getRate(num) {
  if (num < 0) {
    return "Плохо";
  } else if (num > 0) {
    return "Отлично";
  } else {
    return "Хорошо";
  }
}
