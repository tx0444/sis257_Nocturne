import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { MetodosPagoService } from './metodos-pago.service';
import { CreateMetodoPagoDto } from './dto/create-metodo-pago.dto';
import { UpdateMetodoPagoDto } from './dto/update-metodo-pago.dto';

@ApiTags('metodos-pago')
@ApiBearerAuth()
@Controller('metodos-pago')
export class MetodosPagoController {
  constructor(private readonly metodosPagoService: MetodosPagoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un método de pago' })
  create(@Body() createDto: CreateMetodoPagoDto) {
    return this.metodosPagoService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los métodos de pago' })
  findAll() {
    return this.metodosPagoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un método de pago por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.metodosPagoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un método de pago' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateMetodoPagoDto) {
    return this.metodosPagoService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un método de pago' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.metodosPagoService.remove(id);
  }
}
