# 📦 CLI de Gestión de Usuarios (Node.js + MySQL)

## 📌 Descripción

Aplicación de línea de comandos (CLI) desarrollada en Node.js que permite gestionar usuarios mediante operaciones CRUD (crear, leer, actualizar y eliminar) utilizando una base de datos MySQL.

---

## ⚙️ Requisitos

* Node.js instalado
* MySQL instalado y en ejecución

---

## 🗄️ Base de datos

Crear la base de datos y la tabla:

```sql
CREATE DATABASE sebastian_winter_cli_trabajo_practico;

USE sebastian_winter_cli_trabajo_practico;

CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  username VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255)
);
```

---

## 📥 Instalación

1. Clonar el repositorio
2. Instalar dependencias:

```bash
npm install
```

3. Configurar la conexión en `config.js` si es necesario:

```js
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "sebastian_winter_cli_trabajo_practico"
});
```

---

## ▶️ Uso

Ejecutar los comandos con:

```bash
npm run dev <operacion> [parametros]
```

---

## 🧩 Comandos disponibles

### 🔹 Obtener todos los usuarios

```bash
npm run dev get
```

### 🔹 Obtener usuario por ID

```bash
npm run dev getById <id>
```

### 🔹 Crear usuario

```bash
npm run dev add <username> <email> <password>
```

📌 Reglas:

* Todos los campos son obligatorios
* El email debe terminar en `@gmail.com`

---

### 🔹 Actualizar usuario

```bash
npm run dev update <username> <email> <password> <id>
```

---

### 🔹 Eliminar usuario

```bash
npm run dev delete <id>
```

---

### 🔹 Eliminar todos los usuarios

```bash
npm run dev deleteAll
```

---

## ⚠️ Manejo de errores

* Validación de datos obligatorios
* Validación de email
* Mensajes claros si el usuario no existe
* Manejo de errores de base de datos

---

## 🚀 Estado del proyecto

✔ Funcional (CRUD completo)
✔ Modularizado
✔ Validaciones básicas implementadas

---
