import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import config from "./config/configuration";
import { ValidationPipe } from "@nestjs/common";


const PORT = config().server_port;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(config().CORSprops);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true
    })
  );
  await app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    }
  );
}

bootstrap();
