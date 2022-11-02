import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Box } from "@mui/material";
import {Link} from 'react-router-dom'
import "./Navbar.css"

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

  return (
    <>
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar className="barra">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Box mx={1} className="cursor">
              <Typography
                className={classes.title}
                variant="h6"
                color="inherit"
                noWrap
              >
                DeusaHerege
              </Typography>
            </Box>
            <Box mx={1} className="cursor">
              <Typography
                className={classes.title}
                variant="h6"
                color="inherit"
                noWrap
              >
                home
              </Typography>
            </Box>
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
            <Box mx={1} className="cursor">
              <Typography
                className={classes.title}
                variant="h6"
                color="inherit"
                noWrap
              >
                temas
              </Typography>
            </Box>
            <Box mx={1} className="cursor">
              <Typography
                className={classes.title}
                variant="h6"
                color="inherit"
                noWrap
              >
                cadastrar tema
              </Typography>
            </Box>
            <Link to="/login" className="text-decorator-none">
              <Box mx={1} className="cursor">
                <Typography
                  className={classes.title}
                  variant="h6"
                  color="inherit"
                  noWrap
                >
                  logout
                </Typography>
              </Box>
            </Link>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-haspopup="true"
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}

export default Navbar;