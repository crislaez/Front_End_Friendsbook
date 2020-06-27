import React,{useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom'
//css
import './Perfil.css';
//services
import Services from '../../Services/Services';
//componente
import SubirFoto from '../../Components/SubirFoto/SubirFoto';
import ContenedorFotos from '../../Components/ContenedorFotos/ContenedorFotos';

function Perfil(props){

    const [arrayDatopsUsuarioPerfil, setArrayDatopsUsuarioPerfil] = useState([]);

    const[mostrarBotonesPerfilLogueado, setMostrarBotonesPerfilLogueado ] = useState(false);

    const[mostrarComponeteSubirFoto, setMostrarComponeteSubirFoto] = useState(false);
    const[mostrarContenedorFotos, setMostrarContenedorFotos] = useState(true);
    const[mostrarContenedorVerAmigios, setMostrarContenedorVerAmigios] = useState(false);
    const[mostrarComponenteEditarPerfil, setMostrarComponenteEditarPerfil] = useState(true);

    
    useEffect( () => {
        //llamamos a la funcion que esta en app apra ocultar el header
        const ocultarHeader = props.ocultarHeader;
        ocultarHeader();
        //llamamos a la funcion que esta en app apra ocultar los asides
        const funcionOcultarAsides = props.funcionOcultarAsides;
        funcionOcultarAsides();
        
        cargarDatosUsuarioPerfil(window.location.href.split('/')[window.location.href.split('/').length-1]);

    },[window.location.href.split('/')[window.location.href.split('/').length-1]]);



    const cargarDatosUsuarioPerfil = (id) => {
        //para msotrar los botones de subirfoto y editar
        if(id == localStorage.getItem('primaryfriendsbook')){
            setMostrarBotonesPerfilLogueado(true);
        }else{
            setMostrarBotonesPerfilLogueado(false);
        }
        
        Services.getUserById(id)
        .then(response => {
            if(response.success){
                console.log(response.data[0]);
                setArrayDatopsUsuarioPerfil(response.data[0])
            }
        })
        .catch(err => {
            if(err){
                console.log('aqui')
                props.history.push('/inicio');
                window.location.reload(true)
            }
            console.log(err)
        })
    };

    const handleClickAparecerSubirFoto = () => {
        setMostrarComponeteSubirFoto(!mostrarComponeteSubirFoto);
    };

    const handleClickVerFotos = () => {
        setMostrarContenedorFotos(true);
        setMostrarContenedorVerAmigios(false);
    };
    
    const handleClickVerAmigos = () => {
        setMostrarContenedorVerAmigios(true);
        setMostrarContenedorFotos(false);
    };

    return(
        <section className='divPerfil'>
            <div className='divCabeceraPerfil'>

                <div className='divBannerPerfil' style={{background:`url(${arrayDatopsUsuarioPerfil.banner}) 0 0/100% 380px`}}>
                    <div className='divAvatarPerfil'>
                        <img src={arrayDatopsUsuarioPerfil.avatar}></img>
                    </div>
                </div>

                <div className='nombreUsuarioPerfil'>
                    <h3>{arrayDatopsUsuarioPerfil.nombre} {arrayDatopsUsuarioPerfil.apellido}</h3>
                </div>

                <div className='divBotonesPerfil'>
                    <input onClick={handleClickVerFotos} style={{marginLeft:'10%'}} type='button' value='Fotos'></input>
                    <input onClick={handleClickVerAmigos} type='button' value='Amigos'></input>
                   
                    {
                        mostrarBotonesPerfilLogueado
                        ?
                        <React.Fragment>
                            <input onClick={handleClickAparecerSubirFoto} type='button' value='Subir Archivos'></input>
                            <input type='button' value='Editar Perfil'></input>
                        </React.Fragment>
                        :
                        <div style={{display:'none'}}></div>
                    }                    
                    
                </div>

            </div>   
            
            {
                mostrarComponeteSubirFoto
                ?
                <SubirFoto handleClickAparecerSubirFoto={handleClickAparecerSubirFoto}></SubirFoto>
                :
                <div style={{display:'none'}}></div>

            }

            {
                mostrarContenedorFotos
                ?
                <ContenedorFotos datosUsuarioLogueado={props.datosUsuarioLogueado}></ContenedorFotos>
                :
                <div style={{display:'noner'}}></div>
            }

        </section>
    )
}

export default withRouter(Perfil);