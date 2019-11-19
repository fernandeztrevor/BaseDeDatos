export class Producto {
    public nombre: string;
    public costo: number;
    public cantidad: number;
    public fechaDeCreacion: string;
    public descripcion: string;
    public observaciones: string;
    public foto: string;
    public activo: boolean;

    constructor(nombre: string, costo: number, cantidad: number, fechaDeCreacion: string, descripcion: string, observaciones: string, foto: string, activo: boolean) {
        this.nombre = nombre;
        this.costo = costo;
        this.cantidad = cantidad;
        this.fechaDeCreacion = fechaDeCreacion;
        this.descripcion = descripcion;
        this.observaciones = observaciones;
        this.foto = foto;
        this.activo = activo;
    }
}
