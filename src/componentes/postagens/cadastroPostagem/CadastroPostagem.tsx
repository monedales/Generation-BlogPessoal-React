import React, { ChangeEvent, useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, Select } from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import Tema from '../../../model/Tema';
import Postagem from '../../../model/Postagem';
import useLocalStorage from 'react-use-localstorage';
import { busca, buscaId, post, put } from '../../../service/Service';
import { FormControl, FormHelperText, InputLabel } from '@mui/material';
import "./CadastroPostagem.css"


function CadastroPostagem() {

	let navigate = useNavigate();
	const {id} = useParams<{id: string}>();
	const [token, setToken] = useLocalStorage('token'); //captura o token armazenado no local storage
	
    // const <tema[]>

    const [tema, setTema] = useState<Tema>({ //inicializa os valores dos atributos do como tema como nulos
		id: 0,
		descricao: ""
	})

    const [postagem, setPostagem] = useState<Postagem>({
        id: 0,
        titulo: "",
        texto: "",
        data: "",
        tema: null
    })


	//verificar se existe um token
	useEffect(() => {
		if(token == "") 
		{
			alert("Você precisa logar né queride!")
			navigate("/login")
		}
	}, [token])


	useEffect(() => {
		if(id !== undefined)
		{
			findById(id)
		}
	}, [id])


	async function findById(id:string) {
		buscaId(`/tema/${id}`, setTema, {
			headers: {
				'Authorization': token
			}
		})
	}


	//captura valores digitados no formulario e atribui ao setPosts
	function updatedModel(event: ChangeEvent<HTMLInputElement>)
	{
		setPostagem({
			...postagem,
			[event.target.name]: event.target.value,
            tema: tema
		})
	}


	//
	async function onSubmit(event:ChangeEvent<HTMLFormElement>) {
		event.preventDefault()
		console.log("postagem" + JSON.stringify(postagem)) //para verificação

		if(id !== undefined)
		{
                put(`/postagens`, postagem, setPostagem, {
                    headers: {
                        'Authorization': token
                    }
                })
                alert('Postagem atualizada com sucesso');
            } else {
                post(`/postagens`, postagem, setPostagem, {
                    headers: {
                        'Authorization': token
                    }
                })
                alert('Postagem cadastrada com sucesso');
            }
            back()
        }
    
        function back() {
            navigate('/posts')
        }


    return (
        <Container maxWidth="sm" className='topo'>
            <form>
                <Typography variant='h3' color='textSecondary' component="h1" align="center">
                    Cadastra Aí!
                </Typography>
                <TextField id='titulo' label="titulo" variant='outlined' name='titulo' margin='normal' fullWidth />
                <TextField id='texto' label='texto' variant='outlined' name='texto' margin='normal' fullWidth/>
                
                <FormControl>
                    <InputLabel id='demo-simple-select-helper-label'>
                        Tema
                    </InputLabel>
                    <Select labelId="demo-simple-select-helper-label" id='demo-simple-select-helper'></Select>
                    <FormHelperText>Escolha um tema para a postagem</FormHelperText>
                    <Button type='submit' variant='contained' color='primary'>
						Werk!
                    </Button>
                </FormControl>
            </form>
        </Container>
    )
}

export default CadastroPostagem;