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

export function getAverage(array) {
  const sum = array.reduce((p, i) => {
    if (!p) {
      p = 0;
    }
    return p + i;
  }, 0);
  const average = sum > 0 ? Math.ceil(sum / 7) : Math.floor(sum / 7);
  return average;
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
