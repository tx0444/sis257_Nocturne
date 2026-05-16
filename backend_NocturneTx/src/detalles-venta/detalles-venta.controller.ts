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
import { DetallesVentaService } from './detalles-venta.service';
import { CreateDetallesVentaDto } from './dto/create-detalles-venta.dto';
import { UpdateDetallesVentaDto } from './dto/update-detalles-venta.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { ROLE_ADMIN, ROLE_VENDEDOR } from '../auth/constants';

@ApiTags('detalles de venta')
@ApiBearerAuth('JWT-auth')
@Roles(ROLE_ADMIN, ROLE_VENDEDOR)
@Controller('detalles-venta')
export class DetallesVentaController {
  constructor(private readonly detallesVentaService: DetallesVentaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear detalle de venta' })
  create(@Body() createDetallesVentaDto: CreateDetallesVentaDto) {
    return this.detallesVentaService.create(createDetallesVentaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar detalles de venta' })
  findAll() {
    return this.detallesVentaService.findAll();
  }

  @Get('venta/:ventaId')
  @ApiOperation({ summary: 'Detalles por venta' })
  findByVenta(@Param('ventaId', ParseIntPipe) ventaId: number) {
    return this.detallesVentaService.findByVenta(ventaId);
  }

  @Get('mas-vendidos')
  @ApiOperation({ summary: 'Productos más vendidos' })
  getProductosMasVendidos(@Query('limit') limit?: string) {
    return this.detallesVentaService.getProductosMasVendidos(limit ? parseInt(limit) : 10);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalle por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.detallesVentaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar detalle' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDetallesVentaDto: UpdateDetallesVentaDto,
  ) {
    return this.detallesVentaService.update(id, updateDetallesVentaDto);
  }

  @Roles(ROLE_ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar detalle (admin)' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.detallesVentaService.remove(id);
  }
}
