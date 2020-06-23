import React,{useState, useEffect} from 'react';
//css
import './Nav.css';
//imagen logo
import Logo from '../../Img/logo.png';
//font awesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch, faHome, faStore, faUser, faDiceFive} from '@fortawesome/free-solid-svg-icons';
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
                <label style={{marginLeft:'16%'}}><FontAwesomeIcon icon={faHome} ></FontAwesomeIcon></label>
                <label><FontAwesomeIcon icon={faYoutube}></FontAwesomeIcon></label>
                <label><FontAwesomeIcon icon={faStore}></FontAwesomeIcon></label>
                <label><FontAwesomeIcon icon={faUser}></FontAwesomeIcon></label>
                <label><FontAwesomeIcon icon={faDiceFive}></FontAwesomeIcon></label>
            </div>

            <div className='divRightNav'>
                <div className='divAvatarnav'>
                </div>
            </div>
        </nav>
    )
}

export default Nav