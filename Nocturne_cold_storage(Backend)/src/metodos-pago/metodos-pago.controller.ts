import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MetodosPagoService } from './metodos-pago.service';
import { CreateMetodoPagoDto } from './dto/create-metodo-pago.dto';
import { UpdateMetodoPagoDto } from './dto/update-metodo-pago.dto';
import { MetodoPago } from './entities/metodo-pago.entity';

@ApiTags('Métodos de Pago')
@Controller('metodos-pago')
export class MetodosPagoController {
  constructor(private readonly metodosPagoService: MetodosPagoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo método de pago' })
  @ApiResponse({ status: 201, description: 'Método creado', type: MetodoPago })
  create(@Body() createMetodoPagoDto: CreateMetodoPagoDto) {
    return this.metodosPagoService.create(createMetodoPagoDto);
  }

  @Post('seed')
  @ApiOperation({ summary: 'Cargar métodos de pago por defecto (11 métodos)' })
  @ApiResponse({ status: 201, description: 'Métodos cargados exitosamente' })
  seed() {
    return this.metodosPagoService.seed();
  }

  @Get()
  @ApiOperation({ summary: 'Listar métodos de pago activos' })
  @ApiResponse({ status: 200, description: 'Lista de métodos', type: [MetodoPago] })
  findAll() {
    return this.metodosPagoService.findAll();
  }

  @Get('admin')
  @ApiOperation({ summary: 'Listar todos los métodos (incluye inactivos)' })
  @ApiResponse({ status: 200, description: 'Lista completa', type: [MetodoPago] })
  findAllAdmin() {
    return this.metodosPagoService.findAllAdmin();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener método de pago por ID' })
  @ApiResponse({ status: 200, description: 'Método encontrado', type: MetodoPago })
  @ApiResponse({ status: 404, description: 'No encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.metodosPagoService.findOne(id);
  }

  @Get('tipo/:tipo')
  @ApiOperation({ summary: 'Buscar método de pago por tipo' })
  @ApiResponse({ status: 200, description: 'Método encontrado', type: MetodoPago })
  findByTipo(@Param('tipo') tipo: string) {
    return this.metodosPagoService.findByTipo(tipo as any);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar método de pago' })
  @ApiResponse({ status: 200, description: 'Actualizado', type: MetodoPago })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMetodoPagoDto: UpdateMetodoPagoDto,
  ) {
    return this.metodosPagoService.update(id, updateMetodoPagoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Desactivar método de pago (soft delete)' })
  @ApiResponse({ status: 200, description: 'Desactivado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.metodosPagoService.remove(id);
  }

  @Post(':id/activar')
  @ApiOperation({ summary: 'Activar método de pago' })
  @ApiResponse({ status: 200, description: 'Activado', type: MetodoPago })
  activar(@Param('id', ParseIntPipe) id: number) {
    return this.metodosPagoService.activar(id);
  }

  @Get(':id/calcular-comision/:monto')
  @ApiOperation({ summary: 'Calcular comisión para un monto dado' })
  @ApiResponse({ status: 200, description: 'Comisión calculada' })
  calcularComision(
    @Param('id', ParseIntPipe) id: number,
    @Param('monto', ParseIntPipe) monto: number,
  ) {
    return this.metodosPagoService.calcularComision(id, monto);
  }
}