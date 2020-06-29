import React,{useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
//css
import './Foto.css';
//Servicios
import Services from '../../Services/Services';
//sweetalert
import swal from 'sweetalert';

//font awesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThumbsUp, faComment} from '@fortawesome/free-regular-svg-icons'

function Foto(props){

    const[idFoto, setIdFoto] = useState('');
    const[idUsaurio, setIdUsuario] = useState('');
    const[arrayDatosFoto, setArrayDatosFoto] = useState([]);

    const [textoComentario, setTextoComentario] = useState(''); //mensaje del formulario

    const[esFotoLogueado, setEsFotoLogueado] = useState(false)

    useEffect( () => {

        setIdFoto(window.location.href.split('/')[window.location.href.split('/').length-1]);
        setIdUsuario(window.location.href.split('/')[window.location.href.split('/').length-2]);        
        
        //llamamos a la funcion que esta abajo
        funcionDatosFoto(window.location.href.split('/')[window.location.href.split('/').length-1])

        //el id que viene por la url es el mismo que el usuario logueado, esa varaible sera true
        if(window.location.href.split('/')[window.location.href.split('/').length-2] == localStorage.getItem('primaryfriendsbook')){
            setEsFotoLogueado(true);
        }else{
            setEsFotoLogueado(false);
        }
    },[idFoto]);

    
    //funcion para traer lso datos de la foto
    const funcionDatosFoto = (id) => {
        Services.getImageByIdImage(id)
        .then(response => {
            if(response.success){
                console.log(response.data[0])
                setArrayDatosFoto(response.data[0])
            }
        })
        .catch(err => console.log(err))
    };

    //funcion para borrar la foto
    const handleClick = () => {
        if(localStorage.getItem('primaryfriendsbook')){
            swal({
                title: "Seguro?",
                text: "Se borrara la imagen!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    Services.deteleImageByIdImage(idFoto)
                    .then(response => {
                        console.log(response)
                        if(response.success){
                            swal('Ok','Foto borrada','success');
                            props.history.push(`/perfil/${idUsaurio}`);
                        }
                    })
                swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                });
                } 
            });           
        }        
    };

    //funcion formulario comentario
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(idFoto +' id foto')
        console.log(localStorage.getItem('primaryfriendsbook')+' usuario logueado')
        console.log(textoComentario);
        setTextoComentario('');
    }


    return (
        <React.Fragment>
            <div className='divFoto'>
                <div className='divIzquierdaFoto'>
                    <Link to={`/perfil/${idUsaurio}`}><input type='button' value='X'></input></Link>
                </div>

                <div className='divFotoFoto'>
                    <img src={arrayDatosFoto.imagen} alt='imagenGrandeFoto'></img>
                </div>

                <div  className='divIzquierdaFoto'>
                    
                </div>
            </div>

            <div className='divDerechaFoto'>
                <div className='divDatosUsuarioFoto'>
                    <div className='divImagenUsuarioFoto'>
                        <img src={arrayDatosFoto.avatar} alt='fotoUsuario'></img>
                    </div>

                    <div className='divNombreUsuarioFoto'>
                        <p style={{fontWeight:'bold'}}>{arrayDatosFoto.nombre +' '+ arrayDatosFoto.apellido}</p>
                        <p style={{color:'#B4B4B4'}}>{arrayDatosFoto.fecha_imagen}</p>
                    </div>

                    <div className='divTituloFoto'>
                        <p>{arrayDatosFoto.titulo_imagen}</p>
                    </div>

                    <div className='divBotonBorrar'>
                    {
                        esFotoLogueado
                        ?
                        <input onClick={handleClick} type='button' value='Borrar'></input>
                        :
                        <div style={{display:'none'}}></div>

                    }                        
                    </div>

                    <div className='divIconoLikes'>
                        <label className='labeLike'><FontAwesomeIcon icon={faThumbsUp} style={{color:'white', marginLeft:'15%', marginTop:'4px'}}></FontAwesomeIcon></label>
                        <label className='labelCantidadComentarios'>0 comentario</label>
                    </div>                    

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
                
                <form onSubmit={handleSubmit} action='' method='' encType=''>
                    <div className='divFotoUsuarioFormulario'>
                        <img src={props.datosUsuarioLogueado.avatar} alt={props.datosUsuarioLogueado.avatar}></img>
                    </div>
                    <input type='text' value={textoComentario} onChange={params => setTextoComentario(params.target.value)} placeholder='Escribe un comentario...'></input>
                </form>
            </div>

        </React.Fragment>
    )
}

export default withRouter(Foto);