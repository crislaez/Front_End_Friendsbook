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
//pages
import Login from '../Pages/Login/Login';
import Inicio from '../Pages/Inicio/Inicio';
import Perfil from '../Pages/Perfil/Perfil';
//Services
import Services from '../Services/Services';

function App(props){
    
    const [isLogin, setIslogin] = useState(false);
    const [mostrarHeader, setMostrarHeader] = useState(true);
    const [datosUsuarioLogueado, setDatosUsuarioLogueado] = useState([])


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

    return(
        <div>
            {
                mostrarHeader
                ?
                <Header ocultarHeader={ocultarHeader}></Header>
                :               
                <Nav funcionDatosUsuarios={funcionDatosUsuarios} datosUsuarioLogueado={datosUsuarioLogueado}></Nav>
                
            }
            <div className='contenedor'>
           
            {
                mostrarHeader
                ?
                <div style={{display:'none'}}></div>
                :
                <div>
                    <AsideLeft></AsideLeft>
                    <AsideRight></AsideRight>
                </div>

            }
                <Switch>
                    <Route exact path='/'>{isLogin ? <Inicio ocultarHeader={ocultarHeader}></Inicio> : <Login></Login>}</Route>

                    <Route exact path='/inicio'><Inicio ocultarHeader={ocultarHeader}></Inicio></Route>

                    <Route exact path='/login'><Login></Login></Route>

                    <Route exact path='/perfil'><Perfil></Perfil></Route>

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