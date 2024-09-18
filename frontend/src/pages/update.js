export const updateTodo = async (tarea) => {
    try {
      const response = await fetch(`http://localhost:4000/todos/${tarea.id}`, {
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
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un problema al modificar la tarea');
    }
  };
  