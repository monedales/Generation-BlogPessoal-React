import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";
import "./Deletar.css";
import Tema from "../../../model/Tema";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { buscaId, deleteId } from "../../../service/Service";

function DeletarTema() {

	let navigate = useNavigate();
	const {id} = useParams<{id: string}>();
	const [token, setToken] = useLocalStorage('token'); //captura o token armazenado no local storage
	const [tema, setTema] = useState<Tema>()

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

	
	function sim()
	{
		navigate("/temas") //direciona pro componente que lista os temas
		deleteId(`/tema/${id}`, { //e acionar o metodo para deletar
			headers: {
				'Authorization': token //passa o token para autorizar a exclusao
			}
		});
		alert('Já era!');
	}

	function nao()
	{
		navigate("/temas");
	}

	return (
		<>
			<Box m={2}>
				<Card variant="outlined">
					<CardContent>
						<Box justifyContent="center">
							<Typography color="textSecondary" gutterBottom>Vade Retro:</Typography>
							<Typography color="textSecondary">{tema?.descricao}</Typography>
						</Box>
					</CardContent>
					<CardActions>
						<Box display="flex" justifyContent="start" ml={1.0} mb={2}>
							<Box mx={2}>
								<Button onClick={sim} variant="contained" className="marginLeft" size="large" color="primary">
									Yay!
								</Button>
							</Box>
							<Box mx={2}>
								<Button onClick={nao} variant="contained" size="large" color="secondary">
									Nah!
								</Button>
							</Box>
						</Box>
					</CardActions>
				</Card>
			</Box>
		</>
	);
}

export default DeletarTema;