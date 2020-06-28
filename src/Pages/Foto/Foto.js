import React,{useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
//css
import './Foto.css';
//Servicios
import Services from '../../Services/Services';
//sweetalert
import swal from 'sweetalert';

function Foto(props){

    const[idFoto, setIdFoto] = useState('');
    const[idUsaurio, setIdUsuario] = useState('');
    const[arrayDatosFoto, setArrayDatosFoto] = useState([])

    useEffect( () => {

        setIdFoto(window.location.href.split('/')[window.location.href.split('/').length-1]);
        setIdUsuario(window.location.href.split('/')[window.location.href.split('/').length-2]);        
        
        //llamamos a la funcion que esta abajo
        funcionDatosFoto(window.location.href.split('/')[window.location.href.split('/').length-1])
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
                        <input onClick={handleClick} type='button' value='Borrar'></input>
                    </div>
                </div>

                <div className='divMegustaComentarios'>
                </div>
            </div>
        </React.Fragment>
    )
}

export default withRouter(Foto);