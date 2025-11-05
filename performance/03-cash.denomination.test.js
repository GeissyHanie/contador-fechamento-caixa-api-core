import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 10,
  duration: "30s",

  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<500"],
  },
};

export default function () {
  const url = "http://localhost:3000/auth/login";
  const payload = JSON.stringify({
    username: "axel.araujo",
    password: "123456",
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const loginRes = http.post(url, payload, params);

  check(loginRes, {
    "Login: status é 200": (r) => r.status === 200,
    "Validar que o token é uma string": (r) =>
      typeof r.json().token == "string",
  });

  if (loginRes.status !== 200) {
    console.error(`VU ${__VU} falhou no login.`);
    return;
  }

  const authToken = loginRes.json("token");

  const denominationUrl = "http://localhost:3000/cash/denomination";

  const denominationPayload = JSON.stringify({
    type: "R$ 50",
    quantity: 10,
  });

  const denominationParams = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  const denominationRes = http.post(
    denominationUrl, denominationPayload, denominationParams
  );

  check(denominationRes, {
    "Validar que o status é 200": (r) => r.status === 200,
  });

  sleep(1);
}
