import React,{useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom'
//css
import './Inicio.css';

function Inicio(props){

    useEffect( () => {
        
        // if(!localStorage.getItem('primaryfriendsbook')){
        //     props.history.push('/login')
        // }else{
            
        // }
        //llamamos a la funcion que esta en app apra ocultar el header
        const ocultarHeader = props.ocultarHeader;
        ocultarHeader();
        //llamamos a la funcion que esta en app para msotrar los asides si se han ocultado
        const funcionMostrarAsides = props.funcionMostrarAsides;
        funcionMostrarAsides();
        
    },[]);
    
    return(
        <section className='divInicio'>
            <h2>Inicio</h2>          
        </section>
    )
}

export default withRouter(Inicio)