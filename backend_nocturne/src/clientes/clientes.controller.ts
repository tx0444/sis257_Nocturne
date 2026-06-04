import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { JwtAccessAuthGuard } from '../auth/guards/jwt-access-auth.guard';
import { Public } from '../auth/decorators/auth-public.decorator';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Public()
  @Post()
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clientesService.create(createClienteDto);
  }

  @UseGuards(JwtAccessAuthGuard)
  @Get()
  findAll() {
    return this.clientesService.findAll();
  }

  @UseGuards(JwtAccessAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientesService.findOne(+id);
  }

  @UseGuards(JwtAccessAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clientesService.update(+id, updateClienteDto);
  }

  @UseGuards(JwtAccessAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientesService.remove(+id);
  }
}
