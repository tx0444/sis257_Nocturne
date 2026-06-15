import {
  Controller, Get, Post, Body, Param, Patch, Delete,
  ParseIntPipe, UseGuards, Request, UseInterceptors,
  UploadedFile, BadRequestException
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { VentasService } from './ventas.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EstadoVenta } from './entities/venta.entity';

@ApiTags('ventas')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ventas')
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar una venta completa (clienteId opcional → Consumidor Final)' })
  create(@Body() createVentaDto: CreateVentaDto, @Request() req: any) {
    return this.ventasService.create(createVentaDto, req.user);
  }

  @Post('upload-comprobante')
  @ApiOperation({ summary: 'Subir comprobante QR de pago (JPG, JPEG, PNG, WEBP)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } } } })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: (req, file, cb) => {
        const uploadPath = join(process.cwd(), '..', 'frontend_nocturne', 'public', 'uploads', 'comprobantes');
        if (!existsSync(uploadPath)) {
          mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `qr-${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
    fileFilter: (req, file, cb) => {
      const allowed = ['.jpg', '.jpeg', '.png', '.webp'];
      if (allowed.includes(extname(file.originalname).toLowerCase())) {
        cb(null, true);
      } else {
        cb(new BadRequestException('Solo se permiten imágenes JPG, JPEG, PNG o WEBP'), false);
      }
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  }))
  uploadComprobante(@UploadedFile() file: any) {
    if (!file) throw new BadRequestException('No se recibió ningún archivo');
    const url = `/uploads/comprobantes/${file.filename}`;
    return { url, filename: file.filename };
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las ventas' })
  findAll() {
    return this.ventasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una venta por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ventasService.findOne(id);
  }

  @Patch(':id/estado')
  @ApiOperation({ summary: 'Cambiar estado de la venta (Pendiente|Confirmada|Entregada|Anulada)' })
  cambiarEstado(
    @Param('id', ParseIntPipe) id: number,
    @Body('estado') estado: any,
    @Request() req: any,
  ) {
    return this.ventasService.cambiarEstado(id, estado, req.user);
  }

  @Patch(':id/comprobante')
  @ApiOperation({ summary: 'Actualizar URL del comprobante QR de una venta' })
  actualizarComprobante(
    @Param('id', ParseIntPipe) id: number,
    @Body('comprobanteQr') comprobanteQr: string,
    @Request() req: any,
  ) {
    return this.ventasService.actualizarComprobante(id, comprobanteQr, req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Anular/eliminar (soft) una venta' })
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.ventasService.remove(id, req.user);
  }
}
