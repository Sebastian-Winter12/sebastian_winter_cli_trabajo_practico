import { getUsers, getUserById, createUsers, updateUser, deleteUser, deleteAllUsers } from "./controllers.js";

const argv = process.argv;
const params = argv.slice(2)
const operacion = params[0];
let resultado

const main = async () => {
switch(operacion) {
    case "get":
        resultado = await getUsers()
        break
    case "getById":
        resultado = await getUserById(params[1])
        break
    case "add":
        resultado = await createUsers(params[1], params[2], params[3])
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

      //Buscar manera de resolver esto sin usar mongoose ya que no se puede
    //   if (!mongoose.Types.ObjectId.isValid(id)) {
    //     resultado = "ID inválido";
    //     break;
    //   }

      // const error = validateUser(username, email, password);
      // if (error) {
      //   resultado = error;
      //   break;
      // }

      resultado = await updateUser(id, { username, email, password });

    //   if (!resultado) {
    //     resultado = "Usuario no encontrado";
    //   }

      break;
    }
    case "delete":
        resultado = await deleteUser(params[1])
        break
    case "deleteAll":
        resultado = await deleteAllUsers()
        break;
    default:
        resultado = ("Operación invalida");
  }
        console.log(resultado);
    setTimeout(() => {
        process.exit(1)
    }, 1000)
}

main();
