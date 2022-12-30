const formPago=document.getElementById("form");
const service=document.getElementById("servicio");
const amount=document.getElementById("monto");
const expirationDate=document.getElementById("fecha_vencimiento");
const usuario_actual=document.getElementById("usuario_actual");
const tokens=JSON.parse(localStorage.getItem("apppagos.tokens"));

user=JSON.parse(localStorage.getItem("apppagos.usuario"))
usuario_actual.text=user.username ?? 'Proyecto Silabuz';

textousuaro=user.username ?? 'Proyecto Silabuz';
usuario_actual.text=textousuaro+' : '+verificarRol(user.rol)

formPago.addEventListener("submit",async (event)=>{
  event.preventDefault();
  console.log(event);
  formValidation();
  
})
//validacion
let formValidation = () => {

  console.log(expirationDate.value);
  if (expirationDate.value === "") {
    alert("fecha de vencimiento es requerido")
  }
  if (service.value === "") {
    alert("servicio es requerido")
  }
  if(amount.value === ""){
    alert("monto es requerido")
  }
  if (service.value !== "" && amount.value !== ""&& expirationDate.value !== ""){
    GuardarPago();
    //alert("ok")
  }
};


async function GuardarPago(){

  console.log(user.id)
  const data = {
    usuario:user.id,
    service:service.value,
    amount:amount.value,
    expirationDate:expirationDate.value
  }
 console.log(JSON.stringify(data));
  let response = await fetch('http://127.0.0.1:8000/api/v2/payment_user', {
    method: 'POST',
    mode: "cors",
    headers: {
      "Accept": "application/json",
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${tokens}`,
    },
    body: JSON.stringify(data)
  }).then((response)=>{
    if (response.ok){
        Swal.fire(
            '¡Creado!',
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


async function getService(){

  try {
    let h = new Headers();
    h.append('authorization',`Bearer ${tokens}`)
    response=await fetch("http://127.0.0.1:8000/api/v2/services",
    {
      headers: h
    })
    data=await response.json()
    console.log(data)
    renderizarService(data.results)
  } catch (error) {
    
  }
}

function renderizarService(data){
  service.innerHTML=``;
  html=``
  data.forEach(element => {
    html+=`
    <option value="${element.id}">${element.name}</option>
    `
  });
  service.innerHTML=html

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

getService();