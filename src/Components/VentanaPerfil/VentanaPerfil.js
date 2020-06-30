import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom'
//css
import './VentanaPerfil.css';
//font awesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEnvelopeOpenText, faSignOutAlt, faExchangeAlt, faMoon, faCog} from '@fortawesome/free-solid-svg-icons';
import {faQuestionCircle} from '@fortawesome/free-regular-svg-icons';
//sweetalert
import swal from 'sweetalert';


function VentanaPerfil(props){

    // console.log(props.datosUsuarioLogueado)
    //funcion que nmos llevara al perfil del usuario logueado
    const handleClick = () => {
        props.history.push(`/perfil/${localStorage.getItem('primaryfriendsbook')}`);
        window.location.reload(true);
    };
    
    //funcion para cerrar sesion
    const handleClickCerrarSesion = () =>{        

        swal({
            title: "Seguro?",
            text: "Se cerrara la sesion!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                localStorage.removeItem('primaryfriendsbook');
                localStorage.removeItem('friendsbooktoken');
                props.history.push('/login');
                window.location.reload(true);
            } 
        });  

    }


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
                <label><FontAwesomeIcon icon={faEnvelopeOpenText} style={{marginLeft:'10px',marginTop:'5px', fontSize:'25px',color:'#8E8E8E'}}></FontAwesomeIcon></label>
                <div className='divDatosVentanaPerfil'>
                    <p style={{fontWeight:'bold', color:'#5D5D5D'}}>Enviar comentarios</p>
                    <p style={{color:'#AEAEAE', marginTop:'10px'}}>Ayudanor a mejorar la nueva version de friendbook</p>
                </div>
           </div>

           <div className='divAbajoVentanaPerfil'>
                <label><FontAwesomeIcon icon={faCog} style={{marginLeft:'10px',marginTop:'5px', fontSize:'25px',color:'#8E8E8E'}}></FontAwesomeIcon></label>
                <div className='divDatosVentanaPerfilSub'>
                    <p style={{fontWeight:'bold', marginTop:'15px', color:'#5D5D5D'}}>Configuracion y privacidad</p>                   
                </div>

                <label><FontAwesomeIcon icon={faQuestionCircle} style={{marginLeft:'10px',marginTop:'5px', fontSize:'25px',color:'#8E8E8E'}}></FontAwesomeIcon></label>
                <div className='divDatosVentanaPerfilSub'>
                    <p style={{fontWeight:'bold', marginTop:'15px', color:'#5D5D5D'}}>Ayuda y asistencia</p>                    
                </div>

                <label><FontAwesomeIcon icon={faMoon} style={{marginLeft:'10px',marginTop:'5px', fontSize:'25px',color:'#8E8E8E'}}></FontAwesomeIcon></label>
                <div className='divDatosVentanaPerfilSub'>
                    <p style={{fontWeight:'bold', marginTop:'15px', color:'#5D5D5D'}}>Modi oscuro</p>                 
                </div>

                <label><FontAwesomeIcon icon={faExchangeAlt} style={{marginLeft:'10px',marginTop:'5px', fontSize:'25px',color:'#8E8E8E'}}></FontAwesomeIcon></label>
                <div className='divDatosVentanaPerfilSub'>
                    <p style={{fontWeight:'bold', color:'#5D5D5D'}}>Cambiar a version clasica</p>
                    <p style={{color:'#AEAEAE', marginTop:'5px'}}>Ayudanor a mejorar la nueva version de friendbook</p>
                </div>

                <label><FontAwesomeIcon icon={faSignOutAlt} style={{marginLeft:'10px',marginTop:'5px', fontSize:'25px',color:'#8E8E8E'}}></FontAwesomeIcon></label>
                <div className='divDatosVentanaPerfilSub' onClick={handleClickCerrarSesion}>
                    <p style={{fontWeight:'bold', marginTop:'15px', color:'#5D5D5D'}}>Salir</p>                    
                </div>
           </div>
        </div>
    )
}

export default withRouter(VentanaPerfil);