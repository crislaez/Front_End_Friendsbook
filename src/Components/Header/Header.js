import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
//css
import './Header.css';

function Header(props){

    const [correo, setCorreo] = useState('');
    const [clave, setClave] = useState('');

    //evento para loguear
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(correo);
        console.log(clave);
        setCorreo('');
        setClave('');
    }
    
    return(
        <header>
            <div className='divHeaderTitulo'>
                <h1>friendsbook</h1>
            </div>
            <form onSubmit={handleSubmit} action='' method='' encType=''>
                <div className='formCorreo'>
                    <label>correo electronico</label>
                    <br></br>
                    <input type='email' name='correo' value={correo} onChange={(params) => {setCorreo(params.target.value)}}></input>
                </div>

                <div className='formClave'>
                    <label>Contraseña</label>
                    <br></br>
                    <input type='password' name='clave' value={clave} onChange={(params) => {setClave(params.target.value)}}></input>
                </div>

                <div className='formBotonEnvio'>
                    <input type='submit' value='Entrar'></input>
                </div>
            </form>
        </header>
    )
}

export default Header