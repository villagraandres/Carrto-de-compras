// variables

const carrito=document.querySelector('#carrito')
const contenedorCarrito=document.querySelector('#lista-carrito tbody')
const vaciarCarrito=document.querySelector('#vaciar-carrito')
const listaCursos=document.querySelector('#lista-cursos')
let articulosCarrito=[]

cargarEventListeners();
function cargarEventListeners(params) {
    //Cuando agregar un curso resinando Agregar
    listaCursos.addEventListener('click',agregarCurso)
    // elimina curso
    carrito.addEventListener('click', eliminarCurso)
    // vacir el carrito
    vaciarCarrito.addEventListener('click',()=>{
       articulosCarrito=[]; // reseteamos el arreglo
       limpiarHTML();
        
    })
}

//funciones
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado= e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado);
    }
  
}

function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId=e.target.getAttribute('data-id')
        // elimina del arreglo
        articulosCarrito=articulosCarrito.filter(curso=>curso.id!==cursoId)
       carritoHTML();
        
    }
    
}

//  lee el contenido del HTML 
function leerDatosCurso(curso){
/* console.log(curso); */

// crear un objeto

const infoCurso={
    imagen: curso.querySelector('img').src,
    titulo:curso.querySelector('h4').textContent,
    precio:curso.querySelector('.precio span').textContent,
    id:curso.querySelector('a').getAttribute('data-id'),
    cantidad:1

}

 // revisa si un elemento ya
 if( articulosCarrito.some( curso => curso.id === infoCurso.id ) ) { 
    const cursos = articulosCarrito.map( curso => {
         if( curso.id === infoCurso.id ) {
              curso.cantidad++;
               return curso;
          } else {
               return curso;
       }
    })
    articulosCarrito = [...cursos];
}  else {
    articulosCarrito = [...articulosCarrito, infoCurso];
}

// agrega elementos al carrito

console.log(articulosCarrito);
carritoHTML();

}
    // muestra el carrito en el html
    function carritoHTML(){
        //limpiar el HTML
        limpiarHTML();

        articulosCarrito.forEach(curso=>{
            const{imagen, titulo, precio,cantidad, id}=curso;
            const row=document.createElement('tr');
            row.innerHTML=`
            <td>
            <img src="${imagen}" width="100">
            </td>
            <td> ${titulo}</td>
            <td> ${precio}</td>
            <td> ${cantidad}</td>
            <td>  
            <a href="#" class="borrar-curso" data-id=${curso.id}> X </a>
            </td>

            `;
            //agrega en HTML en t body
            contenedorCarrito.appendChild(row);

        })
    }

    function limpiarHTML(){
        /* contenedorCarrito.innerHTML=''; */

        while(contenedorCarrito.firstChild){
            contenedorCarrito.removeChild(contenedorCarrito.firstChild);
        }
    }