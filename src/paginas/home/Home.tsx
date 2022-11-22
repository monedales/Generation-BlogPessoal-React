import React, { useEffect } from 'react';
import { Typography, Grid, Button } from '@material-ui/core';
import { Box } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import './Home.css';
import TabPostagem from '../../componentes/postagens/tabpostagem/TabPostagem';
import ModalPostagem from '../../componentes/postagens/modalPostagem/ModalPostagem';
import { useSelector } from 'react-redux';
import { TokenState } from './../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';

function Home() {
    let navigate = useNavigate(); // redirecionamento de pagina

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
            })
            navigate("/login") //se nao existe token o history direciona para o login
        }
    }, [token])

    return (
        <>
            <Grid container direction="row" justifyContent="center" alignItems="center" className='caixa'>
                <Grid alignItems="center" item xs={6} className=".loginPage">
                    <Box paddingX={20} >
                        <Typography variant="h3"
                            gutterBottom color="textPrimary"
                            component="h3" align="center"
                            className='titulo'>
                            hello, little monster!</Typography>
                        <Typography variant="h5"
                            gutterBottom color="textPrimary"
                            component="h5" align="center"
                            className='titulo'>
                            show me your teeth!</Typography>
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <Box marginRight={1}>
                            <ModalPostagem />
                        </Box>
                        <Link to="/posts" className='text-decorator-none'>
                            <Button variant="outlined" className='botao'>Ver Postagens</Button>
                        </Link>
                    </Box>
                </Grid>
                <Grid item xs={6} >
                    <img src="https://www.kotaku.com.au/wp-content/uploads/sites/3/2022/01/22/9b150bb4b905c3baa443abb56e0215c5.gif?quality=80&w=832" alt="" width="750px" height="500px" />
                </Grid>
                <Grid xs={12} className="postagens">
                    <TabPostagem />
                </Grid>
            </Grid>
        </>
    );
}

export default Home;