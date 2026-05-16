import { RolesService } from './roles.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    create(createRolDto: CreateRolDto): Promise<import("./entities/rol.entity").Rol>;
    findAll(): Promise<import("./entities/rol.entity").Rol[]>;
    findByNombre(nombre: string): Promise<import("./entities/rol.entity").Rol | null>;
    findOne(id: number): Promise<import("./entities/rol.entity").Rol>;
    update(id: number, updateRolDto: UpdateRolDto): Promise<import("./entities/rol.entity").Rol>;
    remove(id: number): Promise<void>;
}
