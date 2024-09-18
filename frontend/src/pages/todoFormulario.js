import { crearTarea } from "./crear.js";

export const todoForm = () => {
    document.addEventListener('DOMContentLoaded', () => {
      const form = document.getElementById('todoForm');
  
      form.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita el envío del formulario
  
        
        const title = document.getElementById('title').value;
        const completed = document.getElementById('completed').checked;
      
  
        const tarea = {
          id: id,
          title: title,
          completed: completed,
          owner: owner
        };
  
        if (id) {
          // Si hay un ID, modificar la tarea existente
          modificarTarea(tarea);
        } else {
          // Si no hay ID, crear una nueva tarea
          crearTarea(tarea);
        }
      });
    });
  };
  