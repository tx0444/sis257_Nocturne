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
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { MetodosPagoService } from './metodos-pago.service';
import { CreateMetodoPagoDto } from './dto/create-metodo-pago.dto';
import { UpdateMetodoPagoDto } from './dto/update-metodo-pago.dto';
import { MetodoPago } from './entities/metodo-pago.entity';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { ROLE_ADMIN } from '../auth/constants';

@ApiTags('métodos de pago')
@Controller('metodos-pago')
export class MetodosPagoController {
  constructor(private readonly metodosPagoService: MetodosPagoService) {}

  @Roles(ROLE_ADMIN)
  @ApiBearerAuth('JWT-auth')
  @Post()
  @ApiOperation({ summary: 'Crear método de pago (admin)' })
  @ApiResponse({ status: 201, description: 'Método creado', type: MetodoPago })
  create(@Body() createMetodoPagoDto: CreateMetodoPagoDto) {
    return this.metodosPagoService.create(createMetodoPagoDto);
  }

  @Roles(ROLE_ADMIN)
  @ApiBearerAuth('JWT-auth')
  @Post('seed')
  @ApiOperation({ summary: 'Cargar métodos de pago por defecto (admin)' })
  @ApiResponse({ status: 201, description: 'Métodos cargados exitosamente' })
  seed() {
    return this.metodosPagoService.seed();
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Listar métodos de pago activos (público)' })
  @ApiResponse({ status: 200, description: 'Lista de métodos', type: [MetodoPago] })
  findAll() {
    return this.metodosPagoService.findAll();
  }

  @Roles(ROLE_ADMIN)
  @ApiBearerAuth('JWT-auth')
  @Get('admin')
  @ApiOperation({ summary: 'Listar todos los métodos (admin)' })
  @ApiResponse({ status: 200, description: 'Lista completa', type: [MetodoPago] })
  findAllAdmin() {
    return this.metodosPagoService.findAllAdmin();
  }

  @Public()
  @Get('tipo/:tipo')
  @ApiOperation({ summary: 'Buscar método por tipo (público)' })
  @ApiResponse({ status: 200, description: 'Método encontrado', type: MetodoPago })
  findByTipo(@Param('tipo') tipo: string) {
    return this.metodosPagoService.findByTipo(tipo as any);
  }

  @Public()
  @Get(':id/calcular-comision/:monto')
  @ApiOperation({ summary: 'Calcular comisión para un monto (público)' })
  @ApiResponse({ status: 200, description: 'Comisión calculada' })
  calcularComision(
    @Param('id', ParseIntPipe) id: number,
    @Param('monto', ParseIntPipe) monto: number,
  ) {
    return this.metodosPagoService.calcularComision(id, monto);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Obtener método de pago por ID (público)' })
  @ApiResponse({ status: 200, description: 'Método encontrado', type: MetodoPago })
  @ApiResponse({ status: 404, description: 'No encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.metodosPagoService.findOne(id);
  }

  @Roles(ROLE_ADMIN)
  @ApiBearerAuth('JWT-auth')
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar método de pago (admin)' })
  @ApiResponse({ status: 200, description: 'Actualizado', type: MetodoPago })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMetodoPagoDto: UpdateMetodoPagoDto,
  ) {
    return this.metodosPagoService.update(id, updateMetodoPagoDto);
  }

  @Roles(ROLE_ADMIN)
  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  @ApiOperation({ summary: 'Desactivar método de pago (admin)' })
  @ApiResponse({ status: 200, description: 'Desactivado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.metodosPagoService.remove(id);
  }

  @Roles(ROLE_ADMIN)
  @ApiBearerAuth('JWT-auth')
  @Post(':id/activar')
  @ApiOperation({ summary: 'Activar método de pago (admin)' })
  @ApiResponse({ status: 200, description: 'Activado', type: MetodoPago })
  activar(@Param('id', ParseIntPipe) id: number) {
    return this.metodosPagoService.activar(id);
  }
}
