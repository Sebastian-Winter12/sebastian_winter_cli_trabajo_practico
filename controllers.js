import { db } from "./config.js"
import crypto from "node:crypto";

// Funcion para traer a todos los usuarios registrados en la base de datos.
const getUsers = async () => {
    const q = `SELECT * FROM users`
    const [response] = await db.query(q)
    
    if (response.length === 0) {
        return "No hay usuarios registrados";
    }

    return response;
}

// Funcion extra para traer a un usuario especifico a partir de su ID
const getUserById = async (id) => {
    if (!id) {
        return "Por favor ingrese un ID válido"
    }

    const q = `SELECT * FROM users WHERE id = ?`
    const [response] = await db.query(q, [id])
    
    if (response.length === 0) {
        return "Usuario no encontrado";
    }

    return response[0];
}

// Funcion pra crear un nuevo usuario
const createUsers = async (username, email, password) => {
    // Validamos que se envien los datos necesarios, con el formato y longitud correspondiente.
    if (username === undefined || email === undefined || password === undefined) {
        return "Data invalida, necesitas enviar username, email y password para resistrar un usuario"
    }

    if (!email.endsWith("@gmail.com") || email.indexOf("@") === 0) {
        return "Por favor ingrese un correo electronico válido (MiNombre@gmail.com)"
    }

    if (password.length < 5) {
        return "La contraseña debe contener como mínimo 5 caracteres"
    }

    if (username.length < 3) {
        return "El username debe tener al menos 3 caracteres"
    }

    const q = `INSERT INTO users (id, username, email, password) VALUES (?,?,?,?)`

    const [response] = await db.query(q, [crypto.randomUUID(), username, email, password])

        return "Usuario creado exitosamente";
}

// Funcion para actualizar un usuario existente.
const updateUser = async (id, updates) => {
    // Se pide el username, email, password y ID en ese orden, sino no funciona
    const q = `UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?`
    
    // Validaciones para el usuario, se pide un ID y se valida que exista, y para que el emial sea válido.
    if (!id) {
        return "ID requerido"
    }

    const { username, email, password } = updates;

    if (username.length < 3) {
        return "El username debe tener al menos 3 caracteres"
    }

    if (!email.endsWith("@gmail.com") || email.indexOf("@") === 0) {
        return "Por favor ingrese un correo electronico válido (MiNombre@gmail.com)"
    }

    if (password.length < 5) {
        return "La contraseña debe contener como mínimo 5 caracteres"
    }

    const [response] = await db.query(q, [username, email, password, id])

    if (response.affectedRows === 0) {
        return "Usuario no encontrado";
    }

    return "Usuario actualizado exitosamente";

}

// Funcion para eliminar un usuario existente a partir de su ID
const deleteUser = async (id) => {
    const q = ` DELETE from users WHERE id = ?;`
    
    // Validaciones para pedir una ID en caso de no enviarla, asegurarse de que haya un usuario con esa id, y y funciono dar el aviso.
    if (!id) {
        return "ID requerido"
    }

    const [response] = await db.query(q, [id]);

    if (response.affectedRows === 0) {
        return "Usuario no encontrado";
    }
    
    return "Usuario eliminado exitosamente";
}

// Funcion extra para eliminar todos los usuarios juntos
const deleteAllUsers = async () => {
    const q = `DELETE FROM users`
    const [response] = await db.query(q)

    // Validaciones para asegurarse de que haya usuarios para eliminar, y dar el aviso de que se eliminaron exitosamente.
    if (response.affectedRows === 0) {
        return "No hay usuarios para eliminar";
    }

    return "Usuarios eliminados exitosamente";
}

export { getUsers, getUserById, createUsers, updateUser, deleteUser, deleteAllUsers };