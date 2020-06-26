import React,{useState,useEffect} from 'react';
//css
import './SubirFoto.css';

function SubirFoto(props){

    return(
        <div className='divSubirFoto'>
            <div className='contenedorSubirFoto'>
                <div className='divTituloSubirFoto'>
                    <h3>SUBIR FOTO</h3>
                    <input type='button' value='X' onClick={props.handleClickAparecerSubirFoto}></input>
                </div>
            </div>
        </div>
    )
}

export default SubirFoto;