import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auditoria } from './entities/auditoria.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Injectable()
export class AuditoriaService {
  constructor(
    @InjectRepository(Auditoria)
    private readonly auditoriaRepo: Repository<Auditoria>,
  ) {}

  async registrar(
    usuario: Usuario | null,
    accion: 'CREAR' | 'EDITAR' | 'ELIMINAR',
    tabla: 'VENTAS' | 'CLIENTES',
    registroId: number,
    detalle: string,
  ): Promise<Auditoria> {
    let usuarioNombre = 'Sistema / Anónimo';
    let usuarioId: number | null = null;

    if (usuario) {
      usuarioNombre = `${usuario.nombre} ${usuario.apellido} (${usuario.usuario})`;
      usuarioId = usuario.id;
    }

    const log = this.auditoriaRepo.create({
      usuarioNombre,
      accion,
      tabla,
      registroId,
      detalle,
      usuarioId,
    });

    return await this.auditoriaRepo.save(log);
  }

  async obtenerTodos(): Promise<Auditoria[]> {
    return await this.auditoriaRepo.find({
      order: { fechaCreacion: 'DESC' },
      relations: ['usuario'],
    });
  }
}
