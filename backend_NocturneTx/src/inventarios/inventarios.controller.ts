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
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { InventariosService } from './inventarios.service';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { ROLE_ADMIN, ROLE_VENDEDOR } from '../auth/constants';

@ApiTags('inventarios')
@ApiBearerAuth('JWT-auth')
@Roles(ROLE_ADMIN, ROLE_VENDEDOR)
@Controller('inventarios')
export class InventariosController {
  constructor(private readonly inventariosService: InventariosService) {}

  @Roles(ROLE_ADMIN)
  @Post()
  @ApiOperation({ summary: 'Registrar inventario (admin)' })
  create(@Body() createInventarioDto: CreateInventarioDto) {
    return this.inventariosService.create(createInventarioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar inventarios' })
  findAll() {
    return this.inventariosService.findAll();
  }

  @Get('producto/:productoId')
  @ApiOperation({ summary: 'Inventario por producto' })
  findByProducto(@Param('productoId', ParseIntPipe) productoId: number) {
    return this.inventariosService.findByProducto(productoId);
  }

  @Get('vencidos')
  @ApiOperation({ summary: 'Lotes vencidos' })
  findVencidos() {
    return this.inventariosService.findVencidos();
  }

  @Get('por-vencer')
  @ApiOperation({ summary: 'Lotes por vencer' })
  findPorVencer(@Query('dias') dias?: string) {
    return this.inventariosService.findPorVencer(dias ? parseInt(dias) : 30);
  }

  @Get('stock')
  @ApiOperation({ summary: 'Stock total' })
  getStockTotal() {
    return this.inventariosService.getStockTotal();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalle de inventario' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.inventariosService.findOne(id);
  }

  @Roles(ROLE_ADMIN)
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar inventario (admin)' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInventarioDto: UpdateInventarioDto,
  ) {
    return this.inventariosService.update(id, updateInventarioDto);
  }

  @Roles(ROLE_ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar inventario (admin)' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.inventariosService.remove(id);
  }
}
