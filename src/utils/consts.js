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

export const TYPES = [
  {text: 'Все типы', active: 'reset', keys: ['in_out']},
  {text: 'Входящий звонок', active: 'post', key: 'in_out', value: 1},
  {text: 'Исходящий звонок', active: 'post', key: 'in_out', value: 0}
]

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
