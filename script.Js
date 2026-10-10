/* =====================================
   ELEMENTOS DE LOS JUEGOS
===================================== */

const panelJuego =
    document.getElementById("panelJuego");

const botonesJuego =
    document.querySelectorAll(
        ".boton-juego[data-juego]"
    );

const puntajeTexto =
    document.getElementById("puntajeActual");

const numeroPreguntaTexto =
    document.getElementById("numeroPregunta");

const nombreJugador =
    document.getElementById("nombreJugador");

const nuevoJugador =
    document.getElementById("nuevoJugador");


let juegoActual = null;

let preguntasActuales = [];

let preguntaActual = 0;

let puntaje = 0;

let respondidas = [];



/* =====================================
   EXPERTO EN PLANTAS
===================================== */

const preguntasExperto = [

    {
        pregunta:
            "¿Cuál es la función principal de los estomas de una hoja?",

        opciones: [
            "Absorber minerales del suelo",
            "Regular el intercambio gaseoso y la pérdida de agua",
            "Transportar azúcares hacia las raíces"
        ],

        correcta: 1,

        explicacion:
            "Los estomas regulan el intercambio de gases y la pérdida de vapor de agua."
    },


    {
        pregunta:
            "¿Qué tejido transporta principalmente agua y sales minerales desde las raíces?",

        opciones: [
            "Floema",
            "Xilema",
            "Epidermis"
        ],

        correcta: 1,

        explicacion:
            "El xilema transporta agua y sales minerales desde las raíces."
    },


    {
        pregunta:
            "¿Cuál es la función principal del floema?",

        opciones: [
            "Transportar azúcares producidos por la fotosíntesis",
            "Absorber luz solar",
            "Formar nuevas raíces"
        ],

        correcta: 0,

        explicacion:
            "El floema distribuye azúcares y otras sustancias orgánicas."
    },


    {
        pregunta:
            "Cuando un tallo crece hacia una fuente de luz, ¿qué fenómeno ocurre?",

        opciones: [
            "Geotropismo",
            "Fototropismo",
            "Transpiración"
        ],

        correcta: 1,

        explicacion:
            "El fototropismo es una respuesta de crecimiento frente a la luz."
    },


    {
        pregunta:
            "¿Qué función cumple principalmente la clorofila?",

        opciones: [
            "Captar energía luminosa",
            "Transportar agua",
            "Producir raíces"
        ],

        correcta: 0,

        explicacion:
            "La clorofila absorbe energía luminosa utilizada durante la fotosíntesis."
    },


    {
        pregunta:
            "¿Cómo se llama la pérdida de agua en forma de vapor a través de las hojas?",

        opciones: [
            "Transpiración",
            "Germinación",
            "Polinización"
        ],

        correcta: 0,

        explicacion:
            "La pérdida de agua en forma de vapor se denomina transpiración."
    },


    {
        pregunta:
            "¿Para qué sirven principalmente los pelos absorbentes de las raíces?",

        opciones: [
            "Aumentar la superficie de absorción",
            "Producir semillas",
            "Captar luz solar"
        ],

        correcta: 0,

        explicacion:
            "Aumentan la superficie de contacto de las raíces con el suelo."
    },


    {
        pregunta:
            "¿Qué necesita la mayoría de las semillas para comenzar a germinar?",

        opciones: [
            "Agua, oxígeno y temperatura adecuada",
            "Sol intenso y fertilizante",
            "Solamente agua"
        ],

        correcta: 0,

        explicacion:
            "En general necesitan agua, oxígeno y una temperatura adecuada."
    },


    {
        pregunta:
            "Algunas plantas de ambientes secos abren sus estomas principalmente durante la noche. ¿Qué ventaja obtienen?",

        opciones: [
            "Reducir la pérdida de agua",
            "Absorber más minerales",
            "Producir más semillas"
        ],

        correcta: 0,

        explicacion:
            "Abrir los estomas durante momentos más frescos ayuda a reducir la pérdida de agua."
    },


    {
        pregunta:
            "Una deficiencia importante de nitrógeno puede provocar:",

        opciones: [
            "Amarillamiento de las hojas",
            "Flores gigantes",
            "Raíces azules"
        ],

        correcta: 0,

        explicacion:
            "La falta de nitrógeno puede provocar clorosis o amarillamiento."
    }

];



