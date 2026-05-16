import { Controller, Get, Post, Patch, Delete, Body, Param, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CarritoService } from './carrito.service';
import { AddToCartDto, UpdateCartItemDto } from './dto/add-to-cart.dto';

@ApiTags('carrito')
@ApiBearerAuth('JWT-auth')
@Controller('carrito')
export class CarritoController {
  constructor(private readonly carritoService: CarritoService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener carrito del usuario' })
  getCarrito(@Request() req: { user: { userId: number } }) {
    return this.carritoService.getCarrito(req.user.userId);
  }

  @Post('agregar')
  @ApiOperation({ summary: 'Agregar producto al carrito' })
  addItem(@Request() req: { user: { userId: number } }, @Body() dto: AddToCartDto) {
    return this.carritoService.addItem(req.user.userId, dto);
  }

  @Patch(':productoId')
  @ApiOperation({ summary: 'Actualizar cantidad de un item' })
  updateItem(
    @Request() req: { user: { userId: number } },
    @Param('productoId') productoId: string,
    @Body() dto: UpdateCartItemDto,
  ) {
    return this.carritoService.updateItem(req.user.userId, +productoId, dto);
  }

  @Delete(':productoId')
  @ApiOperation({ summary: 'Eliminar item del carrito' })
  removeItem(@Request() req: { user: { userId: number } }, @Param('productoId') productoId: string) {
    return this.carritoService.removeItem(req.user.userId, +productoId);
  }

  @Delete()
  @ApiOperation({ summary: 'Vaciar carrito' })
  clearCart(@Request() req: { user: { userId: number } }) {
    return this.carritoService.clearCart(req.user.userId);
  }
}
