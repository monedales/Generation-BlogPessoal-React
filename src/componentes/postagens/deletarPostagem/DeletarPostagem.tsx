import { Button, Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Postagem from "../../../model/Postagem";
import "./DeletarPostagem.css"
import { CardActions } from '@material-ui/core';
import { buscaId, deleteId } from "../../../service/Service";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";
import { toast } from "react-toastify";

function DeletarPostagem() {
	let navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const [posts,setPosts] = useState<Postagem>()

	//hook useSelector que vai acessar o store, pegar o token e atribuir a essa constante
	const token = useSelector<TokenState, TokenState["tokens"]>(
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
			navigate("/login")
		}
	}, [token])

	useEffect(() => {
		if (id !== undefined) {
			findById(id)
		}
	}, [id])

	async function findById(id: string) {
		await buscaId(`/postagens/${id}`, setPosts, {
			headers: {
				'Authorization': token
			}
		})
	}

	function sim() {
		navigate("/posts") //direciona pro componente que lista as postagens //a rota é do front-end
		deleteId(`/postagens/${id}`, { //e acionar o metodo para deletar //rota do back-end
			headers: {
				'Authorization': token //passa o token para autorizar a exclusao
			}
		});
		toast.success("R.I.P.", {
			icon: "⚰️",
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

	function nao() {
		navigate("/posts");
	}

	return (
		<>
			<Box m={2}>
				<Card variant="outlined">
					<CardContent>
						<Box justifyContent="center">
							<Typography color="textSecondary" gutterBottom>
								Deseja deletar a postagem:
							</Typography>
							<Typography>
								{posts?.titulo} {/*pega do state post e tenta localizar o titulo*/}
							</Typography>
						</Box>
					</CardContent>

					<CardActions>
						<Box display="flex" justifyContent="start" ml={1.0} mb={2}>
							<Box mx={2}>
								<Button onClick={sim} variant="contained" className="marginLeft" size="large" color="primary">
									Go to hell!
								</Button>
							</Box>
							<Box mx={2}>
								<Button onClick={nao} variant="contained" size="large" color="secondary">
									Not today, Satan!
								</Button>
							</Box>
						</Box>
					</CardActions>
				</Card>
			</Box>
		</>
	);
}

export default DeletarPostagem;