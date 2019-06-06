# trackerP1
Unión del proyecto 1 y 4 para la materia de Tópicos especiales de Telematica de la Universidad EAFIT

## Definición del equipo

- Maria Camila Calle Agudelo - mcalle1@eafit.edu.co
- Diego Alejandro Cifuentes Garcia - dcifuen3@eafit.edu.co

## Asignación de roles

- Maria: Seguridad con vigilancia en las actividades realizadas en disponibilidad, proyecto original.
- Diego: Disponibilidad con vigilancia en las actividades realizadas en seguridad.

## Dir Github del proyecto

https://github.com/mcalle28/trackerP1

## Especificación de requisitos no funcionales

  Seguridad y Disponibilidad
  
## Rediseño de la aplicación

La aplicación fue mejorada en los requisitos que se definen en la sección de abajo, ayudando a su escalabilidad a futuro.

## Diseño para la escalabilidad

- Por la parte de **disponibilidad** se utilizó Kubernetes, creando varias replicas de la aplicación, si una se cae, las otras atienden el servicio, garantizando así la resilencia el servicio.

![kubernetes](https://upload.wikimedia.org/wikipedia/en/0/00/Kubernetes_%28container_engine%29.png)

- Además de eso se garantiza la **seguridad** en la base de datos, por parte de Amazon DocumentDB, quien permite solo la lectura y escritura por medio de distintos clusters, y solo a personal autorizado, el cual esta definido en la aplicación, esto tambien aporta a la **disponibilidad** de la misma.
![db](https://boylesoftware.com/blog/wp-content/uploads/2019/01/DocumentDB.jpg)

- Todos los servicios de la aplicación son **asincronicos** garantizando la utilización solo permitida de los mismos.
- El registro e ingreso a la aplicación se encriptan por medio de **passport**, garantizando la seguridad de la información de los usuarios.
![passport](https://cdn.glitch.com/project-avatar/0d184ee3-fd8d-4b94-acf4-b4e686e57375.png)

- Adicionando la aplicación en Kubernetes, se realizó un **balanceador de carga** por medio de nginx, que vigila y controla las cargas a la aplicación, moviendola a otra replica si es necesario cuando se encuentren muchos usuarios.
![nginx](https://www.sysadminsdecuba.com/wp-content/uploads/2018/11/Nginx-Logo-02.png)




