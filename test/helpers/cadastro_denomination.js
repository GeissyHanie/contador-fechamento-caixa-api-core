// helpers/cadastro_denomination.js
const request = require("supertest");

const cadastroDenomination = async function(token, type = "R$ 100", quantity = 2) {
  return await request(process.env.BASE_URL)
    .post("/cash/denomination")
    .set("Authorization", "Bearer " + token)
    .send({ type, quantity });
};

module.exports = { cadastroDenomination };