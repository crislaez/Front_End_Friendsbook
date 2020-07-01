import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom'
//css 
import './VentanaBuscador.css';

function VentanaBuscador(props){

    //ir a perfil del usuario
    const funcionRedireccionPerfil = (id) => {
        console.log(id)
        //llamamops a la funcion que esta en Nav para cerrar este componente
        const funcionCerrarVentanaBuscador = props.funcionCerrarVentanaBuscador;
        funcionCerrarVentanaBuscador();
        props.history.push('/perfil/'+id);
        window.location.reload(true);
    };

    return(
        <div className='divVentanaBuscador'>
            {
                props.arrayDatosBuscador
                ?
                props.arrayDatosBuscador.map((dato, key) => {
                    return(
                        <div className='divUsuarioBuscador' key={key} onClick={() => {funcionRedireccionPerfil(dato.id_usuario)}}>
                            <div className='divImagenBuscador'>
                                <img src={dato.avatar} alt={dato.avatar}></img>
                            </div>
                            <h3>{dato.nombre +' '+ dato.apellido}</h3>
                        </div>
                    )
                })
                :
                <div style={{display:'none'}}></div>
            }
        </div>
    )
}

export default withRouter(VentanaBuscador);