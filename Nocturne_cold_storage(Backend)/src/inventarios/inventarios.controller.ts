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
import { InventariosService } from './inventarios.service';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';

@Controller('inventarios')
export class InventariosController {
  constructor(private readonly inventariosService: InventariosService) {}

  @Post()
  create(@Body() createInventarioDto: CreateInventarioDto) {
    return this.inventariosService.create(createInventarioDto);
  }

  @Get()
  findAll() {
    return this.inventariosService.findAll();
  }

  @Get('producto/:productoId')
  findByProducto(@Param('productoId', ParseIntPipe) productoId: number) {
    return this.inventariosService.findByProducto(productoId);
  }

  @Get('vencidos')
  findVencidos() {
    return this.inventariosService.findVencidos();
  }

  @Get('por-vencer')
  findPorVencer(@Query('dias') dias?: string) {
    return this.inventariosService.findPorVencer(dias ? parseInt(dias) : 30);
  }

  @Get('stock')
  getStockTotal() {
    return this.inventariosService.getStockTotal();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.inventariosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInventarioDto: UpdateInventarioDto,
  ) {
    return this.inventariosService.update(id, updateInventarioDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.inventariosService.remove(id);
  }
}