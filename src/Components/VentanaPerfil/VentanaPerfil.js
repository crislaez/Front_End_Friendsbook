import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom'
//css
import './VentanaPerfil.css';

function VentanaPerfil(props){

    // console.log(props.datosUsuarioLogueado)
    //funcion que nmos llevara al perfil del usuario logueado
    const handleClick = () => {
        props.history.push(`/perfil/${localStorage.getItem('primaryfriendsbook')}`);
        window.location.reload(true);
    };


    return(
        <div className='divVentanaPerfil'>
           <div className='divArrivaVentanaPerfil' onClick={handleClick}>
            <div className='divImagenVenmtanaPerfil'>
                <img src={props.datosUsuarioLogueado.avatar} alt='avatarUsuarioVentanaPerfil'></img>
            </div>
            <p style={{fontWeight:'bold', marginTop:'30px'}}>{props.datosUsuarioLogueado.nombre} {props.datosUsuarioLogueado.apellido}</p>
            <p style={{color:'#B4B4B4'}}>Ver tu perfil</p>
            </div>

           <div className='divCentroVentanaPerfil'>
           </div>

           <div className='divAbajoVentanaPerfil'>
           </div>
        </div>
    )
}

export default withRouter(VentanaPerfil);