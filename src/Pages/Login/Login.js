import React,{useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
//css
import './Login.css';
//sweetalert
import swal from 'sweetalert';
//encriptar
import md5 from 'crypto-js/md5';
//Services
import Services from '../../Services/Services';

function Login(props){

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [clave, setClave] = useState('');
    const [nacimiento, setNacimiento] = useState('');
    const [hombre, setHombre] = useState('');
    const [mujer, setMujer] = useState('');
    const [avatar, setAvatar] = useState('');
    const [banner, setBanner] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!nombre){
            swal ( "Oops","Rellene el nombre correctamente","error" );
        }else if(!apellido){
            swal ( "Oops","Rellene el apellido correctamente","error" );
        }else if(!correo){
            swal ( "Oops","Rellene el correo correctamente","error" );
        }else if(!clave){
            swal ( "Oops","Rellene la clave correctamente","error" );
        }else if(!nacimiento){
            swal ( "Oops","Rellene el nacimiento correctamente","error" );
        }else if(!avatar){
            swal ( "Oops","Seleccione la foto del avatar","error" );
        }else if(!banner){
            swal ( "Oops","Seleccione la foto del banner","error" );
        }else{
            let encriptadoClave = md5(clave);
            let sexo = ''

            if(hombre){
                sexo = hombre
            }else if(mujer){
                sexo = mujer
            }else{
                sexo = 'mujer'
            }

            let formData = new FormData()
            formData.append("id_usuario", '');
            formData.append("nombre", nombre);
            formData.append("apellido", apellido);
            formData.append("correo", correo);
            formData.append("clave", JSON.stringify(encriptadoClave)); 
            formData.append("nacimiento", nacimiento); 
            formData.append("sexo", sexo); 
            formData.append("avatar", avatar); 
            formData.append("banner", banner); 
            
            //llamamos a la funcion addUser que esta en services para agregar usuario            
            Services.addUser(formData)
            .then(response => {
                console.log(response)
                if(response.success){
                    swal ( "Ok","Registrado correctamente","success" );
                }else{
                    swal ( "Oops","ha surgido un error","error" );
                }                
            })
            .catch(err => console.log(err))            
        }
        //limpiamos los campos
        setNombre('');
        setApellido('');
        setCorreo('');
        setClave('');
        setNacimiento('');
        document.querySelector('#bAvatar').value='';
        document.querySelector('#bBanner').value='';
    };
    
    return(
        <div className='divLogin'>
            <div className='contenedorLogin'>
                <div className='divTituloLogin'>
                    <h2>Crea una cuenta</h2>
                    <p>Es rápido y facil</p>
                </div>

                <form onSubmit={handleSubmit} action='' method='' encType='multipart/form-data'>
                    <input style={{width:'45%'}} type='text' name='nombre' value={nombre} onChange={(params) => {setNombre(params.target.value)}} placeholder='Nombre' pattern='[A-Za-z]+'></input>
                    <input  style={{width:'45%', marginLeft:'9.2%'}}type='text' name='apellido' value={apellido} onChange={(params) => {setApellido(params.target.value)}} placeholder='Apellido' pattern='[A-Za-z]+'></input>
                    <br></br>
                    <input type='email' name='correo' value={correo} onChange={(params) => {setCorreo(params.target.value)}} placeholder='Correo electronico'></input>
                    <br></br>
                    <input type='password' name='clave' value={clave} onChange={(params) => {setClave(params.target.value)}} placeholder='Contraseña nueva'></input>
                    <br></br>
                    <label style={{marginTop:'10px', float:'left'}}>Fecha de nacimiento</label>
                    <br></br>
                    <input type='date' name='nacimiento' value={nacimiento} onChange={(params) => {setNacimiento(params.target.value)}}></input>
                    <br></br>
                    <label style={{marginTop:'10px', float:'left'}}>Sexo</label>
                    <br></br>
                    <input type="radio" name='sexo' value='mujer' checked={true} onChange={(params) => {setMujer(params.target.value)}}/>
                    <label>Mujer</label>
                    <input type="radio" name='sexo' value='hombre' onChange={(params) => {setHombre(params.target.value)}} />
                    <label>Hombre</label>
                    <br></br>
                    <label style={{marginTop:'10px', float:'left'}}>Avatar</label>
                    <input type='file' name='avatar' onChange={(params) => {setAvatar(params.target.files[0])}}></input>
                    <br></br>
                    <label>Banner</label>
                    <input id='bAvatar' type='file' name='banner' onChange={(params) => {setBanner(params.target.files[0])}}></input>
                    <br></br>
                    <input id='bBanner' type='submit' value='Registrarte'></input>
                </form>
            </div>            
        </div>
    )
}

export default withRouter(Login)