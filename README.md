# agenciaviajes

## Funcionalidad de Editar Viajes

La funcionalidad de editar viajes permite a los usuarios modificar la información de los viajes existentes en la aplicación. Esta funcionalidad está implementada en el archivo [routers/index.js](routers/index.js) y utiliza varios controladores definidos en [controllers/paginaController.js](controllers/paginaController.js).

### Rutas

- `GET /editar/:slug`: Esta ruta permite al botón editar viaje en la vista de un viaje específico. El `slug` es un identificador único del viaje.
- `GET /viajes/editar/:slug`: Esta ruta permite al botón editar viaje en la vista del listado general.
- `POST /viajes/editar/:slug`: Esta ruta se utiliza para guardar los cambios realizados en un viaje.

### Controladores

Los controladores relacionados con la funcionalidad de editar viajes están definidos en [controllers/paginaController.js](controllers/paginaController.js):

- `editarViajes`: Controlador que maneja la lógica para obtener la página de edición de un viaje y manda los valores almacenados a cada uno de los formularios, de este modo podremos editar solo uno de los formularios sin tener que rellenar el resto.
- `guardarEditarViajes`: Controlador que maneja la lógica para guardar los cambios realizados en un viaje.

### Vistas

Las vistas relacionadas con la funcionalidad de editar viajes están definidas en la carpeta [views](views):

- `views/editar_viajes.pug`: Vista utilizada para el formulario de edición del viaje seleccionado.
- `views/viaje.pug`: Vista donde se implementa el botón de editar en un viaje específico.
- `views/layaout_viajes.pug`: Vista donde se implementa el botón de editar en el listado de viajes general.

### Ejemplo de Uso

1. El usuario navega a la ruta `GET /editar/:slug` o `GET /viajes/editar/:slug` para obtener la página de edición de un viaje.
2. El usuario realiza los cambios necesarios en el formulario de edición.
3. El usuario envía el formulario, lo que envía una solicitud `POST` a la ruta `POST /viajes/editar/:slug`.
4. El controlador `guardarEditarViajes` procesa la solicitud y guarda los cambios en la base de datos.

Con esta funcionalidad, los usuarios pueden mantener actualizada la información de los viajes de manera sencilla y eficiente.