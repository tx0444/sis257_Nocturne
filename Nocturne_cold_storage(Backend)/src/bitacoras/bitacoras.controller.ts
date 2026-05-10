import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { BitacorasService } from './bitacoras.service';
import { AccionBitacora } from './entities/bitacora.entity';

@Controller('bitacoras')
export class BitacorasController {
  constructor(private readonly bitacorasService: BitacorasService) {}

  @Post()
  create(@Body() data: any) {
    return this.bitacorasService.create(data);
  }

  @Get()
  findAll() {
    return this.bitacorasService.findAll();
  }

  @Get('tabla/:tabla')
  findByTable(@Param('tabla') tabla: string) {
    return this.bitacorasService.findByTable(tabla);
  }

  @Get('usuario/:usuarioId')
  findByUser(@Param('usuarioId') usuarioId: number) {
    return this.bitacorasService.findByUser(usuarioId);
  }

  @Get('accion/:accion')
  findByAccion(@Param('accion') accion: AccionBitacora) {
    return this.bitacorasService.findByAccion(accion);
  }

  @Get('rango')
  findByDateRange(
    @Query('inicio') inicio: string,
    @Query('fin') fin: string,
  ) {
    return this.bitacorasService.findByDateRange(new Date(inicio), new Date(fin));
  }

  @Get('reporte')
  getReporte(
    @Query('inicio') inicio: string,
    @Query('fin') fin: string,
  ) {
    return this.bitacorasService.getReporte(new Date(inicio), new Date(fin));
  }
}