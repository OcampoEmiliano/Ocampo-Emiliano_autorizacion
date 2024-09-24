export const deleteTodo = async (todo) => {
  try {
    // Verificar el valor de todoId
    console.log('todoId:', todo.id);

    // Asegurarse de que todoId sea un número o una cadena
    if (typeof todo.id !== 'number' && typeof todo.id !== 'string') {
      throw new Error('todoId debe ser un número o una cadena');
    }

    const response = await fetch(`http://localhost:4000/todos/delete/${todo.id}`, {
      method: 'DELETE',
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Error al borrar la tarea');
    }

    const todos = document.querySelectorAll("tr");
    todos.forEach(tr => {
      if (parseInt(tr.children[0].innerText) === todo.id) {
        tr.remove();
      }
    });

    console.log('Tarea borrada:', todo.id);
  } catch (error) {
    console.error('Error al borrar la tarea:', error);
    alert('Hubo un problema al borrar la tarea');
  }
};
