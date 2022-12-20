# CODIGOS de ESTADO HTTP
## Códigos de estado 100
Un código de estado de nivel 100 te dice que la solicitud que has hecho al servidor sigue en curso por alguna razón. Esto no es necesariamente un problema, es sólo información extra para que sepas lo que está pasando.

100: «Continuar». Esto significa que el servidor en cuestión ha recibido las cabeceras de solicitud de tu navegador, y ahora está listo para que el cuerpo de la solicitud sea enviado también. Esto hace que el proceso de solicitud sea más eficiente ya que evita que el navegador envíe una solicitud de cuerpo aunque los encabezados hayan sido rechazados.
101: «Cambiando protocolos». Tu navegador ha pedido al servidor que cambie los protocolos, y el servidor ha cumplido.
103: «Primeros avisos». Esto devuelve algunos encabezados de respuesta antes de que el resto de la respuesta del servidor esté lista.

## Códigos de estado 200
Este es el mejor tipo de código de estado HTTP que se puede recibir. Una respuesta de nivel 200 significa que todo funciona exactamente como debería.

200: «Todo está bien». Este es el código que se entrega cuando una página web o recurso actúa exactamente como se espera.
201: «Creado». El servidor ha cumplido con la petición del navegador y, como resultado, ha creado un nuevo recurso.
202: «Aceptado». El servidor ha aceptado la solicitud de tu navegador pero aún la está procesando. La solicitud puede, en última instancia, dar lugar o no a una respuesta completa.
203: «Información no autorizada». Este código de estado puede aparecer cuando se utiliza un apoderado. Significa que el servidor proxy recibió un código de estado de 200 «Todo está bien» del servidor de origen, pero ha modificado la respuesta antes de pasarla a su navegador.
204: «Sin contenido». Este código significa que el servidor ha procesado con éxito la solicitud, pero no va a devolver ningún contenido.
205: «Restablecer el contenido». Como un código 204, esto significa que el servidor ha procesado la solicitud pero no va a devolver ningún contenido. Sin embargo, también requiere que tu navegador restablezca la vista del documento.
206: «Contenido parcial». Puedes ver este código de estado si tu cliente HTTP (también conocido como tu navegador) usa «cabeceras de rango». Esto permite a tu navegador reanudar las descargas en pausa, así como dividir una descarga en múltiples flujos. Se envía un código 206 cuando un encabezado de rango hace que el servidor envíe sólo una parte del recurso solicitado.

## Códigos de estado 300
La redirección es el proceso utilizado para comunicar que un recurso ha sido trasladado a una nueva ubicación. Hay varios códigos de estado HTTP que acompañan a las redirecciones, con el fin de proporcionar a los visitantes información sobre dónde encontrar el contenido que están buscando.

¿Estás desconcertado por un código de estado HTTP? Nuestros expertos en WordPress están a la espera. Prueba Kinsta gratis.

300: «Opciones Múltiples». A veces, puede haber múltiples recursos posibles con los que el servidor puede responder para cumplir con la solicitud de su navegador. Un código de estado 300 significa que tu navegador ahora tiene que elegir entre ellos. Esto puede ocurrir cuando hay múltiples extensiones de tipo de archivo disponibles, o si el servidor está experimentando desambiguación del sentido de las palabras.
301: «El recurso solicitado ha sido trasladado permanentemente». Este código se entrega cuando una página web o un recurso ha sido reemplazado permanentemente por un recurso diferente. Se utiliza para la redirección permanente del URL.
302: «El recurso solicitado se ha movido, pero fue encontrado«. Este código se utiliza para indicar que el recurso solicitado se encontró, pero no en el lugar donde se esperaba. Se utiliza para la redirección temporal de la URL.
303: «Ver otros». Para entender un código de estado 303 es necesario conocer la diferencia entre los cuatro métodos de solicitud HTTP principales. Esencialmente, un código 303 le dice a tu navegador que encontró el recurso que el navegador solicitó vía POST, PUT o DELETE. Sin embargo, para recuperarlo usando GET, necesita hacer la solicitud apropiada a un URL diferente al que usó anteriormente.
304: «El recurso solicitado no ha sido modificado desde la última vez que accedió a él«. Este código le dice al navegador que los recursos almacenados en la caché del navegador no han cambiado. Se usa para acelerar la entrega de páginas web reutilizando los recursos descargados previamente.
307: «Redireccionamiento temporal«. Este código de estado ha reemplazado a 302 «Encontrado» como la acción apropiada cuando un recurso ha sido movido temporalmente a una URL diferente. A diferencia del código de estado 302, no permite que el método HTTP cambie.
308: «Redireccionamiento permanente». El código de estado 308 es el sucesor del código 301 «Movido permanentemente». No permite que el método HTTP cambie e indica que el recurso solicitado está ahora localizado permanentemente en una nueva URL.


