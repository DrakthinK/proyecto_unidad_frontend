const usuario_actual=document.getElementById("usuario_actual");
const tokens=JSON.parse(localStorage.getItem("apppagos.tokens"));

user=JSON.parse(localStorage.getItem("apppagos.usuario"))
//usuario_actual.text=user.username ?? 'Proyecto Silabuz';

textousuaro=user.username ?? 'Proyecto Silabuz';
usuario_actual.text=textousuaro+' : '+verificarRol(user.rol)

const formRegistrar=document.getElementById("form");
const email=document.getElementById("email");
const username=document.getElementById("username");
const password=document.getElementById("password");
const rol=document.getElementById("rol");



formRegistrar.addEventListener("submit",async (event)=>{
  event.preventDefault();
  console.log(event);
  formValidation();
  
})
//validacion
let formValidation = () => {

  if (email.value === "") {
    alert("correo requerido")
  }
  if (username.value === "") {
    alert("usuario es requerido")
  }
  if(password.value === ""){
    alert("contraseña es requerido")
  }
  if (username.value  !== "" && password.value  !== ""){
    registrarUsuario();
    
  }
};


async function registrarUsuario(){

  console.log(user.id)
  const data = {
    email:email.value,
    username:username.value,
    password:password.value,
    rol:rol.value
  }
 console.log(JSON.stringify(data));
  let response = await fetch('http://127.0.0.1:8000/users/signup/', {
    method: 'POST',
    mode: "cors",
    headers: {
      "Accept": "application/json",
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then((response)=>{
    if (response.ok){
        Swal.fire(
            '¡Usuario Creado!',
            'Los datos se guardaron correctamente',
            'success'
          ).then((result) => {
            if (result.isConfirmed) {
                window.location.replace("./index.html");
            }
        }) 
    }
    else{
        Swal.fire({
            icon:"error",
            title: 'Oops...',
            text: "¡Ocurrió un error!"
        })           
    }
  })

 
}



function verificarRol(rol){
  let usuario=""
  if(rol=='AN'){
    usuario='Anonimo'
  }else if(rol=='NR'){
    usuario='Normal'
  }else if(rol=='AD'){
    usuario='Administrador'
  }

  return usuario;
}


/* async function getUsuarios(){

  try {
    
    response=await fetch("http://127.0.0.1:8000/users")
    data=await response.json()
    console.log(data)
    renderizarUsuarios(data)
  } catch (error) {
    
  }
}

function renderizarUsuarios(data){
  usuarios.innerHTML=``;
  html=``
  data.forEach(element => {
    html+=`
    <option value="${element.id}">${element.username}</option>
    `
  });
  usuarios.innerHTML=html
  console.log(html)

}

getUsuarios(); */
