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

function App(props){
    
    const [isLogin, setIslogin] = useState(false);
    const [mostrarHeader, setMostrarHeader] = useState(true);


    useEffect(() => {
        if(localStorage.getItem('primaryfriendsbook')){
            setIslogin(true);
            setMostrarHeader(false);
        }else{
            setIslogin(false);
            setMostrarHeader(true)
        }
    },[]);

    const ocultarHeader = () => {
        setMostrarHeader(false);
    };

    return(
        <div>
            {
                mostrarHeader
                ?
                <Header ocultarHeader={ocultarHeader}></Header>
                :               
                <Nav></Nav>
                
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