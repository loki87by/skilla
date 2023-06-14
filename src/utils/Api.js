const BASE_URL = "https://api.skilla.ru/mango";
const PARTNER_URL = "https://api.skilla.ru/partnership";
const TOKEN = "testtoken";

export const getList = (date_start, date_end, search, filters) => {
  /* date_start	Начальная дата. Формат YYYY-MM-DD
date_end	Конечная дата. Формат YYYY-MM-DD
in_out
Признак входящего или исходящего звонка.
Допустимые значения:
1 - входящий звонок
0 - исходящий звонок
пусто - все звонки */
let filtersString = ''
if (filters.length > 0) {
  filters.forEach((fil) => {
    filtersString += `&${fil.key}=${fil.value}`
  })
}
  return fetch(
    `${BASE_URL}/getList?date_start=${date_start}&date_end=${date_end}${
      search !== "" ? "&search=" + search : ""
    }${filtersString}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((body) => {
      return body
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const getRecord = (record, partnership_id) => {
  return fetch(
    `${BASE_URL}/getRecord?record=${record}&partnership_id=${partnership_id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  )
    .then((res) => {
      try {
        if (res.ok) {
          console.log(res);
          console.log(res.json());
          return res.json();
        }
      } catch (err) {
        console.log(err);
        return err;
      }
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const getCallback = (phone) => {
  return fetch(`${BASE_URL}/getCallback?phone=${phone}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  })
    .then((res) => {
      try {
        if (res.ok) {
          console.log(res);
          console.log(res.json());
          return res.json();
        }
      } catch (err) {
        console.log(err);
        return err;
      }
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const sendAbuse = (mango_id) => {
  return fetch(`${BASE_URL}/sendAbuse?mango_id=${mango_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  })
    .then((res) => {
      try {
        if (res.ok) {
          console.log(res);
          console.log(res.json());
          return res.json();
        }
      } catch (err) {
        console.log(err);
        return err;
      }
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const answerAbuse = (answer) => {
  /* mango_id - id звонка
message - ответ на жалобу
penalty - штраф (если назначаем)
penalty_comment - комментарий к штрафу, обязателен, если назначаем штраф. */
  const { mango_id, message, penalty, penalty_comment } = answer;
  return fetch(`${BASE_URL}/answerAbuse`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ mango_id, message, penalty, penalty_comment }),
  })
    .then((res) => {
      try {
        if (res.ok) {
          console.log(res);
          console.log(res.json());
          return res.json();
        }
      } catch (err) {
        console.log(err);
        return err;
      }
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const getPersonsList = (position, is_blocked) => {
  /* is_blocked	Признак блокировки
Возможные значения:

1 - заблокирован
0 - не заблокирован
Необязательный параметр
position	Должность (массив)
Возможные значения:

accountant
callleader
callmanager
chief-accountant
controller
copywriter
designer
director
frmanager
hr
hr-assist
leader
mainoperator
manager
moderator
operator
sale-manager
seo
skillmanager
submoderator
supervisor
worksupport */
  return fetch(
    `${PARTNER_URL}/getPersonsList${
      position ? "?position[]=" + position : ""
    }${is_blocked ? "&is_blocked=" + is_blocked : ""}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  )
    .then((res) => {
      try {
        if (res.ok) {
          console.log(res);
          console.log(res.json());
          return res.json();
        }
      } catch (err) {
        console.log(err);
        return err;
      }
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const getProfile = () => {
  /* header_notice	Уведомление в шапку(если есть)
title	Заголовок уведомления
button_name	Название кнопки (если есть)
button_link	Ссылка для кнопки
 */
  return fetch(`${PARTNER_URL}/getProfile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  })
    .then((res) => {
      try {
        if (res.ok) {
          console.log(res);
          console.log(res.json());
          return res.json();
        }
      } catch (err) {
        console.log(err);
        return err;
      }
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const getMenu = () => {
  /* url	url
icon	иконка меню
name	название меню
is_new	признак нового в разделе
submenu	подменю */
  return fetch(`${PARTNER_URL}/getMenu`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  })
    .then((res) => {
      try {
        if (res.ok) {
          console.log(res);
          console.log(res.json());
          return res.json();
        }
      } catch (err) {
        console.log(err);
        return err;
      }
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