/* =====================================
   VERDADERO O FALSO
===================================== */

const preguntasVerdadero = [

    {
        pregunta:
            "El xilema transporta principalmente los azúcares producidos por las hojas.",

        opciones: [
            "Verdadero",
            "Falso"
        ],

        correcta: 1,

        explicacion:
            "Es falso. Esa función corresponde principalmente al floema."
    },


    {
        pregunta:
            "Cerrar los estomas puede ayudar a una planta a reducir la pérdida de agua.",

        opciones: [
            "Verdadero",
            "Falso"
        ],

        correcta: 0,

        explicacion:
            "Es verdadero."
    },


    {
        pregunta:
            "Todas las semillas necesitan luz para germinar.",

        opciones: [
            "Verdadero",
            "Falso"
        ],

        correcta: 1,

        explicacion:
            "Es falso. Depende de la especie."
    },


    {
        pregunta:
            "Un suelo constantemente saturado de agua puede disminuir el oxígeno disponible para las raíces.",

        opciones: [
            "Verdadero",
            "Falso"
        ],

        correcta: 0,

        explicacion:
            "Es verdadero."
    },


    {
        pregunta:
            "Las hojas son verdes porque la clorofila absorbe principalmente la luz verde.",

        opciones: [
            "Verdadero",
            "Falso"
        ],

        correcta: 1,

        explicacion:
            "Es falso. Gran parte de la luz verde se refleja."
    },


    {
        pregunta:
            "La transpiración vegetal siempre es perjudicial.",

        opciones: [
            "Verdadero",
            "Falso"
        ],

        correcta: 1,

        explicacion:
            "Es falso. Cumple funciones importantes en la planta."
    },


    {
        pregunta:
            "El floema puede transportar azúcares producidos mediante la fotosíntesis.",

        opciones: [
            "Verdadero",
            "Falso"
        ],

        correcta: 0,

        explicacion:
            "Es verdadero."
    },


    {
        pregunta:
            "Las plantas suculentas pueden almacenar agua en sus tejidos.",

        opciones: [
            "Verdadero",
            "Falso"
        ],

        correcta: 0,

        explicacion:
            "Es verdadero."
    },


    {
        pregunta:
            "El crecimiento de un tallo hacia la luz es un ejemplo de fototropismo.",

        opciones: [
            "Verdadero",
            "Falso"
        ],

        correcta: 0,

        explicacion:
            "Es verdadero."
    },


    {
        pregunta:
            "Si las hojas de una planta están caídas, necesariamente significa que necesita agua.",

        opciones: [
            "Verdadero",
            "Falso"
        ],

        correcta: 1,

        explicacion:
            "Es falso. Puede haber otras causas, como exceso de agua o temperaturas altas."
    }

];



/* =====================================
   SALVA LA PLANTA
===================================== */

