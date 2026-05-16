import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProveedoresService } from './proveedores.service';
import { CreateProveedoreDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { ROLE_ADMIN, ROLE_VENDEDOR } from '../auth/constants';

@ApiTags('proveedores')
@ApiBearerAuth('JWT-auth')
@Roles(ROLE_ADMIN, ROLE_VENDEDOR)
@Controller('proveedores')
export class ProveedoresController {
  constructor(private readonly proveedoresService: ProveedoresService) {}

  @Roles(ROLE_ADMIN)
  @Post()
  @ApiOperation({ summary: 'Crear proveedor (admin)' })
  create(@Body() createProveedoreDto: CreateProveedoreDto) {
    return this.proveedoresService.create(createProveedoreDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar proveedores' })
  findAll() {
    return this.proveedoresService.findAll();
  }

  @Get('activos')
  @ApiOperation({ summary: 'Proveedores activos' })
  getActivos() {
    return this.proveedoresService.getActivos();
  }

  @Get('buscar')
  @ApiOperation({ summary: 'Buscar proveedores' })
  buscar(@Query('termino') termino: string) {
    return this.proveedoresService.buscar(termino);
  }

  @Get('nit/:nit')
  @ApiOperation({ summary: 'Buscar proveedor por NIT' })
  findByNit(@Param('nit') nit: string) {
    return this.proveedoresService.findByNit(nit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener proveedor por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.proveedoresService.findOne(id);
  }

  @Roles(ROLE_ADMIN)
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar proveedor (admin)' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProveedoreDto: UpdateProveedoreDto,
  ) {
    return this.proveedoresService.update(id, updateProveedoreDto);
  }

  @Roles(ROLE_ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar proveedor (admin)' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.proveedoresService.remove(id);
  }
}
