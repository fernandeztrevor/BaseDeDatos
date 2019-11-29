import { Rol } from '../enums/rol.enum';

export interface UsuarioInt {
    nombre: string;
    apellido: string;
    email: string;
    foto: string;
    activo: boolean;
    rol: Rol;
    id?: string;
    local?: string;
}
