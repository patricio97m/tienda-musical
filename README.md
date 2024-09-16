# Proyecto final taller web II UNLAM 

## Para ejecutar Angular
> Primero abrir la terminal en la carpeta "front"
- Si es la primera vez que se corre la aplicación, ejecutar ` npm install ` 
- Si ya se tienen todas las dependencias instaladas, ejecutar ` npm run start ` 
- La aplicación por defecto se ejecuta en ` http://localhost:4200/ `


## Para ejecutar Node en el backend
> Primero abrir la terminal en la carpeta "back"
 - Para poder ejecutar el programa, abrir Mysql en el puerto **3306**.
    Y para correr el programa usar ` npm run dev ` 
    
- Para correrlo por primera vez, se debe crear la base de datos con la siguiente query 
```sql
CREATE DATABASE IF NOT EXISTS `tiendainstrumentos` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `tiendainstrumentos`;
```

- La aplicación por defecto se ejecuta en ` http://localhost:3000/`

### Rutas establecidas en la API y como usarlas 

#### Productos
- Obtiene todos los productos 
```javascript
GET http://localhost:3000/api/producto/ 
 ```
 
 - Obtiene un producto según su ID
 ```javascript
GET http://localhost:3000/api/producto/:id
 ```

  - Obtiene una cantidad específica de productos
 ```javascript
GET http://localhost:3000/api/producto/cantidad/:cantidad
 ```
 - Busca productos por su nombre
 ```javascript
GET http://localhost:3000/api/producto?nombre='nombreDelProducto' 
 ```

  - Busca productos por su categoría
 ```javascript
GET http://localhost:3000/api/producto?categoria='categoríaDelProducto' 
 ```
 > NOTA: Las categorías definidas por ahora son: **Cuerdas** - **Teclados** - **Percusión** - **Vientos** - **Micrófonos y Audio** - **Amplificadores** - **Efectos y Accesorios**
 ------------------------------
 #### Compra
 > Si se quieren enviar los productos del carrito al backend, se debería realizar la siguiente solicitud 

 - Publicar orden de compra
 ```javascript
POST http://localhost:3000/api/compra
{
    "usuario": "nombreDeusuario",
    "precioTotal": "9999",
    "productos": [  
    {
      //Producto
    },
    {
      //Producto
    },
    ]
}

 ```

  - Buscar compras de un usuario
 ```javascript
GET http://localhost:3000/api/compra/:usuario
 ```

 ------------------------------
 #### Usuarios
- Registra un usuario
```javascript
POST http://localhost:3000/api/usuario/signup
{
    "username": "usuario",
    "password": "contraseña",
    "email": "email",
    "name": "nombre", //opcional
    "family_name": "apellido", //opcional
    "address": "dirección" //opcional
}
```

- Confirmar el email de una cuenta
```javascript
POST http://localhost:3000/api/usuario/confirmAccount/
{
    "username": "usuario",
    "confirmationCode": "codigoDeConfirmación"
}
```

- Reenviar el código al email
```javascript
POST http://localhost:3000/api/usuario/resendCodeConfirmation/
{
    "username": "usuario",
}
```

- Ingresar a la cuenta
```javascript
POST http://localhost:3000/api/usuario/login/
{
    "username": "usuario",
    "password": "contraseña"
}
```

- Desloguear a la cuenta
```javascript
POST http://localhost:3000/api/usuario/logout/
{
    "username": "usuario",
}
```

- Obtener información del usuario (con el usuario logueado)
```javascript
GET http://localhost:3000/api/usuario/userInfo/
```


## Recomendaciones

