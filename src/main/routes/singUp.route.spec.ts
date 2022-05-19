import request from "supertest"
import app from "../config/app"

describe("Sign up routes", () => {
  test("Should return an account on success", async () => {
    await request(app)
      .post("/api/signUp")
      .send({
        name: "Rodrigo",
        email: "rodrigo.manguinho@gmail.com",
        password: "123",
        passwordConfirmation: "123"
      })
      .expect(200)
  })
})
