import React,{useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom'
//css
import './Comentarios.css';
//Servicios
import Services from '../../Services/Services';
//componente
import FormularioComentar from '../FormularioComentar/FormularioComentar';

function Comentarios(props){

    const [arrayComentarios, setArrayComentarios] = useState([])//array para los comentarios
  
    useEffect( () => {
        //llamamos a la funcion que esta abajo para cargar los comentarios
        funcionObtenerComentarios(window.location.href.split('/')[window.location.href.split('/').length-1]);
        
    },[props.idFoto]);


    //funcion para obtener todos los comentarios de la foto
    const funcionObtenerComentarios = (idFoto) => {
        Services.getComentsByIdImage(idFoto)
        .then(response => {
            console.log(response.data)
            setArrayComentarios(response.data)
        })
    };

    const handleClick = (event) => {
        console.log(event.target.dataset.codigousuario)
        let id = event.target.dataset.codigousuario;
        props.history.push('/perfil/'+id);
    };


    return(
        <div className='formularioComentarios'>
            <div className='contenedorComentario'>
            {
                arrayComentarios
                ?
                arrayComentarios.map((dato, key) => {
                    return(
                        <div key={key} className='cajaComentario'>
                            <div className='divFotoUsuarioFormulario'>
                                <img data-codigousuario={dato.id_usuario} onClick={handleClick} style={{cursor:'pointer'}} src={dato.avatar} alt={dato.avatar}></img>
                            </div>
                            <div className='divComentario'>
                                <p style={{marginLeft:'5%'}}>{dato.nombre +' '+dato.apellido}</p>
                                <p style={{marginLeft:'5%', marginTop:'5px', fontSize:'14px', color:'grey'}}>{dato.texto_comentario}</p>
                            </div>
                        </div>
                    )
                })
                : 
                <div style={{display:'none'}}></div>
            }
            </div>

            <FormularioComentar largoImange={'9%'} cargar={true} funcionObtenerComentarios={funcionObtenerComentarios} idFoto={props.idFoto} datosUsuarioLogueado={props.datosUsuarioLogueado}></FormularioComentar>

        </div>
    )
}

export default withRouter(Comentarios);
