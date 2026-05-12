import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DireccionesService } from './direcciones.service';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('direcciones')
@Controller('direcciones')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DireccionesController {
  constructor(private readonly direccionesService: DireccionesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las direcciones del usuario' })
  getAll(@Request() req) {
    return this.direccionesService.getAll(req.user.userId);
  }

  @Post()
  @ApiOperation({ summary: 'Crear nueva dirección' })
  create(@Request() req, @Body() dto: CreateDireccionDto) {
    return this.direccionesService.create(req.user.userId, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar dirección' })
  update(@Request() req, @Param('id') id: string, @Body() dto: CreateDireccionDto) {
    return this.direccionesService.update(req.user.userId, +id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar dirección' })
  delete(@Request() req, @Param('id') id: string) {
    return this.direccionesService.delete(req.user.userId, +id);
  }
}