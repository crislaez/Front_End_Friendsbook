import React, {useEffect, useState} from 'react';
//css
import './LikeComentario.css';
//font awesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThumbsUp, faComment} from '@fortawesome/free-regular-svg-icons';


function LikeComentario(props){

    // console.log(props.idFoto)
    return(
        <React.Fragment>
            <div className='divIconoLikes'>
                <label className='labeLike' style={{width:`${props.largoLabelLike}`}}><FontAwesomeIcon icon={faThumbsUp} style={{color:'white', marginLeft:'15%', marginTop:'4px'}}></FontAwesomeIcon></label>
                <label style={{marginLeft:'2%', marginTop:'7px', float:'left', fontSize:'20px'}}>0</label>
                <label className='labelCantidadComentarios'>0 comentario</label>
            </div>   

            <div className='divMegustaComentarios'>
                <div className='cajitaIconos'>
                    <label><FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon></label>
                    <p>Me gusta</p>
                </div>

                <div className='cajitaIconos'>
                    <label><FontAwesomeIcon icon={faComment}></FontAwesomeIcon></label>
                    <p>Comentar</p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default LikeComentario;