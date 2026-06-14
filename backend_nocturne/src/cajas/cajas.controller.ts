import { Controller, Get, Post, Body, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CajasService } from './cajas.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('cajas')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cajas')
export class CajasController {
  constructor(private readonly cajasService: CajasService) {}

  @Get('active')
  @ApiOperation({ summary: 'Obtener la caja activa del usuario autenticado' })
  async findActive(@Request() req: any) {
    return this.cajasService.findActive(req.user.id);
  }

  @Get('active/resumen')
  @ApiOperation({ summary: 'Obtener el resumen de ventas de la caja activa' })
  async getResumen(@Request() req: any) {
    const active = await this.cajasService.findActiveOrThrow(req.user.id);
    return this.cajasService.obtenerResumenActual(active.id);
  }

  @Post('abrir')
  @ApiOperation({ summary: 'Abrir una nueva caja' })
  async abrir(
    @Request() req: any,
    @Body('montoInicial') montoInicial: number,
  ) {
    return this.cajasService.abrir(req.user.id, montoInicial || 0, req.user);
  }

  @Post('cerrar')
  @ApiOperation({ summary: 'Cerrar la caja activa' })
  async cerrar(
    @Request() req: any,
    @Body('montoFinal') montoFinal: number,
  ) {
    return this.cajasService.cerrar(req.user.id, montoFinal || 0, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener el historial de todas las cajas (Solo Admin)' })
  async findAll(@Request() req: any) {
    if (req.user?.rol?.nombre !== 'ADMIN') {
      throw new ForbiddenException('No tienes permisos para ver el historial de arqueo de cajas.');
    }
    return this.cajasService.findAll();
  }
}
