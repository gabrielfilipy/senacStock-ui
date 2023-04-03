import { Produto } from "./Produto";
import { Retirada } from "./Retirada";

export type RetiradaProduto = {
    idRetiradaProd?: number;
    produto?: Produto;
    retirada?: Retirada;
}