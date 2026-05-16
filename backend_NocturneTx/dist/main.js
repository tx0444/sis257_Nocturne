"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true, whitelist: true }));
    app.setGlobalPrefix('api');
    app.enableVersioning({ type: common_1.VersioningType.URI, defaultVersion: '1' });
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Nocturne Cold Storage - Licorería')
        .setDescription('API REST para gestión de licorería con facturación y métodos de pago')
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Token obtenido en POST /api/v1/auth/login',
    }, 'JWT-auth')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document, {
        swaggerOptions: { persistAuthorization: true },
        useGlobalPrefix: true,
    });
    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    const url = await app.getUrl();
    console.log(`API: ${url}/api/v1`);
    console.log(`Swagger: ${url}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map