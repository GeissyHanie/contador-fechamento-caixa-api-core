const request = require("supertest");

const alterarDenominacao = async function (token, type = "R$ 100", quantity = 2) {
  const resposta = await request(process.env.BASE_URL)
    .post("/cash/denomination")
    .set("Authorization", "Bearer " + token)
    .send({ type, quantity });

  return resposta;
};

module.exports = { alterarDenominacao };