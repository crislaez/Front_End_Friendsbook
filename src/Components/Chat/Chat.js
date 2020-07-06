import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
//css
import './Chat.css';
//Services
import Services from '../../Services/Services';
//sweetalert
import swal from 'sweetalert';

let variableIntervalo;

function Chat(props){

    const [arrayDatosUsuario, setArrayDatosUsuario] = useState([]);//guardaremos el usuario con el qeu chatearemos
    const [mensajeChat, setMensajeChat] = useState('');//mensaje del formulario chat
    const [arrayMensajesChat, setArrayMensajesChat] = useState([]) //guardaremos los mensajes del chat

    useEffect( () => {

        funcionObtenerDatosUsuarioChat();
        // funcionObrtenerMesajesChat();
        variableIntervalo = funcionIntervalo();

        return () => {
            clearInterval(variableIntervalo);
        }
    },[props.idUaurioChat]);

    
    //funcion para cerrar el chat
    const handleClickCerrarChat = () =>{
        //llamamos a la funcion que esta en app para cerrar el chat
        const funccionOcultarChat = props.funccionOcultarChat;
        funccionOcultarChat();
    };    
    //obtener los datos del usuario que se va a chatear
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
            let data = new URLSearchParams(`id_chat=${''}&id_usuario_uno=${props.idUaurioChat}&id_usuario_dos=${parseInt(localStorage.getItem('primaryfriendsbook'))}&mensaje=${mensajeChat}`);

            Services.addChat(data)
            .then(response => {
                if(!response.success){
                    swal('Oops','Ha ocurrido un error','error')
                }
            })
            .catch(err => console.log(err));

            setMensajeChat('');

        }else{
            swal('Oops','Deves estar logueado','error');
            props.history.push('/login');
            window.location.reload(true);
        }
       
    };

    //funcion que cargara el chat cada segundo
    const funcionIntervalo = () => {
        let tiempo = setInterval(() => {
            //llamamos a la funcion para rellenar el array con el nuevo mensaje ingresado
            funcionObrtenerMesajesChat();
        },500);
        return tiempo;
    }
    //funcion para obtener los mensajes del chat
    const funcionObrtenerMesajesChat = () => {
        Services.getChatByIdUSers(props.idUaurioChat,parseInt(localStorage.getItem('primaryfriendsbook')))
        .then(response => {
            // console.log(response.data);
            setArrayMensajesChat(response.data)
        })
        .catch(err => console.log(err));
    };

// console.log(props.idUaurioChat)

    return(
        <div className='divChat'>
            <div className='tituloChat'>
                <div className='imagenUsuarioChat'>
                    <img src={arrayDatosUsuario.avatar} alt={arrayDatosUsuario.avatar}></img>
                </div>
                <p>{arrayDatosUsuario.nombre +' '+arrayDatosUsuario.apellido}</p>
                <input onClick={handleClickCerrarChat} type='button' value='X'></input>
            </div>

            <div className='contenedorChat'>
            {
                arrayMensajesChat
                ?
                arrayMensajesChat.map((dato, key) => {
                    let flotar,fondo,colorTexto,noMostrarImagen;
                    if(dato.id_usuario_dos === parseInt(localStorage.getItem('primaryfriendsbook'))){
                        flotar = 'right';
                        fondo = '#2F85FC';
                        colorTexto = 'white';
                        noMostrarImagen = 'none';
                    }else{
                        flotar = 'left';
                        fondo = '#F0F0F0';
                        colorTexto = '#777777';
                        noMostrarImagen = 'block';
                    }

                    return(                       
                        <div key={key} className='divMensajeChat' style={{float:`${flotar}`}}>
                            <div className='divImangenChat' style={{display:`${noMostrarImagen}`}}>
                                <img src={dato.avatar} alt={dato.avatar}></img>
                            </div>

                            <div className='divMensajeMensajeChat' style={{background:`${fondo}`, color:`${colorTexto}`}}>
                                 <p>{dato.mensaje}</p>
                            </div>
                        </div>
                    )
                })
                :
                <div style={{display:'none'}}></div>
            }
            </div>

            <form onSubmit={handleClickSubmit} action='' method='' encType=''>
                <input type='text' value={mensajeChat} onChange={params => setMensajeChat(params.target.value)} placeholder='envia un mensaje...'></input>
            </form>
        </div>
    )
}

export default withRouter(Chat);