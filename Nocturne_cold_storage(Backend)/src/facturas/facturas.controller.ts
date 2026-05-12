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
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { FacturasService } from './facturas.service';
import { CreateFacturaDto, CreateDetalleFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { Factura } from './entities/factura.entity';

@ApiTags('Facturación')
@Controller('facturas')
export class FacturasController {
  constructor(private readonly facturasService: FacturasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva factura con detalles' })
  @ApiResponse({ status: 201, description: 'Factura creada', type: Factura })
  create(
    @Body() createFacturaDto: CreateFacturaDto,
    @Body('detalles') detalles: CreateDetalleFacturaDto[],
    @Query('usuarioId') usuarioId: string,
  ) {
    return this.facturasService.create(createFacturaDto, detalles, parseInt(usuarioId, 10));
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las facturas' })
  @ApiResponse({ status: 200, description: 'Lista de facturas', type: [Factura] })
  findAll() {
    return this.facturasService.findAll();
  }

  @Get('numero/:numero')
  @ApiOperation({ summary: 'Buscar factura por número' })
  @ApiResponse({ status: 200, description: 'Factura encontrada', type: Factura })
  findByNumero(@Param('numero') numero: string) {
    return this.facturasService.findByNumero(numero);
  }

  @Get('fecha')
  @ApiOperation({ summary: 'Buscar facturas por rango de fechas' })
  @ApiQuery({ name: 'inicio', required: true, description: 'Fecha inicio (YYYY-MM-DD)' })
  @ApiQuery({ name: 'fin', required: true, description: 'Fecha fin (YYYY-MM-DD)' })
  @ApiResponse({ status: 200, description: 'Facturas del período', type: [Factura] })
  buscarPorFecha(
    @Query('inicio') inicio: string,
    @Query('fin') fin: string,
  ) {
    return this.facturasService.buscarPorFecha(new Date(inicio), new Date(fin));
  }

  @Get('estadisticas')
  @ApiOperation({ summary: 'Estadísticas de facturación por período' })
  @ApiQuery({ name: 'inicio', required: true, description: 'Fecha inicio' })
  @ApiQuery({ name: 'fin', required: true, description: 'Fecha fin' })
  @ApiResponse({ status: 200, description: 'Estadísticas' })
  getEstadisticas(
    @Query('inicio') inicio: string,
    @Query('fin') fin: string,
  ) {
    return this.facturasService.getEstadisticas(new Date(inicio), new Date(fin));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener factura por ID' })
  @ApiResponse({ status: 200, description: 'Factura encontrada', type: Factura })
  @ApiResponse({ status: 404, description: 'No encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.facturasService.findOne(id);
  }

  @Get(':id/detalles')
  @ApiOperation({ summary: 'Obtener detalles de una factura' })
  @ApiResponse({ status: 200, description: 'Detalles de la factura' })
  findDetalles(@Param('id', ParseIntPipe) id: number) {
    return this.facturasService.findDetalles(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar factura (solo borrador)' })
  @ApiResponse({ status: 200, description: 'Actualizada', type: Factura })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFacturaDto: UpdateFacturaDto,
  ) {
    return this.facturasService.update(id, updateFacturaDto);
  }

  @Post(':id/emitir')
  @ApiOperation({ summary: 'Emitir/validar factura' })
  @ApiResponse({ status: 200, description: 'Factura emitida', type: Factura })
  emitir(@Param('id', ParseIntPipe) id: number) {
    return this.facturasService.emitir(id);
  }

  @Post(':id/anular')
  @ApiOperation({ summary: 'Anular factura con motivo' })
  @ApiResponse({ status: 200, description: 'Factura anulada', type: Factura })
  anular(
    @Param('id', ParseIntPipe) id: number,
    @Body('motivo') motivo: string,
  ) {
    return this.facturasService.anular(id, motivo);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar factura (solo borrador)' })
  @ApiResponse({ status: 200, description: 'Eliminada' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.facturasService.remove(id);
  }
}