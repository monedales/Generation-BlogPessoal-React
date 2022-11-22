import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./DeletarTema.css";
import Tema from "../../../model/Tema";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { buscaId, deleteId } from "../../../service/Service";
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";
import { toast } from "react-toastify";

function DeletarTema() {

	let navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const [tema, setTema] = useState<Tema>()

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
		buscaId(`/temas/${id}`, setTema, {
			headers: {
				'Authorization': token
			}
		})
	}


	function sim() {
		navigate("/temas") //direciona pro componente que lista os temas
		deleteId(`/temas/${id}`, { //e acionar o metodo para deletar
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
		navigate("/temas");
	}

	return (
		<>
			<Box m={2}>
				<Card variant="outlined">
					<CardContent>
						<Box justifyContent="center">
							<Typography color="textSecondary" gutterBottom>Vade Retro?</Typography>
							<Typography color="textSecondary">{tema?.descricao}</Typography>
						</Box>
					</CardContent>
					<CardActions>
						<Box display="flex" justifyContent="start" ml={1.0} mb={2}>
							<Box mx={2}>
								<Button onClick={sim} variant="contained" className="marginLeft btnAtualizar" size="large">
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

export default DeletarTema;