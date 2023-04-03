import { useState } from "react";

export default function useDepartamento (pageLimit: number) {
    
    const [ departamento , setDepartamento ] = useState({
        totalPages: 0,
        nome: '',
        lista: []
    });

    function fecthDepartamento(page: number, nome: string) {
        
        const virtualPage = ((page - 1) * pageLimit) <= 0
            ? 0
            : ((page - 1) * pageLimit)

        fetch(
            `http://localhost:8080/departamento/listar?page=${virtualPage}&size=${pageLimit}&nome=${nome}`
        )
        .then(res => res.json())
        .then(data => {
            setDepartamento({
              totalPages: data.totalElements,
              lista: data.content,
              nome: ''
            });
        })
        .catch(window.alert);
    }

    return {
        fecthDepartamento,
        departamento,
        setDepartamento
    }

}