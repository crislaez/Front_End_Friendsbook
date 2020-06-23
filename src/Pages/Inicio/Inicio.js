import React,{useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom'
//css
import './Inicio.css';

function Inicio(props){

    useEffect( () => {
        //llamamos a la funcion que esta en app apra ocultar el header
        const ocultarHeader = props.ocultarHeader;
        ocultarHeader();
    },[]);
    
    return(
        <section className='divInicio'>
            <h2>Inicio</h2>          
        </section>
    )
}

export default withRouter(Inicio)