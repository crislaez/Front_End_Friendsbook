import React,{useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom'
//css
import './ContenedorFotos.css';

function ContenedorFotos(props){
    
    useEffect( () => {
        //llamamos a la funcion que esta en perfil para cargar las fotos
        const datosServicios = props.datosServicios;
        datosServicios();    

    },[props.datosUsuarioLogueado]);


    const handleClickCargarFoto = (event) => {
        console.log(event.target.dataset.codigofoto)
        console.log(event.target.dataset.usuario)
        console.log(event.target.dataset.imagen)
        
        let codigoUsuario = event.target.dataset.usuario;
        let codigoFoto = event.target.dataset.codigofoto
        props.history.push(`/foto/${codigoUsuario}/${codigoFoto}`)
    };

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
                        <div onClick={handleClickCargarFoto} key={key} className='divFotoContenedorFoto'>
                            <img src={dato.imagen} alt='fotoUsuario' data-codigofoto={dato.id_imagenes} data-usuario={dato.id_usuario} data-imagen={dato.imagen}></img>
                        </div>
                    )
                })
                :
                <div style={{display:'none'}}></div>
            }
        </div>
    )
}

export default withRouter(ContenedorFotos);