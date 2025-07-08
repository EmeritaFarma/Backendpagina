# Instalación de Dependencias

Este documento explica cómo instalar y gestionar las dependencias de Node.js para este proyecto.

## Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 16.0 o superior)
- **npm** (incluido con Node.js) o **yarn** como gestor de paquetes alternativo

Puedes verificar las versiones instaladas ejecutando:

```bash
node --version
npm --version
```

## Instalación

### Instalación básica

Para instalar todas las dependencias del proyecto, ejecuta uno de los siguientes comandos en la raíz del proyecto:

```bash
# Con npm
npm install

```

## Archivo .env

Crea un archivo `.env` con las variables y sus valores en la raiz del proyecto:

```env
PORT=8000
DB_HOST=localhost
DB_PORT=port
DB_USER=db_user
DB_PASS=db_password
DB_NAME=db_name
JWT_SECRET=secret
```

## Corres la aplicacion

```bash
# Iniciar la aplicación en modo desarrollo
npm run dev
```





