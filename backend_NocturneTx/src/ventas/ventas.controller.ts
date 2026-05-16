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
import { VentasService } from './ventas.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { ROLE_ADMIN, ROLE_VENDEDOR } from '../auth/constants';

@ApiTags('ventas')
@ApiBearerAuth('JWT-auth')
@Controller('ventas')
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear venta (usuario autenticado)' })
  create(@Body() createVentaDto: CreateVentaDto) {
    return this.ventasService.create(createVentaDto);
  }

  @Roles(ROLE_ADMIN, ROLE_VENDEDOR)
  @Get()
  @ApiOperation({ summary: 'Listar ventas (admin/vendedor)' })
  findAll() {
    return this.ventasService.findAll();
  }

  @Roles(ROLE_ADMIN, ROLE_VENDEDOR)
  @Get('rango')
  @ApiOperation({ summary: 'Ventas por rango de fechas (admin/vendedor)' })
  findByDateRange(
    @Query('inicio') inicio: string,
    @Query('fin') fin: string,
  ) {
    return this.ventasService.findByDateRange(new Date(inicio), new Date(fin));
  }

  @Roles(ROLE_ADMIN, ROLE_VENDEDOR)
  @Get('estadisticas')
  @ApiOperation({ summary: 'Estadísticas de ventas (admin/vendedor)' })
  getEstadisticas(
    @Query('inicio') inicio: string,
    @Query('fin') fin: string,
  ) {
    return this.ventasService.getEstadisticas(new Date(inicio), new Date(fin));
  }

  @Roles(ROLE_ADMIN, ROLE_VENDEDOR)
  @Get(':id')
  @ApiOperation({ summary: 'Detalle de venta (admin/vendedor)' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ventasService.findOne(id);
  }

  @Roles(ROLE_ADMIN, ROLE_VENDEDOR)
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar venta (admin/vendedor)' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVentaDto: UpdateVentaDto,
  ) {
    return this.ventasService.update(id, updateVentaDto);
  }

  @Roles(ROLE_ADMIN, ROLE_VENDEDOR)
  @Patch(':id/cancelar')
  @ApiOperation({ summary: 'Cancelar venta (admin/vendedor)' })
  cancel(@Param('id', ParseIntPipe) id: number) {
    return this.ventasService.cancel(id);
  }

  @Roles(ROLE_ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar venta (admin)' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ventasService.remove(id);
  }
}
