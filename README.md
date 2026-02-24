# Challenge Frontend Mindata

Aplicación web desarrollada en Angular como parte del challenge frontend para Mindata.

## Requisitos Previos

Para ejecutar este proyecto, se necesita tener instalado:

*   **Docker**: Para construir y ejecutar el contenedor de la aplicación.
*   **Node.js** (v20+): Solo si se desea ejecutar el proyecto localmente sin Docker.

## Ejecución con Docker

Seguir estos pasos para levantar la aplicación utilizando Docker:

1.  **Construir la imagen:**

    Abrir una terminal en la raíz del proyecto y ejecutar:

    ```bash
    docker build -t angular-hero-app .
    ```

2.  **Correr el contenedor:**

    Una vez construida la imagen, iniciar el contenedor mapeando el puerto 80 del contenedor al puerto 8080 de tu máquina:

    ```bash
    docker run -d -p 8080:80 --name mi-app-heroes angular-hero-app
    ```

3.  **Acceder a la aplicación:**

    Abrir el browser y acceder a [http://localhost:8080](http://localhost:8080).

## Comandos Útiles

*   **Detener el contenedor:** `docker stop mi-app-heroes`
*   **Eliminar el contenedor:** `docker rm mi-app-heroes`