const preguntasSalvar = [

    {
        pregunta:
            "La tierra permanece húmeda durante varios días y las hojas comienzan a ponerse amarillas. ¿Qué harías?",

        opciones: [
            "Agregar más agua",
            "Reducir el riego y revisar el drenaje",
            "Dejarla al sol intenso todo el día"
        ],

        correcta: 1,

        explicacion:
            "Puede existir exceso de riego."
    },


    {
        pregunta:
            "El sustrato está completamente seco y la planta comienza a marchitarse. ¿Qué harías primero?",

        opciones: [
            "Realizar un riego adecuado",
            "Agregar mucho fertilizante",
            "Cortar todas las hojas"
        ],

        correcta: 0,

        explicacion:
            "Primero hay que solucionar la falta de agua."
    },


    {
        pregunta:
            "Una planta de interior comienza a crecer inclinándose hacia una ventana. ¿Qué está buscando?",

        opciones: [
            "Fertilizante",
            "Luz",
            "Más tierra"
        ],

        correcta: 1,

        explicacion:
            "Es una respuesta de fototropismo."
    },


    {
        pregunta:
            "Encontrás pequeñas telarañas debajo de las hojas. ¿Qué conviene hacer?",

        opciones: [
            "Ignorarlo",
            "Revisar la planta y aislarla por una posible plaga",
            "Regarla varias veces al día"
        ],

        correcta: 1,

        explicacion:
            "Puede indicar la presencia de ácaros."
    },


    {
        pregunta:
            "Las raíces están saliendo por debajo de la maceta. ¿Qué podría necesitar la planta?",

        opciones: [
            "Una maceta de tamaño adecuado",
            "Que cortemos todas sus raíces",
            "Dejar de recibir agua"
        ],

        correcta: 0,

        explicacion:
            "Puede haberse quedado sin espacio."
    },


    {
        pregunta:
            "Aparece moho en un sustrato que permanece húmedo durante muchos días. ¿Qué revisarías?",

        opciones: [
            "Riego y ventilación",
            "El color de la maceta",
            "El número de hojas"
        ],

        correcta: 0,

        explicacion:
            "La humedad excesiva y poca ventilación favorecen los hongos."
    },


    {
        pregunta:
            "Una suculenta tiene hojas blandas y translúcidas y el suelo sigue mojado. ¿Qué podría estar ocurriendo?",

        opciones: [
            "Exceso de riego",
            "Falta de ruido",
            "Demasiadas flores"
        ],

        correcta: 0,

        explicacion:
            "Es un signo frecuente de exceso de humedad."
    },


    {
        pregunta:
            "Una planta se marchita durante el momento más caluroso del día pero se recupera por la tarde. ¿Qué harías antes de regarla?",

        opciones: [
            "Comprobar la humedad del suelo",
            "Agregar fertilizante",
            "Cortar las raíces"
        ],

        correcta: 0,

        explicacion:
            "El calor puede provocar marchitez temporal."
    },


    {
        pregunta:
            "Observás una capa blanca sobre el sustrato. ¿Qué podría ser?",

        opciones: [
            "Acumulación de sales minerales",
            "Fotosíntesis excesiva",
            "Oxígeno sólido"
        ],

        correcta: 0,

        explicacion:
            "Puede tratarse de una acumulación de minerales."
    },


    {
        pregunta:
            "Una planta produce tallos muy largos, finos y débiles por falta de luz. ¿Qué harías?",

        opciones: [
            "Buscar una iluminación adecuada",
            "Regarla muchísimo más",
            "Eliminar sus raíces"
        ],

        correcta: 0,

        explicacion:
            "Necesita una ubicación con iluminación apropiada para su especie."
    }

];



/* =====================================
   MEZCLAR
===================================== */

function mezclar(array) {

    const copia = [...array];


    for (
        let i = copia.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );


        [
            copia[i],
            copia[j]
        ] = [
            copia[j],
            copia[i]
        ];
    }


    return copia;
}



/* =====================================
   COMENZAR JUEGO
===================================== */

function comenzarJuego(tipo) {

    juegoActual = tipo;

    preguntaActual = 0;

    puntaje = 0;

    respondidas =
        new Array(10).fill(null);


    if (tipo === "experto") {

        preguntasActuales =
            mezclar(preguntasExperto);

    }

    else if (tipo === "verdadero") {

        preguntasActuales =
            mezclar(preguntasVerdadero);

    }

    else {

        preguntasActuales =
            mezclar(preguntasSalvar);

    }


    panelJuego
        .classList
        .remove("oculto");


    mostrarPregunta();


    panelJuego.scrollIntoView({

        behavior: "smooth",

        block: "center"
    });

}



botonesJuego.forEach(

    boton => {

        boton.addEventListener(

            "click",

            () => {

                comenzarJuego(
                    boton.dataset.juego
                );

            }

        );

    }

);



