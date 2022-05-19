import request from "supertest"
import app from "../config/app"

describe("Content type middleware", () => {
  test("Should return default content type as json", async () => {
    app.get("/testContentType", (req, res) => {
      res.send("")
    })

    await request(app)
      .get("/testContentType")
      .expect("content-type", /json/)
  })

  test("Should return xml content type when forced", async () => {
    app.get("/testContentTypeXml", (req, res) => {
      res.type("xml")
      res.send("")
    })

    await request(app)
      .get("/testContentTypeXml")
      .expect("content-type", /xml/)
  })
})
