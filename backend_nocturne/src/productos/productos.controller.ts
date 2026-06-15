import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync, writeFileSync, readdirSync, unlinkSync } from 'fs';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('productos')
@ApiBearerAuth()
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post('upload-hero')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Subir o reemplazar el video de fondo de la página de inicio (Solo Admin)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: (req, file, callback) => {
        const targetDir = join(process.cwd(), '..', 'frontend_nocturne', 'public', 'video');
        if (!existsSync(targetDir)) {
          mkdirSync(targetDir, { recursive: true });
        }
        callback(null, targetDir);
      },
      filename: (req, file, callback) => {
        const ext = extname(file.originalname);
        const uniqueSuffix = Date.now();
        callback(null, `hero-${uniqueSuffix}${ext}`);
      }
    }),
    fileFilter: (req, file, callback) => {
      if (!file.mimetype.match(/\/(mp4|webm|ogg|mov|avi)$/i)) {
        return callback(new Error('Solo se permiten archivos de video.'), false);
      }
      callback(null, true);
    }
  }))
  uploadHeroFile(@UploadedFile() file: any) {
    if (!file) {
      return { url: '' };
    }
    const targetDir = join(process.cwd(), '..', 'frontend_nocturne', 'public', 'video');
    
    // Clean old hero videos to avoid cluttering the public/video folder
    try {
      const files = readdirSync(targetDir);
      files.forEach((f) => {
        if (f.startsWith('hero-') && f !== file.filename) {
          unlinkSync(join(targetDir, f));
        }
      });
    } catch (e) {
      console.error('Error al limpiar videos anteriores:', e);
    }

    // Save the new video configuration
    const videoUrl = `/video/${file.filename}`;
    try {
      writeFileSync(
        join(targetDir, 'config.json'),
        JSON.stringify({ videoUrl }, null, 2)
      );
    } catch (e) {
      console.error('Error al guardar config.json:', e);
    }

    return { url: videoUrl };
  }

  @Post('restore-hero')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Restablecer el video de fondo predeterminado (Solo Admin)' })
  restoreHero() {
    const targetDir = join(process.cwd(), '..', 'frontend_nocturne', 'public', 'video');
    
    // Clean custom hero videos to avoid cluttering
    try {
      const files = readdirSync(targetDir);
      files.forEach((f) => {
        if (f.startsWith('hero-')) {
          unlinkSync(join(targetDir, f));
        }
      });
    } catch (e) {
      console.error('Error al limpiar videos anteriores:', e);
    }

    // Save default videoUrl config
    const videoUrl = '/video/hero.mp4';
    try {
      writeFileSync(
        join(targetDir, 'config.json'),
        JSON.stringify({ videoUrl }, null, 2)
      );
    } catch (e) {
      console.error('Error al guardar config.json:', e);
    }

    return { url: videoUrl };
  }

  @Post('upload-qr')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Subir o reemplazar la imagen del código QR estático para pagos (Solo Admin)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: (req, file, callback) => {
        const targetDir = join(process.cwd(), '..', 'frontend_nocturne', 'public', 'qr');
        if (!existsSync(targetDir)) {
          mkdirSync(targetDir, { recursive: true });
        }
        callback(null, targetDir);
      },
      filename: (req, file, callback) => {
        const ext = extname(file.originalname);
        const uniqueSuffix = Date.now();
        callback(null, `qr-${uniqueSuffix}${ext}`);
      }
    }),
    fileFilter: (req, file, callback) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/i)) {
        return callback(new Error('Solo se permiten imágenes (.jpg, .jpeg, .png, .webp).'), false);
      }
      callback(null, true);
    }
  }))
  uploadQrFile(@UploadedFile() file: any) {
    if (!file) {
      return { url: '' };
    }
    const targetDir = join(process.cwd(), '..', 'frontend_nocturne', 'public', 'qr');
    
    try {
      const files = readdirSync(targetDir);
      files.forEach((f) => {
        if (f.startsWith('qr-') && f !== file.filename) {
          unlinkSync(join(targetDir, f));
        }
      });
    } catch (e) {
      console.error('Error al limpiar QR anteriores:', e);
    }

    const qrUrl = `/qr/${file.filename}`;
    try {
      writeFileSync(
        join(targetDir, 'config.json'),
        JSON.stringify({ qrUrl }, null, 2)
      );
    } catch (e) {
      console.error('Error al guardar config.json:', e);
    }

    return { url: qrUrl };
  }

  @Post('restore-qr')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Restablecer el código QR estático predeterminado (Solo Admin)' })
  restoreQr() {
    const targetDir = join(process.cwd(), '..', 'frontend_nocturne', 'public', 'qr');
    
    try {
      const files = readdirSync(targetDir);
      files.forEach((f) => {
        if (f.startsWith('qr-')) {
          unlinkSync(join(targetDir, f));
        }
      });
    } catch (e) {
      console.error('Error al limpiar QR anteriores:', e);
    }

    const qrUrl = '/qr/default-qr.png';
    try {
      writeFileSync(
        join(targetDir, 'config.json'),
        JSON.stringify({ qrUrl }, null, 2)
      );
    } catch (e) {
      console.error('Error al guardar config.json:', e);
    }

    return { url: qrUrl };
  }

  @Post('upload')
  @ApiOperation({ summary: 'Subir una imagen o video para un producto' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: (req, file, callback) => {
        const isVideo = file.mimetype.startsWith('video/');
        const targetDir = isVideo 
          ? join(process.cwd(), '..', 'frontend_nocturne', 'public', 'videos')
          : join(process.cwd(), '..', 'frontend_nocturne', 'public', 'uploads');
          
        if (!existsSync(targetDir)) {
          mkdirSync(targetDir, { recursive: true });
        }
        callback(null, targetDir);
      },
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `prod-${uniqueSuffix}${ext}`);
      }
    }),
    fileFilter: (req, file, callback) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp|mp4|webm|ogg|mov|avi)$/i)) {
        return callback(new Error('Solo se permiten archivos de imagen o video.'), false);
      }
      callback(null, true);
    }
  }))
  uploadFile(@UploadedFile() file: any) {
    if (!file) {
      return { url: '' };
    }
    const isVideo = file.mimetype.startsWith('video/');
    const folder = isVideo ? 'videos' : 'uploads';
    return {
      url: `/${folder}/${file.filename}`
    };
  }

  @Post()
  @ApiOperation({ summary: 'Crear un producto' })
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productosService.create(createProductoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  findAll() {
    return this.productosService.findAll();
  }

  @Get('buscar')
  @ApiOperation({ summary: 'Buscar productos por nombre o código' })
  buscar(@Query('q') termino: string) {
    return this.productosService.buscar(termino || '');
  }

  @Get('bajo-stock')
  @ApiOperation({ summary: 'Obtener productos con stock bajo' })
  getBajoStock() {
    return this.productosService.getBajoStock();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productosService.findOne(id);
  }

  @Get(':id/combo-items')
  @ApiOperation({ summary: 'Obtener los componentes de un combo' })
  getComboItems(@Param('id', ParseIntPipe) id: number) {
    return this.productosService.getComboItems(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un producto' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productosService.update(id, updateProductoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un producto' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productosService.remove(id);
  }
}
