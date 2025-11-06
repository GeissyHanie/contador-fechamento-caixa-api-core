import http from "k6/http";
import { check, sleep } from "k6";
import { pegarBaseURL } from './utils/variaveis.js';

export const options = {
  vus: 10,
  duration: "30s",

   thresholds: {
        http_req_failed: ["rate<0.01"],
        http_req_duration: ["p(95)<300"],
    },
};

export default function () {
  const url = pegarBaseURL() + "/auth/login";
  const payload = JSON.stringify({
    username: "axel.araujo",
    password: "123456",
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  sleep(1);

  const res = http.post(url, payload, params);
  check(res, {
    "Validar que o status é 200": (r) => r.status === 200,
    "Validar que o token é uma string": (r) =>
      typeof r.json().token == "string",
  });
}
