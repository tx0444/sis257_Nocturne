import { Controller, Get, Param, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DeliveriesService } from './deliveries.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EstadoDelivery } from './entities/delivery.entity';

@ApiTags('deliveries')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los deliveries' })
  findAll() {
    return this.deliveriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un delivery por ID' })
  findOne(@Param('id') id: string) {
    return this.deliveriesService.findOne(+id);
  }

  @Get('venta/:ventaId')
  @ApiOperation({ summary: 'Obtener un delivery por ID de Venta' })
  findByVenta(@Param('ventaId') ventaId: string) {
    return this.deliveriesService.findByVenta(+ventaId);
  }

  @Patch(':id/estado')
  @ApiOperation({ summary: 'Actualizar el estado de un delivery' })
  updateEstado(
    @Param('id') id: string,
    @Body('estado') estado: any,
    @Request() req: any,
  ) {
    return this.deliveriesService.updateEstado(+id, estado, req.user);
  }
}
