import React, { ChangeEvent, useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, Select, MenuItem } from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import Tema from '../../../model/Tema';
import Postagem from '../../../model/Postagem';
import { busca, buscaId, post, put } from '../../../service/Service';
import { FormControl, FormHelperText, InputLabel } from '@mui/material';
import "./CadastroPostagem.css"
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';
import Usuario from '../../../model/Usuario';


function CadastroPostagem() {

    let navigate = useNavigate(); // redirecionamento de pagina

    const { id } = useParams<{ id: string }>(); //captura o id da rota-para cadastrar ou atualizar id existente

    const [temas, setTemas] = useState<Tema[]>([]) //armazena listagem de temas já cadastrados na api - 

    //hook useSelector que vai acessar o store, pegar o token e atribuir a essa constante
    const token = useSelector<TokenState, TokenState['tokens']>( //redux captura e armazena o token ???
        (state) => state.tokens
    );

    //verificar se existe um token
    useEffect(() => {
        if (token == "") {
            toast.error("Você precisa logar né queride!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "light",
                progress: undefined,
            });
            navigate("/login") //se nao existe token o navigate direciona para o login
        }
    }, [token])

    const [tema, setTema] = useState<Tema>({ //inicializa os valores dos atributos do como tema como nulos
        id: 0,
        descricao: ""
    })

    const [postagem, setPostagem] = useState<Postagem>({
        id: 0,
        titulo: "",
        texto: "",
        data: "",
        tema: null,
        usuario: null
    })

    const userId = useSelector<TokenState, TokenState['id']>(
        (state) => state.id
    )

    const [usuario, setUsuario] = useState<Usuario>({
        id: +userId,
        nome: "",
        foto: "",
        usuario: "",
        senha: ""
    })


    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema,
            usuario: usuario
        })
    }, [tema])


    useEffect(() => {
        getTemas()
        if (id !== undefined) {
            findByIdPostagem(id)
        }
    }, [id])


    async function getTemas() {
        await busca("/temas", setTemas, {
            headers: {
                'Authorization': token
            }
        })
    }


    async function findByIdPostagem(id: string) {
        await buscaId(`/postagens/${id}`, setPostagem, {
            headers: {
                'Authorization': token
            }
        })
    }


    function updatedPostagem(event: ChangeEvent<HTMLInputElement>) {
        setPostagem({
            ...postagem,
            [event.target.name]: event.target.value,
            tema: tema
        })
    }


    //
    async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault()
        console.log("postagem" + JSON.stringify(postagem)) //para verificação

        if (id !== undefined) {

            try {
                await put(`/postagens`, postagem, setPostagem, {
                    headers: {
                        'Authorization': token
                    }
                })
                toast.success("Arrasou!", {
                    icon: "🔥",
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
                toast.error("Erroooooou!", {
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
        } else {
            try {
                await post(`/postagens`, postagem, setPostagem, {
                    headers: {
                        'Authorization': token
                    }
                })
                toast.success("Arrasou!", {
                    icon: "🔥",
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
                toast.error("Erroooooou!", {
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
        back()
    }

    function back() {
        navigate('/posts')
    }

    return (
        <Container maxWidth="sm" className='topo'>
            <form onSubmit={onSubmit}>
                <Typography variant='h3' color='textSecondary' component="h1" align="center">
                    Cadastra Aí!
                </Typography>


                <FormControl>
                    <InputLabel id='demo-simple-select-helper-label'>
                        Tema
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id='demo-simple-select-helper'
                        onChange={(event) => buscaId(`/temas/${event.target.value}`, setTema, {
                            headers: {
                                'Authorization': token
                            }
                        })}>
                        {
                            temas.map(tema => (
                                <MenuItem value={tema.id}>{tema.descricao}</MenuItem>
                            ))
                        }
                    </Select>
                    <FormHelperText>Escolha um tema para a postagem</FormHelperText>

                </FormControl>
                <TextField value={postagem.titulo} onChange={(event: ChangeEvent<HTMLInputElement>) => updatedPostagem(event)} id='titulo' label="titulo" variant='outlined' name='titulo' margin='normal' fullWidth />
                <TextField value={postagem.texto} onChange={(event: ChangeEvent<HTMLInputElement>) => updatedPostagem(event)} id='texto' label='texto' variant='outlined' name='texto' margin='normal' fullWidth />

                <Button type='submit' variant='contained' color='primary' disabled={tema.id === 0}>
                    Werk!
                </Button>

            </form>
        </Container>
    )
}

export default CadastroPostagem;