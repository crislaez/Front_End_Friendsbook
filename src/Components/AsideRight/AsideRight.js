import React,{useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
//css
import './AsideRight.css';
//Services
import Services from '../../Services/Services';


function AsideRight(props){
    

    useEffect( () => {

        //llamamos al a funcion quee sta en app para obtener los datos d elos usuaruarios que seguimos
        const funcionUsuariosSeguidos = props.funcionUsuariosSeguidos;
        funcionUsuariosSeguidos();
    },[]);

    
    const handleClickPerfil = (idUsuario) => {
        //llamamos a la funcion que esta en app para pasar el id del chat
        const funcionUsuarioChat = props.funcionUsuarioChat
        funcionUsuarioChat(idUsuario);
    }

   console.log(props.arrayUsuariosSeguidos)
    return(
        <div className='asideRight'>

            <div className='divPublicidad'>
                <h3>Publicidad</h3>
            </div>

            <div className='divUsuariosSeguidos'>
                <h3>Contactos</h3>
                {
                    props.arrayUsuariosSeguidos
                    ?
                    props.arrayUsuariosSeguidos.map((dato, key) => {
                        return(
                            <div key={key} className='contenedorUsuarioSeguidos' onClick={() => handleClickPerfil(dato.id_usuario)}>
                                <div className='divImagenUsuariosSeguidos'>
                                    <img src={dato.avatar} alt={dato.avatar}></img>
                                </div>
                                <p>{dato.nombre +' '+dato.apellido}</p>
                            </div>
                        )
                    })
                    :
                    <div>Aun no sigues a nadie, animate</div>
                }
            </div>           

        </div>
    )
}

export default withRouter(AsideRight);