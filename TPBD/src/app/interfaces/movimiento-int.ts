import { TipoMovimiento } from '../enums/tipo-movimiento.enum';

export interface MovimientoInt {
    tipo: TipoMovimiento;
    usuario: string;
    producto?: string;
    local?: string;
    cantidad?: number;
}
