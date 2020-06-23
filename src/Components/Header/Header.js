import React,{useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom'
//css
import './Header.css';
//sweetalert
import swal from 'sweetalert';
//encriptar
import md5 from 'crypto-js/md5';
//Services
import Services from '../../Services/Services';

function Header(props){

    const [correo, setCorreo] = useState('');
    const [clave, setClave] = useState('');

    //evento para loguear
    const handleSubmit = (event) => {
        event.preventDefault();
        
        if(!correo){
            swal ( "Oops","Rellene el correo correctamente","error" );
        }else if(!clave){
            swal ( "Oops","Rellene la clave correctamente","error" );
        }else{
            let encriptarClave = md5(clave)
            console.log(correo);
            console.log(JSON.stringify(encriptarClave));

            let data = new URLSearchParams(`correo=${correo}&clave=${JSON.stringify(encriptarClave)}`);

            Services.login(data)
            .then(response => {
                console.log(response)
                if(response.data.toString()){
                    swal ( "Ok","Logueado","success" );
                    //llamamos a la funcion que esta en app para ocultar el header
                    const ocultarHeader = props.ocultarHeader;
                    ocultarHeader();
                    //guardamos el ide del usuario y el token en el localStorage
                    localStorage.setItem('primaryfriendsbook',response.data[0].id_usuario);
                    localStorage.setItem('friendsbooktoken',response.friendsbooktoken);
                    //le redirigimos al login
                    props.history.push('/inicio');
                }else{
                    swal ( "Oops","Correo o clave incorrectos","error" );
                }
            })
            .catch(err => console.log(err))
        }
        //limpiamos los campos
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

export default withRouter(Header)