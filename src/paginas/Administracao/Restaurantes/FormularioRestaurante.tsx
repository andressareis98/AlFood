import { Button, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import IRestaurante from "../../../interfaces/IRestaurante"

const FormularioRestaurante = () =>{

    const parametros = useParams()

    useEffect(() =>{
        if(parametros.id){
            axios.get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`)
            .then(resposta => setNomeRestaurante(resposta.data.nome))
        }
    }, [parametros])

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        if(parametros.id){
            axios.put(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            })
            .then(() => {
                alert("Restaurante atualizado com sucesso") 
            })
        }else{
            axios.post('http://localhost:8000/api/v2/restaurantes/', {
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
                    label="Standard" 
                    variant="standard"
                    fullWidth
                    required
                    onChange={evento => setNomeRestaurante(evento.target.value)}
                />
                <Button sx={{marginTop: 1}} type="submit" fullWidth variant="outlined">Outlined</Button>
            </Box>
        </Box>
    )
}

export default FormularioRestaurante