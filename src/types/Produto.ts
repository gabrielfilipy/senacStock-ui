import { Departamento } from "./Departamento";
import { Usuario } from "./Usuario";

export type Produto = {
    idProduto?: number;
    nomeProduto?: string;
    qtdProduto?: number;
    descProduto?: string;
    valorProduto?: string;
    dtVencimentoProd?: string;
    ativo?: boolean;
    usuario?: Usuario;
    departamento?: Departamento;
    qtdParaDarBaixa?: any;
}