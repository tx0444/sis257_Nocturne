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
import { MovimientosInventarioService } from './movimientos-inventario.service';
import { CreateMovimientoInventarioDto } from './dto/create-movimiento-inventario.dto';
import { UpdateMovimientoInventarioDto } from './dto/update-movimiento-inventario.dto';
import { TipoMovimiento } from './entities/movimiento-inventario.entity';

@Controller('movimientos-inventario')
export class MovimientosInventarioController {
  constructor(private readonly movimientosService: MovimientosInventarioService) {}

  @Post()
  create(@Body() createMovimientoDto: CreateMovimientoInventarioDto) {
    return this.movimientosService.create(createMovimientoDto);
  }

  @Get()
  findAll() {
    return this.movimientosService.findAll();
  }

  @Get('kardex')
  getKardex(@Query('productoId') productoId?: string) {
    return this.movimientosService.getKardex(productoId ? parseInt(productoId) : undefined);
  }

  @Get('inventario/:inventarioId')
  findByInventario(@Param('inventarioId', ParseIntPipe) inventarioId: number) {
    return this.movimientosService.findByInventario(inventarioId);
  }

  @Get('tipo/:tipo')
  findByTipo(@Param('tipo') tipo: TipoMovimiento) {
    return this.movimientosService.findByTipo(tipo);
  }

  @Get('rango')
  findByDateRange(
    @Query('inicio') inicio: string,
    @Query('fin') fin: string,
  ) {
    return this.movimientosService.findByDateRange(new Date(inicio), new Date(fin));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.movimientosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMovimientoDto: UpdateMovimientoInventarioDto,
  ) {
    return this.movimientosService.update(id, updateMovimientoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.movimientosService.remove(id);
  }
}