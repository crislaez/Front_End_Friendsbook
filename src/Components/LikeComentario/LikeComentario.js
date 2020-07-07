import React, {useEffect, useState} from 'react';
//css
import './LikeComentario.css';
//font awesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThumbsUp, faComment} from '@fortawesome/free-regular-svg-icons';
//Services
import Services from '../../Services/Services';
//sweetalert
import swal from 'sweetalert';

function LikeComentario(props){

    const [color, setColor] = useState('#7D7D7D')
    
    useEffect( () => {
        funcionComprobarLike(props.idFoto)
    },[props.idFoto]);
    

    //funcion para dar like
    const handleClickDarLike = () => {
        
        if(localStorage.getItem('primaryfriendsbook')){
            //si esta dado el like
            if(color === '#2F85FC'){
                Services.removeLike(props.idFoto,localStorage.getItem('primaryfriendsbook'))
                .then(response => {
                    // console.log(response);
                    if(response.success){
                        setColor('#7D7D7D');                        
                    }else{
                        setColor('#2F85FC');
                    }
                })
                .catch(err => console.log(err))

            }else{ //si no esta dado el like
                let data = new URLSearchParams(`id_megusta=${''}&id_imagenes=${props.idFoto}&id_usuario=${localStorage.getItem('primaryfriendsbook')}`);

                Services.addLike(data)
                .then(response => {
                    // console.log(response);
                    if(response.success){
                        setColor('#2F85FC');
                    }else{
                        setColor('#7D7D7D');
                    }
                })
                .catch(err => console.log(err));
            }
            

        }else{
            swal('Oops','Tienes que estar logueado','error');
        }        
    };

    //funcion para comprobar like al cargar el componente
    const funcionComprobarLike = (id_imagenes) => {

        Services.checkLike(id_imagenes,localStorage.getItem('primaryfriendsbook'))
        .then(response => {
            if(response.data.toString()){
                console.log(id_imagenes)
                setColor('#2F85FC');
            }else{
                setColor('#7D7D7D');
            }           
        })
        .catch(err => console.log(err))
    };

    return(
        <React.Fragment>
            <div className='divIconoLikes'>
                <label className='labeLike' style={{width:`${props.largoLabelLike}`}}><FontAwesomeIcon icon={faThumbsUp} style={{color:'white', marginLeft:'15%', marginTop:'4px'}}></FontAwesomeIcon></label>
                <label style={{marginLeft:'2%', marginTop:'7px', float:'left', fontSize:'20px'}}>0</label>
                <label className='labelCantidadComentarios'>0 comentario</label>
            </div>   

            <div className='divMegustaComentarios'>
                <div className='cajitaIconos' onClick={handleClickDarLike}>
                    <label style={{color:`${color}`}}><FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon></label>
                    <p style={{color:`${color}`}}>Me gusta</p>
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