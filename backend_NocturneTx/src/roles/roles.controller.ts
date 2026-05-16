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
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { ROLE_ADMIN } from '../auth/constants';

@ApiTags('roles')
@ApiBearerAuth('JWT-auth')
@Roles(ROLE_ADMIN)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear rol' })
  create(@Body() createRolDto: CreateRolDto) {
    return this.rolesService.create(createRolDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar roles' })
  findAll() {
    return this.rolesService.findAll();
  }

  @Get('nombre/:nombre')
  @ApiOperation({ summary: 'Buscar rol por nombre' })
  findByNombre(@Param('nombre') nombre: string) {
    return this.rolesService.findByNombre(nombre);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener rol por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar rol' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRolDto: UpdateRolDto,
  ) {
    return this.rolesService.update(id, updateRolDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar rol' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.remove(id);
  }
}
