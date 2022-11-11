import React, { ChangeEvent, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";
import {
	Card,
	CardActions,
	CardContent,
	Button,
	Typography,
} from "@material-ui/core";
import { Box } from "@mui/material";
import Tema from "../../../model/Tema";
import "./ListaTema.css";
import { busca } from "../../../service/Service";

function ListaTema() {

	// const para armazenar os temas do backend
	const [temas, setTemas] = useState<Tema[]>([])

	// const que vai acessar meu token
	const [token, setToken] = useLocalStorage("token");

	let navigate = useNavigate();

	useEffect(() => {
		if (token == "") {
			alert("Você precisa logar né queride!")
			navigate("/login")
		}
	}, [token])

	//funcao que vai solicitar os temas do backend
	async function buscaTema() {
		await busca('/temas', setTemas, {
			headers: {
				Authorization: token
			}
		})
	}

	useEffect(() => { //arrow function
		buscaTema()
	}, [temas.length]) //deixando o [] em branco a pagina carrega assim que a tela for aberta

	return (
		<>
			{temas.map(tema => (
				<Box m={2}>
					<Card variant="outlined">
						<CardContent>
							<Typography color="textSecondary" gutterBottom>
								Tema
							</Typography>

							<Typography variant="h5" component="h2">
								{tema.descricao}
							</Typography>
						</CardContent>

						<CardActions>
							<Box display="flex" justifyContent="center" mb={1.5}>
								<Link to={`/formularioTema/${tema.id}`} className="text-decorator-none">
									<Box mx={1}>
										<Button
											variant="contained"
											className="marginLeft"
											size="small"
											color="primary">
											atualizar
										</Button>
									</Box>
								</Link>
								<Link to={`/deletarTema/${tema.id}`} className="text-decorator-none">
									<Box mx={1}>
										<Button variant="contained" size="small" color="secondary">
											deletar
										</Button>
									</Box>
								</Link>
							</Box>
						</CardActions>
					</Card>
				</Box>
			))
			}
		</>
	);
}

export default ListaTema;