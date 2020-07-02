import React, {useState, useEffect} from 'react';
//css
import './FormularioComentar.css';
//Servicios
import Services from '../../Services/Services';
//sweetalert
import swal from 'sweetalert';


function FormularioComentar(props){

    const [textoComentario, setTextoComentario] = useState(''); //mensaje del formulario

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
                        if(props.cargar){
                            //volvemos a cargar el array con el comentario ingresado
                            const funcionObtenerComentarios = props.funcionObtenerComentarios
                            funcionObtenerComentarios(props.idFoto);
                        }
                        
                    }else{
                        swal('Oops','Ha ocurrido un error, Cierre sesion y vuelva ha loguearse','error');
                    }
                })
                .catch(err => console.log(err));
            }
        }        
        
        setTextoComentario('');
    };

    return(
        <form className='formularioFormularioComentar' onSubmit={handleSubmit} action='' method='' encType=''>
            <div className='divFotoUsuarioFormulario' style={{width:`${props.largoImange}`}}>
                <img src={props.datosUsuarioLogueado.avatar} alt={props.datosUsuarioLogueado.avatar}></img>
            </div>
            <input type='text' value={textoComentario} onChange={params => setTextoComentario(params.target.value)} placeholder='Escribe un comentario...'></input>
        </form>
    );
}

export default FormularioComentar;