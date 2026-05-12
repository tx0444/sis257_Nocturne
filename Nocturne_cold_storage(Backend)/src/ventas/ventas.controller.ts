import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { VentasService } from './ventas.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';

@Controller('ventas')
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  @Post()
  create(@Body() createVentaDto: CreateVentaDto) {
    return this.ventasService.create(createVentaDto);
  }

  @Get()
  findAll() {
    return this.ventasService.findAll();
  }

  @Get('rango')
  findByDateRange(
    @Query('inicio') inicio: string,
    @Query('fin') fin: string,
  ) {
    return this.ventasService.findByDateRange(new Date(inicio), new Date(fin));
  }

  @Get('estadisticas')
  getEstadisticas(
    @Query('inicio') inicio: string,
    @Query('fin') fin: string,
  ) {
    return this.ventasService.getEstadisticas(new Date(inicio), new Date(fin));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ventasService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVentaDto: UpdateVentaDto,
  ) {
    return this.ventasService.update(id, updateVentaDto);
  }

  @Patch(':id/cancelar')
  cancel(@Param('id', ParseIntPipe) id: number) {
    return this.ventasService.cancel(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ventasService.remove(id);
  }
}