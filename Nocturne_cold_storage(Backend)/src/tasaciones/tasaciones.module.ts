import { Module } from '@nestjs/common';
import { TasacionesController } from './tasaciones.controller';
import { TasacionesService } from './tasaciones.service';

@Module({
  controllers: [TasacionesController],
  providers: [TasacionesService]
})
export class TasacionesModule {}
