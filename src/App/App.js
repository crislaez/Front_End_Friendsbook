import React,{useState, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
//css
import './App.css';
//componentes
import Header from '../Components/Header/Header';
import Nav from '../Components/Nav/Nav';
import AsideLeft from '../Components/AsideLeft/AsideLeft';
import AsideRight from '../Components/AsideRight/AsideRight';
import Footer from '../Components/Footer/Footer';
//componentes ventana
import VentanaPerfil from '../Components/VentanaPerfil/VentanaPerfil';
import VentanaNotificacion from '../Components/VentanaNotificacion/VentanaNotificacion';
import VentanaChat from '../Components/VentanaChat/VentanaChat';
import VentanaPlus from '../Components/VentanaPlus/VentanaPlus';
//pages
import Login from '../Pages/Login/Login';
import Inicio from '../Pages/Inicio/Inicio';
import Perfil from '../Pages/Perfil/Perfil';
import Foto from '../Pages/Foto/Foto';

//Services
import Services from '../Services/Services';

function App(props){
    
    const [isLogin, setIslogin] = useState(false);
    const [mostrarHeader, setMostrarHeader] = useState(true);
    
    const [datosUsuarioLogueado, setDatosUsuarioLogueado] = useState([]);   
   
    const [variableVentanaPlus, setVariableVentanaPlus] = useState(false)//variable que hara aparecer la ventana de plus
    const [variableVentanaChat, setVariableVentanaChat] = useState(false)//variable que hara aparecer la ventana de chat
    const [variableVentanaNotificaciones, setVariableVentanaNotificaciones] = useState(false)//variable que hara aparecer la ventana de notificaciones
    const [variableVentanaPerfil, setVariableVentanaPerfil] = useState(false)//variable que hara aparecer la ventana de perfil
    const [variableMostrarAsides, setVariableMostrarAsides] = useState(true);

    useEffect(() => {
        if(localStorage.getItem('primaryfriendsbook')){
            setIslogin(true);
            setMostrarHeader(false);
        }else{
            setIslogin(false);
            setMostrarHeader(true)
        }
    },[]);

    //funcion para oculrtar el header cuando el usuario este logueado
    const ocultarHeader = () => {
        setMostrarHeader(false);       
    };

    //funcion que ocultara el header y el nav para el componente foto
    const funcionOcultaHeaderNav = () => {
        setMostrarHeader(false);
    };

    //funcion para mostrar el header
    const funcionMostrarHeader = () => {
        setMostrarHeader(true);
    }

    //fucnion que cargara los datos del usuario logueado
    const funcionDatosUsuarios = (data) => {
        if(localStorage.getItem('primaryfriendsbook')){
            Services.getUserById(data)
            .then(response => {
                // console.log(response)
                setDatosUsuarioLogueado(response.data[0])
            })
            .catch(err => console.log(err))
        }        
    };

    //funcion para qeu aparezca o desaparezca la ventana chat
    const funcionAparecerVentanaPlus = () => {
        setVariableVentanaPlus(!variableVentanaPlus);

        setVariableVentanaChat(false);
        setVariableVentanaNotificaciones(false);
        setVariableVentanaPerfil(false);
    };

    //funcion para qeu aparezca o desaparezca la ventana chat
     const funcionAparecerVentanaChat = () => {
        setVariableVentanaChat(!variableVentanaChat);

        setVariableVentanaPlus(false);
        setVariableVentanaNotificaciones(false);
        setVariableVentanaPerfil(false);
    };

    //funcion para qeu aparezca o desaparezca la ventana notificaciones
     const funcionAparecerVentanaNotificaciones = () => {
        setVariableVentanaNotificaciones(!variableVentanaNotificaciones);

        setVariableVentanaPlus(false);
        setVariableVentanaChat(false);
        setVariableVentanaPerfil(false);
    };

    //funcion para qeu aparezca o desaparezca la ventana perfil
    const funcionAparecerVentanaPerfil = () => {
        setVariableVentanaPerfil(!variableVentanaPerfil);

        setVariableVentanaPlus(false);
        setVariableVentanaChat(false);
        setVariableVentanaNotificaciones(false);
    };

    //funcion ocultara los asides
    const funcionOcultarAsides = () => {
        setVariableMostrarAsides(false);
    };

    //funcion para mostrar los asides
    const funcionMostrarAsides = () => {
        setVariableMostrarAsides(true);
    };
   

    return(
        <div>
            {
                mostrarHeader
                ?
                <Header ocultarHeader={ocultarHeader}></Header>
                :
                <Nav 
                funcionDatosUsuarios={funcionDatosUsuarios} 
                datosUsuarioLogueado={datosUsuarioLogueado}
                funcionAparecerVentanaPerfil={funcionAparecerVentanaPerfil}
                funcionAparecerVentanaNotificaciones={funcionAparecerVentanaNotificaciones}
                funcionAparecerVentanaChat={funcionAparecerVentanaChat}
                funcionAparecerVentanaPlus={funcionAparecerVentanaPlus}
                ></Nav>               
            }
            <div className='contenedor'>
           
            {
                mostrarHeader
                ?
                <div style={{display:'none'}}></div>
                :
                <div>
                {
                    variableMostrarAsides
                    ?
                    <div>
                        <AsideLeft></AsideLeft>
                        <AsideRight></AsideRight>
                    </div>
                    :
                    <div style={{display:'none'}}></div>
                }
                    
                </div>

            }

            {
                variableVentanaPlus
                ?
                <VentanaPlus></VentanaPlus>
                :
                <div style={{display:'none'}}></div>
            }

            
            {
                variableVentanaChat
                ?
                <VentanaChat></VentanaChat>
                :
                <div style={{display:'none'}}></div>
            }


            {
                variableVentanaNotificaciones
                ?
                <VentanaNotificacion></VentanaNotificacion>
                :
                <div style={{display:'none'}}></div>
            }
            

            {
                variableVentanaPerfil
                ?
                <VentanaPerfil datosUsuarioLogueado={datosUsuarioLogueado}></VentanaPerfil>
                :
                <div style={{display:'none'}}></div>
            }
           
                <Switch>
                    <Route exact path='/'>{isLogin ? <Inicio ocultarHeader={ocultarHeader} funcionMostrarAsides={funcionMostrarAsides}></Inicio> : <Login funcionMostrarHeader={funcionMostrarHeader}></Login>}</Route>

                    <Route exact path='/inicio'>
                    <Inicio 
                    ocultarHeader={ocultarHeader} 
                    funcionMostrarAsides={funcionMostrarAsides}
                    ></Inicio></Route>

                    <Route exact path='/login'>
                    <Login 
                    funcionMostrarHeader={funcionMostrarHeader}
                    ></Login></Route>

                    <Route exact path='/perfil/:id'>
                    <Perfil 
                    ocultarHeader={ocultarHeader} 
                    funcionOcultarAsides={funcionOcultarAsides}
                    datosUsuarioLogueado={datosUsuarioLogueado}
                    ></Perfil></Route>

                    <Route exact path='/foto/:idUsuario/:idFoto'>
                    <Foto 
                    ></Foto></Route>

                    <Route path='*'><div>ERROR 404</div></Route>
                </Switch>

            </div>

            {
                mostrarHeader
                ?
                <Footer></Footer>
                :               
                <div style={{display:'none'}}></div>
                
            }
        </div>
    )
}

export default App