import {todoForm} from './todoFormulario';
import { deleteTodo } from './delete.js';
export const todosPage = () => {
  const container = document.createElement("div");

  container.classList.add(
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "h-screen",
    "bg-gray-200"
  );

  const btnHome = document.createElement("button");

  btnHome.classList.add(
    "bg-blue-500",
    "text-white",
    "p-2",
    "rounded",
    "hover:bg-blue-600",
    "mb-4"
  );

  btnHome.textContent = "Home";

  btnHome.addEventListener("click", () => {
    window.location.pathname = "/home";
  });

  const title = document.createElement("h1");

  title.classList.add("text-3xl", "font-bold", "mb-4");
  title.textContent = "List of Todos";

  const table = document.createElement("table");

  table.classList.add(
    "w-1/2",
    "bg-white",
    "shadow-md",
    "h-[700px]",
    "overflow-y-scroll"
  );
  const btnCreate = document.createElement("button");

  btnCreate.classList.add(
    "bg-green-500",
    "text-white",
    "p-2",
    "rounded",
    "hover:bg-green-600",
    "mb-4"
  );

  btnCreate.textContent = "create todo";

  btnCreate.addEventListener("click", () => {
    const form = document.createElement('div');
    form.innerHTML = `
      <div id="container" class="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
        <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 class="text-2xl font-bold mb-4 text-center">Crear Nueva Tarea</h1>
          <form id="todoForm" class="space-y-4">
            <div>
              <label for="title" class="block text-gray-700">Título:</label>
              <input type="text" id="title" name="title" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            </div>
            <div>
              <label for="completed" class="block text-gray-700">Completado:</label>
              <input type="checkbox" id="completed" name="completed" class="mt-1">
            </div>
            <div class="flex justify-end space-x-4">
              <button id="crearTarea" type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Crear Tarea</button>
              <button id="cancelar" type="button" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    `;
    document.body.appendChild(form);
  
    // Agregar funcionalidad al botón de cancelar
    document.getElementById('cancelar').addEventListener('click', () => {
      form.remove();
    });
  });
  
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  const th1 = document.createElement("th");
  th1.classList.add("border", "px-4", "py-2");
  th1.textContent = "ID";

  const th2 = document.createElement("th");
  th2.classList.add("border", "px-4", "py-2");
  th2.textContent = "Title";

  const th3 = document.createElement("th");
  th3.classList.add("border", "px-4", "py-2");
  th3.textContent = "Completed";

  const th4 = document.createElement("th");
  th4.classList.add("border", "px-4", "py-2");
  th4.textContent = "Owner Id";

  const th5 = document.createElement("th");
  th5.textContent = "Actions";

  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);
  tr.appendChild(th4);
  tr.appendChild(th5);
  thead.appendChild(tr);

  const tbody = document.createElement("tbody");

  tbody.classList.add("text-center");
  table.appendChild(thead);
  table.appendChild(tbody);

  container.appendChild(btnHome);
fetch("http://localhost:4000/todos", {
  credentials: 'include'
})
  .then((response) => response.json())
  .then((data) => {
    data.todos.forEach((todo) => {
      if (todo.id > 10) return;

      const tr = document.createElement("tr");

      const td1 = document.createElement("td");
      td1.classList.add("border", "px-4", "py-2");
      td1.textContent = todo.id;

      const td2 = document.createElement("td");
      td2.classList.add("border", "px-4", "py-2");
      td2.textContent = todo.title;

      const td3 = document.createElement("td");
      td3.classList.add("border", "px-4", "py-2");
      td3.textContent = todo.completed ? "Sí" : "No";

      const td4 = document.createElement("td");
      td4.classList.add("border", "px-4", "py-2");
      td4.textContent = todo.owner;

      const td5 = document.createElement("td");
      td5.classList.add("border", "px-4", "py-2");

      const btnUpdate = document.createElement("button");
      btnUpdate.classList.add(
        "bg-white-500",
        "text-black",
        "p-2",
        "rounded",
        "hover:bg-blue-300",
        "mb-4"
      );
      btnUpdate.textContent = "Update";
      btnUpdate.addEventListener("click", todoForm); // Pasar referencia a la función

      const btnDelete = document.createElement("button");
      btnDelete.classList.add(
        "bg-red-500",
        "text-white",
        "p-1",
        "rounded",
        "hover:bg-red-100",
        "mb-2"
      );
      btnDelete.textContent = "Delete";
      btnDelete.addEventListener("click", () => deleteTodo(todo));

      td5.appendChild(btnUpdate);
      td5.appendChild(btnDelete);

      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);
      tbody.appendChild(tr);
    
    });
  })
  .catch((error) => {
    console.error('Error fetching todos:', error);
  });

  container.appendChild(title);
  container.appendChild(btnCreate);
  container.appendChild(table);

  return container;
};