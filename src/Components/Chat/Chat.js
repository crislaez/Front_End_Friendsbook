import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
//css
import './Chat.css';
//Services
import Services from '../../Services/Services';
//sweetalert
import swal from 'sweetalert';


function Chat(props){

    const [arrayDatosUsuario, setArrayDatosUsuario] = useState([]);//guardaremos el usuario con el qeu chatearemos
    const [mensajeChat,setMensajeChat] = useState('');//mensaje del formulario chat


    useEffect( () => {

        funcionObtenerDatosUsuarioChat();
    },[props.idUaurioChat]);

    
    
    const handleClickCerrarChat = () =>{
        //llamamos a la funcion que esta en app para cerrar el chat
        const funccionOcultarChat = props.funccionOcultarChat;
        funccionOcultarChat();
    };
    
    const funcionObtenerDatosUsuarioChat = () =>{
        Services.getUserById(props.idUaurioChat)
        .then(response =>{
            if(response.data.toString()){
                // console.log(response.data)
                setArrayDatosUsuario(response.data[0]);
            }
        })
        .catch(err => console.log(err))
    };

    //funcion formulario enviar mensaje
    const handleClickSubmit = (event) => {
        event.preventDefault();

        if(localStorage.getItem('primaryfriendsbook')){
            console.log(mensajeChat)
            setMensajeChat('')
        }else{
            swal('Oops','Deves estar logueado','error');
            props.history.push('/login');
            window.location.reload(true);
        }
       
    }

// console.log(props.idUaurioChat)

    return(
        <div className='divChat'>
            <div className='tituloChat'>
                <div className='imagenUsuarioChat'>
                    <img src={arrayDatosUsuario.avatar}></img>
                </div>
                <p>{arrayDatosUsuario.nombre +' '+arrayDatosUsuario.apellido}</p>
                <input onClick={handleClickCerrarChat} type='button' value='X'></input>
            </div>

            <div className='contenedorChat'>
            </div>

            <form onSubmit={handleClickSubmit} action='' method='' encType=''>
                <input type='text' value={mensajeChat} onChange={params => setMensajeChat(params.target.value)} placeholder='envia un mensaje...'></input>
            </form>
        </div>
    )
}

export default withRouter(Chat);