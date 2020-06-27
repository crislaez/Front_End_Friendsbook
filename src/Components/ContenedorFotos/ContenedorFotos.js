import React,{useState, useEffect} from 'react';
//css
import './ContenedorFotos.css';
//services
import Sevices from '../../Services/Services';

function ContenedorFotos(props){

    const [arrayFotosUsaurio, setArrayFotosUsaurio ] = useState([]);
    
    useEffect( () => {

        datosServicios()
    },[props.datosUsuarioLogueado]);


    const datosServicios = () => {
        //cogemos el numero de la url
        let id = window.location.href.split('/')[window.location.href.split('/').length-1];
        console.log(id)
        Sevices.getImageByIdUser(id)
        .then(response => {
            if(response.success){
                console.log(response.data);
                setArrayFotosUsaurio(response.data)
            }
           
        })
        .catch(err => console.log(err))
    }

    return(
        <div className='divContenedorFotos'>
        </div>
    )
}

export default ContenedorFotos;