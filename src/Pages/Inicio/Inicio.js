import React,{useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom'
//css
import './Inicio.css';

function Inicio(props){
    
    return(
        <section className='divInicio'>
            <h2>Inicio</h2>          
        </section>
    )
}

export default withRouter(Inicio)