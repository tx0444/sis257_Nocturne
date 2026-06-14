import { Controller, Get, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuditoriaService } from './auditoria.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('auditorias')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('auditorias')
export class AuditoriaController {
  constructor(private readonly auditoriaService: AuditoriaService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los registros de auditoría (Solo Admin)' })
  async findAll(@Request() req: any) {
    if (req.user?.rol?.nombre !== 'ADMIN') {
      throw new ForbiddenException('No tienes permisos para ver la bitácora de auditoría.');
    }
    return this.auditoriaService.obtenerTodos();
  }
}
