import { Controller, Get, Post, Patch, Delete, Body, Param, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DireccionesService } from './direcciones.service';
import { CreateDireccionDto } from './dto/create-direccion.dto';

@ApiTags('direcciones')
@ApiBearerAuth('JWT-auth')
@Controller('direcciones')
export class DireccionesController {
  constructor(private readonly direccionesService: DireccionesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las direcciones del usuario' })
  getAll(@Request() req: { user: { userId: number } }) {
    return this.direccionesService.getAll(req.user.userId);
  }

  @Post()
  @ApiOperation({ summary: 'Crear nueva dirección' })
  create(@Request() req: { user: { userId: number } }, @Body() dto: CreateDireccionDto) {
    return this.direccionesService.create(req.user.userId, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar dirección' })
  update(
    @Request() req: { user: { userId: number } },
    @Param('id') id: string,
    @Body() dto: CreateDireccionDto,
  ) {
    return this.direccionesService.update(req.user.userId, +id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar dirección' })
  delete(@Request() req: { user: { userId: number } }, @Param('id') id: string) {
    return this.direccionesService.delete(req.user.userId, +id);
  }
}
