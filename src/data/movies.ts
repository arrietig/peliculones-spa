export type Genre =
  | "accion"
  | "aventura"
  | "star-wars"
  | "comedia"
  | "terror"
  | "suspenso"
  | "romantico"
  | "drama"
  | "ciencia-ficcion";

export const GENRE_LABELS: Record<Genre, string> = {
  accion: "Acción",
  aventura: "Aventura",
  "star-wars": "Star Wars",
  comedia: "Comedia",
  terror: "Terror",
  suspenso: "Suspenso",
  romantico: "Romántico",
  drama: "Drama",
  "ciencia-ficcion": "Ciencia Ficción",
};

export interface Movie {
  id: number;
  title: string;
  description: string;
  year: number;
  genres: Genre[];
  posterUrl: string;
  trailerUrl: string;
  director: string;
  duration: number;
}

const T = "https://image.tmdb.org/t/p/w500";

export const MOVIES: Movie[] = [
  {
    id: 1,
    title: "Star Wars: Una Nueva Esperanza",
    description:
      "En una galaxia muy, muy lejana, Luke Skywalker se une al movimiento rebelde para combatir al Imperio Galáctico. Junto al piloto Han Solo y la Princesa Leia, deberá destruir la Estrella de la Muerte antes de que el oscuro Lord Vader aplaste cualquier resistencia.",
    year: 1977,
    genres: ["star-wars", "aventura", "ciencia-ficcion"],
    posterUrl: `${T}/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=vZ734NWnAHA",
    director: "George Lucas",
    duration: 121,
  },
  {
    id: 2,
    title: "Star Wars: El Imperio Contraataca",
    description:
      "Tras la destrucción de la Estrella de la Muerte, las fuerzas imperiales persiguen sin tregua a los rebeldes. Luke Skywalker comienza su entrenamiento como Jedi bajo la guía del maestro Yoda, mientras descubre una perturbadora verdad sobre su pasado.",
    year: 1980,
    genres: ["star-wars", "aventura", "ciencia-ficcion"],
    posterUrl: `${T}/nNAeTmF4CtdSgMDplXTDPOpYzsX.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=JNwNXF9Y6kY",
    director: "Irvin Kershner",
    duration: 124,
  },
  {
    id: 3,
    title: "Star Wars: El Retorno del Jedi",
    description:
      "Luke Skywalker y sus aliados rebeldes planean rescatar a Han Solo y destruir la segunda Estrella de la Muerte. El joven Jedi enfrenta su destino al confrontar a Darth Vader y al Emperador en el clímax épico de la saga original.",
    year: 1983,
    genres: ["star-wars", "aventura", "ciencia-ficcion"],
    posterUrl: `${T}/jQYlydvHm3kUix1f8prMucrplhm.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=7ZeltxHFKvM",
    director: "Richard Marquand",
    duration: 131,
  },
  {
    id: 4,
    title: "Rogue One: Una Historia de Star Wars",
    description:
      "Un grupo de rebeldes lleva a cabo una misión suicida para robar los planos de la Estrella de la Muerte. Una historia de sacrificio, esperanza y valentía ambientada justo antes de los eventos de Una Nueva Esperanza.",
    year: 2016,
    genres: ["star-wars", "accion", "ciencia-ficcion"],
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/d/d4/Rogue_One%2C_A_Star_Wars_Story_poster.png",
    trailerUrl: "https://www.youtube.com/watch?v=frdj1zb9sMY",
    director: "Gareth Edwards",
    duration: 133,
  },
  {
    id: 5,
    title: "Star Wars: Los Últimos Jedi",
    description:
      "Rey continúa su camino como Jedi bajo la tutela de un Luke Skywalker que ha perdido la fe. Mientras tanto, Kylo Ren y la Primera Orden acorralan a la Resistencia en su momento más oscuro.",
    year: 2017,
    genres: ["star-wars", "accion", "ciencia-ficcion"],
    posterUrl: `${T}/ySaaKHOLAQU5HoZqWmzDIj1VvZ1.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=7r52oBwKMHc",
    director: "Rian Johnson",
    duration: 152,
  },
  {
    id: 6,
    title: "Top Gun: Maverick",
    description:
      "Después de más de treinta años de servicio, el capitán Pete Maverick Mitchell sigue siendo piloto de combate, evitando el ascenso que lo alejaría de los aviones. Al ser enviado a entrenar a un escuadrón de graduados de Top Gun, deberá enfrentar los fantasmas del pasado.",
    year: 2022,
    genres: ["accion", "aventura"],
    posterUrl: `${T}/n0YuM4f5lvGAP6MAW2kBIzugXnc.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=giXco2jaZ_4",
    director: "Joseph Kosinski",
    duration: 130,
  },
  {
    id: 7,
    title: "The Batman",
    description:
      "En su segundo año como vigilante de Gotham, Bruce Wayne investiga la corrupción que pudre la ciudad cuando un asesino en serie conocido como El Acertijo comienza a eliminar figuras políticas. Una oscura exploración del origen del Caballero Oscuro.",
    year: 2022,
    genres: ["accion", "suspenso"],
    posterUrl: `${T}/74xTEgt7R36Fpooo50r9T25onhq.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=mqqft2x_Aa4",
    director: "Matt Reeves",
    duration: 176,
  },
  {
    id: 8,
    title: "John Wick: Capítulo 4",
    description:
      "John Wick descubre un camino para vencer a la Gran Mesa, pero antes debe enfrentarse a un nuevo enemigo con poderosas alianzas en todo el mundo. Una batalla épica a través de París, Osaka y Berlín que llevará al mítico asesino hasta sus límites.",
    year: 2023,
    genres: ["accion"],
    posterUrl: `${T}/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=qEVUtrk8_B4",
    director: "Chad Stahelski",
    duration: 169,
  },
  {
    id: 9,
    title: "Misión: Imposible - Sentencia Mortal",
    description:
      "Ethan Hunt y su equipo deben rastrear una aterradora nueva arma antes de que caiga en manos equivocadas. El agente del FMI se verá obligado a elegir entre proteger a sus aliados o salvar al mundo, en la misión más peligrosa de su vida.",
    year: 2023,
    genres: ["accion", "suspenso", "aventura"],
    posterUrl: `${T}/NNxYkU70HPurnNCSiCjYAmacwm.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=avz06PDqDbM",
    director: "Christopher McQuarrie",
    duration: 163,
  },
  {
    id: 10,
    title: "Fast X",
    description:
      "Dom Toretto y su familia se enfrentan a Dante, el hijo del narcotraficante Hernan Reyes, que busca venganza a cualquier precio. Una batalla global lleva al equipo al límite de sus capacidades en la décima entrega de la saga más veloz del cine.",
    year: 2023,
    genres: ["accion", "aventura"],
    posterUrl: `${T}/fiVW06jE7z9YnO4trhaMEdclSiC.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=aOb15GVluOw",
    director: "Louis Leterrier",
    duration: 141,
  },
  {
    id: 11,
    title: "Avatar: El Camino del Agua",
    description:
      "Jake Sully y Neytiri han formado una familia y hacen todo lo posible por permanecer juntos. Sin embargo, deben abandonar su hogar cuando una antigua amenaza resurge. Un viaje visual impresionante a los mares de Pandora.",
    year: 2022,
    genres: ["aventura", "ciencia-ficcion"],
    posterUrl: `${T}/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=a8Gx8wiNbs8",
    director: "James Cameron",
    duration: 192,
  },
  {
    id: 12,
    title: "Indiana Jones y el Dial del Destino",
    description:
      "El legendario arqueólogo Indiana Jones hace su regreso en una emocionante carrera contra el tiempo para recuperar un artefacto poderoso que podría cambiar el curso de la historia. La última aventura del profesor Jones.",
    year: 2023,
    genres: ["aventura", "accion"],
    posterUrl: `${T}/c6H7Z4u73ir3cIoCteuhJh7UCAR.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=KDiJzS_Huts",
    director: "James Mangold",
    duration: 154,
  },
  {
    id: 13,
    title: "El Señor de los Anillos: La Comunidad del Anillo",
    description:
      "El joven hobbit Frodo Bolsón hereda el Anillo Único, forjado por el Señor Oscuro Sauron para dominar la Tierra Media. Junto a una heterogénea compañía, emprenderá un viaje épico para destruirlo en las llamas del Monte del Destino.",
    year: 2001,
    genres: ["aventura", "drama"],
    posterUrl: `${T}/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=V75dAPMKEo4",
    director: "Peter Jackson",
    duration: 228,
  },
  {
    id: 14,
    title: "Jurassic World: El Reino Caído",
    description:
      "Cuando el volcán de la Isla Nublar entra en erupción, Owen y Claire regresan para salvar a los dinosaurios. Lo que descubren allí los lleva a una aventura más peligrosa que nadie pudo haber imaginado, con consecuencias globales.",
    year: 2018,
    genres: ["aventura", "accion", "ciencia-ficcion"],
    posterUrl: `${T}/c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=vn3IPmcVmvM",
    director: "J.A. Bayona",
    duration: 128,
  },
  {
    id: 15,
    title: "Superbad",
    description:
      "Dos mejores amigos en su último año de preparatoria intentan conseguir alcohol para una fiesta e impresionar a las chicas que les gustan. Lo que empieza como un plan sencillo se convierte en una noche caótica e inolvidable llena de situaciones ridículas.",
    year: 2007,
    genres: ["comedia"],
    posterUrl: `${T}/ek8e8txUyUwd2BNqj6lFEerJfbq.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=4eB_DNANUhQ",
    director: "Greg Mottola",
    duration: 113,
  },
  {
    id: 16,
    title: "¿Qué Pasó Ayer?",
    description:
      "Tras una noche desenfrenada en Las Vegas, tres amigos despiertan sin recordar absolutamente nada de lo ocurrido. Con un tigre en el baño y sin encontrar al novio, deberán reconstruir la noche más loca de sus vidas antes de la boda.",
    year: 2009,
    genres: ["comedia"],
    posterUrl: `${T}/uluhlXubGu1VxU63X9VHCLWDAYP.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=8J5LJ-3bpFg",
    director: "Todd Phillips",
    duration: 100,
  },
  {
    id: 17,
    title: "Loco por Mary",
    description:
      "Ted lleva trece años pensando en Mary, su primer amor de la preparatoria. Cuando contrata a un detective privado para encontrarla, la situación se complica de manera absurda e hilarante de formas que nadie podría anticipar.",
    year: 1998,
    genres: ["comedia", "romantico"],
    posterUrl: `${T}/41bMmglWT72OaRXrMROEyksOf3J.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=Zu9a29UR3VM",
    director: "Peter y Bobby Farrelly",
    duration: 119,
  },
  {
    id: 18,
    title: "La Propuesta",
    description:
      "Una poderosa editora canadiense le propone matrimonio a su asistente para evitar ser deportada de los Estados Unidos. Lo que comienza como un arreglo de conveniencia se complica cuando viajan juntos a Alaska y los sentimientos surgen.",
    year: 2009,
    genres: ["comedia", "romantico"],
    posterUrl: `${T}/6stnAm1wSek8ZrislwK4xGTyCnt.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=kFEBCuZ0lQY",
    director: "Anne Fletcher",
    duration: 108,
  },
  {
    id: 19,
    title: "Get Out: Huye",
    description:
      "Chris, un joven afroamericano, viaja con su novia para conocer a la familia de ella. Lo que parece una visita familiar normal pronto revela una perturbadora conspiración que pondrá en peligro su vida en esta joya del terror social.",
    year: 2017,
    genres: ["terror", "suspenso"],
    posterUrl: `${T}/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=DzfpyUB60YY",
    director: "Jordan Peele",
    duration: 104,
  },
  {
    id: 20,
    title: "Hereditary: El Legado del Diablo",
    description:
      "Cuando la matriarca de la familia Graham muere, su hija y nietos empiezan a desenredar secretos aterradores sobre su linaje. Cuanto más descubren, más desesperada se vuelve su situación en esta devastadora película de terror.",
    year: 2018,
    genres: ["terror"],
    posterUrl: `${T}/hjlZSXM86wJrfCv5VKfR5DI2VeU.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=V6wWKNij_1M",
    director: "Ari Aster",
    duration: 127,
  },
  {
    id: 21,
    title: "It: La Cosa - Capítulo Uno",
    description:
      "En el pueblo de Derry, Maine, un grupo de niños conocido como el Club de los Perdedores enfrenta sus miedos más profundos encarnados en un payaso demoníaco llamado Pennywise, quien emerge cada 27 años para aterrorizar a la comunidad.",
    year: 2017,
    genres: ["terror"],
    posterUrl: `${T}/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=xKJmEC5ieOk",
    director: "Andy Muschietti",
    duration: 135,
  },
  {
    id: 22,
    title: "Nope",
    description:
      "Los habitantes de un valle remoto de California son testigos de un fenómeno inexplicable en el cielo. Dos hermanos intentan capturar evidencia de lo que parece ser un OVNI, sin imaginar el peligro que los acecha en esta perturbadora película.",
    year: 2022,
    genres: ["terror", "ciencia-ficcion"],
    posterUrl: `${T}/hU42CRk14JuPEdqZG3AWmagiPAP.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=In8fuzj3gck",
    director: "Jordan Peele",
    duration: 130,
  },
  {
    id: 23,
    title: "El Exorcista",
    description:
      "Una niña de doce años comienza a mostrar signos alarmantes de posesión demoníaca. Su madre desesperada recurre a dos sacerdotes para que realicen un exorcismo. Considerada una de las películas de terror más aterradoras jamás filmadas.",
    year: 1973,
    genres: ["terror"],
    posterUrl: `${T}/5x0CeVHJI8tcDx8tUUwYHQSNILq.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=YDGw1MTEe4o",
    director: "William Friedkin",
    duration: 122,
  },
  {
    id: 24,
    title: "Knives Out: A Cuchillo",
    description:
      "El famoso detective Benoit Blanc investiga la muerte del novelista Harlan Thrombey en su mansión. Cuando todos los excéntricos miembros de su familia son sospechosos, el caso da giros inesperados en esta brillante comedia negra de misterio.",
    year: 2019,
    genres: ["suspenso", "comedia"],
    posterUrl: `${T}/pThyQovXQrw2m0s9x82twj48Jq4.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=qGqiHJTsRkQ",
    director: "Rian Johnson",
    duration: 130,
  },
  {
    id: 25,
    title: "Tenet",
    description:
      "Un agente secreto aprende a manipular el flujo del tiempo para prevenir un ataque que amenaza con destruir el mundo. Una odisea de espionaje que desafía las leyes de la física, donde el pasado y el futuro colisionan.",
    year: 2020,
    genres: ["suspenso", "accion", "ciencia-ficcion"],
    posterUrl: `${T}/aCIFMriQh8rvhxpN1IWGgvH0Tlg.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=L3pk_TBkihU",
    director: "Christopher Nolan",
    duration: 150,
  },
  {
    id: 26,
    title: "El Menú",
    description:
      "Una joven pareja viaja a una isla remota para cenar en un exclusivo restaurante donde el excéntrico chef ha preparado un menú con sorpresas mortales. Una oscura sátira sobre el mundo culinario de lujo que mezcla el suspenso con la crítica social.",
    year: 2022,
    genres: ["suspenso", "drama"],
    posterUrl: `${T}/fPtUgMcLIboqlTlPrq0bQpKK8eq.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=8hFe_hNBDrQ",
    director: "Mark Mylod",
    duration: 107,
  },
  {
    id: 27,
    title: "Presencia del Mal",
    description:
      "Un escritor de crímenes reales descubre películas de Super 8 que muestran asesinatos de familias. Al investigar los crímenes, despierta una fuerza oscura y sobrenatural que acecha a los niños. Una película de terror que se instala bajo la piel.",
    year: 2012,
    genres: ["terror", "suspenso"],
    posterUrl: `${T}/yp0ETFVmyg4XLiCy6OMnHHHvmPv.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=jv_MUvAeR40",
    director: "Scott Derrickson",
    duration: 110,
  },
  {
    id: 28,
    title: "La La Land",
    description:
      "Una aspirante a actriz y un pianista de jazz se enamoran en Los Ángeles mientras persiguen sus sueños. Un musical moderno que celebra a los soñadores y explora el doloroso precio que cobra la ambición, con actuaciones magnéticas y música irresistible.",
    year: 2016,
    genres: ["romantico", "drama"],
    posterUrl: `${T}/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=0pdqf4P9MB8",
    director: "Damien Chazelle",
    duration: 128,
  },
  {
    id: 29,
    title: "Diario de una Pasión",
    description:
      "Un hombre mayor narra la historia de amor entre Noah y Allie, dos jóvenes de clases sociales distintas que se conocen en los años 40. Separados por las circunstancias, su amor pone a prueba si las almas verdaderamente destinadas siempre se encuentran.",
    year: 2004,
    genres: ["romantico", "drama"],
    posterUrl: `${T}/rNzQyW4f8B8cQeg7Dgj3n6eT5k9.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=lon7hJAFClE",
    director: "Nick Cassavetes",
    duration: 123,
  },
  {
    id: 30,
    title: "Titanic",
    description:
      "A bordo del famoso transatlántico, Jack y Rose, dos jóvenes de mundos distintos, se enamoran perdidamente durante la travesía inaugural del Titanic. Una historia de amor épica enmarcada en una de las mayores tragedias marítimas de la historia.",
    year: 1997,
    genres: ["romantico", "drama"],
    posterUrl: `${T}/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=2e-eXJ6HgkQ",
    director: "James Cameron",
    duration: 194,
  },
  {
    id: 31,
    title: "Oppenheimer",
    description:
      "La historia del físico J. Robert Oppenheimer y su papel en el desarrollo de la bomba atómica durante la Segunda Guerra Mundial. Un retrato íntimo y épico de un hombre que cambió el mundo para siempre, cargando con el peso de esa decisión toda su vida.",
    year: 2023,
    genres: ["drama"],
    posterUrl: `${T}/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=uYPbbksJxIg",
    director: "Christopher Nolan",
    duration: 180,
  },
  {
    id: 32,
    title: "El Padrino",
    description:
      "Don Vito Corleone, cabeza de una poderosa familia mafiosa, transfiere el control de su vasto imperio criminal a su reacio hijo Michael. Un retrato magistral del crimen organizado, la lealtad familiar y la corrupción moral que define el cine de todos los tiempos.",
    year: 1972,
    genres: ["drama"],
    posterUrl: `${T}/3bhkrj58Vtu7enYsRolD1fZdja1.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=sY1S34973zA",
    director: "Francis Ford Coppola",
    duration: 175,
  },
  {
    id: 33,
    title: "Forrest Gump",
    description:
      "Forrest Gump, un hombre con un coeficiente intelectual bajo pero un corazón inmenso, narra su vida extraordinaria que lo llevó a ser testigo de los eventos históricos más importantes de los Estados Unidos entre los años 50 y 80.",
    year: 1994,
    genres: ["drama"],
    posterUrl: `${T}/Cw4hIUIAmSYfK9QfaUW5igp9La.jpg`,
    trailerUrl: "https://www.youtube.com/watch?v=bLvqoHBptjg",
    director: "Robert Zemeckis",
    duration: 142,
  },
];
