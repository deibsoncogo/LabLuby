import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "../src/validação.pipe";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3333);
}

bootstrap();