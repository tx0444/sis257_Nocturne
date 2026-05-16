import { Module } from '@nestjs/common';
import { AlertasSeguridadController } from './alertas-seguridad.controller';
import { AlertasSeguridadService } from './alertas-seguridad.service';

@Module({
  controllers: [AlertasSeguridadController],
  providers: [AlertasSeguridadService]
})
export class AlertasSeguridadModule {}
