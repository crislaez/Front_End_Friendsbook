import React,{useState,useEffect} from 'react';
import {withRouter} from 'react-router-dom';
//css
import './BotonesSeguir.css';
//Services
import Services from '../../Services/Services';
//sweetalert
import swal from 'sweetalert';


function BotonesSeguir(props){

    const [cambiarABotonSeguir, setCambiarABotonSeguir]  = useState(false);


    useEffect( () => {

        funcionComprobarSeguimiento(props.arrayDatopsUsuarioPerfil.id_usuario);
        
    },[props.arrayDatopsUsuarioPerfil.id_usuario]);


    //funcion para comprobar seguimiento
    const funcionComprobarSeguimiento = (idSeguido) => {
        Services.chechkFollow(idSeguido,localStorage.getItem('primaryfriendsbook'))
        .then(response => {
            if(response.data.toString()){
                console.log(response)
                console.log('le sigues')
                setCambiarABotonSeguir(true);
            }else{
                console.log('no le sigues')
                setCambiarABotonSeguir(false);
            }
            
        })
    };

    //funciojn para seguir
    const handleClickSeguir = () => {
        console.log(props.arrayDatopsUsuarioPerfil.id_usuario);   
        if(localStorage.getItem('primaryfriendsbook')){

           let dato = new URLSearchParams(`id_seguir=''&id_usuario_seguido=${props.arrayDatopsUsuarioPerfil.id_usuario}&id_usuario_seguidor=${localStorage.getItem('primaryfriendsbook')}`)
           Services.addFollow(dato)
           .then(response => {
               if(response.success){
                console.log(response)
                setCambiarABotonSeguir(true);
                swal('Ook','Ahora le sigues','success')
               }
           })
           .catch(err => console.log(err));

        }else{
            swal('Oops','Debes estar logueado','error');
            props.history.push('/login');
            window.location.reload(true);
        }
    };

    //funcion para dejar de seguir
    const handleClickDejarSeguir = () => {
        if(localStorage.getItem('primaryfriendsbook')){

            swal({
                title: "Estas seguro?",
                text: "Le dejaras de seguir!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                Services.unFollow(props.arrayDatopsUsuarioPerfil.id_usuario, localStorage.getItem('primaryfriendsbook'))
                .then(response => {
                    if(response.success){
                        console.log(response)
                        setCambiarABotonSeguir(false);
                        swal('Ook','Ya no le sigues','success')
                    }                
                })
                .catch(err => console.log(err));
            } 
          });
          
        }else{
            swal('Oops','Debes estar logueado','error');
            props.history.push('/login');
            window.location.reload(true);
        }
    };


    return(
        <React.Fragment>
        {
            props.mostrarBotonesPerfilLogueado
            ?
            <div style={{display:'none'}}></div>
            :
            <React.Fragment>
            {
                cambiarABotonSeguir
                ?
                <input style={{background:'#E1E1E1'}} onClick={handleClickDejarSeguir} type='button' value='Dejar de Seguir'></input>
                :
                <input onClick={handleClickSeguir} type='button' value='Seguir'></input>
            }
            </React.Fragment>
            
        }
        </React.Fragment>
    )
}

export default withRouter(BotonesSeguir);