import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
	Card,
	CardActions,
	CardContent,
	Button,
	Typography,
} from "@material-ui/core";
import { Box } from "@mui/material";
import "./ListaPostagem.css";
import { useNavigate } from "react-router-dom";
import Postagem from "../../../model/Postagem";
import { busca } from "../../../service/Service";
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";
import { toast } from "react-toastify";

function ListaPostagem() {
	const [postagem, setPostagem] = useState<Postagem[]>([]);
	
	//hook useSelector que vai acessar o store, pegar o token e atribuir a essa constante
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );
	
	let navigate = useNavigate();


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


	async function getPost() {
		await busca("/postagens", setPostagem, {
			headers: {
				'Authorization': token
			}
		})
	}

	useEffect(() => {
		getPost()
	}, [postagem.length])


	return (
		<>
		<Box display="flex" flex="wrap">

		
			{postagem.map(post => (
					<Box m={2}>
						<Card className="postagens"
						variant="outlined">
							<CardContent>
								<Typography color="textSecondary" gutterBottom>
									Postagens
								</Typography>
								<Typography variant="h5" component="h2">
									{post.titulo}
								</Typography>
								<Typography variant="body2" component="p">
									{post.texto}
								</Typography>
								<Typography variant="body2" component="p">
									{post.tema?.descricao}
								</Typography>
								<Typography variant="body2" component="p">
									Unlocked by: {post.usuario?.nome}
								</Typography>
							</CardContent>

							<CardActions>
								<Box display="flex" justifyContent="center" mb={1.5}>
									<Link to={`/formularioPostagem/${post.id}`} className="text-decorator-none ">
										<Box mx={1}>
											<Button
												variant="contained"
												className="btnAtualizar"
												size="small"
												
												>
												atualizar
											</Button>
										</Box>
									</Link>
									<Link to={`/deletarPostagem/${post.id}`} className="text-decorator-none">
										<Box mx={1}>
											<Button variant="contained" size="small"  style={{ color: '#a13e3e' }} >
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
			</Box>
		</>
	);
}

export default ListaPostagem;