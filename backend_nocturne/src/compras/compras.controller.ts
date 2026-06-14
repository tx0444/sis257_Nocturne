import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ComprasService } from './compras.service';
import { CreateCompraDto } from './dto/create-compra.dto';

@ApiTags('compras')
@ApiBearerAuth()
@Controller('compras')
export class ComprasController {
  constructor(private readonly comprasService: ComprasService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar una compra completa' })
  create(@Body() createCompraDto: CreateCompraDto) {
    return this.comprasService.create(createCompraDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las compras' })
  findAll() {
    return this.comprasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una compra por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.comprasService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una compra' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.comprasService.remove(id);
  }
}