## Códigos de estado 400
En el nivel 400, los códigos de estado HTTP comienzan a ser problemáticos. Estos son códigos de error que especifican que hay un fallo en su navegador y/o en la solicitud.

400: «Mala petición». El servidor no puede devolver una respuesta debido a un error del cliente. Vea nuestra guía para resolver este error.
401: «No autorizado» o «Se requiere autorización». Esto es devuelto por el servidor cuando el recurso de destino carece de credenciales de autenticación válidas. Podrías ver esto si has configurado la autenticación básica de HTTP usando htpasswd.
402: «Pago requerido». Originalmente, este código fue creado para ser usado como parte de un sistema de dinero digital. Sin embargo, ese plan nunca se llevó a cabo. En cambio, es utilizado por diversas plataformas para indicar que una solicitud no se puede cumplir, por lo general debido a la falta de los fondos necesarios. Los casos más comunes incluyen:
Has alcanzado el límite de solicitudes diarias al API de los desarrolladores de Google.
No ha pagado tus honorarios de Shopify y su tienda ha sido desactivada temporalmente.
Tu pago a través de Stripe ha fallado, o Stripe está tratando de evitar un pago fraudulento.
403: «El acceso a ese recurso está prohibido». Este código se devuelve cuando un usuario intenta acceder a algo a que no tiene permiso para ver. Por ejemplo, intentar acceder a un contenido protegido por contraseña sin registrarse podría producir un error 403.
404: «No se encontró el recurso solicitado». Este es el mensaje de error más común de todos ellos. Este código significa que el recurso solicitado no existe, y el servidor no sabe si alguna vez existió.
405: «Método no permitido«. Esto se genera cuando el servidor de alojamiento (servidor de origen) soporta el método recibido, pero el recurso de destino no lo hace.
406: «Respuesta no aceptable«. El recurso solicitado es capaz de generar sólo contenido que no es aceptable según los encabezamientos de aceptación enviados en la solicitud.
407: «Se requiere autenticación de proxy». Se está utilizando un servidor proxy que requiere que el navegador se autentifique antes de continuar.
408: «El servidor se agotó esperando el resto de la petición del navegador». Este código se genera cuando un servidor se apaga mientras espera la solicitud completa del navegador. En otras palabras, el servidor no recibió la solicitud completa que fue enviada por el navegador. Una posible causa podría ser la saturación de la red, lo que provoca la pérdida de paquetes de datos entre el navegador y el servidor.
409: «Conflicto». Un código de estado 409 significa que el servidor no pudo procesar la solicitud de su navegador porque hay un conflicto con el recurso correspondiente. Esto ocurre a veces debido a múltiples ediciones simultáneas.
410: «El recurso solicitado se ha ido y no volverá». Esto es similar a un código 404 «No encontrado», excepto que un 410 indica que la condición es esperada y permanente.
411: «Longitud requerida». Esto significa que el recurso solicitado requiere que el cliente especifique una cierta longitud y que no lo hizo.
412: «La condición previa falló». Tu navegador incluyó ciertas condiciones en sus encabezados de solicitud, y el servidor no cumplió con esas especificaciones.
413: «Carga útil demasiado grande» o «Entidad solicitante demasiado grande». Su solicitud es más grande de lo que el servidor está dispuesto o es capaz de procesar.
414: «URI demasiado largo«. Esto suele ser el resultado de una solicitud GET que ha sido codificada como una cadena de consulta demasiado grande para que el servidor la procese.
415: «Tipo de medios de comunicación sin apoyo«. La solicitud incluye un tipo de medio que el servidor o recurso no soporta.
416: «Rango no satisfactorio». Su solicitud fue por una porción de un recurso que el servidor no puede devolver.
417: «La expectativa fracasó». El servidor no puede cumplir los requisitos especificados en el campo de cabecera de la solicitud.
418: «Soy una tetera». Este código es devuelto por las teteras que reciben solicitudes para preparar café. También es un chiste del «día de las bromas de abril» de 1998.
422: «Entidad no procesable«. La solicitud del cliente contiene errores semánticos, y el servidor no puede procesarla.
425: «Demasiado pronto». Este código se envía cuando el servidor no está dispuesto a procesar una solicitud porque puede ser reproducida.
426: «Se requiere actualización». Debido al contenido del campo de cabecera de la solicitud, el cliente debería cambiar a un protocolo diferente.
428: «Se requiere condición previa». El servidor requiere que se especifiquen las condiciones antes de procesar la solicitud.
429: «Demasiadas peticiones». Esto es generado por el servidor cuando el usuario ha enviado demasiadas solicitudes en un determinado período de tiempo (con límite de velocidad). Esto puede ocurrir a veces debido a los bots o scripts que intentan acceder a tu sitio. En este caso, tal vez quieras intentar cambiar tu URL de acceso a WordPress. También puedes revisar nuestra guía para arreglar el error 429 «Demasiadas peticiones».
429 demasiadas solicitudes
429 demasiadas solicitudes
431: «Campos de la Cabecera de la Solicitud Demasiado Grandes«. El servidor no puede procesar la solicitud porque los campos de cabecera son demasiado grandes. Esto puede indicar un problema con un solo campo de cabecera, o con todos en general.
451: «No disponible por razones legales«. El operador del servidor ha recibido una demanda para prohibir el acceso al recurso que has solicitado (o a un conjunto de recursos, incluido el que has solicitado). Dato curioso: Este código es una referencia a la novela Fahrenheit 451 de Ray Bradbury.
499: «Solicitud de cliente cerrada». Esto es devuelto por NGINX cuando el cliente cierra la solicitud mientras Nginx aún la está procesando.


