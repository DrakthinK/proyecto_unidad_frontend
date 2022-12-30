const formLogin=document.getElementById("form");
const email=document.getElementById("email");
const password=document.getElementById("password");




formLogin.addEventListener("submit",async (event)=>{
  event.preventDefault();
  console.log(event);
  const data = {
    email: email.value,
    password:password.value
}
 console.log(JSON.stringify(data));
  let response = await fetch('http://127.0.0.1:8000/users/login/', {
    method: 'POST',
    mode: "cors",
    headers: {
      "Accept": "application/json",
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  //console.log(response);
  let result = await response.json();
  console.log(result)
  if(result.tokens){
    localStorage.setItem("apppagos.tokens",JSON.stringify(result.tokens.access))

      console.log("http://127.0.0.1:8000/users/"+result.id)
      response_user=await fetch("http://127.0.0.1:8000/users/"+result.id)
      resulusuario=await response_user.json()
      resulusuario['id']=""+result.id;
      console.log(resulusuario)
    localStorage.setItem("apppagos.usuario",JSON.stringify(resulusuario))
  
    Swal.fire(
      '¡Logeado!',
      result.message,
      'success'
    ).then((result) => {
      if (result.isConfirmed) {
          window.location.replace("./index.html");
      }
    }) 
  
  }else{

    Swal.fire({
      icon:"error",
      title: 'Oops...',
      text: `¡Ocurrió un error!:${result.message}`
  })    

  }
 

})