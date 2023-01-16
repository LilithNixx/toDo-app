const formulario = document.querySelector('#formulario');
const pintarToDo = document.querySelector('#pintarToDo');
const templateToDo = document.querySelector('#templateToDo').content;
const alert = document.querySelector('.alert-danger');

//dentro irán objetos {nombre: "todo 1", id: 4242341}
//se pone let para poder sobreescribirlo
let todos = [];

alert.style.visibility = 'hidden';

formulario.addEventListener('submit', e => {
    e.preventDefault();
    
    alert.style.visibility = 'hidden';

    //con FormData capturamos a través del name todos los imputs de un formulario
    const data = new FormData(formulario);
    //creamos un array de constantes con los elementos de data
    const [todo] = [...data.values()];

    //validación: trim limpia los caracteres en blanco
    if(!todo.trim()){
        alert.style.visibility = 'visible';
        return;
    }

    agregarToDo(todo);
    pintarTodos();
});

const agregarToDo = todo => {
    const objetoToDo = {
        nombre: todo,
        id: `${Date.now()}` //creamos id provisorio
    }

    todos.push(objetoToDo);
}

const pintarTodos = () => {
    //guardar template en el fragment en forma de un clon
    
    //guardar en localStorage
    localStorage.setItem('todos', JSON.stringify(todos));

    pintarToDo.textContent = "";

    const fragment = document.createDocumentFragment();

    todos.forEach(item => {
        const clone = templateToDo.cloneNode(true);
        
        clone.querySelector('.lead').textContent = item.nombre;

        //crear el atributo data-id
        clone.querySelector('.btn').dataset.id = item.id;

        fragment.appendChild(clone);
    })

    pintarToDo.appendChild(fragment);
};

//delegación de evento para seleccionar los botones borrar
document.addEventListener('click', (e) => {
    if(e.target.matches('.btn-danger')){
        todos = todos.filter(item => item.id !== e.target.dataset.id);
        pintarTodos();
    }
});

//Se activa cuando carga el DOM
document.addEventListener('DOMContentLoaded', () => {
    //leer lo que viene del localStorage
    
    if(localStorage.getItem('todos')){
        todos = JSON.parse(localStorage.getItem('todos'));
        pintarTodos();
    }
});