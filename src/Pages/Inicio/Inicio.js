import React,{useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom'
//css
import './Inicio.css';
//Services
import Services from '../../Services/Services';

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
                                    <img src={dato.avatar} alt={dato.avatar}></img>
                                </div>
                                <h3 className='parrafosInicio'>{dato.nombre +' '+dato.apellido}</h3>
                                <p className='parrafosInicio' style={{color:'#BBBBBB'}}>{dato.fecha_imagen}</p>
                                <p className='parrafosInicioBajo'>{dato.titulo_imagen}</p>
                            </div>

                            <div className='divImagenInicio'>
                                <img src={dato.imagen} alt={dato.imagen}></img>
                            </div>

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