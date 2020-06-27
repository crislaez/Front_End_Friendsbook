import React,{useState,useEffect} from 'react';
//css
import './SubirFoto.css';
//sweetalert
import swal from 'sweetalert';
//importamos los servicios
import Services from '../../Services/Services';

function SubirFoto(props){

    const [tituloFoto, setTituloFoto] = useState('');
    const [foto, setFoto] = useState('');
    
    const handleSubmit = (event) => {
        event.preventDefault();

        if(!localStorage.getItem('primaryfriendsbook')){
            swal('Oops','Deves estar logueado','error');
            props.history.push('/login');
        }
        else{            
            if(!tituloFoto){
                swal('Oops','Rellene el titulo de la foto','error');
            }else if(!foto){
                swal('Oops','Seleccione la foto','error');
            }else{
                let formData = new FormData();
                formData.append('id_imagenes','');
                formData.append('id_usuario',localStorage.getItem('primaryfriendsbook'));
                formData.append('imagen',foto);
                formData.append('titulo_imagen',tituloFoto);

                Services.addImage(formData)
                .then(response => {
                    console.log(response)
                    if(response.success){
                        swal('Ok','Subida correctamente','success');
                        //llamamos a la funcion que esta en app para cerrar el componente
                        const handleClickAparecerSubirFoto = props.handleClickAparecerSubirFoto
                        handleClickAparecerSubirFoto();
                    }else{
                        swal('Oops','No se ha podido subir la foto','error');
                    }
                })
                .catch(err => console.log(err));                
            }
            //vaciasmos los inputs
            setTituloFoto('');
            setFoto('');
            document.querySelector('#campoFoto').value='';
        }        

    };

    return(
        <div className='divSubirFoto'>
            <div className='contenedorSubirFoto'>
                <div className='divTituloSubirFoto'>
                    <h3>SUBIR FOTO</h3>
                    <input type='button' value='X' onClick={props.handleClickAparecerSubirFoto}></input>
                </div>

                <form onSubmit={handleSubmit} action='' method='' encType=''>
                    <input type='text' name='titulo_foto' value={tituloFoto} onChange={params => setTituloFoto(params.target.value)} placeholder={'titulo de la foto...'}></input>
                    <br></br>
                    <label>Foto:</label>
                    <input id='campoFoto' type='file' name='foto' onChange={params => setFoto(params.target.files[0])}></input>
                    <br></br>
                    <input type='submit' value='Enviar'></input>
                </form>
            </div>
        </div>
    )
}

export default SubirFoto;