/* =====================================
   MARCADOR
===================================== */

function actualizarMarcador() {

    puntajeTexto.textContent =
        puntaje;


    numeroPreguntaTexto.textContent =
        juegoActual
            ? preguntaActual + 1
            : 0;
}



/* =====================================
   TITULO
===================================== */

function obtenerTitulo() {

    if (juegoActual === "experto") {

        return "🧠 ¿Sos experto en plantas?";

    }


    if (juegoActual === "verdadero") {

        return "✅ Verdadero o falso";

    }


    return "🌱 Salvá la planta";
}



/* =====================================
   MOSTRAR PREGUNTA
===================================== */

function mostrarPregunta() {

    actualizarMarcador();


    const pregunta =
        preguntasActuales[
            preguntaActual
        ];


    const respuestaAnterior =
        respondidas[
            preguntaActual
        ];


    panelJuego.innerHTML = `

        <h3>
            ${obtenerTitulo()}
        </h3>

        <div class="categoria-pregunta">

            Pregunta ${preguntaActual + 1}
            de 10 · 10 puntos

        </div>

        <div class="texto-pregunta">

            ${pregunta.pregunta}

        </div>

        <div
            class="opciones-juego"
            id="opcionesPregunta"
        ></div>

        <div
            class="feedback-juego"
            id="feedbackJuego"
        ></div>

        <div class="navegacion-preguntas">

            <button
                class="flecha-pregunta"
                id="anterior"
            >
                ←
            </button>

            <span class="contador-centro">

                ${preguntaActual + 1} / 10

            </span>

            <button
                class="flecha-pregunta"
                id="siguiente"
            >
                →
            </button>

        </div>
    `;


    const opciones =
        document.getElementById(
            "opcionesPregunta"
        );


    pregunta.opciones.forEach(

        (texto, indice) => {

            const boton =
                document.createElement(
                    "button"
                );


            boton.className =
                "opcion-pregunta";


            boton.textContent =
                texto;


            if (respuestaAnterior !== null) {

                boton.disabled = true;


                if (
                    indice ===
                    pregunta.correcta
                ) {

                    boton.classList.add(
                        "opcion-correcta"
                    );

                }


                if (
                    indice ===
                    respuestaAnterior.indice
                    &&
                    indice !==
                    pregunta.correcta
                ) {

                    boton.classList.add(
                        "opcion-incorrecta"
                    );

                }

            }

            else {

                boton.addEventListener(

                    "click",

                    () => {

                        responderPregunta(
                            indice
                        );

                    }

                );

            }


            opciones.appendChild(
                boton
            );

        }

    );


    const feedback =
        document.getElementById(
            "feedbackJuego"
        );


    if (respuestaAnterior !== null) {

        if (respuestaAnterior.correcta) {

            feedback.innerHTML =
                "🌱 <strong>¡Correcto! +10 puntos</strong><br>" +
                pregunta.explicacion;

        }

        else {

            feedback.innerHTML =
                "🌼 <strong>No era esa.</strong><br>" +
                pregunta.explicacion;

        }

    }



    const anterior =
        document.getElementById(
            "anterior"
        );


    const siguiente =
        document.getElementById(
            "siguiente"
        );


    anterior.disabled =
        preguntaActual === 0;


    siguiente.disabled =
        respuestaAnterior === null;



    anterior.addEventListener(

        "click",

        () => {

            if (preguntaActual > 0) {

                preguntaActual--;

                mostrarPregunta();

            }

        }

    );



    siguiente.addEventListener(

        "click",

        () => {

            if (
                respondidas[
                    preguntaActual
                ] === null
            ) {

                return;

            }


            if (preguntaActual < 9) {

                preguntaActual++;

                mostrarPregunta();

            }

            else {

                mostrarResultado();

            }

        }

    );

}



/* =====================================
   RESPONDER
===================================== */

