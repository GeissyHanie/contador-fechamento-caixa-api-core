const request = require("supertest");

const obterToken = async function (username = "axel.araujo", password = "123456") {
  const respostaLogin = await request(process.env.BASE_URL)
    .post("/auth/login")
    .set("Content-Type", "application/json")
    .send({
      username,
      password,
    });

  return respostaLogin;
};

module.exports = {
  obterToken,
};