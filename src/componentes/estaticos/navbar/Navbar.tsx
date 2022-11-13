import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useDispatch, useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { NoEncryption } from "@mui/icons-material";
import { addToken } from "../../../store/tokens/actions";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		grow: {
			flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			display: "none",
			[theme.breakpoints.up("sm")]: {
				display: "block",
			},
		},
		inputRoot: {
			color: "inherit",
		},
		sectionDesktop: {
			display: "none",
			[theme.breakpoints.up("md")]: {
				display: "flex",
			},
		},
		sectionMobile: {
			display: "flex",
			[theme.breakpoints.up("md")]: {
				display: "none",
			},
		},
	})
);

function Navbar() {
	const classes = useStyles();
	const menuId = "primary-search-account-menu";

	//hook useSelector que vai acessar o store, pegar o token e atribuir a essa constante
	const token = useSelector<TokenState, TokenState['tokens']>( //redux captura e armazena o token ???
		(state) => state.tokens
	);

	const dispatch = useDispatch();

	let navigate = useNavigate();

	//func que modifica o valor do token para vazio - 
	function goLogout() {
		dispatch(addToken("")); //garante que o token vai ser eliminado
		toast.info("Sashay, away", {
			position: "top-right",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: false,
			theme: "colored",
			progress: undefined,
		})
		navigate("/login"); //e por isso redireciona para a tela de login
	}

	var navbarComponent; //variavel que recebe como valor o conteudo do navbar

	if(token !== "") //se houver token de usuario o navbar renderiza e aparece na tela
	{
		navbarComponent = <div className={classes.grow}>
		<AppBar position="static">
			<Toolbar className="barra">
				<Box mx={1} className="cursor">
					<Typography
						className={classes.title}
						variant="h5"
						color="inherit"
						noWrap
					>
						VampireSurvivors
					</Typography>
				</Box>

				<Link to="/home" className="text-decorator-none">
					<Box mx={1} className="cursor">
						<Typography
							className={classes.title}
							variant="h6"
							color="inherit"
							noWrap>
							home
						</Typography>
					</Box>
				</Link>

				<Link to="/posts" className="text-decorator-none">
					<Box mx={1} className="cursor">
						<Typography
							className={classes.title}
							variant="h6"
							color="inherit"
							noWrap
						>
							postagens
						</Typography>
					</Box>
				</Link>

				<Link to="/temas" className="text-decorator-none">
					<Box mx={1} className="cursor">
						<Typography
							className={classes.title}
							variant="h6"
							color="inherit"
							noWrap>
							temas
						</Typography>
					</Box>
				</Link>

				<Link to="/formularioTema" className="text-decorator-none">
					<Box mx={1} className="cursor">
						<Typography
							className={classes.title}
							variant="h6"
							color="inherit"
							noWrap>
							cadastrar tema
						</Typography>
					</Box>
				</Link>

				<Box mx={1} className="cursor" onClick={goLogout}>
					<Typography
						className={classes.title}
						variant="h6"
						color="inherit"
						noWrap>
						logout
					</Typography>
				</Box>

				<div className={classes.grow} />
				<div className={classes.sectionDesktop}>
					<IconButton
						edge="end"
						aria-label="account of current user"
						aria-controls={menuId}
						aria-haspopup="true"
						color="inherit">
						<AccountCircle />
					</IconButton>
				</div>
				<div className={classes.sectionMobile}>
					<IconButton
						aria-label="show more"
						aria-haspopup="true"
						color="inherit">
						<MoreIcon />
					</IconButton>
				</div>
			</Toolbar>
		</AppBar>
	</div>
	}

	return (
		<>
			{navbarComponent}
		</>
	);
}

export default Navbar;