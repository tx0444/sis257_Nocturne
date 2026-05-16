import { Module } from '@nestjs/common';
import { BovedasController } from './bovedas.controller';
import { BovedasService } from './bovedas.service';

@Module({
  controllers: [BovedasController],
  providers: [BovedasService]
})
export class BovedasModule {}
