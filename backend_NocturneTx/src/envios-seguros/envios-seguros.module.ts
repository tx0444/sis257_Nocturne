import { Module } from '@nestjs/common';
import { EnviosSegurosController } from './envios-seguros.controller';
import { EnviosSegurosService } from './envios-seguros.service';

@Module({
  controllers: [EnviosSegurosController],
  providers: [EnviosSegurosService]
})
export class EnviosSegurosModule {}
