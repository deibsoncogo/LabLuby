import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";

describe("App controller (E2E)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it("It must be possible to define", () => {
    expect(app).toBeDefined();
  });

  describe("It should be possible to run these routes successfully", () => {
    it("/ (GET)", () => {
      return request(app.getHttpServer()).get("/").expect(200);
    });
  });
});
