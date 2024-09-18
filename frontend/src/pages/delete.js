export const deleteTodo = async (todoId) => {
    try {
      const response = await fetch(`http://localhost:4000/todos/delete/${todoId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
  
      if (!response.ok) {
        throw new Error('Error al borrar la tarea');
      }
  
      const todos = document.querySelectorAll("tr")
      todos.forEach(tr => {
        if (parseInt(tr.children[0].innerText)=== todoId){
            tr.remove()
        }
      })
      console.log('Tarea borrada:', todos);
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un problema al borrar la tarea');
    }
  };
  