import React,{useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom'
//css
import './Comentarios.css';
//Servicios
import Services from '../../Services/Services';
//sweetalert
import swal from 'sweetalert';

function Comentarios(props){

    const [arrayComentarios, setArrayComentarios] = useState([])//array para los comentarios
    const [textoComentario, setTextoComentario] = useState(''); //mensaje del formulario

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
    }

        //funcion formulario comentario
    const handleSubmit = (event) => {
        event.preventDefault();
        if(!localStorage.getItem('primaryfriendsbook')){
            swal('Oops','Tienes estar logueado','error');
            props.history.push('/login')
        }else{
            if(!textoComentario){
                swal('Oops','Escribe un mensaje','error');
            }else{

                let data = new URLSearchParams(`id_comentario=''&id_imagen=${props.idFoto}&id_usuario=${localStorage.getItem('primaryfriendsbook')}&texto_comentario=${textoComentario}`)
                
                Services.addComent(data)
                .then(response => {
                    if(response.success){
                        swal('Ok','Comentario agregado','success');
                        //volvemos a cargar el array con el comentario ingresado
                        funcionObtenerComentarios(props.idFoto);
                    }else{
                        swal('Oops','Ha ocurrido un error, Cierre sesion y vuelva ha loguearse','error');
                    }
                })
                .catch(err => console.log(err));
            }
        }        
        
        setTextoComentario('');
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
            <form onSubmit={handleSubmit} action='' method='' encType=''>
                <div className='divFotoUsuarioFormulario'>
                    <img src={props.datosUsuarioLogueado.avatar} alt={props.datosUsuarioLogueado.avatar}></img>
                </div>
                <input type='text' value={textoComentario} onChange={params => setTextoComentario(params.target.value)} placeholder='Escribe un comentario...'></input>
            </form>
        </div>
    )
}

export default withRouter(Comentarios);