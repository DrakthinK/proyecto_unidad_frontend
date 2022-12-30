
const pagosrealizados=document.getElementById("pagosrealizados");
const pagosvencidos=document.getElementById("pagosvencidos");
const usuario_actual=document.getElementById("usuario_actual");
const tokens=JSON.parse(localStorage.getItem("apppagos.tokens"));

user=JSON.parse(localStorage.getItem("apppagos.usuario"));

textousuaro=user.username ?? 'Proyecto Silabuz';
usuario_actual.text=textousuaro+' : '+verificarRol(user.rol)
pagosrealizados.innerHTML=``;
pagosvencidos.innerHTML=``;
async function getPagosRealizados() {
 

  try {
    let h = new Headers();
    h.append('authorization',`Bearer ${tokens}`)
    const response = await fetch("http://127.0.0.1:8000/api/v2/payment_user",{
      method: 'GET',
      mode: "cors",
      headers:h
    });
    const data = await response.json();
    //id ? renderTodo(data) : renderTasks(data)
    renderizarPagos(data.results);
    console.log(data.results);
  } catch (error) {
    console.log(error);
  }
}


//pagos vencidos

async function getPagosVencidos() {
  
  try {
    h=new Headers();
    h.append('Authorization',`Bearer ${tokens}`)
    const response_v = await fetch("http://127.0.0.1:8000/api/v2/expired_payments",{
      method: 'GET',
      mode: "cors",
    headers:h
    });
    console.log(response_v);
    const data_v = await response_v.json();
    
    console.log(data_v.results);
    
    //id ? renderTodo(data) : renderTasks(data)
    renderizarVencidos(data_v.results);
  } catch (error) {
    console.log(error);
  }
}


function renderizarPagos(data){
  html=``;
  data.forEach(element => {
    html+=`
    <div class="p-3">

    <div class="card card-body bg-black">
        
        <div class="row">

            <div class="col-4">
                <img src="app/img/OIP (1).jpg" alt="app" class="img-fluid">
               
            </div>

            <dir class="col-4">
              <p class="text-light">${element.paymentDate}</p>
            </dir>

            <div class="col-4">
              <p class="text-light">${element.amount}</p>
            </div>
          
        </div>

    </div>

   </div>
    `
  });
  pagosrealizados.innerHTML=html

}


function renderizarVencidos(data){

  html=``;
  data.forEach(element => {
    html+=`
    <div class="p-3">

        <div class="card card-body bg-black">
            
            <div class="row">
  
                <div class="col-3">
                    <img src="app/img/OIP (1).jpg" alt="app" styleclass="img-fluid">
                   
                </div>
  
                <dir class="col-3">
                  <p class="text-light" >${element.payment_usuario}</p>
                </dir>
  
                <div class="col-3">
                  <p class="text-light">100.00</p>
                </div>
  
                <div class="col-3">
                  <p class="text-light">${element.penalty_fee_amount}</p>
                </div>
              
            </div>
  
        </div>
  
       </div>
    `
  });
  pagosvencidos.innerHTML=html;

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
getPagosRealizados();
getPagosVencidos();
  


