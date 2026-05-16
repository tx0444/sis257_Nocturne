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
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { ROLE_ADMIN } from '../auth/constants';

@ApiTags('categorías')
@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Roles(ROLE_ADMIN)
  @ApiBearerAuth('JWT-auth')
  @Post()
  @ApiOperation({ summary: 'Crear categoría (admin)' })
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.create(createCategoriaDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Listar categorías (público)' })
  findAll() {
    return this.categoriasService.findAll();
  }

  @Public()
  @Get('conteo')
  @ApiOperation({ summary: 'Conteo de productos por categoría (público)' })
  getConteoProductos() {
    return this.categoriasService.getConteoProductos();
  }

  @Public()
  @Get('nombre/:nombre')
  @ApiOperation({ summary: 'Buscar categoría por nombre (público)' })
  findByNombre(@Param('nombre') nombre: string) {
    return this.categoriasService.findByNombre(nombre);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Detalle de categoría (público)' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriasService.findOne(id);
  }

  @Roles(ROLE_ADMIN)
  @ApiBearerAuth('JWT-auth')
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar categoría (admin)' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ) {
    return this.categoriasService.update(id, updateCategoriaDto);
  }

  @Roles(ROLE_ADMIN)
  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar categoría (admin)' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriasService.remove(id);
  }
}
