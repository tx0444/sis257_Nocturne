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
import { DetallesVentaService } from './detalles-venta.service';
import { CreateDetallesVentaDto } from './dto/create-detalles-venta.dto';
import { UpdateDetallesVentaDto } from './dto/update-detalles-venta.dto';

@Controller('detalles-venta')
export class DetallesVentaController {
  constructor(private readonly detallesVentaService: DetallesVentaService) {}

  @Post()
  create(@Body() createDetallesVentaDto: CreateDetallesVentaDto) {
    return this.detallesVentaService.create(createDetallesVentaDto);
  }

  @Get()
  findAll() {
    return this.detallesVentaService.findAll();
  }

  @Get('venta/:ventaId')
  findByVenta(@Param('ventaId', ParseIntPipe) ventaId: number) {
    return this.detallesVentaService.findByVenta(ventaId);
  }

  @Get('mas-vendidos')
  getProductosMasVendidos(@Query('limit') limit?: string) {
    return this.detallesVentaService.getProductosMasVendidos(limit ? parseInt(limit) : 10);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.detallesVentaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDetallesVentaDto: UpdateDetallesVentaDto,
  ) {
    return this.detallesVentaService.update(id, updateDetallesVentaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.detallesVentaService.remove(id);
  }
}