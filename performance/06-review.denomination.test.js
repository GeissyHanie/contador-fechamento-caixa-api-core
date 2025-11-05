import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
    iterations:1,

    thresholds: {
        http_req_failed: ["rate<0.01"],
        http_req_duration: ["p(95)<500"], 
    },
};

export default function () {
    const loginUrl = "http://localhost:3000/auth/login";
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
    

    const reviewUrl = "http://localhost:3000/review/denomination";
    
    const reviewPayload = JSON.stringify({
        type: "R$ 10", 
        quantity: 50,  
    });
    
    const reviewParams = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
        },
    };
    
    const reviewRes = http.put(reviewUrl, reviewPayload, reviewParams);

    check(reviewRes, {
        "Validar que o status é 200": (r) => r.status === 200,
        "Validar que a mensagem de sucesso está presente": (r) =>
            r.body && r.body.includes("atualizada"), 
    });

    sleep(1);
}