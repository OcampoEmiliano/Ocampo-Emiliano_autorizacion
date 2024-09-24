export const updateTodo = async (tarea) => {
    try {
    // Verificar el valor de todoId
    console.log('todoId:', tarea.id);

    // Asegurarse de que todoId sea un número o una cadena
    if (typeof tarea.id !== 'number' && typeof tarea.id !== 'string') {
      throw new Error('todoId debe ser un número o una cadena');
    }

      const response = await fetch(`http://localhost:4000/todos/put/${tarea.id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(tarea),
          credentials: 'include'
      });

      if (!response.ok) {
          throw new Error('Error al modificar la tarea');
      }

      const data = await response.json();
      console.log('Tarea modificada:', data);
      const newTodo = data.todo;
      return newTodo;
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un problema al modificar la tarea');
  };
}