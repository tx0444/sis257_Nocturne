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
import { ProveedoresService } from './proveedores.service';
import { CreateProveedoreDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';

@Controller('proveedores')
export class ProveedoresController {
  constructor(private readonly proveedoresService: ProveedoresService) {}

  @Post()
  create(@Body() createProveedoreDto: CreateProveedoreDto) {
    return this.proveedoresService.create(createProveedoreDto);
  }

  @Get()
  findAll() {
    return this.proveedoresService.findAll();
  }

  @Get('activos')
  getActivos() {
    return this.proveedoresService.getActivos();
  }

  @Get('buscar')
  buscar(@Query('termino') termino: string) {
    return this.proveedoresService.buscar(termino);
  }

  @Get('nit/:nit')
  findByNit(@Param('nit') nit: string) {
    return this.proveedoresService.findByNit(nit);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.proveedoresService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProveedoreDto: UpdateProveedoreDto,
  ) {
    return this.proveedoresService.update(id, updateProveedoreDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.proveedoresService.remove(id);
  }
}