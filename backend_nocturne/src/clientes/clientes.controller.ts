import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('clientes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un cliente' })
  create(@Body() createClienteDto: CreateClienteDto, @Request() req: any) {
    return this.clientesService.create(createClienteDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los clientes' })
  findAll() {
    return this.clientesService.findAll();
  }

  @Get('buscar')
  @ApiOperation({ summary: 'Buscar clientes por nombre, apellido o CI/NIT (tiempo real)' })
  @ApiQuery({ name: 'q', description: 'Término de búsqueda', required: true })
  buscar(@Query('q') termino: string) {
    return this.clientesService.buscar(termino);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un cliente por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clientesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un cliente' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateClienteDto: UpdateClienteDto, @Request() req: any) {
    return this.clientesService.update(id, updateClienteDto, req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar (soft) un cliente' })
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.clientesService.remove(id, req.user);
  }
}
