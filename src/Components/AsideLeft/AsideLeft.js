import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
//css
import './AsideLeft.css';
//font awesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserFriends, faSms, faUsers, faStore,faFlag, faCalendarDay, faLaughBeam, faGamepad} from '@fortawesome/free-solid-svg-icons';
import {faYoutube, faGratipay} from '@fortawesome/free-brands-svg-icons';



function AsideLeft(props){
    
    return(
        <aside>
        <Link to={'/perfil/'+props.datosUsuarioLogueado.id_usuario} style={{color:'#373737'}}>
        <div className='divAsideLeft'>
            <div className='imagenAvatarUsuarioAsideLeft'>
                <img src={props.datosUsuarioLogueado.avatar} alt={props.datosUsuarioLogueado.avatar}></img>
            </div>
            
            <p>{props.datosUsuarioLogueado.nombre +' '+props.datosUsuarioLogueado.apellido}</p>
        </div>
        </Link>

        <div className='divAsideLeft'>
            <label><FontAwesomeIcon icon={faUserFriends} style={{color:'#7ECEF0'}}></FontAwesomeIcon></label>
            <p>Amigos</p>
        </div>

        <div className='divAsideLeft'>
            <label><FontAwesomeIcon icon={faSms} style={{color:'#088DDA'}}></FontAwesomeIcon></label>
            <p>Messenger</p>
        </div>

        <div className='divAsideLeft'>
            <label><FontAwesomeIcon icon={faUsers} style={{color:'#088DDA'}}></FontAwesomeIcon></label>
            <p>Grupos</p>
        </div>

        <div className='divAsideLeft'>
            <label><FontAwesomeIcon icon={faStore} style={{color:'#0BBBDC'}}></FontAwesomeIcon></label>
            <p>Marktplace</p>
        </div>

        <div className='divAsideLeft'>
            <label><FontAwesomeIcon icon={faYoutube} style={{color:'#FF7C1C'}}></FontAwesomeIcon></label>
            <p>Videos</p>
        </div>

        <div className='divAsideLeft'>
            <label><FontAwesomeIcon icon={faFlag} style={{color:'#FF421C'}}></FontAwesomeIcon></label>
            <p>Paginas</p>
        </div>

        <div className='divAsideLeft'>
            <label><FontAwesomeIcon icon={faGratipay} style={{color:'#FF1C42'}}></FontAwesomeIcon></label>
            <p>Recaudacion de fondos</p>
        </div>

        <div className='divAsideLeft'>
            <label><FontAwesomeIcon icon={faCalendarDay} style={{color:'#1CDBFF'}}></FontAwesomeIcon></label>
            <p>Eventos</p>
        </div>

        <div className='divAsideLeft'>
            <label><FontAwesomeIcon icon={faLaughBeam} style={{color:'#1C33FF'}}></FontAwesomeIcon></label>
            <p>Lista de amigos</p>
        </div>

        <div className='divAsideLeft'>
            <label><FontAwesomeIcon icon={faGamepad} style={{color:'#414DB6'}}></FontAwesomeIcon></label>
            <p>Juegos</p>
        </div>
        
  
        </aside>
    )
}

export default AsideLeft