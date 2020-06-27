import React,{useState, useEffect} from 'react';
//css
import './ContenedorFotos.css';
// //services
// import Sevices from '../../Services/Services';

function ContenedorFotos(props){


    
    useEffect( () => {

        //llamamos a la funcion que esta en perfil para cargar las fotos
        const datosServicios = props.datosServicios;
        datosServicios();
    

    },[props.datosUsuarioLogueado]);

    return(
        <div className='divContenedorFotos'>

            <div className='divFDotoContenedorFoto'>
                <h3>FOTOS</h3>
            </div>
            {
                props.arrayFotosUsaurio
                ?
                props.arrayFotosUsaurio.map((dato, key) => {
                    return(
                        <div key={key} className='divFotoContenedorFoto'>
                            <img src={dato.imagen}></img>
                        </div>
                    )
                })
                :
                <div style={{display:'none'}}></div>
            }
        </div>
    )
}

export default ContenedorFotos;