## Códigos de estado 500
Los códigos de estado de nivel  500 también se consideran errores. Sin embargo, denotan que el problema está en el extremo del servidor. Esto puede hacer que sean más difíciles de resolver.

500: «Hubo un error en el servidor y la solicitud no pudo ser completada». Este es un código genérico que simplemente significa «error interno del servidor». Algo salió mal en el servidor y el recurso solicitado no fue entregado. Este código es típicamente generado por plugins de terceros, PHP defectuoso, o incluso la ruptura de la conexión a la base de datos. Revisa nuestros tutoriales sobre cómo corregir el error al establecer una conexión de base de datos y otras formas de resolver un error de 500 servidores internos.
501: «No implementado». Este error indica que el servidor no es compatible con la funcionalidad necesaria para cumplir con la solicitud. Esto es casi siempre un problema en el propio servidor web, y por lo general debe ser resuelto por el host. Revisa nuestras recomendaciones sobre cómo resolver un error 501 no implementado.
502: «Mala entrada». Este código de error significa típicamente que un servidor ha recibido una respuesta inválida de otro, como cuando se utiliza un servidor proxy. Otras veces una consulta o petición tardará demasiado, y así es cancelada o asesinada por el servidor y la conexión a la base de datos se rompe. Para más detalles, consulta nuestro tutorial en profundidad sobre cómo arreglar el error del 502 Bad Gateway.
503: «El servidor no está disponible para manejar esta solicitud en este momento.» La solicitud no puede ser completada en este momento. Este código puede ser devuelto por un servidor sobrecargado que no puede manejar solicitudes adicionales. Tenemos una guía completa sobre cómo arreglar el error de no disponibilidad del servicio 503.
504: «El servidor, actuando como una puerta de enlace, se ha agotado esperando a que otro servidor responda». Este es el código devuelto cuando hay dos servidores involucrados en el procesamiento de una solicitud, y el primer servidor se apaga esperando que el segundo servidor responda. Puedes leer más sobre cómo corregir los errores del 504 en nuestra guía dedicada.
505: «Versión HTTP no soportada». El servidor no soporta la versión HTTP que el cliente usó para hacer la solicitud.
508: «Se ha alcanzado el límite de recursos» Se han alcanzado los límites de recursos establecidos por tu alojamiento web. Consulta nuestro tutorial sobre cómo resolver el error «508 Resource Limit Is Reached«.
509: «Límite de Ancho de Banda Excedido» significa que tu sitio web está utilizando más ancho de banda del que permite tu proveedor de hosting.
511: «Se requiere autenticación de la red». Este código de estado se envía cuando la red que está tratando de usar requiere alguna forma de autenticación antes de enviar su solicitud al servidor. Por ejemplo, es posible que tenga que aceptar los términos y condiciones de un punto de acceso Wi-Fi público.
521: «El servidor web está caído». El error 521 es un mensaje de error específico de Cloudflare. Significa que su navegador web fue capaz de conectarse con éxito a Cloudflare, pero Cloudflare no fue capaz de conectarse al servidor web de origen.
525: «SSL Handshake Failed«. El error 525 significa que el Protocolo de enlace SSL entre un dominio que usa Cloudflare y el servidor web de origen falló. Si estás experimentando problemas, hay cinco métodos para intentar arreglar fácilmente el error 525.