function responderPregunta(indice) {

    if (
        respondidas[
            preguntaActual
        ] !== null
    ) {

        return;

    }


    const pregunta =
        preguntasActuales[
            preguntaActual
        ];


    const correcta =
        indice ===
        pregunta.correcta;


    respondidas[
        preguntaActual
    ] = {

        indice: indice,

        correcta: correcta

    };


    if (correcta) {

        puntaje += 10;

    }


    mostrarPregunta();

}



/* =====================================
   RESULTADO
===================================== */

function mostrarResultado() {

    const nombre =
        nombreJugador.value.trim()
        ||
        "Jugador/a";


    let mensaje;


    if (puntaje === 100) {

        mensaje =
            "🏆 ¡Puntaje perfecto! Sos un verdadero experto en plantas.";

    }

    else if (puntaje >= 80) {

        mensaje =
            "🌿 ¡Excelente! Sabés muchísimo.";

    }

    else if (puntaje >= 60) {

        mensaje =
            "🌱 ¡Muy buen puntaje!";

    }

    else {

        mensaje =
            "🌼 ¡Buen intento! Marulín todavía tiene algunas cosas para enseñarte.";

    }


    panelJuego.innerHTML = `

        <div class="resultado-final">

            <h3>
                🎉 ¡Partida terminada!
            </h3>

            <p>
                ${nombre}, tu puntaje fue:
            </p>

            <div class="puntaje-grande">
                ${puntaje}/100
            </div>

            <p>
                ${mensaje}
            </p>

            <br>

            <button
                class="boton-juego"
                id="revisar"
            >
                ← Revisar preguntas
            </button>

        </div>
    `;


    document
        .getElementById("revisar")
        .addEventListener(

            "click",

            () => {

                preguntaActual = 9;

                mostrarPregunta();

            }

        );

}



/* =====================================
   NUEVA PERSONA
===================================== */

nuevoJugador.addEventListener(

    "click",

    () => {

        juegoActual = null;

        preguntasActuales = [];

        preguntaActual = 0;

        puntaje = 0;

        respondidas = [];

        nombreJugador.value = "";

        puntajeTexto.textContent = "0";

        numeroPreguntaTexto.textContent = "0";

        panelJuego.innerHTML = "";

        panelJuego
            .classList
            .add("oculto");

        nombreJugador.focus();

    }

);



/* =====================================
   RULETA
===================================== */

const florRuleta =
    document.getElementById(
        "florRuleta"
    );

const btnRuleta =
    document.getElementById(
        "btnRuleta"
    );

const resultadoRuleta =
    document.getElementById(
        "resultadoRuleta"
    );


let girando = false;

let rotacionActual = 0;



const opcionesRuleta = [

    "Reto",

    "Adivinanza",

    "Reto",

    "Reto",

    "Adivinanza",

    "Premio"

];



/* =====================================
   RETOS
===================================== */

const retos = [

    "🌱 Imitá a una planta que está creciendo.",

    "🌿 Nombrá una planta nativa de Argentina.",

    "🪴 Tenés 3 intentos para decir cómo se conoce comúnmente a Epipremnum aureum.",

    "💧 Imitá a una planta que necesita agua.",

    "🌼 Preguntale a alguien que no conozcas cuál es su planta favorita.",

    "📸 Posá al lado de Marulín Verdín como si fueras una planta para la cuenta de la promo.",

    "🌳 Imitá el movimiento de un árbol durante un día de mucho viento por 5 segundos.",

    "🪰 RETO EN PAREJA: Imitá a una planta carnívora atrapando a una mosca con tu compañero.",

    "🍎 RETO EN PAREJA: Tienen 10 segundos para nombrar 8 frutas."

];



/* =====================================
   ADIVINANZAS
===================================== */

