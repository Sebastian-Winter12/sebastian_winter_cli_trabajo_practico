import { getUsers, getUserById, createUsers, updateUser, deleteUser, deleteAllUsers } from "./controllers.js";

const argv = process.argv;
const params = argv.slice(2)
const operacion = params[0];
let resultado

const main = async () => {
    try {
        switch(operacion) {
    case "get":
        resultado = await getUsers()
        // si el resultado es un array, se muestra en formato tabla, sino se muestra el string de error o mensaje correspondiente.
        if (Array.isArray(resultado)) {
            console.table(resultado)
        } else {
            // se agrega el console.log para mostrar el resultado que de directamente desde la funcion.
            console.log(resultado)
        }
        break
    case "getById":
        resultado = await getUserById(params[1])
        if (resultado && typeof resultado === "object") {
            console.table([resultado]) // console.table espera un array
        } else {
            // se agrega el console.log para mostrar el resultado que de directamente desde la funcion.
            console.log(resultado)
        }
        break
    case "add":
        resultado = await createUsers(params[1], params[2], params[3])
        // se agrega el console.log para mostrar el resultado que de directamente desde la funcion.
        console.log(resultado)
        break
    case "update": {
        const username = params[1];
        const email = params[2];
        const password = params[3];
        const id = params[4];

      if (!id) {
        resultado = "ID requerido";
        break;
      }
      resultado = await updateUser(id, { username, email, password });
      // se agrega el console.log para mostrar el resultado que de directamente desde la funcion.
      console.log(resultado);
      break;
    }
    case "delete":
        resultado = await deleteUser(params[1])
        // se agrega el console.log para mostrar el resultado que de directamente desde la funcion.
        console.log(resultado)
        break
    case "deleteAll":
        resultado = await deleteAllUsers()
        // se agrega el console.log para mostrar el resultado que de directamente desde la funcion.
        console.log(resultado)
        break;
    default:
        resultado = ("Operación invalida - utilizar get, getById, add, update, delete o deleteAll");
        // se agrega el console.log para mostrar el resultado que de directamente desde la funcion.
        console.log(resultado)
    }
    } catch (error) {
        console.log("Error de conexión a la base de datos:", error.message);
    }
    setTimeout(() => {
        process.exit(1)
    }, 1000)
}


main();
