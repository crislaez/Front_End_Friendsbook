import React,{useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom'
//css
import './Perfil.css';
//componente
import SubirFoto from '../../Components/SubirFoto/SubirFoto';

function Perfil(props){

    const[mostrarComponeteSubirFoto, setMostrarComponeteSubirFoto] = useState(false);
    
    useEffect( () => {
        //llamamos a la funcion que esta en app apra ocultar el header
        const ocultarHeader = props.ocultarHeader;
        ocultarHeader();
        //llamamos a la funcion que esta en app apra ocultar los asides
        const funcionOcultarAsides = props.funcionOcultarAsides;
        funcionOcultarAsides();
    },[props.datosUsuarioLogueado]);
    console.log(props.datosUsuarioLogueado);

   const handleClickAparecerSubirFoto = () => {
    setMostrarComponeteSubirFoto(!mostrarComponeteSubirFoto)
   }

    return(
        <section className='divPerfil'>
            <div className='divCabeceraPerfil'>
                <div className='divBannerPerfil' style={{background:`url(${props.datosUsuarioLogueado.banner}) 0 0/100% 380px`}}>
                    <div className='divAvatarPerfil'>
                        <img src={props.datosUsuarioLogueado.avatar}></img>
                    </div>
                </div>

                <div className='nombreUsuarioPerfil'>
                    <h3>{props.datosUsuarioLogueado.nombre} {props.datosUsuarioLogueado.apellido}</h3>
                </div>

                <div className='divBotonesPerfil'>
                    <input style={{marginLeft:'20%'}} type='button' value='Fotos'></input>
                    <input onClick={handleClickAparecerSubirFoto} type='button' value='Subir Archivos'></input>
                    <input type='button' value='Fotos'></input>
                </div>

            </div>   
            
            {
                mostrarComponeteSubirFoto
                ?
                <SubirFoto handleClickAparecerSubirFoto={handleClickAparecerSubirFoto}></SubirFoto>
                :
                <div style={{display:'none'}}></div>

            }

        </section>
    )
}

export default Perfil;