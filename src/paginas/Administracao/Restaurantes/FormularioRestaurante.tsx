import { Button, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import http from "../../../http"
import IRestaurante from "../../../interfaces/IRestaurante"

const FormularioRestaurante = () =>{

    const parametros = useParams()

    useEffect(() =>{
        if(parametros.id){
            http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
            .then(resposta => setNomeRestaurante(resposta.data.nome))
        }
    }, [parametros])

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        if(parametros.id){
            http.put(`restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            })
            .then(() => {
                alert("Restaurante atualizado com sucesso") 
            })
        }else{
            http.post('restaurantes/', {
                nome: nomeRestaurante
            })
            .then(() => {
                alert("Restaurante cadastrado com sucesso") 
            })
        }
        evento.preventDefault()
    }
    return(
        <Box sx={{display: "flex", flexDirection: "column", alignItems:"center" }}>
            <Typography component="h1" variant ="h6">Formulário de Restaurantes</Typography>
            <Box component="form" onSubmit={aoSubmeterForm}>
                <TextField 
                    value={nomeRestaurante} 
                    id="standard-basic" 
                    label="Nome do restaurante" 
                    variant="standard"
                    fullWidth
                    required
                    onChange={evento => setNomeRestaurante(evento.target.value)}
                />
                <Button sx={{marginTop: 1}} type="submit" fullWidth variant="outlined">Salvar</Button>
            </Box>
        </Box>
    )
}

export default FormularioRestaurante