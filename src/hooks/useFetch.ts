import axios from "axios";
import { useState, useEffect } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";

export function useFetch<T = unknown>(url: string, validaCampos: any) {

  const [response, setResponse] = useState<T | null>(null)

  const { register, handleSubmit, setValue, getValues, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validaCampos)
  })

  useEffect(() => { 
      axios.get(url)
        .then(response => {
          setResponse(response.data); 
          reset(response.data);
        })
  }, []);

  return { response, register, handleSubmit, reset, setValue, errors, getValues };
}