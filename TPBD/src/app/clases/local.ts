import { Producto } from './producto';
import { Usuario } from './usuario';

export class Local {
    public sucursal: string;
    public direccion: string;
    public stock: Array<Producto>;
    public empleados: Array<Usuario>;

    constructor(sucursal: string, direccion: string) {
        this.sucursal = sucursal;
        this.direccion = direccion;
        this.stock = new Array<Producto>();
        this.empleados = new  Array<Usuario>();
    }
}
