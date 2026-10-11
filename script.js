document.addEventListener("DOMContentLoaded", () => {


    /* =====================================
       HABLA CON MARULIN
    ====================================== */

    const marulinHablaImagen =
        document.getElementById("marulinHablaImagen");

    const textoMarulin =
        document.getElementById("textoMarulin");

    const saludarMarulin =
        document.getElementById("saludarMarulin");

    const opcionesMarulin =
        document.getElementById("opcionesMarulin");

    const botonesCharla =
        document.querySelectorAll(".boton-charla[data-charla]");

    const indicadorHabla =
        document.getElementById("indicadorHabla");


    const imagenesMarulin = [
        "images/maru1.png",
        "images/maru2.png",
        "images/maru3.png",
        "images/maru4.png",
        "images/maru5.png",
        "images/maru6.png",
        "images/maru7.png",
        "images/maru8.png",
        "images/maru9.png"
    ];


    const respuestasMarulin = {

        consejo: [
            "Antes de regar una planta, tocá la tierra. Si todavía está húmeda, esperá un poquito. Regar de más también puede hacerle mal.",
            "No todas las plantas necesitan la misma cantidad de agua. Mirá cómo está la tierra antes de decidir si hay que regar.",
            "Si una planta empieza a crecer muy inclinada hacia una ventana, probablemente está buscando más luz.",
            "Cuando cambies una planta de maceta, asegurate de que la nueva tenga buen drenaje para que no se acumule demasiada agua.",
            "Antes de pensar que una planta está triste por falta de agua, fijate también en la luz, la humedad y el aspecto de sus hojas."
        ],

        dato: [
            "¿Sabías que las hojas tienen pequeñas aberturas llamadas estomas? Las plantas las usan para intercambiar gases y regular la pérdida de agua.",
            "Dato curioso: el xilema funciona como una red de tuberías que transporta agua y minerales desde las raíces hacia otras partes de la planta.",
            "¿Sabías que algunas plantas pueden crecer orientándose hacia la luz? Ese fenómeno se llama fototropismo.",
            "Las raíces tienen pequeños pelos absorbentes que aumentan muchísimo la superficie con la que pueden tomar agua del suelo.",
            "Las plantas también pierden agua en forma de vapor. Ese proceso se llama transpiración."
        ],

        chamuyo: [
            "¿Sos ChatGPT? Porque tenés todas las respuestas que estaba buscando.",
            "Estás más fuerte que el dólar blue.",
            "Ni Francella en sus mejores épocas tenía el timing que tenés vos para hacerme sonreír.",
            "Vine hasta acá para decirte algo inteligente, pero te juro que me miraste y me agarró un delay mental digno de las compus del gobierno.",
            "Cantame truco, que con vos quiero todo.",
            "Soy malísima en inglés. Confundí un past simple con un futuro con vos.",
            "¿Tenés papel? Es que te vi y me cagué enamorando.",
            "Sos como una prueba de historia: te veo y no sé qué poner de lo nerviosa que estoy.",
            "Te hacés la linda y sos hermosa.",
            "Los japoneses se mueren si ven semejante bomba como vos."
        ],

        favorita: [
            "Ufff, es difícil elegir, pero creo que mi favorita es el potus. Es hermoso, resistente y queda lindo en un montón de lugares. Pero no se lo cuentes a las otras plantas.",
            "Me gustan muchísimas, pero tengo debilidad por el potus. Sus hojas son preciosas y además es una planta bastante amigable para empezar a cuidar."
        ],

        lindo: [
            "Te voy a decir algo lindo: crecer lleva tiempo. Las plantas no se apuran, y aun así un día te sorprenden con una hoja nueva. Vos también podés darte tiempo.",
            "Gracias por venir a conocerme. Si hoy aprendiste aunque sea una cosita nueva, entonces mi día ya fue un poquito más verde.",
            "Las cosas lindas necesitan cuidado, paciencia y tiempo. Las plantas lo saben muy bien, y creo que nosotros también podemos aprender eso de ellas.",
            "Tu curiosidad también es una forma de crecer. Seguí preguntando, probando y aprendiendo cosas nuevas."
        ],

        recomendar: [
            "Si recién empezás con las plantas, yo te recomendaría un potus. Es bastante resistente y te permite aprender sin complicarte demasiado.",
            "Si sos de olvidarte un poquito del riego, una sansevieria puede ser una muy buena compañera porque suele tolerar bastante bien los descuidos.",
            "Si tenés un lugar con mucha luz y querés algo pequeño, podés probar con una suculenta. Eso sí: cuidado con regarla de más.",
            "Si te gustan las plantas aromáticas y tenés buena luz, podrías probar con menta. Además de verse linda, tiene un aroma genial."
        ]
    };


    let intervaloMarulin = null;
    let ultimoIndiceMarulin = -1;
    let vocesDisponibles = [];


    function cargarVocesMarulin() {

        if (!("speechSynthesis" in window)) {
            return;
        }

        vocesDisponibles =
            window.speechSynthesis.getVoices();
    }


    cargarVocesMarulin();


    if ("speechSynthesis" in window) {

        window.speechSynthesis.addEventListener(
            "voiceschanged",
            cargarVocesMarulin
        );
    }


    function obtenerVozMarulin() {

        const vozArgentina =
            vocesDisponibles.find(
                voz =>
                    voz.lang &&
                    voz.lang.toLowerCase().startsWith("es-ar")
            );

        if (vozArgentina) {
            return vozArgentina;
        }


        const vozEspanol =
            vocesDisponibles.find(
                voz =>
                    voz.lang &&
                    voz.lang.toLowerCase().startsWith("es")
            );

        return vozEspanol || null;
    }


    function elegirAleatorio(lista) {

        return lista[
            Math.floor(
                Math.random() * lista.length
            )
        ];
    }


    function cambiarImagenMarulin() {

        if (!marulinHablaImagen) {
            return;
        }

        let indice;

        do {

            indice =
                Math.floor(
                    Math.random() * imagenesMarulin.length
                );

        } while (
            indice === ultimoIndiceMarulin &&
            imagenesMarulin.length > 1
        );


        ultimoIndiceMarulin = indice;

        marulinHablaImagen.src =
            imagenesMarulin[indice];
    }


    function empezarAnimacionMarulin(imagenFija = null) {

        if (!marulinHablaImagen) {
            return;
        }

        clearInterval(intervaloMarulin);

        marulinHablaImagen.classList.add(
            "hablando"
        );

        indicadorHabla?.classList.remove(
            "oculto-chat"
        );

        if (imagenFija) {

            marulinHablaImagen.src =
                imagenFija;

            intervaloMarulin = null;
            return;
        }

        cambiarImagenMarulin();

        intervaloMarulin =
            setInterval(
                cambiarImagenMarulin,
                420
            );
    }


    function detenerAnimacionMarulin() {

        clearInterval(intervaloMarulin);

        intervaloMarulin = null;

        marulinHablaImagen?.classList.remove(
            "hablando"
        );

        indicadorHabla?.classList.add(
            "oculto-chat"
        );

        if (marulinHablaImagen) {

            marulinHablaImagen.src =
                "images/maru5.png";
        }
    }


    function bloquearBotonesMarulin(bloquear) {

        if (saludarMarulin) {
            saludarMarulin.disabled = bloquear;
        }

        botonesCharla.forEach(
            boton => {
                boton.disabled = bloquear;
            }
        );
    }


    /* =====================================
       EFECTO DE VOZ ROBOTICA DE MARULIN

       speechSynthesis limita el pitch a 2.0.
       Por eso dejamos la voz en el maximo y
       agregamos bips/chirridos electronicos muy
       cortitos para que el resultado suene mucho
       mas agudo y robotico sin usar audios externos.
    ====================================== */

    function sonidoRobotMarulin() {

        const AudioContexto =
            window.AudioContext ||
            window.webkitAudioContext;

        if (!AudioContexto) {
            return Promise.resolve();
        }

        try {

            const audioCtx =
                new AudioContexto();

            const crearBip =
                (inicio, frecuencia, duracion = 0.065) => {

                    const oscilador =
                        audioCtx.createOscillator();

                    const volumen =
                        audioCtx.createGain();

                    oscilador.type = "square";

                    oscilador.frequency.setValueAtTime(
                        frecuencia,
                        audioCtx.currentTime + inicio
                    );

                    volumen.gain.setValueAtTime(
                        0.0001,
                        audioCtx.currentTime + inicio
                    );

                    volumen.gain.exponentialRampToValueAtTime(
                        0.045,
                        audioCtx.currentTime + inicio + 0.008
                    );

                    volumen.gain.exponentialRampToValueAtTime(
                        0.0001,
                        audioCtx.currentTime + inicio + duracion
                    );

                    oscilador.connect(volumen);
                    volumen.connect(audioCtx.destination);

                    oscilador.start(
                        audioCtx.currentTime + inicio
                    );

                    oscilador.stop(
                        audioCtx.currentTime + inicio + duracion + 0.01
                    );
                };

            /* BIP-BIP-BIP mucho mas agudo que antes */
            crearBip(0.00, 1900);
            crearBip(0.075, 2500);
            crearBip(0.150, 3150);

            return new Promise(
                resolve => {
                    setTimeout(
                        () => {
                            audioCtx.close().catch(() => {});
                            resolve();
                        },
                        255
                    );
                }
            );
        }

        catch (error) {
            return Promise.resolve();
        }
    }


    let efectoRobotMarulin = null;


    function iniciarEfectoRobotMarulin() {

        detenerEfectoRobotMarulin();

        const AudioContexto =
            window.AudioContext ||
            window.webkitAudioContext;

        if (!AudioContexto) {
            return;
        }

        try {

            const audioCtx =
                new AudioContexto();

            let paso = 0;

            const frecuencias = [
                2350,
                2850,
                3300,
                2600
            ];

            const emitirChirrido = () => {

                if (audioCtx.state === "closed") {
                    return;
                }

                const ahora =
                    audioCtx.currentTime;

                const oscilador =
                    audioCtx.createOscillator();

                const volumen =
                    audioCtx.createGain();

                oscilador.type =
                    paso % 2 === 0
                        ? "square"
                        : "sawtooth";

                oscilador.frequency.setValueAtTime(
                    frecuencias[paso % frecuencias.length],
                    ahora
                );

                oscilador.frequency.exponentialRampToValueAtTime(
                    frecuencias[(paso + 1) % frecuencias.length],
                    ahora + 0.045
                );

                volumen.gain.setValueAtTime(
                    0.0001,
                    ahora
                );

                volumen.gain.exponentialRampToValueAtTime(
                    0.007,
                    ahora + 0.006
                );

                volumen.gain.exponentialRampToValueAtTime(
                    0.0001,
                    ahora + 0.055
                );

                oscilador.connect(volumen);
                volumen.connect(audioCtx.destination);

                oscilador.start(ahora);
                oscilador.stop(ahora + 0.06);

                paso += 1;
            };

            /* Sonido electronico muy bajito debajo de la voz */
            emitirChirrido();

            const intervalo =
                setInterval(
                    emitirChirrido,
                    175
                );

            efectoRobotMarulin = {
                audioCtx,
                intervalo
            };
        }

        catch (error) {
            efectoRobotMarulin = null;
        }
    }


    function detenerEfectoRobotMarulin() {

        if (!efectoRobotMarulin) {
            return;
        }

        clearInterval(
            efectoRobotMarulin.intervalo
        );

        efectoRobotMarulin.audioCtx
            .close()
            .catch(() => {});

        efectoRobotMarulin = null;
    }


    async function hablarMarulin(
        texto,
        alTerminar = null,
        imagenFija = null
    ) {

        if (textoMarulin) {
            textoMarulin.textContent = texto;
        }

        empezarAnimacionMarulin(
            imagenFija
        );

        bloquearBotonesMarulin(true);


        if (!("speechSynthesis" in window)) {

            detenerAnimacionMarulin();
            bloquearBotonesMarulin(false);

            if (alTerminar) {
                alTerminar();
            }

            return;
        }


        window.speechSynthesis.cancel();

        await sonidoRobotMarulin();


        const mensaje =
            new SpeechSynthesisUtterance(texto);


        const vozElegida =
            obtenerVozMarulin();


        if (vozElegida) {

            mensaje.voice = vozElegida;
            mensaje.lang = vozElegida.lang;
        }

        else {

            mensaje.lang = "es-AR";
        }


        /*
           VOZ DE MARULÍN

           - pitch al MAXIMO permitido por el navegador
           - misma velocidad que antes
           - bips iniciales mucho mas agudos
           - chirridos electronicos suaves mientras habla

           speechSynthesis permite pitch hasta 2.0.
        */

        mensaje.rate = 1.52;
        mensaje.pitch = 2.0;
        mensaje.volume = 1;


        const terminar = () => {

            detenerEfectoRobotMarulin();
            detenerAnimacionMarulin();
            bloquearBotonesMarulin(false);

            if (alTerminar) {
                alTerminar();
            }
        };


        mensaje.onend = terminar;
        mensaje.onerror = terminar;


        iniciarEfectoRobotMarulin();

        window.speechSynthesis.speak(
            mensaje
        );
    }


    saludarMarulin?.addEventListener(

        "click",

        () => {

            const saludo =
                "¡Holaaa! Estoy muy bien y súper feliz de que hayas venido a conocerme. Soy Marulín Verdín y me encanta hablar de plantas. ¿Qué querés preguntarme?";


            hablarMarulin(
                saludo,
                () => {

                    saludarMarulin.classList.add(
                        "oculto-chat"
                    );

                    opcionesMarulin.classList.remove(
                        "oculto-chat"
                    );
                }
            );
        }
    );


    botonesCharla.forEach(

        boton => {

            boton.addEventListener(

                "click",

                () => {

                    const categoria =
                        boton.dataset.charla;


                    const lista =
                        respuestasMarulin[categoria];


                    if (!lista) {
                        return;
                    }


                    const respuesta =
                        elegirAleatorio(lista);


                    const imagenFija =
                        categoria === "chamuyo"
                            ? "images/maru2.png"
                            : null;


                    hablarMarulin(
                        respuesta,
                        null,
                        imagenFija
                    );
                }
            );
        }
    );

    /* =====================================
       ELEMENTOS
    ====================================== */

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



    /* =====================================
       PREGUNTAS - EXPERTO
    ====================================== */

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
                "Algunas plantas de ambientes secos abren sus estomas durante la noche. ¿Qué ventaja obtienen?",

            opciones: [
                "Reducir la pérdida de agua",
                "Absorber más minerales",
                "Producir más semillas"
            ],

            correcta: 0,

            explicacion:
                "Abrirlos durante momentos más frescos ayuda a reducir la pérdida de agua."
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
       PREGUNTAS - VERDADERO O FALSO
    ====================================== */

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
                "Es verdadero. Al cerrarse los estomas disminuye la salida de vapor de agua."
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
                "Es falso. Puede deberse también a exceso de agua, calor u otros problemas."
        }

    ];



    /* =====================================
       PREGUNTAS - SALVA LA PLANTA
    ====================================== */

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
                "Puede indicar la presencia de ácaros u otra plaga."
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
                "Necesita una ubicación con iluminación apropiada."
        }

    ];



    /* =====================================
       ESTADO DEL JUEGO
    ====================================== */

    let juegoActual = null;

    let preguntasActuales = [];

    let preguntaActual = 0;

    let puntaje = 0;

    let respondidas = [];



    /* =====================================
       MEZCLAR
    ====================================== */

    function mezclar(array) {

        const copia =
            [...array];


        for (
            let i = copia.length - 1;
            i > 0;
            i--
        ) {

            const j =
                Math.floor(
                    Math.random() *
                    (i + 1)
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
       TITULO DEL JUEGO
    ====================================== */

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
       MARCADOR
    ====================================== */

    function actualizarMarcador() {

        puntajeTexto.textContent =
            puntaje;


        numeroPreguntaTexto.textContent =
            juegoActual
                ? preguntaActual + 1
                : 0;
    }



    /* =====================================
       COMENZAR JUEGO
    ====================================== */

    function comenzarJuego(tipo) {

        juegoActual =
            tipo;

        preguntaActual =
            0;

        puntaje =
            0;


        if (tipo === "experto") {

            preguntasActuales =
                mezclar(
                    preguntasExperto
                );

        }

        else if (tipo === "verdadero") {

            preguntasActuales =
                mezclar(
                    preguntasVerdadero
                );

        }

        else {

            preguntasActuales =
                mezclar(
                    preguntasSalvar
                );

        }


        respondidas =
            new Array(
                preguntasActuales.length
            ).fill(null);


        panelJuego
            .classList
            .remove("oculto");


        mostrarPregunta();


        setTimeout(
            () => {

                panelJuego.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            },
            100
        );
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
       MOSTRAR PREGUNTA
    ====================================== */

    function mostrarPregunta() {

        actualizarMarcador();


        const pregunta =
            preguntasActuales[
                preguntaActual
            ];


        const respuesta =
            respondidas[
                preguntaActual
            ];


        const ultima =
            preguntaActual ===
            preguntasActuales.length - 1;


        panelJuego.innerHTML = `

            <h3>
                ${obtenerTitulo()}
            </h3>

            <div class="categoria-pregunta">

                Pregunta ${preguntaActual + 1}
                de ${preguntasActuales.length}
                · 10 puntos

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
                    aria-label="Pregunta anterior"
                >
                    ←
                </button>


                <span class="contador-centro">

                    ${preguntaActual + 1}
                    /
                    ${preguntasActuales.length}

                </span>


                <button
                    class="flecha-pregunta"
                    id="siguiente"
                    aria-label="Pregunta siguiente"
                >
                    ${ultima ? "✓" : "→"}
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


                if (respuesta !== null) {

                    boton.disabled =
                        true;


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
                            respuesta.indice
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



        /* FEEDBACK */

        const feedback =
            document.getElementById(
                "feedbackJuego"
            );


        if (respuesta !== null) {

            if (respuesta.correcta) {

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



        /* FLECHAS */

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
            respuesta === null;


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


                if (
                    preguntaActual <
                    preguntasActuales.length - 1
                ) {

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
    ====================================== */

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

            indice:
                indice,

            correcta:
                correcta

        };


        if (correcta) {

            puntaje += 10;

        }


        mostrarPregunta();
    }



    /* =====================================
       RESULTADO FINAL
    ====================================== */

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


                <div class="botones-final">

                    <button
                        class="boton-juego"
                        id="revisarPreguntas"
                    >
                        ← Revisar
                    </button>


                    <button
                        class="boton-juego"
                        id="jugarOtraVez"
                    >
                        🔄 Jugar otra vez
                    </button>

                </div>

            </div>
        `;


        document
            .getElementById(
                "revisarPreguntas"
            )
            .addEventListener(

                "click",

                () => {

                    preguntaActual =
                        preguntasActuales.length - 1;

                    mostrarPregunta();

                }

            );


        document
            .getElementById(
                "jugarOtraVez"
            )
            .addEventListener(

                "click",

                () => {

                    comenzarJuego(
                        juegoActual
                    );

                }

            );
    }



    /* =====================================
       NUEVA PERSONA
    ====================================== */

    nuevoJugador.addEventListener(

        "click",

        () => {

            juegoActual =
                null;

            preguntasActuales =
                [];

            preguntaActual =
                0;

            puntaje =
                0;

            respondidas =
                [];


            nombreJugador.value =
                "";


            puntajeTexto.textContent =
                "0";


            numeroPreguntaTexto.textContent =
                "0";


            panelJuego.innerHTML =
                "";


            panelJuego
                .classList
                .add("oculto");


            nombreJugador.focus();

        }

    );



    /* =====================================
       RULETA
    ====================================== */

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


    let girando =
        false;


    let rotacionActual =
        0;



    /*

        3 RETOS
        2 ADIVINANZAS
        1 PREMIO

    */

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
    ====================================== */

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
    ====================================== */

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
    ====================================== */

    btnRuleta.addEventListener(

        "click",

        () => {

            if (girando) {

                return;

            }


            girando =
                true;


            btnRuleta.disabled =
                true;


            resultadoRuleta.innerHTML =
                "🌼 <strong>¡La flor está girando!</strong>";



            const indice =
                Math.floor(
                    Math.random() *
                    opcionesRuleta.length
                );


            const gradosPorPetalo =
                360 /
                opcionesRuleta.length;


            const anguloObjetivo =
                (
                    360 -
                    indice *
                    gradosPorPetalo
                ) % 360;


            const anguloActual =
                (
                    (
                        rotacionActual %
                        360
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
                5;


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



                    /* RETO */

                    if (
                        opcion ===
                        "Reto"
                    ) {

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



                    /* ADIVINANZA */

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
                                        "<strong>Respuesta: " +
                                        item.respuesta +
                                        "</strong>";

                                }

                            );

                    }



                    /* PREMIO */

                    else {

                        resultadoRuleta.innerHTML =
                            "<strong>🎁 ¡PREMIO SORPRESA!</strong>" +
                            "<br><br>" +
                            "Mostrale a los chicos lo que te salió así te dan tu premio 🎉🌱";

                    }


                    girando =
                        false;


                    btnRuleta.disabled =
                        false;

                },

                5200

            );

        }

    );


    /* =====================================
       ¿QUE MARULIN SOS?
    ====================================== */

    const testMarulinInicio =
        document.getElementById("testMarulinInicio");

    const testMarulinPreguntas =
        document.getElementById("testMarulinPreguntas");

    const testMarulinResultado =
        document.getElementById("testMarulinResultado");

    const btnComenzarTestMarulin =
        document.getElementById("btnComenzarTestMarulin");

    const btnRepetirTestMarulin =
        document.getElementById("btnRepetirTestMarulin");

    const testMarulinNumero =
        document.getElementById("testMarulinNumero");

    const testMarulinProgreso =
        document.getElementById("testMarulinProgreso");

    const testMarulinPregunta =
        document.getElementById("testMarulinPregunta");

    const testMarulinOpciones =
        document.getElementById("testMarulinOpciones");

    const testMarulinImagenResultado =
        document.getElementById("testMarulinImagenResultado");

    const testMarulinTituloResultado =
        document.getElementById("testMarulinTituloResultado");

    const testMarulinTextoResultado =
        document.getElementById("testMarulinTextoResultado");


    const preguntasQueMarulin = [

        {
            pregunta: "Es sábado a la noche, ¿qué plan elegís?",
            opciones: [
                {
                    texto: "Busco alguna joda o juntada para ir, tiro alguna notita tipo ‘¿y hoy???’.",
                    tipo: "bolichero"
                },
                {
                    texto: "Me junto con mi pareja o busco algún chamuyo mío de Instagram para hacer algo, bien de gato.",
                    tipo: "chamuyero"
                },
                {
                    texto: "Elijo una peli para ver y me duermo a los dos segundos.",
                    tipo: "dormilon"
                },
                {
                    texto: "Hago algo tranqui con mis amigos: un lomito con un truco, un UNO o un chinchón. Chill.",
                    tipo: "chill"
                }
            ]
        },

        {
            pregunta: "Te escribe alguien que te gusta. ¿Qué hacés?",
            opciones: [
                {
                    texto: "Me la/lo chamuyo. Si pica, pica.",
                    tipo: "chamuyero"
                },
                {
                    texto: "Le pregunto si salimos a algún lado hoy.",
                    tipo: "bolichero"
                },
                {
                    texto: "Le contesté tarde porque me quedé dormido. Lpm, qué gil que soy, las malas me rodean.",
                    tipo: "dormilon"
                },
                {
                    texto: "Le saco charla normal.",
                    tipo: "chill"
                }
            ]
        },

        {
            pregunta: "En una juntada sos el que...",
            opciones: [
                {
                    texto: "Seguramente encuentra a alguien para chamuyarse toda la noche.",
                    tipo: "chamuyero"
                },
                {
                    texto: "Está tratando de convencer a todos de salir después y encima después consigue un after.",
                    tipo: "bolichero"
                },
                {
                    texto: "Se va temprano porque le agarró sueño o lo encuentran tirado durmiéndose.",
                    tipo: "dormilon"
                },
                {
                    texto: "Está charlando con un grupito tranqui, sin preocuparse mucho.",
                    tipo: "chill"
                }
            ]
        },

        {
            pregunta: "Mañana es feriado y no tenés que hacer nada. ¿Qué hacés?",
            opciones: [
                {
                    texto: "Organizo algún plan con algún chamuyo de por ahí.",
                    tipo: "chamuyero"
                },
                {
                    texto: "YYYYY... busco alguna jodita o juntada para salir, si total mañana no hay que hacer nada.",
                    tipo: "bolichero"
                },
                {
                    texto: "Aprovecho y me duermo todo el día hasta que en algún horario me despierte.",
                    tipo: "dormilon"
                },
                {
                    texto: "Me despierto a cualquier hora, capaz juego un rato al Minecraft o al LoL y después veo de organizar alguna juntada y tomar unos matesitos.",
                    tipo: "chill"
                }
            ]
        },

        {
            pregunta: "¿Qué signo sos?",
            opciones: [
                {
                    texto: "Géminis, Libra o Escorpio.",
                    tipo: "chamuyero"
                },
                {
                    texto: "Aries, Leo o Sagitario.",
                    tipo: "bolichero"
                },
                {
                    texto: "Tauro, Cáncer o Piscis.",
                    tipo: "dormilon"
                },
                {
                    texto: "Virgo, Capricornio o Acuario.",
                    tipo: "chill"
                }
            ]
        },

        {
            pregunta: "Tu celu está en 2% y todavía faltan 3 horas para volver a tu casa.",
            opciones: [
                {
                    texto: "Guardo batería por si me escribe ella/él...",
                    tipo: "chamuyero"
                },
                {
                    texto: "Lo sigo usando. Dios proveerá.",
                    tipo: "bolichero"
                },
                {
                    texto: "Le aviso a mi mamá y desaparezco. Cuando llegue lo pongo a cargar mientras duermo.",
                    tipo: "dormilon"
                },
                {
                    texto: "Modo ahorro y ya fue.",
                    tipo: "chill"
                }
            ]
        },

        {
            pregunta: "¿Cuál es tu milanesa favorita?",
            opciones: [
                {
                    texto: "Milanesa napolitana.",
                    tipo: "chamuyero"
                },
                {
                    texto: "Milanesa a caballo.",
                    tipo: "bolichero"
                },
                {
                    texto: "Milanesa con fideos con crema.",
                    tipo: "dormilon"
                },
                {
                    texto: "Milanesa simple con puré de papa.",
                    tipo: "chill"
                }
            ]
        }

    ];


    const resultadosQueMarulin = {

        chamuyero: {
            titulo: "💘 Marulín Chamuyero",
            imagen: "images/maru2.png",
            texto: "Tenés una frase para cada situación. Si hay una mínima posibilidad de chamuyo, vos ya la viste antes que todos. Si pica, pica."
        },

        bolichero: {
            titulo: "🪩 Marulín Bolichero",
            imagen: "images/maru5.png",
            texto: "Para vos siempre puede aparecer una jodita más. Sos de los que dicen ‘vamos un rato’ y terminan encontrando un after."
        },

        dormilon: {
            titulo: "💤 Marulín Dormilón",
            imagen: "images/maru9.png",
            texto: "Podrías conquistar el mundo, pero justo te agarró sueño. Cualquier superficie medianamente cómoda puede convertirse en una cama."
        },

        chill: {
            titulo: "😎 Marulín de Chill",
            imagen: "images/maru6.png",
            texto: "Cero drama y cero apuro. Unos mates, un lomito, un jueguito o una juntada tranqui y ya estás hecho. Vemos qué pinta."
        }

    };


    let indicePreguntaMarulin = 0;

    let puntajesQueMarulin = {
        chamuyero: 0,
        bolichero: 0,
        dormilon: 0,
        chill: 0
    };

    let ultimaRespuestaMarulin = null;


    function reiniciarTestMarulin() {

        indicePreguntaMarulin = 0;

        ultimaRespuestaMarulin = null;

        puntajesQueMarulin = {
            chamuyero: 0,
            bolichero: 0,
            dormilon: 0,
            chill: 0
        };
    }


    function mostrarPreguntaMarulin() {

        const item =
            preguntasQueMarulin[indicePreguntaMarulin];

        if (!item) {
            mostrarResultadoMarulin();
            return;
        }

        if (testMarulinNumero) {
            testMarulinNumero.textContent =
                indicePreguntaMarulin + 1;
        }

        if (testMarulinProgreso) {
            testMarulinProgreso.style.width =
                `${((indicePreguntaMarulin + 1) / preguntasQueMarulin.length) * 100}%`;
        }

        if (testMarulinPregunta) {
            testMarulinPregunta.textContent =
                item.pregunta;
        }

        if (!testMarulinOpciones) {
            return;
        }

        testMarulinOpciones.innerHTML = "";

        item.opciones.forEach(
            opcion => {

                const boton =
                    document.createElement("button");

                boton.type = "button";
                boton.className = "test-marulin-opcion";
                boton.textContent = opcion.texto;

                boton.addEventListener(
                    "click",
                    () => {

                        puntajesQueMarulin[opcion.tipo] += 1;
                        ultimaRespuestaMarulin = opcion.tipo;

                        indicePreguntaMarulin += 1;

                        if (
                            indicePreguntaMarulin >=
                            preguntasQueMarulin.length
                        ) {
                            mostrarResultadoMarulin();
                        }
                        else {
                            mostrarPreguntaMarulin();
                        }
                    }
                );

                testMarulinOpciones.appendChild(boton);
            }
        );
    }


    function obtenerGanadorMarulin() {

        const maximo =
            Math.max(...Object.values(puntajesQueMarulin));

        const empatados =
            Object.keys(puntajesQueMarulin)
                .filter(
                    tipo =>
                        puntajesQueMarulin[tipo] === maximo
                );

        if (
            ultimaRespuestaMarulin &&
            empatados.includes(ultimaRespuestaMarulin)
        ) {
            return ultimaRespuestaMarulin;
        }

        return empatados[0];
    }


    function mostrarResultadoMarulin() {

        const ganador =
            obtenerGanadorMarulin();

        const resultado =
            resultadosQueMarulin[ganador];

        testMarulinPreguntas?.classList.add(
            "test-marulin-oculto"
        );

        testMarulinResultado?.classList.remove(
            "test-marulin-oculto"
        );

        if (testMarulinImagenResultado) {
            testMarulinImagenResultado.src =
                resultado.imagen;
        }

        if (testMarulinTituloResultado) {
            testMarulinTituloResultado.textContent =
                resultado.titulo;
        }

        if (testMarulinTextoResultado) {
            testMarulinTextoResultado.textContent =
                resultado.texto;
        }
    }


    btnComenzarTestMarulin?.addEventListener(
        "click",
        () => {

            reiniciarTestMarulin();

            testMarulinInicio?.classList.add(
                "test-marulin-oculto"
            );

            testMarulinResultado?.classList.add(
                "test-marulin-oculto"
            );

            testMarulinPreguntas?.classList.remove(
                "test-marulin-oculto"
            );

            mostrarPreguntaMarulin();
        }
    );


    btnRepetirTestMarulin?.addEventListener(
        "click",
        () => {

            reiniciarTestMarulin();

            testMarulinResultado?.classList.add(
                "test-marulin-oculto"
            );

            testMarulinPreguntas?.classList.remove(
                "test-marulin-oculto"
            );

            mostrarPreguntaMarulin();
        }
    );



    /* =====================================
       SELFIE DE LA FERIA
    ====================================== */

    const selfieOpciones =
        document.getElementById("selfieOpciones");

    const selfieVideo =
        document.getElementById("selfieVideo");

    const selfieMarco =
        document.getElementById("selfieMarco");

    const selfiePlaceholder =
        document.getElementById("selfiePlaceholder");

    const selfieEstado =
        document.getElementById("selfieEstado");

    const btnActivarCamara =
        document.getElementById("btnActivarCamara");

    const btnCambiarCamara =
        document.getElementById("btnCambiarCamara");

    const btnSacarSelfie =
        document.getElementById("btnSacarSelfie");

    const btnCerrarCamara =
        document.getElementById("btnCerrarCamara");

    const selfieCanvas =
        document.getElementById("selfieCanvas");

    const selfieResultado =
        document.getElementById("selfieResultado");

    const selfieFotoFinal =
        document.getElementById("selfieFotoFinal");

    const btnRepetirSelfie =
        document.getElementById("btnRepetirSelfie");

    const btnGuardarSelfie =
        document.getElementById("btnGuardarSelfie");


    const marcosSelfie = [

        {
            nombre: "Selfie con Pachorra",
            archivo: "images/selfies/pachorra.png"
        },

        {
            nombre: "Selfie con La Mona",
            archivo: "images/selfies/cuarteto-1.png"
        },

        {
            nombre: "Selfie con Marulín",
            archivo: "images/selfies/marulinmarco.png"
        },

        {
            nombre: "Selfie con El Potro",
            archivo: "images/selfies/cuarteto-2.png"
        },

        {
            nombre: "Selfie con la Paloma Aura",
            archivo: "images/selfies/paloma.png"
        },

        {
            nombre: "Selfie con de hecho 🤓☝️",
            archivo: "images/selfies/gatito-intelectual.png"
        },

        {
            nombre: "Selfie con el Chico Tímido",
            archivo: "images/selfies/chico.png"
        },

        {
            nombre: "Selfie con Gatito Tonto",
            archivo: "images/selfies/gatito-loco.png"
        }

    ];


    let marcoSelfieActual =
        marcosSelfie[0].archivo;

    let streamSelfie = null;
    let camaraSelfie = "user";
    let selfieDataUrl = null;


    function cargarOpcionesSelfie() {

        if (!selfieOpciones) {
            return;
        }

        selfieOpciones.innerHTML = "";

        marcosSelfie.forEach(
            (marco, indice) => {

                const boton =
                    document.createElement("button");

                boton.type = "button";
                boton.className =
                    "selfie-opcion" +
                    (indice === 0 ? " activa" : "");

                boton.innerHTML =
                    `<img src="${marco.archivo}" alt="${marco.nombre}">` +
                    `<span>${marco.nombre}</span>`;

                boton.addEventListener(
                    "click",
                    () => {

                        marcoSelfieActual = marco.archivo;

                        if (selfieMarco) {
                            selfieMarco.src = marco.archivo;
                        }

                        selfieOpciones
                            .querySelectorAll(".selfie-opcion")
                            .forEach(
                                item =>
                                    item.classList.remove("activa")
                            );

                        boton.classList.add("activa");

                        selfieResultado?.classList.add(
                            "selfie-oculto"
                        );

                        selfieDataUrl = null;
                    }
                );

                selfieOpciones.appendChild(boton);
            }
        );
    }


    function detenerCamaraSelfie() {

        if (streamSelfie) {

            streamSelfie
                .getTracks()
                .forEach(track => track.stop());

            streamSelfie = null;
        }

        if (selfieVideo) {
            selfieVideo.srcObject = null;
        }

        selfiePlaceholder?.classList.remove(
            "selfie-placeholder-oculto"
        );

        btnCambiarCamara?.classList.add("selfie-oculto");
        btnSacarSelfie?.classList.add("selfie-oculto");
        btnCerrarCamara?.classList.add("selfie-oculto");

        if (btnActivarCamara) {
            btnActivarCamara.classList.remove("selfie-oculto");
        }
    }


    async function iniciarCamaraSelfie() {

        if (
            !navigator.mediaDevices ||
            !navigator.mediaDevices.getUserMedia
        ) {

            if (selfieEstado) {
                selfieEstado.textContent =
                    "Este navegador no permite usar la cámara desde la página.";
            }

            return;
        }

        detenerCamaraSelfie();

        try {

            streamSelfie =
                await navigator.mediaDevices.getUserMedia({
                    audio: false,
                    video: {
                        facingMode: {
                            ideal: camaraSelfie
                        }
                    }
                });

            if (selfieVideo) {

                selfieVideo.srcObject = streamSelfie;

                await selfieVideo.play();
            }

            selfiePlaceholder?.classList.add(
                "selfie-placeholder-oculto"
            );

            btnActivarCamara?.classList.add("selfie-oculto");
            btnCambiarCamara?.classList.remove("selfie-oculto");
            btnSacarSelfie?.classList.remove("selfie-oculto");
            btnCerrarCamara?.classList.remove("selfie-oculto");

            if (selfieEstado) {
                selfieEstado.textContent =
                    "¡Listo! Acomodate dentro del marco y sacá la foto 📸";
            }
        }

        catch (error) {

            if (selfieEstado) {
                selfieEstado.textContent =
                    "No pude abrir la cámara. Revisá el permiso de cámara del navegador e intentá de nuevo.";
            }
        }
    }


    function cargarImagenSelfie(src) {

        return new Promise(
            (resolve, reject) => {

                const imagen = new Image();

                imagen.onload =
                    () => resolve(imagen);

                imagen.onerror = reject;

                imagen.src = src;
            }
        );
    }


    function dibujarVideoCubriendo(
        contexto,
        video,
        anchoDestino,
        altoDestino,
        espejar
    ) {

        const anchoVideo = video.videoWidth;
        const altoVideo = video.videoHeight;

        if (!anchoVideo || !altoVideo) {
            return false;
        }

        const proporcionVideo =
            anchoVideo / altoVideo;

        const proporcionDestino =
            anchoDestino / altoDestino;

        let sx = 0;
        let sy = 0;
        let sw = anchoVideo;
        let sh = altoVideo;

        if (proporcionVideo > proporcionDestino) {

            sw = altoVideo * proporcionDestino;
            sx = (anchoVideo - sw) / 2;
        }
        else {

            sh = anchoVideo / proporcionDestino;
            sy = (altoVideo - sh) / 2;
        }

        contexto.save();

        if (espejar) {
            contexto.translate(anchoDestino, 0);
            contexto.scale(-1, 1);
        }

        contexto.drawImage(
            video,
            sx,
            sy,
            sw,
            sh,
            0,
            0,
            anchoDestino,
            altoDestino
        );

        contexto.restore();

        return true;
    }


    async function sacarSelfieMarulin() {

        if (
            !selfieCanvas ||
            !selfieVideo ||
            !streamSelfie
        ) {
            return;
        }

        const contexto =
            selfieCanvas.getContext("2d");

        if (!contexto) {
            return;
        }

        contexto.clearRect(
            0,
            0,
            selfieCanvas.width,
            selfieCanvas.height
        );

        const pudoDibujar =
            dibujarVideoCubriendo(
                contexto,
                selfieVideo,
                selfieCanvas.width,
                selfieCanvas.height,
                camaraSelfie === "user"
            );

        if (!pudoDibujar) {

            if (selfieEstado) {
                selfieEstado.textContent =
                    "Esperá un segundo a que cargue la cámara y probá de nuevo.";
            }

            return;
        }

        try {

            const marco =
                await cargarImagenSelfie(marcoSelfieActual);

            contexto.drawImage(
                marco,
                0,
                0,
                selfieCanvas.width,
                selfieCanvas.height
            );

            selfieDataUrl =
                selfieCanvas.toDataURL("image/png");

            if (selfieFotoFinal) {
                selfieFotoFinal.src = selfieDataUrl;
            }

            selfieResultado?.classList.remove(
                "selfie-oculto"
            );

            if (selfieEstado) {
                selfieEstado.textContent =
                    "¡Selfie lista! Podés guardarla o sacar otra 💚";
            }

            selfieResultado?.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        }

        catch (error) {

            if (selfieEstado) {
                selfieEstado.textContent =
                    "No pude cargar el marco. Revisá que las imágenes estén dentro de images/selfies/.";
            }
        }
    }


    cargarOpcionesSelfie();


    btnActivarCamara?.addEventListener(
        "click",
        iniciarCamaraSelfie
    );


    btnCambiarCamara?.addEventListener(
        "click",
        async () => {

            camaraSelfie =
                camaraSelfie === "user"
                    ? "environment"
                    : "user";

            await iniciarCamaraSelfie();
        }
    );


    btnSacarSelfie?.addEventListener(
        "click",
        sacarSelfieMarulin
    );


    btnCerrarCamara?.addEventListener(
        "click",
        () => {

            detenerCamaraSelfie();

            if (selfieEstado) {
                selfieEstado.textContent =
                    "Cámara cerrada. Podés volver a activarla cuando quieras.";
            }
        }
    );


    btnRepetirSelfie?.addEventListener(
        "click",
        () => {

            selfieResultado?.classList.add(
                "selfie-oculto"
            );

            selfieDataUrl = null;

            if (selfieEstado) {
                selfieEstado.textContent =
                    "Acomodate y sacá otra cuando quieras 📸";
            }
        }
    );


    btnGuardarSelfie?.addEventListener(
        "click",
        () => {

            if (!selfieDataUrl) {
                return;
            }

            const enlace =
                document.createElement("a");

            enlace.href = selfieDataUrl;
            enlace.download = "selfie-marulin-verdin.png";

            document.body.appendChild(enlace);
            enlace.click();
            enlace.remove();
        }
    );


    window.addEventListener(
        "pagehide",
        detenerCamaraSelfie
    );



    /* =====================================
       CERRAR MENU AL TOCAR UN LINK
    ====================================== */

    const menuCheck =
        document.getElementById(
            "menu-check"
        );


    document
        .querySelectorAll(
            ".navbar a"
        )
        .forEach(

            enlace => {

                enlace.addEventListener(

                    "click",

                    () => {

                        menuCheck.checked =
                            false;

                    }

                );

            }

        );

});