
export const crearTarea = async (tarea) => {

  try {
      const response = await fetch('http://localhost:4000/todos/post', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(tarea),  

          credentials: 'include'
      });

      if (!response.ok) {
          throw new Error('Error al crear la tarea');
      }

      const data = await response.json();
      console.log('Tarea creada:', data);
      const newTodo = data.todo;

      // Añadir la nueva tarea al DOM
      console.log(newTodo);

      return newTodo;
  } catch (error) {
      console.error('Error:', error);
      alert('Hubo un problema al crear la tarea');
  }
};