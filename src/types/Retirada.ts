import { Produto } from "./Produto";
import { Usuario } from "./Usuario";

export type Retirada = {
    idRetirada?: number;
    usuario?: Usuario;
    dtRetirada?: string;
    total?: number;
    produtos?: Produto[];
}