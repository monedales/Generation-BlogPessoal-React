import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Modal, Box, Button } from "@mui/material";
import CadastroPostagem from '../cadastroPostagem/CadastroPostagem';
import './ModalPostagem.css';


function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    }
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            width: 600,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
);

function ModalPostagem()
{
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle); 
    const[open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <Box display="flex" justifyContent="flex-end" >
                <CloseIcon onClick={handleClose}/>
            </Box>
            <CadastroPostagem />
        </div>
    );

    return(
        <>
            <Button onClick = {handleOpen} variant="contained" className='btnModal'>
                Nova Postagem
            </Button>
            <Modal 
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby='simple-modal-description'>
                    {body}
            </Modal>        
        </>
    );
}

export default ModalPostagem;