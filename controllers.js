import { db } from "./config.js"
import crypto from "node:crypto";

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

const createUsers = async (username, email, password) => {
    // VALIDAR
    // tambien se puede escribir directamente !username || !email || !password
    if (username === undefined || email === undefined || password === undefined) {
        return "Data invalida, necesitas enviar username, email y password para resistrar un usuario"
    }

    if (!email.endsWith("@gmail.com")) {
        return "Por favor ingrese un correo electronico válido (@gmail.com)"
    }

    if (password.length < 5) {
        return "La contraseña debe contener como mínimo 5 caracteres"
    }
    // const newUser = {
    //     id: crypto.randomUUID(),
    //     username: username,
    //     email: email,
    //     password: password
    // }

    const q = `INSERT INTO users (id, username, email, password) VALUES (?,?,?,?)`

    const [response] = await db.query(q, [crypto.randomUUID(), username, email, password])

        return "Usuario creado exitosamente";
}

const updateUser = async (id, updates) => {
    // Se pide el username, email, password y ID en ese orden, sino no funciona
    const q = `UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?`
    
    if (!id) {
        return "ID requerido"
    }

    const { username, email, password } = updates;
    const [response] = await db.query(q, [username, email, password, id])

    // Validaciones para el usuario, se pide un ID y se valida que exista.
    

    if (response.affectedRows === 0) {
        return "Usuario no encontrado";
    }

    return "Usuario actualizado exitosamente";

}

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