import { useState } from "react";

interface Usuario {
    nomeUsuario: string;
    emailUsuario: string;
}

export default function useUsuario (pageLimit: number) {
    
    const [ usuarios , setUsuarios ] = useState({
        totalPages: 0,
        lista: []
      });

    function fecthUsuario(page: number, matricula: string) {
        
        const virtualPage = ((page - 1) * pageLimit) <= 0
            ? 0
            : ((page - 1) * pageLimit)

        fetch(
            `http://localhost:8080/usuario/listar?page=${virtualPage}&size=${pageLimit}&matricula=${matricula}`
        )
        .then(res => res.json())
        .then(data => {
            setUsuarios({
              totalPages: data.totalElements,
              lista: data.content
            });
        })
        .catch(window.alert);
    }

    return {
        fecthUsuario,
        usuarios,
        setUsuarios
    }

}