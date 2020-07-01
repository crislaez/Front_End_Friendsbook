//agregar usuarios
const addUser = (data) => {
    return fetch(process.env.REACT_APP_RUTA+'/addUser',{method:'POST', body:data}).then(data => data.json())
}

//login
const login = (data) => {
    return fetch(process.env.REACT_APP_RUTA+'/login', {method:'POST', body:data}).then(data => data.json())
}

//datos usuario logueado
const getUserById = (data) => {
    return  fetch(process.env.REACT_APP_RUTA+'/getUserById/'+data,{method:'GET'}).then(data => data.json())
}

//ingresar imagenes
const addImage = (data) => {
    return fetch(process.env.REACT_APP_RUTA+'/addImage',{method:'POST', body:data, headers:{authorization: `BEARER ${localStorage.getItem('friendsbooktoken')}`}}).then(data => data.json())
}
//mostrar imageenes por usuario
const getImageByIdUser = (data) => {
    return fetch(process.env.REACT_APP_RUTA+'/getImageByIdUser/'+data, {method:'GET'}).then(data => data.json())
}
//imagen por ide de imagen
const getImageByIdImage = (data) => {
    return fetch(process.env.REACT_APP_RUTA+'/getImageByIdImage/'+data, {method:'GET'}).then(data => data.json())
}
//borrar image
const deteleImageByIdImage = (data) => {
    return fetch(process.env.REACT_APP_RUTA+'/deteleImageByIdImage/'+data,{method:'DELETE', headers:{authorization: `BEARER ${localStorage.getItem('friendsbooktoken')}`}}).then(data => data.json())
}
//agregar comentario
const addComent = (data) => {
    return fetch(process.env.REACT_APP_RUTA+'/addComent',{method:'POST', body:data,headers:{authorization: `BEARER ${localStorage.getItem('friendsbooktoken')}`}}).then(data => data.json())
}
//comentarios por ide de foto
const getComentsByIdImage = (data) => {
    return fetch(process.env.REACT_APP_RUTA+'/getComentsByIdImage/'+data, {method:'GET'}).then(data => data.json())
}
//buscar usuarios
const getUserBySearch = (data, data2) => {
    return fetch(process.env.REACT_APP_RUTA+'/getUserBySearch/'+data+'/'+data2, {method:'GET'}).then(data => data.json())
}
//agregar seguimiento
const addFollow = (data) => {
    return fetch(process.env.REACT_APP_RUTA+'/addFollow',{method:'POST', body:data, headers:{authorization: `BEARER ${localStorage.getItem('friendsbooktoken')}`}}).then(data => data.json())
}
//comprobar seguimiento
const chechkFollow = (data, data2) => {
    return fetch(process.env.REACT_APP_RUTA+'/chechkFollow/'+data+'/'+data2, {method:'GET'}).then(data => data.json())
}
//dejar de seguir
const unFollow = (data, data2) => {
    return fetch(process.env.REACT_APP_RUTA+'/unFollow/'+data+'/'+data2,{method:'DELETE', headers:{authorization: `BEARER ${localStorage.getItem('friendsbooktoken')}`}}).then(data => data.json())
}
//conseguir todas las fotos
const getAllImage = () => {
    return fetch(process.env.REACT_APP_RUTA+'/getAllImage',{method:'GET'}).then(data => data.json())
}

export default 
    {
        addUser,
        login,
        getUserById,
        addImage,
        getImageByIdUser,
        getImageByIdImage,
        deteleImageByIdImage,
        addComent,
        getComentsByIdImage,getUserBySearch,
        addFollow,
        chechkFollow,
        unFollow,
        getAllImage
    }