import React, { useState, useEffect, ChangeEvent } from 'react'
import { Button, Container, Typography, TextField } from "@material-ui/core";
import Tema from '../../../model/Tema';
import "./CadastroTema.css"
import { useNavigate, useParams } from 'react-router-dom';
import { findByTestId } from '@testing-library/react';
import { buscaId, post, put } from './../../../service/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';


function CadastroTema() {
	let navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	
	//hook useSelector que vai acessar o store, pegar o token e atribuir a essa constante
	const token = useSelector<TokenState, TokenState["tokens"]>(
		(state) => state.tokens
	);
	
	const [tema, setTema] = useState<Tema>({ //inicializa os valores dos atributos do como tema como nulos
		id: 0,
		descricao: ""
	})

	//verificar se existe um token
	useEffect(() => {
		if (token === "") {
			toast.error("Você precisa logar né queride!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            });
			navigate("/login")
		}
	}, [token])

	useEffect(() => {
		if (id !== undefined) {
			findById(id)
		}
	}, [id])

	async function findById(id: string) {
		await buscaId(`/temas/${id}`, setTema, {
			headers: {
				'Authorization': token
			}
		})
	}

	//captura valores digitados no formulario e atribui ao setTema
	function updatedTema(event: ChangeEvent<HTMLInputElement>) {
		setTema({
			...tema,
			[event.target.name]: event.target.value,
		})
	}

	//
	async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
		event.preventDefault()
		

		if (id !== undefined) {
			try {
				console.log(tema)
			await put(`/temas`, tema, setTema, {
				headers: {
					Authorization: token
				}
			})
			toast.success("Arrasou!", {
				position: "top-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: false,
				theme: "colored",
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
                    theme: "colored",
                    progress: undefined,
                });
			}
		} else {
			try {
				await post(`/temas`, tema, setTema, {
					headers: {
						Authorization: token
					}
				})
				toast.success("Arrasou!", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "colored",
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
                    theme: "colored",
                    progress: undefined,
                });
			}
		}
		back()
	}

	function back() {
		navigate('/temas')
	}

	return (
		<Container maxWidth="sm" className='topo'>
			<form onSubmit={onSubmit}>
				<Typography variant="h3" color="textSecondary"
					component="h1" align="center">
					Cadastra Aí
				</Typography>
				{/*onchange fica de olho a qualquer alteração que o usuario fizer qnd digitar no  campo e aciona o updatedtema*/}
				<TextField value={tema.descricao} onChange={(event: ChangeEvent<HTMLInputElement>) => updatedTema(event)}
					id="descricao" label="descricao"
					variant="outlined" name="descricao" margin="normal" fullWidth />
				<Button type="submit" variant="contained" color="primary">
					Finalizar
				</Button>
			</form>
		</Container>
	)
}

export default CadastroTema;