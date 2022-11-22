import React, { ChangeEvent, useState, useEffect } from "react";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { Box } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import UsuarioLogin from "../../model/UsuarioLogin";
import { getValue } from "@mui/system";
import { login } from "../../service/Service";
import "./Login.css";
import { useDispatch } from "react-redux";
import { addToken } from "../../store/tokens/actions";
import { toast } from "react-toastify";
import { addId } from './../../store/tokens/actions';

//useState gancho que deixa manipular os dados de um componente

function Login() {
    // useState define como uma determinada variavel será inicializada quando o Componente for carregado em tela
    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({ // primeiro valor é pra acessar e o segundo é pra alterar/valores padrão que serão inicializados:
        id: 0,
        nome: "",
        foto: "",
        usuario: "",
        senha: "",
        token: "",
    });

    const [respUsuarioLogin, setRespUsuarioLogin] = useState<UsuarioLogin> ({
        id: 0,
        nome: "",
        foto: "",
        usuario: "",
        senha: "",
        token: "",
    });

    // Redireciona o usuário para determinada pagina
    let history = useNavigate();

    // Hooks que vão manipular o nosso Local Storage para gravar o Token
    // const [token, setToken] = useLocalStorage("token");

    //método novo com REDUX - 
    const dispatch = useDispatch();

    const [token, setToken] = useState('');

    //Função que junto com a setUsuarioLogin irá atualizar o valor inicial da usuarioLogin
    //se clicar dentro em qualquer c oisa do formulario essa funçao será ativada
    function updateModel(event: ChangeEvent<HTMLInputElement>) {
        //manipulação de elementos input
        setUsuarioLogin({
            ...usuarioLogin, // os "..." espalham o que está no UsuarioLogin(atributos) para o setUsuarioLogin
            [event.target.name]: event.target.value, // o name captura o campo que usuario digita e o value é o valor de fato que o usuario digitou
        });
    }

    useEffect(() => {
        if(respUsuarioLogin.token !== "") {
            dispatch(addToken(respUsuarioLogin.token))
            dispatch(addId(respUsuarioLogin.id.toString()))
            history("/home");
        }
    }, [respUsuarioLogin.token])

    // Hook de efeito colateral, sempre executa uma função quando o que estiver no seu Array é alterado
    useEffect(()=>{
        if (token != "") { //se o token nao está vazio, significa que já existe um usuário
            dispatch(addToken(token)); //então o token do usuário é interceptado e armazenado pelo redux 
            history('/home'); //e direciona para a tela home
        }  
    },[token])

    // Função que irá enviar os dados de fato para o backend, interligando com o conteudo da Service.ts
    async function logar(event: ChangeEvent<HTMLFormElement>) {
        //função que olha o formulário como um todo
        event.preventDefault(); //impedir que o botão atualize a tela

        try {
            await login("/usuarios/logar", usuarioLogin, setRespUsuarioLogin);
            toast.success("Welcome to the underworld", {
                icon: "🧛🏻‍♀️",
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "light",
                progress: undefined,
            });
        } catch (error) {
            toast.error("You shall not pass!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "light",
                progress: undefined,
            });
        }
	}

   

        return (
            <>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    className="caixa"
                >
                    <Grid item alignItems="center" xs={6}>
                        <Box paddingX={20}>
                            <form onSubmit={logar}>
                                <Typography
                                    variant="h3"
                                    gutterBottom
                                    component="h3"
                                    align="center"
                                    className="textos1"
                                >
                                    Be the bullet hell!
                                </Typography>
                                <TextField
                                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                        updateModel(event)
                                    }
                                    value={usuarioLogin.usuario}
                                    id="usuario"
                                    label="usuário (e-mail)"
                                    variant="outlined"
                                    name="usuario"
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField
                                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                        updateModel(event)
                                    }
                                    value={usuarioLogin.senha}
                                    id="senha"
                                    label="senha"
                                    variant="outlined"
                                    name="senha"
                                    margin="normal"
                                    type="password"
                                    fullWidth
                                />
                                <Box marginTop={2} textAlign="center">
                                    
                                        <Button type="submit" variant="contained" className="text-decorator-none botao">
                                            Logar
                                        </Button>
                                    
                                </Box>
                            </form>
                            <Box display="flex" justifyContent="center" marginTop={2}>
                                <Box marginRight={1}>
                                    <Typography variant="subtitle1" gutterBottom align="center">
                                        Não tem uma conta?
                                    </Typography>
                                </Box>
                                <Link to="/cadastroUsuario" className="text-decorator-none">
                                    <Typography
                                        variant="subtitle1"
                                        gutterBottom
                                        align="center"
                                        className="textos1 text-decorator-none"
                                    >
                                        Cadastre-se!
                                    </Typography>
                                </Link>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={6} className="img"></Grid>
                </Grid>
            </>
        );
    
}
export default Login;