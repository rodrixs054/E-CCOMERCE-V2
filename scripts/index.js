// Este será el programa encargado de seleccionar los elementos HTML del DOM 7
// Así como también exportar las funciones del CRUD de firebase para mostar los productos en las
// diferentes categorías de la tienda.

//==================================================================================//
//========================= SELECCIÓN DE ELEMENTOS HTML DEL DOM ===================//
const carrito = document.querySelector(".header__carrito__tabla"); //=> Contedor principal de la tabla del carrito
const contenidoCarrito = document.querySelector(".lista__carrito tbody"); //=> Tabla del carrito y el tbody en su interior.

const btnComprarProductos = document.querySelector(".carrito__btn__pagar"); //=> btn para simular pago de productos
const btnLimpiarCarrito = document.querySelector(".carrito__btn__limpiar__carrito");//=> btn para limpiar la tabla de productos del carrito


const listaDeProductos = document.querySelector(".productos__container") //=> Productos (individuales)


const totalAPagarCarrrito =document.querySelector(".carrito__pagoTotal"); //=> Un h6 que nos dirá el total a pagar cuando haya más de 1 producto en el carrito.
//==================================================================================//
//==================================================================================//

// console.log(carrito)
console.log(contenidoCarrito)

// console.log(btnComprarProductos)
// console.log(btnLimpiarCarrito)

// console.log(listaDeProductos)


// console.log(totalAPagarCarrrito)

let articulosCarrito = JSON.parse(localStorage.getItem('articulosCarrito')) || [];
 //=> Añadimos los prodcutos al arreglo para saber los productos que seleccionemos.

let seleccion = true;

//==================================================================================//
//==================================================================================//
//============ Comenzamos por leer los datos individuales de cada producto =========//
//---> Función para seleccionar la card de un producto
listaDeProductos.addEventListener("click", identificarProducto);

function identificarProducto (e){
    e.preventDefault();

    try{

        if(e.target.classList.contains("add")){
            console.log("Hay uno que si lo tiene");
    
             //console.log(e.target.parentElement.parentElement)
    
            //Guardamos toda la card del producto seleccionado
            const productoSeleccionado = e.target.parentElement.parentElement;
    
            //Mandamos llamar a otra función para leer la información del producto:
            leerInformacionProducto(productoSeleccionado);
        }

    }catch(error){
        console.log(error);
    }
    
}




//----> Función para leer la información de un producto.
function leerInformacionProducto(producto){
    //Creamos un objeto para almacenar la información del producto.
    const informacionProducto = {
        imagen: producto.querySelector("img").src,
        tituloProducto: producto.querySelector("h4").textContent,
        precio: Number( producto.querySelector("p span").textContent.replace("$","") ),
        id: producto.querySelector("a").getAttribute("data-id"),
        cantidad: Number(1),

        totalDeCompra:{
            totalProducto: Number(0)
        }
    };


    console.log(informacionProducto);

     //=============================================================//

     //=> Verificamos si un producto está o no en el articulosCarrito
     const revisarProducto = articulosCarrito.some(producto=> producto.id === informacionProducto.id) //==> True // False
    console.log(revisarProducto)

     //Validamos ei el producto existe en articulosCarrito:
    if(revisarProducto){

        //Recorremos nuestro arreglo articulosCarrito:
        for(let i = 0; i<articulosCarrito.length; i++){
            
            //Buscamos por ID del producto existente para aumentar su cantidad (numero de veces agregado en el carrito);
            articulosCarrito[i].id;
            if(articulosCarrito[i].id === informacionProducto.id){
                // Si se desea agregar varios productos, la cantidad de estos aumenta:
                articulosCarrito[i].cantidad++;

                //==> Aumentamos el total del producto cunando es más de 1:
                articulosCarrito[i].totalDeCompra.totalProducto = articulosCarrito[i].precio * articulosCarrito[i].cantidad
            }
        }

    }else{
        // Si el producto no existe, agregamos informacionProducto al arreglo articulosCarrito
        
        articulosCarrito = [...articulosCarrito, informacionProducto];
        
    }


    // Después de actualizar el arreglo articulosCarrito, guárdalo en localStorage para que persista.  
    localStorage.setItem('articulosCarrito', JSON.stringify(articulosCarrito));
    console.log(articulosCarrito);

    //console.log(articulosCarrito)
    agregarProductoAlCarritoHTML()//=> Va a leer el arreglo articulosCarrito y los mostrará en la tabla:

}

    







//======================================================//
//= Mostrar productos seleccionados en el carrito HTML==//

function agregarProductoAlCarritoHTML(){

    //==> Limpiamos el carrito HTML cada vez que haya un cambio
    //==> Se limpiará cuando haya más de un hijo en su contenido


    while(contenidoCarrito.firstChild){
        contenidoCarrito.removeChild(contenidoCarrito.firstChild)
    }


    //==> Recorrer nuestro arreglo articulosCarrito para crear los elementos HTML
    // por cada producto agregado.

    articulosCarrito.forEach(producto=>{

        let row = document.createElement("TR");
        row.innerHTML = `

            <td> 
                <img src = "${producto.imagen}" class=" img__carritoHTML ">

            </td>        

            
            <td class="textos descripcionCarrito">

                ${producto.tituloProducto}

            </td>
        

            <td class="textos descripcionCarrito">

            ${producto.precio}

            </td>


            <td class="textos descripcionCarrito">

            ${producto.cantidad}

            </td>



            <td class="textos descripcionCarrito">
                $ ${producto.totalDeCompra.totalProducto}

            </td>



            <td>

                <a class= " btn__eliminar__producto textos " data-id = "${producto.id} "> <img src="../img/icons/trash1.ico"> </a>

            </td>

        `

        contenidoCarrito.appendChild(row)
    })
}



// Llama a la función para renderizar los elementos del carrito en la página después de cargarla
window.addEventListener('load', agregarProductoAlCarritoHTML);
