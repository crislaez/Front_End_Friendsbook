import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
//css
import './Foto.css';

function Foto(props){

    const[idFoto, setIdFoto] = useState('');
    const[idUsaurio, setIdUsuario] = useState('');

    useEffect( () => {
        let idFoto = window.location.href.split('/')[window.location.href.split('/').length-1];
        let idUsuario = window.location.href.split('/')[window.location.href.split('/').length-2];
        setIdFoto(window.location.href.split('/')[window.location.href.split('/').length-1])
        setIdUsuario(window.location.href.split('/')[window.location.href.split('/').length-2])
        
    });


    return (
        <div className='divFoto'>
            <div className='divDerechaFoto'>
                <Link to={`/perfil/${idUsaurio}`}><input type='button' value='X'></input></Link>
            </div>

            <div className='divIzquierdaFoto'>
            </div>
        </div>
    )
}

export default Foto;