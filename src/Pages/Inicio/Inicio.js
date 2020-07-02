import React,{useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom'
//css
import './Inicio.css';
//Services
import Services from '../../Services/Services';
//compopnentes
import LikeComentario from '../../Components/LikeComentario/LikeComentario';
import FormularioComentar from '../../Components/FormularioComentar/FormularioComentar';

function Inicio(props){

    const [arrayImagenesUsuarios, setArrayImagenesUsuarios] = useState([]);

    useEffect( () => {
        //llamamos a la funcion que esta en app apra ocultar el header
        const ocultarHeader = props.ocultarHeader;
        ocultarHeader();
        //llamamos a la funcion que esta en app para msotrar los asides si se han ocultado
        const funcionMostrarAsides = props.funcionMostrarAsides;
        funcionMostrarAsides();

        //llamamos a la funcion que esta abajo para cargar todas las fotos
        funcionObtenerDatos();
        
    },[]);
    
    //funcion para obtener todas las fotos
    const funcionObtenerDatos = () => {
        Services.getAllImage()
        .then(response => {
            console.log(response.data);
            setArrayImagenesUsuarios(response.data)
        })
        .catch(err => console.log(err))
    };

    //funcion para redireccionar al perfil de la foto del usuario que has hecho click
    const handleClickPerfil = (id) => {
        console.log(id)
        props.history.push('/perfil/'+id);
    };
    
    //funcion que nos redireccionara a la pagina foto
    const handleClickIrFoto = (idUsuario, idFoto) => {
        console.log(idUsuario);
        console.log(idFoto);
        props.history.push('/foto/'+idUsuario+'/'+idFoto)
    };

    return(
        <section className='divInicio'>
            {
                arrayImagenesUsuarios
                ?
                arrayImagenesUsuarios.map((dato, key) => {
                    return(
                        <article key={key} className='articleInicio'>
                            <div className='tituloUsuarioInicio'>
                                <div className='imagenUsuariiInicio'>
                                    <img onClick={() => handleClickPerfil(dato.id_usuario)} src={dato.avatar} alt={dato.avatar}></img>
                                </div>
                                <h3 className='parrafosInicio'>{dato.nombre +' '+dato.apellido}</h3>
                                <p className='parrafosInicio' style={{color:'#BBBBBB'}}>{dato.fecha_imagen}</p>
                                <div className='parafoTitulo'>
                                    <p className='parrafosInicioBajo'>{dato.titulo_imagen}</p>
                                </div>
                            </div>

                            <div className='divImagenInicio'>
                                <img onClick={() => {handleClickIrFoto(dato.id_usuario,dato.id_imagenes)}} src={dato.imagen} alt={dato.imagen}></img>
                            </div>

                            <div style={{width:'94%',marginLeft:'3%'}}>
                                <LikeComentario idFoto={dato.id_imagenes} largoLabelLike='3.5%'></LikeComentario>
                            </div>                            

                            <FormularioComentar largoImange={'6%'} cargar={false} idFoto={dato.id_imagenes} datosUsuarioLogueado={props.datosUsuarioLogueado}></FormularioComentar>

                        </article>
                    )
                })
                :
                <div>Cargando...</div>
            }
        </section>
    )
}

export default withRouter(Inicio)