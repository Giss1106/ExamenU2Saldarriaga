# Examen U2 - Gissela Saldarriaga

## 👩‍💻 Autor

**Gissela Saldarriaga**  
[GitHub - Giss1106](https://github.com/Giss1106)

---

## 📄 Descripción del proyecto

Este proyecto fue desarrollado como parte del examen de la Unidad 
Se basa en el uso de **Web Components con LitElement**, implementando una interfaz que muestra tarjetas de carreras universitarias y detalles en un modal dinámico. El proyecto también incluye integración con APIs simuladas y manejo de eventos personalizados.

Incluye:
- Componente `career-card` para mostrar tarjetas con nombre, facultad e imagen.
- Componente `career-selector` para cargar y seleccionar carreras según un tema (internamente por ID).
- Modal para mostrar detalles completos de la carrera.
- Diseño moderno y responsivo con HTML/CSS.
- Tabla de usuarios que muestra imagen al pasar el mouse (en versiones ampliadas).
- Uso de `npm`, `webpack`, y `git`.

---

Props de configuración (career-card)
Propiedad	      Tipo	      Descripción
nombre	       String	   Nombre de la carrera
facultad	     String	   Facultad a la que pertenece
descripcion	   String	   Descripción corta de la carrera
imagen	       String	   URL de la imagen que se muestra en la tarjeta
tema	         Number	   ID del tema que activa la visualización del componente

Estas propiedades son recibidas desde el componente career-selector y se asignan dinámicamente.

Funcionalidad:Solicita Ingreso de cedula-1720868809
![Ingreso de cedula](./docs/image.png)
Toma el ultimo digito de la cedula ingresado y muestra el tema segun esta tabla:
![temas](./docs/image1.png)
Y segun el ultimo digito se mostrara los temas diferentes: 8-9 1720868809
![Funcion](./docs/image2.png)
![Tema 9](./docs/image3.png)
Temas 0-1
![0-1](./docs/image4.png)
![tema0-1](./docs/image5.png)
Temas 2-3
![2-3 ](./docs/image6.png)
![Tema2-3](./docs/image7.png)
Temas 4-5
![4-5](./docs/image8.png)
![alt text](./docs/image9.png)
Temas 6-7
![6-7](./docs/image10.png)
![alt text](./docs/image11.png)