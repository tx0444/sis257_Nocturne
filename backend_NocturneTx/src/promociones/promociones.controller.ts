import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PromocionesService } from './promociones.service';
import { CreatePromocionDto } from './dto/create-promocion.dto';
import { UpdatePromocionDto } from './dto/update-promocion.dto';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { ROLE_ADMIN } from '../auth/constants';

@ApiTags('promociones')
@Controller('promociones')
export class PromocionesController {
  constructor(private readonly promocionesService: PromocionesService) {}

  @Roles(ROLE_ADMIN)
  @ApiBearerAuth('JWT-auth')
  @Post()
  @ApiOperation({ summary: 'Crear promoción (admin)' })
  create(@Body() createPromocionDto: CreatePromocionDto) {
    return this.promocionesService.create(createPromocionDto);
  }

  @Public()
  @Post('calcular')
  @ApiOperation({ summary: 'Calcular descuentos aplicables (público)' })
  calcularDescuentos(@Body() items: { productoId: number; cantidad: number }[]) {
    return this.promocionesService.calcularDescuentos(items);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Listar promociones activas (público)' })
  findAll() {
    return this.promocionesService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Detalle de promoción (público)' })
  findOne(@Param('id') id: string) {
    return this.promocionesService.findOne(+id);
  }

  @Roles(ROLE_ADMIN)
  @ApiBearerAuth('JWT-auth')
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar promoción (admin)' })
  update(@Param('id') id: string, @Body() updatePromocionDto: UpdatePromocionDto) {
    return this.promocionesService.update(+id, updatePromocionDto);
  }

  @Roles(ROLE_ADMIN)
  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar promoción (admin)' })
  remove(@Param('id') id: string) {
    return this.promocionesService.remove(+id);
  }
}
