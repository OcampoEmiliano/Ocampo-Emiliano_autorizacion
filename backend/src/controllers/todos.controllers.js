import { database } from "../db/database.js";

export const getAllTodosCtrl = (req, res) => {
  const todos = database.todos.filter(todo => todo.owner === req.user.id);
  res.json({ todos });
}

export const createTodoCtrl = async (req, res) => {
  try {
    database.todos.filter(todo => todo.owner === req.user.id);
    // Verificar si el usuario está autenticado
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    const { title, completed } = req.body;

    // Validar que el título no esté vacío
    if (!title) {
      return res.status(400).json({ message: 'El título es obligatorio' });
    }

    const newTodo = {
      id: database.todos.length + 1,
      title: title,
      completed: completed !== undefined ? completed : false,
      owner: req.user.id
    };

    // Agregar el nuevo "todo" a la base de datos
    database.todos.push(newTodo);

    return res.status(201).json({ message: "tarea creada",newTodo});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al crear el todo' });
  }
};

export const uptateTodoCtrl =(req, res) => {
  const todoId = +req.params.id;
  const { title, completed } = req.body;
  database.todos.splice(todoId,1);

  const todo = { id : req.params.id,
      title: title,
      completed: completed !== undefined ? completed : false,
      owner: req.user.id
  }
  database.todos.push(todo)
  return res.json({ message:"todo modificado",todo })
};

// Controlador para manejar la solicitud de eliminación
export const deleteTodoCtrl = async (req, res) => {
  const todoId = req.params.id; // Suponiendo que el ID del todo se pasa como parámetro en la URL
  const updatedTodos = database.todos.splice(todoId,1);
  return res.json({ todos: updatedTodos });
};
