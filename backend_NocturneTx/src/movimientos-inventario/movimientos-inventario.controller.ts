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
import { MovimientosInventarioService } from './movimientos-inventario.service';
import { CreateMovimientoInventarioDto } from './dto/create-movimiento-inventario.dto';
import { UpdateMovimientoInventarioDto } from './dto/update-movimiento-inventario.dto';
import { TipoMovimiento } from './entities/movimiento-inventario.entity';
import { Roles } from '../auth/decorators/roles.decorator';
import { ROLE_ADMIN, ROLE_VENDEDOR } from '../auth/constants';

@ApiTags('movimientos de inventario')
@ApiBearerAuth('JWT-auth')
@Roles(ROLE_ADMIN, ROLE_VENDEDOR)
@Controller('movimientos-inventario')
export class MovimientosInventarioController {
  constructor(private readonly movimientosService: MovimientosInventarioService) {}

  @Roles(ROLE_ADMIN)
  @Post()
  @ApiOperation({ summary: 'Registrar movimiento (admin)' })
  create(@Body() createMovimientoDto: CreateMovimientoInventarioDto) {
    return this.movimientosService.create(createMovimientoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar movimientos' })
  findAll() {
    return this.movimientosService.findAll();
  }

  @Get('kardex')
  @ApiOperation({ summary: 'Kardex de inventario' })
  getKardex(@Query('productoId') productoId?: string) {
    return this.movimientosService.getKardex(productoId ? parseInt(productoId) : undefined);
  }

  @Get('inventario/:inventarioId')
  @ApiOperation({ summary: 'Movimientos por lote de inventario' })
  findByInventario(@Param('inventarioId', ParseIntPipe) inventarioId: number) {
    return this.movimientosService.findByInventario(inventarioId);
  }

  @Get('tipo/:tipo')
  @ApiOperation({ summary: 'Movimientos por tipo' })
  findByTipo(@Param('tipo') tipo: TipoMovimiento) {
    return this.movimientosService.findByTipo(tipo);
  }

  @Get('rango')
  @ApiOperation({ summary: 'Movimientos por rango de fechas' })
  findByDateRange(
    @Query('inicio') inicio: string,
    @Query('fin') fin: string,
  ) {
    return this.movimientosService.findByDateRange(new Date(inicio), new Date(fin));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalle de movimiento' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.movimientosService.findOne(id);
  }

  @Roles(ROLE_ADMIN)
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar movimiento (admin)' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMovimientoDto: UpdateMovimientoInventarioDto,
  ) {
    return this.movimientosService.update(id, updateMovimientoDto);
  }

  @Roles(ROLE_ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar movimiento (admin)' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.movimientosService.remove(id);
  }
}
