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
    const loginUrl = pegarBaseURL() + "/auth/login";
    const loginPayload = JSON.stringify({
        username: "axel.araujo",
        password: "123456",
    });
    const loginParams = {
        headers: { "Content-Type": "application/json" },
    };
    const loginRes = http.post(loginUrl, loginPayload, loginParams);

    check(loginRes, {
        "Login: status é 200": (r) => r.status === 200,
        "Validar que o token é uma string": (r) => typeof r.json().token === "string",
    });

    if (loginRes.status !== 200) {
        console.error(`VU ${__VU} falhou no login.`);
        return;
    }

    const authToken = loginRes.json("token");

    const resultUrl = pegarBaseURL() + "/review";
    const resultParams = {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    };
    const resultRes = http.get(resultUrl, resultParams);

    check(resultRes, {
        "Validar que o status é 200": (r) => r.status === 200,
        "Validar que contém 'total'": (r) =>
            r.json() && typeof r.json().total === "number",
        "Validar que 'review' é array": (r) =>
            r.json() && Array.isArray(r.json().review),
    });

    sleep(1);
}
