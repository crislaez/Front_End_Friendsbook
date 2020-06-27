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
export default 
    {
        addUser,
        login,
        getUserById,
        addImage,
        getImageByIdUser
    }