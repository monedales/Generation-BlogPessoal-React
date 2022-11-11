import React, {useState, useEffect, ChangeEvent} from 'react'
import { Button, Container, Typography, TextField } from "@material-ui/core";
import Tema from '../../../model/Tema';
import "./CadastroTema.css"
import { useNavigate, useParams } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import { findByTestId } from '@testing-library/react';
import { buscaId, post, put } from './../../../service/Service';


function CadastroTema()
{
	let navigate = useNavigate();
	const {id} = useParams<{id: string}>();
	const [token, setToken] = useLocalStorage('token'); //captura o token armazenado no local storage
	const [tema, setTema] = useState<Tema>({ //inicializa os valores dos atributos do como tema como nulos
		id: 0,
		descricao: ""
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

	//captura valores digitados no formulario e atribui ao setTema
	function updatedTema(event: ChangeEvent<HTMLInputElement>)
	{
		setTema({
			...tema,
			[event.target.name]: event.target.value,
		})
	}

	//
	async function onSubmit(event:ChangeEvent<HTMLFormElement>) {
		event.preventDefault()
		console.log("tema" + JSON.stringify(tema)) //para verificação

		if(id !== undefined)
		{
			console.log(tema)
                put(`/tema`, tema, setTema, {
                    headers: {
                        'Authorization': token
                    }
                })
                alert('Tema atualizado com sucesso');
            } else {
                post(`/tema`, tema, setTema, {
                    headers: {
                        'Authorization': token
                    }
                })
                alert('Tema cadastrado com sucesso');
            }
            back()
        }
    
        function back() {
            navigate('/temas')
        }

    return (
        <Container>
            <form onSubmit={onSubmit}>
				<Typography variant="h3" color="textSecondary" 
				component="h1" align="center">
					Cadastra Aí
				</Typography>
				{/*onchange fica de olho a qualquer alteração que o usuario fizer qnd digitar no  campo e aciona o updatedtema*/}
				<TextField value={tema.descricao} onChange={(event:ChangeEvent<HTMLInputElement> ) => updatedTema(event)}
				id="descricao" label="descricao" 
				variant="outlined" name="descricao" margin="normal" fullWidth/>
				<Button type="submit" variant="contained" color="primary">
					Finalizar
				</Button>
            </form>
        </Container>
    )
}

export default CadastroTema;