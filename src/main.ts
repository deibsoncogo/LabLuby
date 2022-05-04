import { NestFactory } from "@nestjs/core";
import { ProductionSeed } from "../prisma/seeds/production.seed";
import { ValidationPipe } from "../src/validação.pipe";
import { AppModule } from "./app.module";

async function bootstrap() {
  await ProductionSeed();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3333);
}
bootstrap();
