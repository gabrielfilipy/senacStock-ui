import axios from "axios";
import { useState } from "react";

interface Produto {
    idProduto: number;
    nomeProduto: string;
    age: number;
    qtdProduto: string;
  }

export default function useProduto (pageLimit: number) {
    
    const [ produto , setProduto ] = useState<any>({
        totalPages: 0,
        lista: [],
        produtoObj: Object
      });

    function fecthProduto(page: number, nome: string) {
        
        const virtualPage = ((page - 1) * pageLimit) <= 0
            ? 0
            : ((page - 1) * pageLimit)

        fetch(
            `http://localhost:8080/produto/listar?page=${virtualPage}&size=${pageLimit}&nome=${nome}`
        )
        .then(res => res.json())
        .then(data => {
            setProduto({
              totalPages: data.totalElements,
              lista: data.content,
              produtoObj: data
            });
        })
        .catch(console.log);
    }

    function buscarPorCodigo(codigo: any) {
        fetch(
            `http://localhost:8080/produto/buscar/${codigo}`
        )
        .then(res => res.json())
        .then(data => {
            setProduto({
                totalPages: 0,
                lista: [],
                produtoObj: data
            });
        }).catch(console.log);
    }

    return {
        fecthProduto,
        buscarPorCodigo,
        produto,
        setProduto
    }

}