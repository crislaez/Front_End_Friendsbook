import React,{useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom'
//css
import './Perfil.css';

function Perfil(props){
    
    useEffect( () => {
        //llamamos a la funcion que esta en app apra ocultar el header
        const ocultarHeader = props.ocultarHeader;
        ocultarHeader();
    },[]);
    
    return(
        <section className='divPerfil'>
            <h2>Perfil</h2>          
        </section>
    )
}

export default Perfil;