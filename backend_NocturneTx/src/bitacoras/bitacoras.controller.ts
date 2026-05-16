import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BitacorasService } from './bitacoras.service';
import { CreateBitacoraDto } from './dto/create-bitacora.dto';
import { AccionBitacora } from './entities/bitacora.entity';
import { Roles } from '../auth/decorators/roles.decorator';
import { ROLE_ADMIN } from '../auth/constants';

@ApiTags('bitácoras')
@ApiBearerAuth('JWT-auth')
@Roles(ROLE_ADMIN)
@Controller('bitacoras')
export class BitacorasController {
  constructor(private readonly bitacorasService: BitacorasService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar evento en bitácora' })
  create(@Body() data: CreateBitacoraDto) {
    return this.bitacorasService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Listar bitácoras' })
  findAll() {
    return this.bitacorasService.findAll();
  }

  @Get('tabla/:tabla')
  @ApiOperation({ summary: 'Bitácoras por tabla' })
  findByTable(@Param('tabla') tabla: string) {
    return this.bitacorasService.findByTable(tabla);
  }

  @Get('usuario/:usuarioId')
  @ApiOperation({ summary: 'Bitácoras por usuario' })
  findByUser(@Param('usuarioId') usuarioId: number) {
    return this.bitacorasService.findByUser(usuarioId);
  }

  @Get('accion/:accion')
  @ApiOperation({ summary: 'Bitácoras por acción' })
  findByAccion(@Param('accion') accion: AccionBitacora) {
    return this.bitacorasService.findByAccion(accion);
  }

  @Get('rango')
  @ApiOperation({ summary: 'Bitácoras por rango de fechas' })
  findByDateRange(
    @Query('inicio') inicio: string,
    @Query('fin') fin: string,
  ) {
    return this.bitacorasService.findByDateRange(new Date(inicio), new Date(fin));
  }

  @Get('reporte')
  @ApiOperation({ summary: 'Reporte de bitácoras' })
  getReporte(
    @Query('inicio') inicio: string,
    @Query('fin') fin: string,
  ) {
    return this.bitacorasService.getReporte(new Date(inicio), new Date(fin));
  }
}
