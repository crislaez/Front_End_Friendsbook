import React,{useState, useEffect} from 'react';
//css
import './Nav.css';
//imagen logo
import Logo from '../../Img/logo.png';
//font awesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons'


function Nav(props){
    
    const [textoBuscador, setTextoBuscador] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
    };

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

        </nav>
    )
}

export default Nav