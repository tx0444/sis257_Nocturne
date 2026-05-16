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
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { ROLE_ADMIN } from '../auth/constants';

@ApiTags('productos')
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Roles(ROLE_ADMIN)
  @ApiBearerAuth('JWT-auth')
  @Post()
  @ApiOperation({ summary: 'Crear producto (admin)' })
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productosService.create(createProductoDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Listar productos (catálogo público)' })
  findAll() {
    return this.productosService.findAll();
  }

  @Public()
  @Get('activos')
  @ApiOperation({ summary: 'Productos activos (catálogo público)' })
  getActivos() {
    return this.productosService.getActivos();
  }

  @Public()
  @Get('buscar')
  @ApiOperation({ summary: 'Buscar productos (catálogo público)' })
  buscar(@Query('termino') termino: string) {
    return this.productosService.buscar(termino);
  }

  @Public()
  @Get('categoria/:categoriaId')
  @ApiOperation({ summary: 'Productos por categoría (público)' })
  findByCategoria(@Param('categoriaId', ParseIntPipe) categoriaId: number) {
    return this.productosService.findByCategoria(categoriaId);
  }

  @Public()
  @Get('codigo/:codigo')
  @ApiOperation({ summary: 'Buscar por código de barras (público)' })
  findByCodigoBarras(@Param('codigo') codigo: string) {
    return this.productosService.findByCodigoBarras(codigo);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Detalle de producto (público)' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productosService.findOne(id);
  }

  @Roles(ROLE_ADMIN)
  @ApiBearerAuth('JWT-auth')
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar producto (admin)' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductoDto: UpdateProductoDto,
  ) {
    return this.productosService.update(id, updateProductoDto);
  }

  @Roles(ROLE_ADMIN)
  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar producto (admin)' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productosService.remove(id);
  }
}
