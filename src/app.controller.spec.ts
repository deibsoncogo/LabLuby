import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppResolver } from "./app.resolver";
import { AppService } from "./app.service";

describe("App controller", () => {
  let controller: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService, AppResolver],
      controllers: [AppController],
    }).compile();

    controller = app.get<AppController>(AppController);
  });

  describe("Find app", () => {
    it("Should return the message hello world", async () => {
      const apps = await controller.findApps();

      expect(apps).toBe("Hello world");
    });
  });
});