const adivinanzas = [

    {
        pregunta:
            "🧩 No tengo boca, pero puedo abrirme y cerrarme. Vivo principalmente en las hojas y controlo gases y agua. ¿Qué soy?",

        respuesta:
            "Los estomas 🌿"
    },


    {
        pregunta:
            "🧩 Soy como una tubería vegetal. Llevo agua y minerales desde las raíces hacia arriba. ¿Qué soy?",

        respuesta:
            "El xilema 🌱"
    },


    {
        pregunta:
            "🧩 Viajo por la planta transportando los azúcares fabricados en las hojas. ¿Qué tejido soy?",

        respuesta:
            "El floema 🍃"
    },


    {
        pregunta:
            "🧩 Soy verde y capturo energía de la luz para ayudar a fabricar alimento. ¿Qué soy?",

        respuesta:
            "La clorofila 🌿"
    },


    {
        pregunta:
            "🧩 Hago que un tallo pueda orientarse y crecer hacia donde se encuentra la luz. ¿Cómo se llama esta respuesta?",

        respuesta:
            "Fototropismo ☀️"
    },


    {
        pregunta:
            "🧩 Salgo de una planta convertido en vapor y participo en el movimiento del agua desde las raíces. ¿Qué proceso soy?",

        respuesta:
            "La transpiración 💧"
    },


    {
        pregunta:
            "🧩 Soy diminuto, crezco sobre las raíces y aumento muchísimo la superficie que absorbe agua. ¿Qué soy?",

        respuesta:
            "Un pelo absorbente 🌱"
    }

];



/* =====================================
   GIRAR RULETA
===================================== */

btnRuleta.addEventListener(

    "click",

    () => {

        if (girando) {

            return;

        }


        girando = true;


        btnRuleta.disabled = true;


        resultadoRuleta.innerHTML =
            "🌼 <strong>¡La flor está girando!</strong>";



        const indice =
            Math.floor(
                Math.random() * 6
            );


        const gradosPorPetalo = 60;


        const anguloObjetivo =
            (
                360 -
                indice * gradosPorPetalo
            ) % 360;


        const anguloActual =
            (
                (
                    rotacionActual % 360
                )
                +
                360
            ) % 360;


        let diferencia =
            anguloObjetivo -
            anguloActual;


        if (diferencia < 0) {

            diferencia += 360;

        }


        const vueltas =
            5 +
            Math.floor(
                Math.random() * 3
            );


        rotacionActual +=
            vueltas * 360 +
            diferencia;


        florRuleta.style.transform =
            `rotate(${rotacionActual}deg)`;


        setTimeout(

            () => {

                const opcion =
                    opcionesRuleta[
                        indice
                    ];


                if (opcion === "Reto") {

                    const reto =
                        retos[
                            Math.floor(
                                Math.random() *
                                retos.length
                            )
                        ];


                    resultadoRuleta.innerHTML =
                        "<strong>🎯 ¡TE TOCÓ UN RETO!</strong>" +
                        "<br><br>" +
                        reto;

                }


                else if (
                    opcion ===
                    "Adivinanza"
                ) {

                    const item =
                        adivinanzas[
                            Math.floor(
                                Math.random() *
                                adivinanzas.length
                            )
                        ];


                    resultadoRuleta.innerHTML =
                        "<strong>🧩 ¡ADIVINANZA!</strong>" +
                        "<br><br>" +
                        item.pregunta +
                        "<br><br>" +
                        "<button class='boton-juego' id='verRespuesta'>" +
                        "Ver respuesta" +
                        "</button>";


                    document
                        .getElementById(
                            "verRespuesta"
                        )
                        .addEventListener(

                            "click",

                            () => {

                                resultadoRuleta.innerHTML =
                                    "<strong>🧩 ¡ADIVINANZA!</strong>" +
                                    "<br><br>" +
                                    item.pregunta +
                                    "<br><br>" +
                                    "<strong>" +
                                    item.respuesta +
                                    "</strong>";

                            }

                        );

                }


                else {

                    resultadoRuleta.innerHTML =
                        "<strong>🎁 ¡PREMIO SORPRESA!</strong>" +
                        "<br><br>" +
                        "Mostrale a los chicos lo que te salió así te dan tu premio 🎉🌱";

                }


                girando = false;


                btnRuleta.disabled = false;

            },

            5100

        );

    }

);