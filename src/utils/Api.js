const BASE_URL = "https://api.skilla.ru/mango";
const PARTNER_URL = "https://api.skilla.ru/partnership";
const TOKEN = "testtoken";

export const getList = (date_start, date_end, search, filters) => {
  let filtersString = "";

  if (filters.length > 0) {
    filters.forEach((fil) => {
      filtersString += `&${fil.key}=${fil.value}`;
    });
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
      return body;
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
        "Content-type": "audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3",
        "Content-Transfer-Encoding": "binary",
        "Content-Disposition": 'attachment; filename="record.mp3"',
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  )
    .then((res) => {
      try {
        if (res.ok) {
          return res.blob();
        }
      } catch (err) {
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
          return res.json();
        }
      } catch (err) {
        return err;
      }
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const getPersonsList = (position, is_blocked) => {
  return fetch(
    `${PARTNER_URL}/getPersonsList${position ? "?position[]=" + position : ""}${
      is_blocked ? "&is_blocked=" + is_blocked : ""
    }`,
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
          return res.json();
        }
      } catch (err) {
        return err;
      }
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const getProfile = () => {
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
          return res.json();
        }
      } catch (err) {
        return err;
      }
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
