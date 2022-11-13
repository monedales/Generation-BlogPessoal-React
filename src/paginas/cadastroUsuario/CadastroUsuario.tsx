import React, { useState, useEffect, ChangeEvent } from "react";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { Box } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import Usuario from "../../model/Usuario";
import { cadastroUsuario } from "../../service/Service";
import './CadastroUsuario.css'
import { toast } from "react-toastify";

function CadastroUsuario() {

    let navigate = useNavigate();
    const [confirmarSenha, setConfirmarSenha] = useState<String>("")
    const [usuario, setUsuario] = useState<Usuario>(
        {
            id: 0,
            nome: '',
            foto: "",
            usuario: '',
            senha: ''
        })

    const [userResult, setUserResult] = useState<Usuario>(
        {
            id: 0,
            nome: '',
            foto: "",
            usuario: '',
            senha: ''
        })

    useEffect(() => { // caso o id já tenha sido atualizado, ele não será mais 0 e significa que o cadastro foi realizado
        if (userResult.id !== 0) {
            navigate("/login")
        }
    }, [userResult])


    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value)
    }


    function updateModel(e: ChangeEvent<HTMLInputElement>) {

        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })

    }
    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        if (confirmarSenha === usuario.senha) {
            cadastroUsuario(`/usuarios/cadastrar`, usuario, setUserResult)
            toast.success("Welcome to the underworld", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            });
        } else {
            toast.error("Something's wrong", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            });
        }
    }

    return (
        <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={6} className="img2"></Grid>
            <Grid item xs={6} alignItems="center">
                <Box paddingX={10}>
                    <form onSubmit={onSubmit}>
                        <Typography variant='h3' gutterBottom
                            component="h3"
                            align="center" className='textos2'>Cadastrar</Typography>
                        <TextField
                            value={usuario.nome}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                updateModel(event)}
                            id="nome"
                            label="nome"
                            variant="outlined"
                            name="nome"
                            margin="normal" required fullWidth />
                        <TextField
                            value={usuario.foto}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                updateModel(event)}
                            id="foto"
                            label="URL da foto"
                            variant="outlined"
                            name="foto"
                            margin="normal" fullWidth />
                        <TextField
                            value={usuario.usuario}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                updateModel(event)}
                            id="usuario"
                            label="usuário (e-mail)"
                            variant="outlined"
                            name="usuario"
                            margin="normal" required fullWidth />
                        <TextField
                            value={usuario.senha}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                updateModel(event)}
                            id="senha"
                            label="senha"
                            variant="outlined"
                            name="senha" margin="normal"
                            type="password"
                            placeholder="mínimo de 8 caracteres!" required fullWidth />
                        <TextField
                            value={confirmarSenha}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                confirmarSenhaHandle(event)}
                            id="confirmarSenha"
                            label="confirmarSenha"
                            variant="outlined"
                            name="confirmarSenha" margin="normal"
                            type="password" fullWidth />
                        <Box marginTop={2} textAlign="center">
                            <Link to="/login" className="text-decorator-none">
                                <Button variant="contained" color="secondary" className="btnCancelar">
                                    Cancelar
                                </Button>
                            </Link>
                            <Link to="/home">
                                <Button type="submit" variant="contained" color="primary"> {/*tirar o color e colocar classe pros botoes*/}
                                    Cadastrar
                                </Button>
                            </Link>

                        </Box>
                    </form>
                </Box>
            </Grid>
        </Grid>
    );

}

export default CadastroUsuario;