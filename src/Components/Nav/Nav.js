import React,{useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom'
//css
import './Nav.css';
//imagen logo
import Logo from '../../Img/logo.png';
//font awesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch, faHome, faStore, faUser, faDiceFive, faPlus, faComments, faBell, faArrowAltCircleDown} from '@fortawesome/free-solid-svg-icons';
import {faYoutube} from '@fortawesome/free-brands-svg-icons';


function Nav(props){
    
    const [textoBuscador, setTextoBuscador] = useState('');

    useEffect( () => {
        //llamamos a la funcion que esta en app para cargar los datos dle usuario logueado
        const funcionDatosUsuarios = props.funcionDatosUsuarios;
        funcionDatosUsuarios(localStorage.getItem('primaryfriendsbook'));
        return () => {

        }
    },[localStorage.getItem('primaryfriendsbook')]);


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(textoBuscador);
        setTextoBuscador('');
    };

    //funcion que nos lelvara a inicio
    const handleClickInicio = () => {
        props.history.push('/inicio');
        window.location.reload(true);
    }
     //funcion cuando hagamos click en el label de flecha abajo
     const handleClickPlus = () => {
        //llamamos a la funcion que esta en app
        const funcionAparecerVentanaPlus = props.funcionAparecerVentanaPlus
        funcionAparecerVentanaPlus();
    };
     //funcion cuando hagamos click en el label de flecha abajo
     const handleClickChat = () => {
        //llamamos a la funcion que esta en app
        const funcionAparecerVentanaChat = props.funcionAparecerVentanaChat
        funcionAparecerVentanaChat();
    };
     //funcion cuando hagamos click en el label de flecha abajo
     const handleClickNotificaciones = () => {
        //llamamos a la funcion que esta en app
        const funcionAparecerVentanaNotificaciones = props.funcionAparecerVentanaNotificaciones
        funcionAparecerVentanaNotificaciones();
    };
    //funcion cuando hagamos click en el label de flecha abajo
    const handleClickPerfil = () => {
        //llamamos a la funcion que esta en app
        const funcionAparecerVentanaPerfil = props.funcionAparecerVentanaPerfil
        funcionAparecerVentanaPerfil();
    };

    //funcion que nmos llevara al perfil del usuario logueado
    const handleClickIrPerfil = () => {
        props.history.push(`/perfil/${localStorage.getItem('primaryfriendsbook')}`);
        window.location.reload(true);
    };

    console.log(props.datosUsuarioLogueado);

    return(
        <nav>
            <div className='divIzquierdaNav'>
                <div className='divLogo'>
                    <img src={Logo} alt='logo'></img>
                </div>

                <form onSubmit={handleSubmit} action='' method='' encType=''>
                    <button type='submit'><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
                    <input type='text' value={textoBuscador} name='buscar' onChange={(params) => {setTextoBuscador(params.target.value)}} placeholder='Buscar en Friendbook'></input>                    
                </form>
            </div>
            
            <div className='divCenterNav'>
                <label onClick={handleClickInicio} style={{marginLeft:'16%'}}><FontAwesomeIcon icon={faHome} ></FontAwesomeIcon></label>
                <label><FontAwesomeIcon icon={faYoutube}></FontAwesomeIcon></label>
                <label><FontAwesomeIcon icon={faStore}></FontAwesomeIcon></label>
                <label><FontAwesomeIcon icon={faUser}></FontAwesomeIcon></label>
                <label><FontAwesomeIcon icon={faDiceFive}></FontAwesomeIcon></label>
            </div>

            <div className='divRightNav'>
                <div onClick={handleClickIrPerfil} className='contenedorUsuarioNav'>                
                    <div className='divAvatarNav'>
                        <img src={props.datosUsuarioLogueado.avatar} alt='imagenUsuario'></img>
                    </div>
                    
                    <div className='divNombreUsuario'>
                        <p>{props.datosUsuarioLogueado.nombre}</p>
                    </div>
                </div>

                <div className='divIconos'>
                    <label onClick={handleClickPlus} ><FontAwesomeIcon style={{marginTop:'10px'}} icon={faPlus}></FontAwesomeIcon></label>
                    <label onClick={handleClickChat} style={{marginLeft:'4%'}}><FontAwesomeIcon style={{marginTop:'10px'}} icon={faComments}></FontAwesomeIcon></label>
                    <label onClick={handleClickNotificaciones} style={{marginLeft:'4%'}}><FontAwesomeIcon style={{marginTop:'10px'}} icon={faBell}></FontAwesomeIcon></label>
                    <label onClick={handleClickPerfil} style={{marginLeft:'4%'}}><FontAwesomeIcon style={{marginTop:'10px'}} icon={faArrowAltCircleDown}></FontAwesomeIcon></label>
                </div>
            </div>
        </nav>
    )
}

export default withRouter(Nav);