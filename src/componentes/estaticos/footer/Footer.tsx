import React from "react";
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { Typography, Grid } from '@material-ui/core';
import { Box } from '@mui/material';
import './Footer.css';
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";

function Footer() {

	const token = useSelector<TokenState, TokenState['tokens']>(
		(state) => state.tokens
	);

	var footerComponent; //variavel que recebe como valor o conteudo do footer


	if(token !== "") //se houver umm token, significa que o usuario existe e o footer pode ser renderizado e aparecer na tela
	{
		footerComponent = <Grid container direction="row" justifyContent="center" alignItems="center">
		<Grid alignItems="center" item xs={12}>
			<Box className="box1">
				<Box paddingTop={1} display="flex" alignItems="center" justifyContent="center">
					<Typography variant="h5" align="center" gutterBottom className="textos" >Follow the trail:  </Typography>
				</Box>
				<Box display="flex" alignItems="center" justifyContent="center">
					<a href="https://www.twitch.tv/directory/game/Vampire%20Survivors" target="_blank" className="twitch">
					</a>
					<a href="https://github.com/monedales" target="_blank">
						<GitHubIcon className="redes" />
					</a>
					<a href="https://www.instagram.com/lemo.nadaaa/" target="_blank">
						<InstagramIcon className="redes" />
					</a>
					<a href="https://www.linkedin.com/in/leticia-moneda/" target="_blank">
						<LinkedInIcon className="redes" />
					</a>
				</Box>
			</Box>
			<Box className="box2">
				<Box paddingTop={1}>
					<Typography variant="subtitle2" align="center" gutterBottom className="textos" >© 2022 Copyright: DeusaHerege</Typography>
				</Box>
				<Box>
					<a className="text-decorator-none" target="_blank" href="https://linktr.ee/vampiresurvivors">
						<Typography variant="subtitle2" gutterBottom className="textos" align="center">Vampire Survivors by poncle</Typography>
					</a>
				</Box>
			</Box>
		</Grid>
	</Grid>
	}

	return (
		<>
			{footerComponent}
		</>
	)
}

export default Footer;