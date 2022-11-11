import { Button, Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Postagem from "../../../model/Postagem";
import "./DeletarPostagem.css"
import { CardActions } from '@material-ui/core';
import { buscaId, deleteId } from "../../../service/Service";
import useLocalStorage from "react-use-localstorage";
import { useNavigate, useParams } from "react-router-dom";

function DeletarPostagem()
{
	let navigate = useNavigate();
	const {id} = useParams<{id: string}>();
	const [token, setToken] = useLocalStorage('token'); //captura o token armazenado no local storage
	const [post, setPosts] = useState<Postagem>()

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
		buscaId(`/postagens/${id}`, setPosts, {
			headers: {
				'Authorization': token
			}
		})
	}

	function sim()
	{
		navigate("/posts") //direciona pro componente que lista as postagens //a rota é do front-end
		deleteId(`/postagens/${id}`, { //e acionar o metodo para deletar //rota do back-end
			headers: {
				'Authorization': token //passa o token para autorizar a exclusao
			}
		});
		alert('Já era!');
	}

	function nao()
	{
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
                            <Typography color="textSecondary">
                                {post?.titulo} {/*pega do state post e tentga localizar o titulo*/}
                            </Typography>
                        </Box>
                    </CardContent>

                    <CardActions>
                        <Box display="flex" justifyContent="start" ml={1.0} mb={2}>
                            <Box mx={2}>
                                <Button onClick={sim} variant="contained" className="marginLeft" size="large" color="primary">
                                    Yes, henny
                                </Button>
                            </Box>
                            <Box mx={2}>
                                <Button onClick={nao} variant="contained" size="large" color="secondary">
                                    Hell, no
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