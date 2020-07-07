import React,{useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom'
//css
import './Perfil.css';
//services
import Services from '../../Services/Services';
//componente
import SubirFoto from '../../Components/SubirFoto/SubirFoto';
import ContenedorFotos from '../../Components/ContenedorFotos/ContenedorFotos';
import BotonesSeguir from '../../Components/BotonesSeguir/BotonesSeguir';
//services
import Sevices from '../../Services/Services';


function Perfil(props){

    const [arrayDatopsUsuarioPerfil, setArrayDatopsUsuarioPerfil] = useState([]); //se guardan los datos de quien vemos el perfil
    
    const [mostrarBotonesPerfilLogueado, setMostrarBotonesPerfilLogueado ] = useState(false);//si el perfil es del usuario logueado
    const [margenBotones, setMargenBotones] = useState('');
    const [arrayFotosUsaurio, setArrayFotosUsaurio ] = useState([]); //se guardaran las fotos del usuario

    const [mostrarComponeteSubirFoto, setMostrarComponeteSubirFoto] = useState(false); //cargara el componente subir foto
    const [mostrarContenedorFotos, setMostrarContenedorFotos] = useState(true); //cargara el componente de las fotos
    const [mostrarContenedorVerAmigios, setMostrarContenedorVerAmigios] = useState(false); //cargara el componente de amigos
    const [mostrarComponenteEditarPerfil, setMostrarComponenteEditarPerfil] = useState(true); //cargara el componente para editar
    
    
    useEffect( () => {
        //llamamos a la funcion que esta en app apra ocultar el header
        const ocultarHeader = props.ocultarHeader;
        ocultarHeader();
        //llamamos a la funcion que esta en app apra ocultar los asides
        const funcionOcultarAsides = props.funcionOcultarAsides;
        funcionOcultarAsides();
        
        cargarDatosUsuarioPerfil(window.location.href.split('/')[window.location.href.split('/').length-1]);

    },[window.location.href.split('/')[window.location.href.split('/').length-1]]);



    //le pasamos el numero del usuario que viene desde la url
    const cargarDatosUsuarioPerfil = (id) => {
        //para msotrar los botones de subirfoto y editar
        if(id == localStorage.getItem('primaryfriendsbook')){
            setMostrarBotonesPerfilLogueado(true);
            setMargenBotones('10%');
        }else{
            setMostrarBotonesPerfilLogueado(false);
            setMargenBotones('30%');
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

    //funcion  para cargar las fotos del usuarioo
    const datosServicios = () => {
        //cogemos el numero de la url
        let id = window.location.href.split('/')[window.location.href.split('/').length-1];
        Sevices.getImageByIdUser(id)
        .then(response => {
            if(response.success){
                console.log(response.data);
                setArrayFotosUsaurio(response.data)
            }           
        })
        .catch(err => console.log(err))
    };

    //funcion para subir la foto
    const handleClickAparecerSubirFoto = () => {
        setMostrarComponeteSubirFoto(!mostrarComponeteSubirFoto);
    };

    //funcion para ver las fotos
    const handleClickVerFotos = () => {
        setMostrarContenedorFotos(true);
        setMostrarContenedorVerAmigios(false);
    };
    
    //fuincuin para qeu se carge el componente de ver amigos
    const handleClickVerAmigos = () => {
        setMostrarContenedorVerAmigios(true);
        setMostrarContenedorFotos(false);
    };

    return(
        <section className='divPerfil'>
            <div className='divCabeceraPerfil'>

                <div className='divBannerPerfil' style={{background:`url(${arrayDatopsUsuarioPerfil.banner}) 0 0/100% 380px`}}>
                    <div className='divAvatarPerfil'>
                        <img src={arrayDatopsUsuarioPerfil.avatar} alt='imagen_usuario'></img>
                    </div>
                </div>

                <div className='nombreUsuarioPerfil'>
                    <h3>{arrayDatopsUsuarioPerfil.nombre} {arrayDatopsUsuarioPerfil.apellido}</h3>
                    
                    <BotonesSeguir mostrarBotonesPerfilLogueado={mostrarBotonesPerfilLogueado} arrayDatopsUsuarioPerfil={arrayDatopsUsuarioPerfil}></BotonesSeguir>
                </div>

                <div className='divBotonesPerfil'>
                    <input onClick={handleClickVerFotos} style={{marginLeft:`${margenBotones}`}} type='button' value='Fotos'></input>
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
                <SubirFoto handleClickAparecerSubirFoto={handleClickAparecerSubirFoto} datosServicios={datosServicios}></SubirFoto>
                :
                <div style={{display:'none'}}></div>
            }

            {
                mostrarContenedorFotos
                ?
                <ContenedorFotos datosUsuarioLogueado={props.datosUsuarioLogueado} datosServicios={datosServicios} arrayFotosUsaurio={arrayFotosUsaurio}></ContenedorFotos>
                :
                <div style={{display:'none'}}></div>
            }

        </section>
    )
}

export default withRouter(Perfil);