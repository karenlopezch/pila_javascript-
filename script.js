// ==========================================
// 1. ESTRUCTURA DE DATOS: PILA (STACK)
// ==========================================
class Pila {
    constructor() {
        this.items = []; // Arreglo interno para guardar los elementos
    }

    // Método push: Agrega un elemento arriba de la pila
    push(elemento) {
        this.items.push(elemento);
    }

    // Método pop: Saca el elemento que está más arriba
    pop() {
        if (this.isEmpty()) {
            return "La pila está vacía";
        }
        return this.items.pop();
    }

    // Método peek: Mira quién está en la cima sin sacarlo
    peek() {
        return this.items[this.items.length - 1];
    }

    // Método isEmpty: Verifica si la pila está vacía
    isEmpty() {
        return this.items.length === 0;
    }
}

// ==========================================
// 2. MODELO DE DATOS: CLASE PERSONAJE
// ==========================================
class Personaje {
    constructor(name, gender, species, status) {
        this.name = name;
        this.gender = gender;
        this.species = species;
        this.status = status;
    }
}

// ==========================================
// 3. CONSUMO DE LA API Y LÓGICA DE APILADO
// ==========================================
async function cargarPersonajes() {
    const miPila = new Pila(); // Instanciamos nuestra Pila

    try {
        // Petición HTTP asíncrona usando fetch
        const respuesta = await fetch("https://rickandmortyapi.com/api/character");

        // Validamos si la respuesta del servidor fue exitosa
        if (!respuesta.ok) {
            throw new Error(`Hubo un error en la petición: ${respuesta.status}`);
        }

        const datos = await respuesta.json();
        const listaPersonajes = datos.results; // Obtenemos la lista de personajes

        // Iteramos sobre la lista en el mismo orden que los entrega la API
        for (let i = 0; i < listaPersonajes.length; i++) {
            let p = listaPersonajes[i];

            // Instanciamos la clase Personaje con los 4 atributos obligatorios
            let nuevoPersonaje = new Personaje(p.name, p.gender, p.species, p.status);

            // Ingresamos el personaje a la Pila usando push
            miPila.push(nuevoPersonaje);
        }

        console.log("¡Pila llenada correctamente con los datos de la API!");

        // 4. DESAPILADO Y SALIDA POR CONSOLA
        vaciarYMostrarPila(miPila);

    } catch (error) {
        // Manejo de errores obligatorio con console.error
        console.error("Error al conectar con la API:", error);
    }
}

// ==========================================
// 5. FUNCIÓN PARA DESAPILAR Y MOSTRAR EN CONSOLA
// ==========================================
function vaciarYMostrarPila(pila) {
    console.log("--- INICIO DEL DESAPILADO (Orden Inverso / LIFO) ---");

    // Mientras la pila tenga elementos, los vamos sacando
    while (!pila.isEmpty() && pila.items.length > 0) {
        let personajeExtraido = pila.pop();
        
        // Imprimimos el objeto claramente en la consola
        console.table(personajeExtraido);
    }

    console.log("--- FIN DEL DESAPILADO ---");
}

// Ejecutamos la función principal al cargar el script
cargarPersonajes();