- Realizar los siguientes inserts para testear las funcionalidades
```sql
INSERT INTO productos (nombre, descripcion, precio, imagen, categoria) VALUES
('GUITARRA ACÚSTICA', 'GUITARRA ACÚSTICA FENDER FA-125. Guitarra acústica ideal para principiantes y profesionales por igual. Cuenta con un cuerpo robusto de madera de alta calidad y un sonido claro y resonante. Perfecta para cualquier estilo musical.', 199.99, 'guitarra_acustica.jpg', 'Cuerdas'),
('BAJO ELÉCTRICO', 'BAJO ELÉCTRICO YAMAHA TRBX304. Bajo eléctrico versátil y potente diseñado para músicos que buscan un sonido profundo y definido. Equipado con pastillas de alta fidelidad y un mástil cómodo para un rendimiento excepcional.', 299.99, 'bajo_electrico.jpg', 'Cuerdas'),
('BATERÍA COMPLETA', 'BATERÍA COMPLETA PEARL EXPORT EXX725S. Kit completo de batería con un diseño elegante y robusto. Incluye platillos de alta calidad y herrajes resistentes para una experiencia de baterista profesional.', 499.99, 'bateria_completa.jpg', 'Percusión'),
('TECLADO ELECTRÓNICO', 'TECLADO ELECTRÓNICO CASIO CT-S300. Teclado portátil con funciones avanzadas para músicos de todos los niveles. Ofrece una amplia variedad de tonos y ritmos, junto con lecciones integradas para aprender de manera efectiva.', 159.99, 'teclado_electronico.jpg', 'Teclados'),
('VIOLÍN CLÁSICO', 'VIOLÍN CLÁSICO CECILIO CVN-300. Violín hecho a mano con maderas selectas para un tono cálido y expresivo. Ideal para estudiantes y músicos avanzados que valoran la calidad y la artesanía.', 129.99, 'violin_clasico.jpg', 'Cuerdas'),
('MICRÓFONO CONDENSADOR', 'MICRÓFONO CONDENSADOR AUDIO-TECHNICA AT2020. Micrófono de estudio versátil y de alta sensibilidad para grabaciones precisas y profesionales. Ideal para voces e instrumentos acústicos.', 89.99, 'microfono_condensador.jpg', 'Micrófonos y Audio'),
('AMPLIFICADOR DE GUITARRA', 'AMPLIFICADOR DE GUITARRA MARSHALL MG50FX. Amplificador potente con tonos clásicos de Marshall y efectos digitales avanzados. Perfecto para guitarristas que buscan versatilidad y calidad de sonido.', 249.99, 'amplificador_guitarra.jpg', 'Amplificadores'),
('PIANO DIGITAL', 'PIANO DIGITAL YAMAHA P-45. Piano digital compacto con teclado sensible a la velocidad y sonido de piano auténtico. Diseñado para músicos en desarrollo y profesionales que buscan una experiencia de piano realista.', 599.99, 'piano_digital.jpg', 'Teclados'),
('SAXOFÓN ALTO', 'SAXOFÓN ALTO YAMAHA YAS-280. Saxofón alto de alto rendimiento con un tono rico y equilibrado. Diseñado con ergonomía mejorada y respuesta rápida para músicos de todos los niveles.', 349.99, 'saxofon_alto.jpg', 'Vientos'),
('TROMPETA PROFESIONAL', 'TROMPETA PROFESIONAL BACH TR300H2. Trompeta de latón dorado con válvulas precisas y un diseño clásico. Ideal para músicos exigentes que buscan calidad de sonido y durabilidad.', 199.99, 'trompeta_profesional.jpg', 'Vientos'),
('FLAUTA TRAVERSA', 'FLAUTA TRAVERSA YAMAHA YFL-222. Flauta traversa plateada con un tono brillante y cálido. Perfecta para estudiantes y músicos avanzados que valoran la precisión y la respuesta.', 99.99, 'flauta_traversa.jpg', 'Vientos'),
('GUITARRA ELÉCTRICA', 'GUITARRA ELÉCTRICA GIBSON LES PAUL. Icono de la guitarra eléctrica con un cuerpo sólido y pastillas potentes. Ofrece un tono rico y versátil, ideal para rock, blues y más.', 299.99, 'guitarra_electrica.jpg', 'Cuerdas'),
('VIOLONCHELO', 'VIOLONCHELO STENTOR STUDENT II. Violonchelo de tamaño completo con un tono profundo y resonante. Ideal para estudiantes y músicos que buscan un instrumento de calidad a un precio accesible.', 399.99, 'violonchelo.jpg', 'Cuerdas'),
('CASCOS DE BATERÍA', 'CASCOS DE BATERÍA ROLAND TD-1K. Cascos electrónicos compactos con pads sensibles y sonidos realistas. Perfectos para practicar en casa o en el estudio sin molestar.', 149.99, 'cascos_bateria.png', 'Percusión'),
('CLARINETE', 'CLARINETE BUFFET CRAMPON B12. Clarinete de resina con un tono suave y equilibrado. Recomendado para estudiantes y músicos que buscan un instrumento fiable y fácil de tocar.', 129.99, 'clarinete.jpg', 'Vientos'),
('UKELELE SOPRANO', 'UKELELE SOPRANO KALA KA-15S. Ukelele soprano con un sonido brillante y alegre. Perfecto para principiantes y músicos que buscan un instrumento portátil y divertido.', 59.99, 'ukelele_soprano.jpg', 'Cuerdas'),
('ARMÓNICA', 'ARMÓNICA HOHNER SPECIAL 20. Armónica diatónica con lengüetas de latón para un tono claro y resonante. Ideal para blues, rock y música folk.', 29.99, 'armonica.jpg', 'Efectos y Accesorios'),
('CAJA DE RITMOS', 'CAJA DE RITMOS AKAI PROFESSIONAL MPC ONE. Caja de ritmos avanzada con secuenciador integrado y funciones de producción musical. Perfecta para crear beats y grooves en cualquier género.', 199.99, 'caja_ritmos.jpg', 'Percusión'),
('PEDAL DE EFECTOS', 'PEDAL DE EFECTOS BOSS DS-1. Pedal de distorsión clásico con un sonido potente y definido. Ideal para guitarristas que buscan agregar texturas y colores a su tono.', 79.99, 'pedal_efectos.jpg', 'Efectos y Accesorios'),
('METRÓNOMO DIGITAL', 'METRÓNOMO DIGITAL KORG MA-2. Metrónomo digital compacto con funciones avanzadas y una interfaz fácil de usar. Perfecto para practicar con precisión y mejorar el sentido del ritmo.', 19.99, 'metronomo_digital.jpg', 'Efectos y Accesorios');
```


