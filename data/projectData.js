const PROJECT_DATA = {
  metadata: {
    codigo: "SGPS-SENNOVA-CTM-2026-2028",
    nombreCorto: "Geodome Smart",
    nombreCompleto: "Geodome Smart: Alojamiento Ecoturístico Inteligente con Gemelo Digital Integrado",
    centroFormacion: "CENTRO TECNOLÓGICO DEL MOBILIARIO",
    ambienteBase: "Ambiente 107 - Medialab & Talleres de Fabricación Digital CNC",
    fechaFeria: "Primera semana de Mayo de 2028 (INTERZUM Bogotá)",
    presupuestoTotal: 318000000,
    escalaPrototipo: "Prototipo Funcional a Escala + Gemelo Digital VR (Unity)",
    liderProyecto: "Alex Zapata",
    equipo: [
      { nombre: "Alex Zapata", rol: "Líder de Proyecto / Domótica IoT / Gemelo Digital VR", dependencia: "Medialab - CTM" },
      { nombre: "V. Cardona", rol: "Integración Tecnológica / Energía Solar / Gemelo Digital VR", dependencia: "Medialab - CTM" },
      { nombre: "W. Tibavija", rol: "Diseño y Modelado Estructura", dependencia: "CTM" },
      { nombre: "A. Hassan", rol: "Diseño y Fabricación Estructural CNC", dependencia: "CTM" },
      { nombre: "A. Londoño", rol: "Diseño Estructural y Cerramientos", dependencia: "CTM" }
    ]
  },

  // CONTENIDOS EXACTOS Y LITERALES DE LA PLANTILLA MGA ADJUNTA (BASE ORIGINAL)
  formulacionMGA: [
    {
      numeral: "1",
      titulo: "1. IDENTIFICACIÓN DEL PROYECTO",
      categoria: "Plantilla MGA",
      estadoRevision: "En Revisión",
      observacionesComite: "",
      campos: [
        {
          id: "1.1",
          etiqueta: "NOMBRE DEL PROYECTO",
          tipo: "texto",
          valor: "Geodome Smart: Alojamiento Ecoturístico Inteligente con Gemelo Digital Integrado"
        },
        {
          id: "1.2",
          etiqueta: "NOMBRE DEL CENTRO DE FORMACIÓN",
          tipo: "texto",
          valor: "CENTRO TECNOLÓGICO DEL MOBILIARIO"
        },
        {
          id: "1.3",
          etiqueta: "NOMBRE DE ENTIDAD O ENTIDADES ALIADAS",
          tipo: "texto",
          valor: "Indique el nombre de la entidad aliada, (en el caso de que aplique)"
        },
        {
          id: "1.4",
          etiqueta: "Tipo de entidad aliada",
          tipo: "texto",
          valor: ""
        },
        {
          id: "1.5",
          etiqueta: "Naturaleza de la entidad",
          tipo: "texto",
          valor: ""
        },
        {
          id: "1.6",
          etiqueta: "Tipo de empresa",
          tipo: "texto",
          valor: ""
        },
        {
          id: "1.7",
          etiqueta: "NIT",
          tipo: "texto",
          valor: ""
        },
        {
          id: "1.8",
          etiqueta: "La entidad aliada tiene algun grupo de investigación",
          tipo: "texto",
          valor: ""
        },
        {
          id: "1.9",
          etiqueta: "Recursos en especie de la entidad aliada ($)",
          tipo: "texto",
          valor: "$"
        },
        {
          id: "1.10",
          etiqueta: "Descripcion de los recursos en especie aportados",
          tipo: "parrafo",
          valor: ""
        },
        {
          id: "1.11",
          etiqueta: "Descripcion de la destinacion del dinero aportado",
          tipo: "parrafo",
          valor: ""
        },
        {
          id: "1.12",
          etiqueta: "Metodologia o actividades de transferencia al Centro de Formación",
          tipo: "parrafo",
          valor: ""
        },
        {
          id: "1.13",
          etiqueta: "BENEFICIADOS CON EL PROYECTO",
          tipo: "parrafo",
          valor: `Beneficiarios Directos:

Aprendices del CTM: Los aprendices de los programas de diseño, ebanistería, automatización y sistemas, quienes desarrollarán competencias de alto valor técnico al integrar domótica de código abierto (Home Assistant/ESPHome) en infraestructuras modulares de madera.  

Instructores del CTM: El equipo docente que lidera la investigación aplicada, al fortalecer sus capacidades en la implementación de tecnologías IoT (Internet de las Cosas) aplicadas a la construcción sostenible.

Área de Infraestructura y Servicios del CTM: Mediante la adopción de un modelo operativo inteligente que puede escalarse para la gestión de otros ambientes físicos del centro.

Beneficiarios Indirectos:

Sector Ecoturístico Regional: Prestadores de servicios turísticos rurales que podrán adoptar este modelo de domótica para mejorar el confort, la seguridad y la eficiencia energética de sus alojamientos, aumentando su competitividad.  Comunidad local y economía popular: 

Microempresas de construcción modular y servicios de integración tecnológica que recibirán transferencia de conocimiento sobre sistemas de automatización accesibles, escalables y sin costos de licenciamiento.  

Sector de Construcción Sostenible: Actores del ecosistema de construcción "off-site" y edificación en madera, quienes contarán con un referente técnico comprobado para la incorporación de sistemas inteligentes en estructuras de alto desempeño.`
        },
        {
          id: "1.14",
          etiqueta: "EL PROYECTO FORMULADO SE DA EN RESPUESTA A UNA QUERELLA",
          tipo: "texto",
          valor: ""
        }
      ]
    },
    {
      numeral: "2",
      titulo: "2. RESUMEN EJECUTIVO",
      categoria: "Plantilla MGA",
      estadoRevision: "En Revisión",
      observacionesComite: "",
      campos: [
        {
          id: "2.1",
          etiqueta: "RESUMEN EJECUTIVO",
          tipo: "parrafo",
          valor: `"Este proyecto propone el desarrollo de un modelo de operación inteligente mediante domótica integrada para infraestructuras ecoturísticas modulares. El propósito central es fortalecer las competencias técnicas en Construcción 4.0 mediante la creación de un modelo transferible de enseñanza-aprendizaje, orientado a optimizar las condiciones de confort, seguridad y eficiencia energética en alojamientos sostenibles. A través de este prototipo, se busca superar la brecha técnica en la gestión y monitoreo automatizado de este tipo de edificaciones, proporcionando una base metodológica estandarizada para la formación avanzada en el sector de la madera.

Para su ejecución, el proyecto adopta una metodología rigurosa que implementa flujos de trabajo avanzados en BIM (Building Information Modeling) y el desarrollo de Gemelos Digitales para la virtualización, simulación y supervisión técnica del comportamiento de la infraestructura. El proceso de construcción sigue un esquema de fabricación híbrida que articula el mecanizado industrializado por CNC de alta precisión con técnicas de carpintería convencional para el ensamble off-site de la estructura de marcos rígidos de madera.

Sobre esta base física y digital, la capa tecnológica se fundamenta en una arquitectura de automatización abierta, modular y escalable basada en Home Assistant, ESPHome y microcontroladores ESP32, eliminando costos de licenciamiento de software propietario. El sistema resolverá problemas críticos de habitabilidad mediante la gestión automática de la ventilación cenital por estratificación térmica, la mitigación de riesgos de incendio mediante sensores de contacto en ductos de evacuación de chimeneas, el monitoreo del consumo eléctrico en sistemas híbridos/solares y la gestión remota del acceso para huéspedes.

Como resultados principales, se entregará un prototipo funcional validado de domo ecoturístico inteligente integrado a su respectivo gemelo digital y un conjunto de protocolos técnicos estandarizados de fácil adopción académica y profesional. Este entregable facilitará una transferencia tecnológica efectiva que eleve la competitividad, seguridad y sostenibilidad operativa de los prestadores de servicios turísticos e industrias de la madera en la región, posicionando al SENA como referente en la formación de talento humano capaz de liderar la transición hacia la construcción industrializada inteligente.

Este proyecto ha sido concebido y desarrollado con la proyección estratégica de ser presentado como una solución innovadora en la feria INTERZUM BOGOTÁ 2028, donde se demostrará el potencial de la integración entre construcción industrializada, fabricación digital y tecnologías inteligentes aplicadas al sector."`
        }
      ]
    },
    {
      numeral: "3",
      titulo: "3. PALABRAS CLAVE",
      categoria: "Plantilla MGA",
      estadoRevision: "En Revisión",
      observacionesComite: "",
      campos: [
        {
          id: "3.1",
          etiqueta: "PALABRAS CLAVE",
          tipo: "parrafo",
          valor: `Domótica

Ecoturismo

Fabricación industrializada

Gemelos digitales

BIM (Building Information Modeling)

Construcción sostenible`
        }
      ]
    },
    {
      numeral: "4",
      titulo: "4. ALINEACIÓN CON PLAN NACIONAL DE DESARROLLO, PLAN ESTRATEGICO INSTITUCIONAL Y LÍNEA TECNOLOGICA",
      categoria: "Plantilla MGA",
      estadoRevision: "En Revisión",
      observacionesComite: "",
      campos: [
        {
          id: "4.1",
          etiqueta: "PLAN NACIONAL DE DESARROLLO",
          tipo: "parrafo",
          valor: `Se alinea con el eje de "Transformación Productiva, Internacionalización y Acción Climática", específicamente en la promoción de la reindustrialización mediante el uso de tecnologías digitales (IoT) y la sostenibilidad en el sector construcción y turismo rural.`
        },
        {
          id: "4.2",
          etiqueta: "PLAN ESTRATEGICO INSTITUCIONAL",
          tipo: "parrafo",
          valor: `Apunta al objetivo de "Fortalecer la calidad y pertinencia de la formación profesional integral" mediante la integración de tecnologías 4.0, fomentando la investigación aplicada y la transferencia tecnológica al sector productivo.`
        },
        {
          id: "4.3",
          etiqueta: "LÍNEA(S) TECNOLÓGICA(S): (Agregue o elimine la cantidad de líneas que correspondan con el proyecto formulado)",
          tipo: "parrafo",
          valor: `Línea de TICs e Inteligencia Artificial
Línea de Producción y Transformación
Línea de Diseño de Productos
Línea de economía popular y campesina`
        }
      ]
    },
    {
      numeral: "5",
      titulo: "5. IDENTIFICACIÓN Y DESCRIPCIÓN DEL PROBLEMA",
      categoria: "Plantilla MGA",
      estadoRevision: "En Revisión",
      observacionesComite: "",
      campos: [
        {
          id: "5.1",
          etiqueta: "5.1 Problema central",
          tipo: "parrafo",
          valor: `"Desarticulación técnica entre la construcción híbrida de marcos rígidos y los sistemas de automatización (IoT), lo que restringe el desarrollo de un prototipo funcional capaz de gestionar autónomamente variables críticas de confort, seguridad y eficiencia energética en infraestructuras para el ecoturismo."`
        },
        {
          id: "5.2",
          etiqueta: "5.2 Descripción del problema y la situación existente",
          tipo: "parrafo",
          valor: `1. Características de la zona de estudio

El proyecto se circunscribe al territorio colombiano, específicamente orientado a zonas rurales de topografía diversa donde se emplazan infraestructuras ecoturísticas modulares. Estas zonas se caracterizan por presentar condiciones climáticas variables que exigen altos estándares de aislamiento y confort térmico, sumado a una desconexión o inestabilidad en las redes de servicios públicos convencionales. La zona de estudio se define por una vocación turística creciente que demanda alojamientos sostenibles, seguros y tecnológicamente integrados.

2. Análisis de los factores del problema y sus relaciones

El problema central radica en la desarticulación técnica entre la construcción híbrida de marcos rígidos y los sistemas de automatización (IoT). Este fenómeno se explica por la interdependencia de los siguientes factores:

Factor de Diseño y Fabricación: A pesar de utilizar flujos BIM, gemelos digitales y mecanizado CNC, el diseño no integra desde su concepción la infraestructura pasiva con la activa (domótica). Esto genera una brecha técnica donde la carpintería convencional y la tecnología funcionan como elementos aislados.

Factor de Operatividad y Confort: La falta de una gestión unificada deriva en una incapacidad para controlar variables críticas de habitabilidad como la temperatura, la calidad del aire, la seguridad contra incendios en estufas de leña, la gestión de la iluminación inteligente y el consumo energético en sistemas aislados (solares/híbridos).

Relación causa-efecto: La relación entre estos factores es directa: al no existir una integración técnica en el proceso de fabricación, el resultado es un prototipo con un desempeño operativo subóptimo, lo que impide una experiencia de usuario competitiva y segura.

3. Evolución reciente de la situación negativa
Históricamente, la construcción de domos en madera ha priorizado exclusivamente la respuesta estructural y estética sobre la funcionalidad tecnológica. En los últimos años, con el auge del turismo inteligente y el aumento de los riesgos climáticos y de seguridad en zonas remotas, esta desarticulación se ha agudizado. La situación ha evolucionado desde una simple falta de comodidades hacia una vulnerabilidad crítica donde los alojamientos actuales no logran responder a los estándares de eficiencia energética y seguridad exigidos por el mercado moderno. La brecha se ha hecho más evidente al intentar escalar prototipos artesanales hacia una producción industrializada sin una hoja de ruta tecnológica clara.

4. Intervenciones realizadas diferentes a la que se proponen
Anteriormente se han ejecutado intervenciones aisladas que no han logrado resolver el problema de fondo:

Automatización Post-construcción: Instalación de dispositivos domóticos como elementos externos ("parches" comerciales) después de terminada la edificación. Estas intervenciones fallan porque no están integradas al flujo de trabajo BIM ni al gemelo digital, generando conflictos de compatibilidad y altos costos de mantenimiento.

Construcción Industrializada sin Tecnología: Proyectos enfocados exclusivamente en la eficiencia del corte CNC y el ensamble off-site, que omiten la capa de automatización, resultando en infraestructuras rígidas que requieren intervención humana constante para su operación básica.

Sistemas Propietarios de Alto Costo: Implementación de soluciones domóticas cerradas que dependen de licencias costosas y soporte técnico externo, lo que las hace financieramente inviables para el sector de la economía popular y el ecoturismo regional.`
        },
        {
          id: "5.3",
          etiqueta: "5.3. Magnitud actual del problema indicadores de referencia",
          tipo: "parrafo",
          valor: `Indicador
Porcentaje de proyectos que logran integrar con éxito la fabricación digital con sistemas de control inteligente para uso real en el sector

Valor actual (Línea base)
10% (nivel de madurez alcanzado en la actualidad)

Fuente de verificación
Diagnóstico técnico de proyectos de transferencia tecnológica del sector madera y construcción.`
        },
        {
          id: "5.4",
          etiqueta: "Árbol de problemas - Efectos indirectos",
          tipo: "parrafo",
          valor: `• Baja competitividad y menor rentabilidad del sector ecoturístico al no adoptar estándares de construcción inteligente (4.0).
• Rezago tecnológico en la transferencia de conocimiento de instituciones de formación hacia el sector productivo de la madera.
• Incremento en la percepción de inseguridad y deficiencias de confort en alojamientos ecoturísticos, afectando la experiencia del huésped.`
        },
        {
          id: "5.5",
          etiqueta: "Árbol de problemas - Efectos directos",
          tipo: "parrafo",
          valor: `• Dificultad para escalar prototipos: El desarrollo de soluciones modulares queda limitado a unidades artesanales sin capacidad de replicación técnica.
• Operación manual insuficiente: Incapacidad de gestionar variables críticas (iluminación, temperatura, seguridad) de forma autónoma.
• Brecha de datos: Ausencia de un "gemelo digital" que permita monitorear, diagnosticar y predecir el comportamiento de la infraestructura.`
        },
        {
          id: "5.6",
          etiqueta: "Árbol de problemas - Problema central",
          tipo: "parrafo",
          valor: `"Desarticulación técnica entre la construcción híbrida de marcos rígidos y los sistemas de automatización (IoT), lo que restringe el desarrollo de un prototipo funcional capaz de gestionar autónomamente variables críticas de confort, seguridad y eficiencia energética en infraestructuras para el ecoturismo."`
        },
        {
          id: "5.7",
          etiqueta: "Árbol de problemas - Causas directas",
          tipo: "parrafo",
          valor: `• Metodologías de diseño desarticuladas: Falta de flujos de trabajo BIM que integren desde la fase inicial de diseño los componentes de automatización.
• Protocolos de fabricación incompletos: Inexistencia de procesos estandarizados en mecanizado CNC que contemplen la integración de sensores y cableado.
• Desconexión entre disciplinas: Brecha de comunicación técnica entre el sector de la carpintería/construcción y el área de electrónica/tecnología.`
        },
        {
          id: "5.8",
          etiqueta: "Árbol de problemas - Causas indirectas",
          tipo: "parrafo",
          valor: `• Insuficiencia de programas de formación: Falta de currículos que articulen competencias de construcción avanzada con tecnologías 4.0.
• Deficiencia en la investigación aplicada: Escasos proyectos que validen la integración de hardware abierto (ESP32, Home Assistant) en entornos constructivos reales.
• Falta de cultura técnica de innovación: Resistencia o desconocimiento en la industria de la madera sobre las ventajas operativas de la digitalización del producto físico.`
        }
      ]
    },
    {
      numeral: "6",
      titulo: "6. ANTECEDENTES",
      categoria: "Plantilla MGA",
      estadoRevision: "En Revisión",
      observacionesComite: "",
      campos: [
        {
          id: "6.1",
          etiqueta: "ANTECEDENTES",
          tipo: "parrafo",
          valor: `La problemática de la integración tecnológica en estructuras modulares de madera ha sido objeto de diversas iniciativas, cuya evolución permite sustentar la pertinencia de este proyecto.

Nivel Internacional
En el ámbito global, el uso de metodologías BIM (Building Information Modeling) para la gestión de edificaciones ha avanzado significativamente hacia la integración de Gemelos Digitales (Digital Twins). Iniciativas en Europa (especialmente en países nórdicos y Alemania) han desarrollado estructuras prefabricadas de madera con altos estándares de eficiencia energética. Sin embargo, la mayoría de estos desarrollos dependen de tecnologías propietarias (licenciamiento cerrado) y procesos industriales de altísimo costo, lo que limita su transferencia técnica a entornos de ecoturismo en contextos latinoamericanos.

Nivel Nacional
En Colombia, diversas entidades y centros de investigación han liderado proyectos sobre construcción industrializada y carpintería de precisión. Se han documentado esfuerzos por implementar estructuras modulares mediante mecanizado CNC para el sector de la vivienda rural y el mobiliario. No obstante, estos proyectos se han centrado mayoritariamente en la eficiencia constructiva física, dejando de lado la capa de automatización y control inteligente (IoT). Las intervenciones nacionales han carecido de un flujo de trabajo que conecte la fabricación digital con el monitoreo en tiempo real, resultando en prototipos que no alcanzan un nivel de madurez tecnológica (TRL) que permita la operación autónoma.

Nivel Departamental y Municipal (Antioquia / SENA)
A nivel regional, el SENA Centro Tecnológico del Mobiliario (CTM) ha fomentado el uso de fabricación digital y prototipado de estructuras en madera. Experiencias previas en la institución han validado la capacidad de producir piezas de alta precisión mediante CNC, pero han identificado como cuello de botella la integración de sistemas domóticos abiertos (Home Assistant/ESPHome). Se han realizado intentos de domotización mediante sensores comerciales aislados; sin embargo, no se han estandarizado protocolos técnicos que permitan la integración nativa entre el diseño de la estructura y su sistema de gestión inteligente.

Pertinencia de la propuesta
Los resultados de estas iniciativas previas ilustran una brecha clara: la industria domina la construcción modular, pero carece de un modelo técnico para "hacerla inteligente" de manera eficiente, económica y replicable. Este proyecto es pertinente porque trasciende las soluciones aisladas existentes, proponiendo un flujo de trabajo unificado que integra:

Diseño digital avanzado (BIM).

Fabricación híbrida (CNC + Carpintería) con pre-integración de hardware.

Sistema de control abierto (domótica) que elimina barreras de licenciamiento y facilita la transferencia tecnológica al sector ecoturístico.`
        }
      ]
    },
    {
      numeral: "7",
      titulo: "7. JUSTIFICACIÓN",
      categoria: "Plantilla MGA",
      estadoRevision: "En Revisión",
      observacionesComite: "",
      campos: [
        {
          id: "7.1",
          etiqueta: "JUSTIFICACIÓN",
          tipo: "parrafo",
          valor: `La viabilidad de este proyecto radica en la necesidad de integrar la fabricación industrializada de madera (marcos rígidos y elementos estructurales) con una capa de inteligencia operativa (IoT) que, hasta ahora, se ha desarrollado como un elemento externo y desconectado. La justificación de esta propuesta se basa en tres pilares técnicos:

1. Sinergia entre estructura y automatización (Ciber-física):
A diferencia de proyectos que abordan la estructura en madera simplemente como un elemento estático, este proyecto trata la edificación como un sistema vivo. La justificación reside en la integración nativa: el diseño estructural (BIM) contempla desde su concepción los alojamientos para sensores, actuadores y cableado, lo que garantiza que la domótica no sea un "añadido", sino parte del ADN de la estructura. Esto permite que el domo responda físicamente (ventilación por estratificación) a las condiciones ambientales detectadas por el sistema inteligente.

2. Innovación en el proceso formativo e investigativo:
El proyecto justifica su ejecución en la urgencia de formar talento humano capaz de dominar el "gemelo digital" aplicado. Los aprendices no solo aprenderán a fabricar piezas por CNC, sino a implementar una infraestructura de control con arquitecturas abiertas (ESP32, Home Assistant). Esta combinación es crítica para el sector: el operario moderno debe entender tanto la resistencia estructural como la lógica de programación del sistema que hará segura y eficiente esa estructura. Este es el diferenciador que separa este proyecto de una construcción tradicional.

3. Pertinencia y viabilidad territorial:

A Corto Plazo: El proyecto es viable al capitalizar la infraestructura de fabricación digital del SENA. La novedad técnica se centra en el desarrollo del protocolo de integración (la "receta" para unir CNC + domótica), un entregable de investigación que no existe actualmente en el portafolio formativo y que es replicable en cualquier centro de formación o empresa del sector.

A Mediano Plazo: Su impacto en el sector ecoturístico es directo. Al proporcionar un modelo de alojamiento que gestiona autónomamente su seguridad (detección temprana de fallas en sistemas de calefacción/combustión) y su eficiencia energética (gestión de iluminación y carga solar), el proyecto entrega una solución técnica que resuelve los puntos de dolor más costosos para los operadores ecoturísticos en zonas de difícil acceso.

A Largo Plazo: La propuesta establece un nuevo paradigma en la construcción modular industrializada. Al documentar y estandarizar esta integración, el proyecto se convierte en un activo de propiedad intelectual para el SENA, permitiendo que la industria pase de vender "estructuras de madera" a vender "entornos habitables inteligentes", elevando el nivel tecnológico de toda la cadena productiva del mueble y la madera en Colombia.`
        }
      ]
    },
    {
      numeral: "8",
      titulo: "8. MARCO CONCEPTUAL",
      categoria: "Plantilla MGA",
      estadoRevision: "En Revisión",
      observacionesComite: "",
      campos: [
        {
          id: "8.1",
          etiqueta: "MARCO CONCEPTUAL",
          tipo: "parrafo",
          valor: `El proyecto se enmarca en la intersección de tres campos del conocimiento tecnológico:

Fabricación Digital y Construcción Industrializada (Off-site): Se refiere al proceso de diseño y producción de componentes estructurales mediante tecnología CNC, permitiendo una precisión milimétrica y la integración de elementos tecnológicos antes del ensamblaje final. Este enfoque optimiza la logística y minimiza el impacto en el entorno natural.

Domótica y Sistemas IoT de Código Abierto: Comprende la interconexión de dispositivos inteligentes (sensores, actuadores) mediante protocolos de comunicación inalámbrica. En este proyecto, se adopta una arquitectura de hardware abierto (ESP32) y software de gestión centralizada (Home Assistant), permitiendo una automatización escalable, independiente de proveedores comerciales y altamente resiliente en entornos remotos.

Gemelo Digital (Digital Twin): Es la representación virtual y dinámica del prototipo físico. A través de la recolección de datos en tiempo real mediante sensores, el gemelo digital permite la supervisión, el diagnóstico y la predicción del comportamiento estructural y ambiental de la edificación, permitiendo una toma de decisiones informada antes de ejecutar cambios físicos.

Marco Estratégico y Normativo
Plan Nacional de Desarrollo (PND):
El proyecto se alinea con las apuestas del PND en materia de "Transición Energética y Acción Climática" y "Reindustrialización". La propuesta contribuye a la diversificación de la matriz productiva mediante la adopción de tecnologías 4.0 en el sector madera, promoviendo el uso sostenible de recursos forestales y el desarrollo de infraestructuras inteligentes que reducen el consumo energético innecesario.

Marco Normativo SENA:
El proyecto es coherente con el Plan Estratégico del SENA y su enfoque en la "Formación Profesional Integral", específicamente en:

Política de Investigación, Desarrollo Tecnológico e Innovación: Fomento de la investigación aplicada para la resolución de problemáticas reales del sector productivo.

Fortalecimiento de la Construcción 4.0: Apoyo a los programas de formación en diseño, fabricación digital y automatización, promoviendo la actualización de competencias técnicas docentes y de aprendices.

Estrategia SENNOVA: Contribuye directamente al fortalecimiento de los semilleros y grupos de investigación que buscan conectar el conocimiento académico con la solución de necesidades de la industria, mediante la transferencia de prototipos funcionales hacia el tejido empresarial.`
        }
      ]
    },
    {
      numeral: "9",
      titulo: "9. POBLACIÓN",
      categoria: "Plantilla MGA",
      estadoRevision: "En Revisión",
      observacionesComite: "",
      campos: [
        {
          id: "9.1",
          etiqueta: "9.1. Población afectada",
          tipo: "parrafo",
          valor: `Aprendices de los programas de formación en diseño, mobiliario y automatización, quienes carecen de un entorno educativo que integre herramientas de fabricación digital (CNC) con sistemas de control inteligente (IoT), limitando el desarrollo de competencias en Construcción 4.0. Paralelamente, empresas y talleres del sector madera y construcción, que operan bajo métodos de fabricación convencional, enfrentan una brecha de productividad y competitividad al no contar con protocolos técnicos que permitan transitar hacia la producción de estructuras inteligentes y funcionales para el ecoturismo.`
        },
        {
          id: "9.2",
          etiqueta: "9.2. Población objetivo",
          tipo: "parrafo",
          valor: `Un grupo de 30 aprendices SENA de los programas de tecnólogo en diseño y mobiliario y automatización industrial, y 2 unidades productivas de ecoturismo en Antioquia seleccionadas para la transferencia y validación del prototipo de alojamiento inteligente.`
        },
        {
          id: "9.3",
          etiqueta: "9.3. Características demográficas de la población objetivo",
          tipo: "parrafo",
          valor: `Jóvenes y adultos jóvenes (18-35 años) en proceso de formación técnica/tecnológica (estratos 1, 2 y 3), y empresarios del sector servicios/construcción. La población objetivo presenta una composición mixta en términos de género, con una participación equitativa en el marco de las políticas de inclusión del SENA.`
        },
        {
          id: "9.4",
          etiqueta: "9.4 Enfoque diferencial",
          tipo: "parrafo",
          valor: `El proyecto promueve la participación equitativa y la formación inclusiva, garantizando igualdad de oportunidades para aprendices de ambos géneros en áreas técnicas tradicionalmente masculinizadas (carpintería/construcción). No excluye grupos étnicos y fomenta el acceso universal a la formación tecnológica para comunidades rurales.`
        }
      ]
    },
    {
      numeral: "10",
      titulo: "10. OBJETIVOS",
      categoria: "Plantilla MGA",
      estadoRevision: "En Revisión",
      observacionesComite: "",
      campos: [
        {
          id: "10.1",
          etiqueta: "10.1. Objetivo general",
          tipo: "parrafo",
          valor: `Desarrollar un modelo de operación inteligente para infraestructuras ecoturísticas modulares mediante la integración de flujos de fabricación digital y sistemas de domótica abierta, orientado a fortalecer las competencias técnicas en Construcción 4.0 y optimizar la eficiencia operativa en alojamientos sostenibles.`
        },
        {
          id: "10.2.1",
          etiqueta: "10.2. Objetivo específico 1",
          tipo: "parrafo",
          valor: `Caracterizar las variables de diseño estructural de marcos rígidos y los requerimientos técnicos de automatización (IoT), mediante el análisis de comportamiento de cargas y la evaluación de protocolos de hardware abierto, para definir los parámetros técnicos de integración en la infraestructura modular.`
        },
        {
          id: "10.2.2",
          etiqueta: "10.2. Objetivo específico 2",
          tipo: "parrafo",
          valor: `Diseñar un modelo de infraestructura inteligente basado en flujos de trabajo BIM, que articule la fabricación digital (CNC) con una arquitectura abierta de domótica (IoT), estableciendo los protocolos técnicos para la integración nativa de sensores y actuadores en marcos rígidos de madera.`
        },
        {
          id: "10.2.3",
          etiqueta: "10.2. Objetivo específico 3",
          tipo: "parrafo",
          valor: `Prototipar una unidad ecoturística funcional, implementando el modelo de operación inteligente y el gemelo digital para validar, en entornos controlados, la gestión autónoma de variables críticas y la viabilidad de transferencia tecnológica al sector productivo y académico.`
        },
        {
          id: "10.3",
          etiqueta: "Árbol de objetivos - Fines indirectos",
          tipo: "parrafo",
          valor: `• Alta competitividad y rentabilidad del sector ecoturístico mediante estándares de construcción inteligente.
• Liderazgo tecnológico en la transferencia de conocimiento de instituciones de formación al sector productivo.
• Mejora en la percepción de seguridad y confort, optimizando la experiencia del huésped en alojamientos sostenibles.`
        },
        {
          id: "10.4",
          etiqueta: "Árbol de objetivos - Fines directos",
          tipo: "parrafo",
          valor: `• Capacidad de escalar prototipos modulares con replicabilidad técnica industrial.
• Operación autónoma eficiente mediante el control inteligente de variables críticas.
• Implementación de gemelos digitales para el monitoreo, diagnóstico y predicción del comportamiento infraestructural.`
        },
        {
          id: "10.5",
          etiqueta: "Árbol de objetivos - Medios",
          tipo: "parrafo",
          valor: `• 1.1. Metodologías de diseño articuladas con flujos BIM e integración temprana de IoT.
• 1.2. Protocolos de fabricación estandarizados en CNC con pre-integración de sensores y cableado.
• 1.3. Cultura técnica de innovación y trabajo interdisciplinario entre carpintería y electrónica.`
        }
      ]
    },
    {
      numeral: "11",
      titulo: "11. ANÁLISIS DE LAS ALTERNATIVAS",
      categoria: "Plantilla MGA",
      estadoRevision: "En Revisión",
      observacionesComite: "",
      campos: [
        {
          id: "11.1",
          etiqueta: "Alternativa 1: Desarrollo de modelo inteligente basado en arquitecturas abiertas (IoT / ESP32 / Home Assistant)",
          tipo: "parrafo",
          valor: `Breve justificación de la Alternativa:
Es la alternativa seleccionada por su alta costo-eficiencia, escalabilidad y alineación con la misión formativa del SENA al eliminar costos de licenciamiento y promover la apropiación tecnológica.

Descripción de la evaluación (Rentabilidad/Costo-Eficiencia/Costo Mínimo):
Sí. Permite desarrollar un prototipo altamente personalizable y transferible sin depender de proveedores externos, optimizando la inversión en investigación.`
        },
        {
          id: "11.2",
          etiqueta: "Alternativa 2: Adquisición e integración de sistemas domóticos comerciales de marca cerrada (Licenciamiento propietario)",
          tipo: "parrafo",
          valor: `Breve justificación de la Alternativa:
Se basa en soluciones comerciales "llave en mano". Aunque facilita la implementación inicial, genera dependencia tecnológica, altos costos operativos por licencias y limita la capacidad de los aprendices para intervenir y entender el sistema.

Descripción de la evaluación (Rentabilidad/Costo-Eficiencia/Costo Mínimo):
No. Los costos recurrentes de licenciamiento y la falta de acceso al "código fuente" del sistema reducen la viabilidad de transferencia tecnológica al sector ecoturístico de bajos recursos.`
        },
        {
          id: "11.3",
          etiqueta: "Análisis técnico de la alternativa seleccionada (Fases / Actividades Clave / Responsables / Entregables)",
          tipo: "parrafo",
          valor: `1. Caracterización Estructural y IoT:
• Actividades Clave: Diagnóstico de requerimientos, selección de sensores/actuadores (ESP32) y análisis de cargas en marcos rígidos.
• Responsable: Líder del proyecto / Instructor especializado.
• Entregables (Verificadores): Informe técnico de parámetros de integración (estructura + sensores).

2. Diseño Inteligente (BIM):
• Actividades Clave: Modelado BIM de la estructura, diseño de planos de mecanizado CNC y esquemática de la red domótica.
• Responsable: Equipo de diseño y aprendices.
• Entregables (Verificadores): Modelos BIM, planos de fabricación CNC y esquemas de automatización (Home Assistant).

3. Prototipado y Validación:
• Actividades Clave: Fabricación de piezas CNC, ensamblaje, implementación de lógica de control y puesta en marcha del gemelo digital.
• Responsable: Equipo de producción / Aprendices (SENA).
• Entregables (Verificadores): Prototipo físico funcional, gemelo digital operativo y protocolo de transferencia tecnológica.`
        }
      ]
    },
    {
      numeral: "12",
      titulo: "12. METODOLOGÍA PARA DESARROLLAR LA ALTERNATIVA SELECCIONADA",
      categoria: "Plantilla MGA",
      estadoRevision: "En Revisión",
      observacionesComite: "",
      campos: [
        {
          id: "12.1",
          etiqueta: "Enfoque Metodológico y Fases Principales",
          tipo: "parrafo",
          valor: `La metodología se fundamenta en la Investigación Aplicada con enfoque en Construcción 4.0, estructurada en tres fases iterativas. Cada fase garantiza la articulación entre el componente estructural (madera) y la capa lógica (domótica).

• Fase 1: Caracterización y Definición: 1. Levantamiento de requerimientos de confort. 2. Análisis técnico de sensores y actuadores (hardware abierto). 3. Definición de parámetros de carga para marcos rígidos. | Responsables: Líder del proyecto (Alex Zapata) / Instructores especialistas. | Entregables: Documento de especificaciones técnicas y matriz de selección de hardware IoT.

• Fase 2: Diseño y Modelado BIM: 1. Modelado 3D de la estructura en BIM. 2. Integración digital de nichos para sensores/cableado. 3. Programación de la lógica de control y Gemelo Digital. | Responsables: Equipo de diseño / Aprendices seleccionados. | Entregables: Modelos BIM (archivos .ifc/nativos) y esquemas de automatización (Home Assistant).

• Fase 3: Fabricación y Validación: 1. Mecanizado CNC de piezas estructurales. 2. Ensamble, montaje y cableado. 3. Pruebas de funcionamiento y puesta en marcha del gemelo digital. | Responsables: Equipo de taller / Aprendices de formación técnica. | Entregables: Prototipo físico funcional, gemelo digital operativo y protocolo de transferencia tecnológica.`
        },
        {
          id: "12.2",
          etiqueta: "Metodología para el logro del Objetivo específico 1",
          tipo: "parrafo",
          valor: `■ Responsable: Líder del proyecto (Instructor SENA) en coordinación con el equipo de investigación SENNOVA y un grupo de aprendices de apoyo técnico.

Actividad 1.1: Diagnóstico técnico y análisis de cargas.
Tareas: Recopilación de normas técnicas para construcción en madera (NSR-10), modelado preliminar de marcos rígidos bajo cargas de servicio, e identificación de puntos críticos para la ubicación de sensores (temperatura, humedad, humo) dentro de la geometría del domo.
Producto: Informe técnico de parámetros estructurales y mapa de nodos para la integración de dispositivos IoT.
Medio de verificación: Documento de especificaciones técnicas aprobado y avalado por el líder del proyecto.

Actividad 1.2: Evaluación de protocolos de hardware y software abierto.
Tareas: Benchmarking de microcontroladores (ESP32) y sensores compatibles; validación de protocolos de comunicación (MQTT/Wi-Fi/Zigbee) para garantizar la resiliencia en entornos remotos; selección de plataforma de gestión centralizada (Home Assistant).
Producto: Matriz de selección y compatibilidad de hardware y software IoT para la infraestructura.
Medio de verificación: Protocolo de pruebas de laboratorio documentado y lista de componentes validados.

Actividad 1.3: Definición de parámetros de integración ciber-física.
Tareas: Creación de los lineamientos para la "integración nativa" (diseño de nichos, canalizaciones para cableado embebido en la estructura de madera y blindaje de sensores), asegurando que la domótica no afecte la integridad mecánica del marco rígido.
Producto: Manual de parámetros de integración estructural-tecnológica.
Medio de verificación: Documento final de parámetros técnicos que servirá como base para el diseño BIM de la fase siguiente.`
        },
        {
          id: "12.3",
          etiqueta: "Metodología para el logro del Objetivo específico 2",
          tipo: "parrafo",
          valor: `■ Responsable: Equipo de diseño (Aprendices de formación técnica) supervisados por el instructor de Diseño y Mobiliario.

Actividad 2.1: Modelado paramétrico e integración BIM.
Tareas: Desarrollo del modelo estructural en software BIM, incorporando los "nichos" y canalizaciones diseñadas en la fase anterior para la integración de sensores y actuadores sin comprometer la integridad estructural.
Producto: Modelo digital BIM detallado del sistema estructural y sus componentes tecnológicos integrados.
Medio de verificación: Archivos fuente del modelo (.ifc/.rvt) y planos arquitectónicos con detalle de instalaciones tecnológicas.

Actividad 2.2: Desarrollo de protocolos de fabricación digital (CNC).
Tareas: Generación de rutas de corte y mecanizado CNC para las piezas de madera, asegurando que las tolerancias de ajuste permitan la instalación precisa de los elementos domóticos embebidos.
Producto: Planos de despiece y archivos de código G para el mecanizado de los marcos rígidos.
Medio de verificación: Archivos de control numérico (G-code) validados y reportes de simulación de mecanizado.

Actividad 2.3: Diseño de la arquitectura de automatización e instalaciones eléctricas.
Tareas: Definición de esquemas eléctricos y planos de canalización para el sistema de sensores/actuadores, bajo la asesoría técnica del equipo del MEDIALAB para asegurar la compatibilidad con protocolos industriales y de domótica abierta.
Producto: Planos detallados de instalaciones eléctricas y lógica de red (esquema de cableado IoT).
Medio de verificación: Planos aprobados por el equipo técnico del MEDIALAB.`
        },
        {
          id: "12.4",
          etiqueta: "Metodología para el logro del Objetivo específico 3",
          tipo: "parrafo",
          valor: `■ Actividad 3.1: Fabricación estructural y pre-instalación.
Tareas: Mecanizado CNC y ensamble de marcos rígidos, dejando preparados los nichos y cavidades diseñadas para la futura instalación técnica.
Responsable: Equipo de producción (Aprendices y técnicos de madera).
Producto: Estructura modular lista para el montaje técnico.
Medio de verificación: Registro fotográfico de los elementos constructivos terminados.

Actividad 3.2: Instalación eléctrica y despliegue de dispositivos domóticos.
Tareas: Cableado eléctrico, instalación de nodos (sensores/actuadores) y configuración de hardware en la estructura, realizado por los aprendices con apoyo especializado del equipo técnico del MEDIALAB.
Responsable: Aprendices del proyecto en colaboración con el equipo técnico del MEDIALAB.
Producto: Sistema eléctrico instalado y nodos de domótica operativos.
Medio de verificación: Acta de instalación eléctrica y pruebas de continuidad de red (realizadas por el MEDIALAB).

Actividad 3.3: Implementación del Gemelo Digital y validación.
Tareas: Programación de la plataforma centralizada (Home Assistant), puesta en marcha del gemelo digital y validación del comportamiento autónomo de la infraestructura.
Responsable: Equipo de proyecto + MEDIALAB (Validación de datos).
Producto: Sistema inteligente funcionando y visualización del Gemelo Digital.
Medio de verificación: Dashboard de monitoreo en tiempo real.`
        }
      ]
    },
    {
      numeral: "13",
      titulo: "13. CADENA DE VALOR",
      categoria: "Plantilla MGA",
      estadoRevision: "En Revisión",
      observacionesComite: "",
      campos: [
        {
          id: "13.1",
          etiqueta: "Objetivo específico 1 - Producto y Actividades asociadas",
          tipo: "parrafo",
          valor: `Objetivo específico: Caracterizar las variables de diseño estructural de marcos rígidos y los requerimientos técnicos de automatización (IoT), mediante el análisis de comportamiento de cargas y la evaluación de protocolos de hardware abierto, para definir los parámetros técnicos de integración en la infraestructura modular.
Producto: Documento técnico de especificaciones integradas (estructura + IoT).
Medido a través de: Informe técnico avalado. (documento) | Cantidad / Meta: 1
Actividades asociadas al producto:
1. Diagnóstico de variables de confort.
2. Selección de hardware IoT.
3. Análisis de cargas.
4. Definición de parámetros.`
        },
        {
          id: "13.2",
          etiqueta: "Objetivo específico 2 - Producto y Actividades asociadas",
          tipo: "parrafo",
          valor: `Objetivo específico: Diseñar un modelo de infraestructura inteligente basado en flujos de trabajo BIM, que articule la fabricación digital (CNC) con una arquitectura abierta de domótica (IoT), estableciendo los protocolos técnicos para la integración nativa de sensores y actuadores en marcos rígidos de madera.
Producto: Modelo digital BIM y protocolos de fabricación CNC.
Medido a través de: Modelo funcional y planos. (1 modelo, 1 protocolo) | Cantidad / Meta: 1
Actividades asociadas al producto:
5. Modelado 3D BIM.
6. Diseño de nichos.
7. Generación rutas CNC.
8. Arquitectura lógica (MEDIALAB).
9. Carta de producción
10. Manual de ensamble
11. Prototipo Gemelo digital`
        },
        {
          id: "13.3",
          etiqueta: "Objetivo específico 3 - Producto y Actividades asociadas",
          tipo: "parrafo",
          valor: `Objetivo específico: Prototipar una unidad ecoturística funcional, implementando el modelo de operación inteligente y el gemelo digital para validar, en entornos controlados, la gestión autónoma de variables críticas y la viabilidad de transferencia tecnológica al sector productivo y académico.
Producto: Prototipo físico con gemelo digital y protocolo de transferencia.
Medido a través de: Funcionamiento del prototipo. (prototipo operativo) | Cantidad / Meta: 1
Actividades asociadas al producto:
12. Adecuación del terreno y cimentación.
13. Fabricación CNC / Carpintería convencional y transporte de componentes.
14. Montaje estructural (in-situ).
15. Instalación eléctrica, domótica y validación.`
        }
      ]
    },
    {
      numeral: "14",
      titulo: "14. IMPACTOS",
      categoria: "Plantilla MGA",
      estadoRevision: "En Revisión",
      observacionesComite: "",
      campos: [
        {
          id: "14.1",
          etiqueta: "Impacto a la formación profesional integral",
          tipo: "parrafo",
          valor: `Fortalece las competencias de los aprendices en Construcción 4.0, integrando flujos de trabajo BIM, fabricación digital (CNC) y sistemas de domótica abierta (IoT). El proyecto traslada el conocimiento de investigación aplicada al currículo, permitiendo que los aprendices desarrollen capacidades técnicas de vanguardia mediante el modelo de "aprender haciendo" en proyectos reales.`
        },
        {
          id: "14.2",
          etiqueta: "Impacto social generado",
          tipo: "parrafo",
          valor: `Promueve el desarrollo regional en el sector ecoturístico al ofrecer soluciones de infraestructura modulares, seguras y eficientes. Facilita la transferencia de tecnología a las comunidades locales, incrementando la competitividad de los alojamientos sostenibles y mejorando la experiencia y seguridad del huésped mediante la digitalización del servicio.`
        },
        {
          id: "14.3",
          etiqueta: "Impacto ambiental",
          tipo: "parrafo",
          valor: `Optimiza la eficiencia operativa en el uso de recursos energéticos y materiales mediante la gestión autónoma del prototipo (IoT). Al promover la construcción modular en madera y sistemas inteligentes de bajo consumo, se minimiza la huella de carbono de las infraestructuras turísticas, fomentando modelos de turismo sostenible alineados con la preservación del entorno natural.`
        }
      ]
    },
    {
      numeral: "15",
      titulo: "15. RESULTADOS ESPERADOS PARA EL CENTRO DE FORMACIÓN LA REGIONAL Y/O EL DEPARTAMENTO",
      categoria: "Plantilla MGA",
      estadoRevision: "En Revisión",
      observacionesComite: "",
      campos: [
        {
          id: "15.1",
          etiqueta: "RESULTADOS ESPERADOS",
          tipo: "parrafo",
          valor: `Resultados medibles y cuantificables
Prototipo tecnológico: Una (1) unidad ecoturística modular de marco rígido, funcional, con sistema de domótica (IoT) integrado y operativo.

Transferencia técnica: Tres (3) protocolos técnicos validados (diseño, fabricación CNC e instalación IoT) transferidos a la comunidad educativa y unidades productivas del sector.

Capacidad técnica: Veinte (20) aprendices capacitados en flujos de trabajo BIM, mecanizado CNC y configuración de hardware abierto para Construcción 4.0.

Gemelo Digital: Un (1) entorno virtual de monitoreo y diagnóstico de variables críticas (temperatura, energía, seguridad) operativo y escalable.

Impacto en la región (Proyección temporal)
Corto plazo: Validación técnica del prototipo en el Centro Tecnológico del Mobiliario (CTM) y ajuste de los protocolos de construcción inteligente.

Mediano plazo: Transferencia de los modelos de diseño y automatización a empresas del sector ecoturístico en Antioquia (Itagüí, Sabaneta y áreas rurales), incrementando su competitividad tecnológica.

Largo plazo: Consolidación de una línea de investigación aplicada en el SENA sobre "Infraestructura Inteligente para el Ecoturismo", posicionando a la regional como referente en Construcción 4.0 a nivel nacional.

Reflexión sobre efectos en el medio natural y la salud humana
Efectos positivos: El proyecto fomenta el uso de madera sostenible, reduce el desperdicio de materiales mediante procesos CNC optimizados y disminuye el consumo energético mediante la gestión autónoma domótica. No se identifican riesgos significativos para la salud humana, ya que los sistemas de automatización operan con voltajes bajos (domótica) y los materiales son seleccionados bajo estándares de construcción segura y no tóxica.

Efectos negativos: Durante la ejecución (fabricación), podrían generarse residuos de madera y partículas de polvo, los cuales serán mitigados mediante los protocolos de seguridad industrial y gestión de residuos del CTM. La implementación en sitio se realizará siguiendo normativas ambientales vigentes para preservar los ecosistemas ecoturísticos intervenidos.`
        }
      ]
    },
    {
      numeral: "16",
      titulo: "16. CRONOGRAMA",
      categoria: "Plantilla MGA",
      estadoRevision: "En Revisión",
      observacionesComite: "",
      campos: [
        {
          id: "16.1",
          etiqueta: "Actividades del Cronograma (Numeral 12 - Metodología)",
          tipo: "parrafo",
          valor: `Producto 1: Documento técnico de especificaciones integradas (estructura + IoT).
1. Diagnóstico de variables de confort.
2. Selección de hardware IoT.
3. Análisis de cargas.
4. Definición de parámetros.

Producto 2: Modelo digital BIM y protocolos de fabricación CNC.
5. Modelado 3D BIM.
6. Diseño de nichos.
7. Generación rutas CNC.
8. Arquitectura lógica (MEDIALAB).
9. Carta de producción
10. Manual de ensamble
11. Prototipo Gemelo digital

Producto 3: Prototipo físico con gemelo digital y protocolo de transferencia.
12. Adecuación del terreno y cimentación.
13. Fabricación CNC / Carpintería convencional y transporte de componentes.
14. Montaje estructural (in-situ).
15. Instalación eléctrica, domótica y validación.`
        }
      ]
    },
    {
      numeral: "17",
      titulo: "17. PRESUPUESTO",
      categoria: "Plantilla MGA",
      estadoRevision: "En Revisión",
      observacionesComite: "",
      campos: [
        {
          id: "17.1",
          etiqueta: "Presupuesto por Actividad (Plantilla MGA)",
          tipo: "parrafo",
          valor: `1. Diagnóstico de variables de confort. | Servicios personales indirectos | Cant: 1 | Meses: 2 | V.Unit: $4.500.000 | Total: $9.000.000
2. Selección de hardware IoT. | Materiales para formación profesional | Cant: 1 | Meses: 1 | V.Unit: $12.000.000 | Total: $12.000.000
3. Análisis de cargas. | Materiales para formación profesional | Cant: 1 | Meses: 1 | V.Unit: $4.500.000 | Total: $4.500.000
4. Definición de parámetros. | Servicios personales indirectos | Cant: 1 | Meses: 1 | V.Unit: $4.500.000 | Total: $4.500.000
5. Modelado 3D BIM. | Servicios personales indirectos | Cant: 1 | Meses: 3 | V.Unit: $4.500.000 | Total: $13.500.000
6. Diseño de nichos. | Servicios personales indirectos | Cant: 1 | Meses: 1 | V.Unit: $4.500.000 | Total: $4.500.000
7. Generación rutas CNC. | Servicios personales indirectos | Cant: 1 | Meses: 2 | V.Unit: $4.500.000 | Total: $9.000.000
8. Arquitectura lógica (MEDIALAB). | Servicios personales indirectos | Cant: 1 | Meses: 2 | V.Unit: $4.500.000 | Total: $9.000.000
9. Carta de producción | Servicios personales indirectos | Cant: 1 | Meses: 3 | V.Unit: $4.500.000 | Total: $13.500.000
10. Manual de ensamble | Servicios personales indirectos | Cant: 1 | Meses: 3 | V.Unit: $4.500.000 | Total: $13.500.000
11. Prototipo Gemelo digital | Servicios personales indirectos | Cant: 1 | Meses: 4 | V.Unit: $4.500.000 | Total: $18.000.000
12. Adecuación del terreno y cimentación. | Adecuaciones y construcciones | Cant: 1 | Meses: 2 | V.Unit: $12.000.000 | Total: $12.000.000
13. Fabricación CNC / Carpintería convencional y transporte de componentes. | Materiales para formación profesional | Cant: 1 | Meses: 2 | V.Unit: $150.000.000 | Total: $150.000.000
14. Montaje estructural (in-situ). | Adecuaciones y construcciones | Cant: 1 | Meses: 5 | V.Unit: $30.000.000 | Total: $30.000.000
15. Instalación eléctrica, domótica y validación. | Materiales para formación profesional | Cant: 1 | Meses: 2 | V.Unit: $15.000.000 | Total: $15.000.000`
        }
      ]
    },
    {
      numeral: "18",
      titulo: "18. ANALISIS DE RIESGOS",
      categoria: "Plantilla MGA",
      estadoRevision: "En Revisión",
      observacionesComite: "",
      campos: [
        {
          id: "18.1",
          etiqueta: "Riesgos Operacionales, Administrativos y Legales",
          tipo: "parrafo",
          valor: `• Operacionales:
Descripción del riesgo: Fallas técnicas en la integración de componentes de domótica con la estructura de madera durante el montaje.
Probabilidad: Media | Impacto: Alto
Efectos: Retrasos en la entrega y mal funcionamiento del gemelo digital.
Mitigación: Pruebas de pre-ensamble técnico en el MEDIALAB antes del montaje in-situ.

• Administrativos:
Descripción del riesgo: Retrasos en los procesos de adquisición y entrega de maquinaria o materiales críticos para el prototipo.
Probabilidad: Media | Impacto: Alto
Efectos: Incumplimiento del cronograma de investigación aplicada.
Mitigación: Gestión anticipada de solicitudes de compra y búsqueda de proveedores alternativos locales.

• Legales:
Descripción del riesgo: Incumplimiento de normativas de seguridad en las instalaciones eléctricas del prototipo en entornos ecoturísticos.
Probabilidad: Baja | Impacto: Alto
Efectos: Sanciones institucionales y riesgos de seguridad para el usuario final.
Mitigación: Certificación de instalaciones por parte del personal técnico calificado del MEDIALAB.`
        }
      ]
    },
    {
      numeral: "19",
      titulo: "19. SOSTENIBILIDAD",
      categoria: "Plantilla MGA",
      estadoRevision: "En Revisión",
      observacionesComite: "",
      campos: [
        {
          id: "19.1",
          etiqueta: "SOSTENIBILIDAD",
          tipo: "parrafo",
          valor: `La estrategia de sostenibilidad del proyecto se fundamenta en tres ejes:

Sostenibilidad Institucional (Capacidades y Recursos): Los resultados del proyecto, incluyendo los modelos BIM, protocolos de fabricación CNC y la arquitectura del gemelo digital, serán integrados como activos intelectuales en el MEDIALAB. La maquinaria adquirida permanecerá en el Centro Tecnológico del Mobiliario (CTM), fortaleciendo la infraestructura para futuros proyectos de investigación aplicada y formación en Construcción 4.0.

Sostenibilidad Social (Transferencia): La continuidad de los resultados está garantizada mediante la transferencia técnica a aprendices y unidades productivas del sector ecoturístico regional. Al formalizar el "ejercicio académico" de diseño y montaje en protocolos estandarizados, se permite la réplica de soluciones en otros contextos rurales, impulsando la competitividad del sector mediante la digitalización del servicio.

Sostenibilidad Ambiental: La propuesta promueve un modelo de desarrollo responsable mediante el uso de madera sostenible y procesos de fabricación CNC que optimizan el material, minimizando el desperdicio. La integración de sistemas domóticos (IoT) permite un control autónomo y eficiente del consumo energético, garantizando que el impacto ambiental de la infraestructura sea mínimo durante todo su ciclo de vida operativo.`
        }
      ]
    },
    {
      numeral: "20",
      titulo: "20. PONDERABLES",
      categoria: "Plantilla MGA",
      estadoRevision: "En Revisión",
      observacionesComite: "",
      campos: [
        {
          id: "20.1",
          etiqueta: "CRITERIOS PRIORIZACIÓN (APLICA SI/NO Y JUSTIFICACIÓN)",
          tipo: "parrafo",
          valor: `• Oferta programas agropecuarios: NO | El proyecto se enfoca en la industria del mueble y la construcción inteligente (Construcción 4.0), no en actividades agropecuarias directas.
• Atención a la economía campesina: SI | Provee infraestructura modular de bajo costo y alta eficiencia para mejorar la competitividad de unidades ecoturísticas en zonas rurales y de ladera.
• Atención a la economía popular: SI | Facilita la adopción de tecnologías de fabricación digital (CNC) y domótica a pequeños emprendedores y talleres familiares, democratizando el acceso a la Construcción 4.0.
• Alineación Plan Nacional de Desarrollo: SI | Se alinea con el eje de "Transformación productiva y acción climática", promoviendo la digitalización, la construcción sostenible y la eficiencia energética.
• Alineación con la oferta de programas del centro de formación: SI | Fortalece la formación en el CTM mediante la integración de diseño de mobiliario/estructuras, fabricación digital y electrónica avanzada aplicada a la madera.
• Presentación proyectos en fases: SI | El proyecto está estructurado claramente en tres objetivos específicos, permitiendo una ejecución gradual y verificable (caracterización, diseño/modelado y prototipado/transferencia).
• Cobertura en la territorialidad: SI | Impacta directamente a las zonas con vocación ecoturística en el departamento de Antioquia, mediante el despliegue de infraestructura inteligente que mejora la capacidad instalada y la competitividad de los territorios receptores de turismo.`
        }
      ]
    },
    {
      numeral: "21",
      titulo: "21. ACEPTACIÓN DE CONDICIONES HABILITANTES DE LA PROPUESTA Y ANEXOS",
      categoria: "Plantilla MGA",
      estadoRevision: "En Revisión",
      observacionesComite: "",
      campos: [
        {
          id: "21.1",
          etiqueta: "CONDICIONES HABILITANTES Y ANEXOS",
          tipo: "parrafo",
          valor: `• Garantizo que cuento con los certificados, soportes y procesos de vinculación para la ejecución de la propuesta: SI
• Presento anexos del proyecto que describa la responsabilidades con aliados: SI

NOTA: Se recuerda que cada uno de los ítems propuestos corresponden al proceso de formulación por lo que generan las condiciones habilitantes de la propuesta de proyecto, en caso de identificar espacios en blanco serán causal de rechazo a la propuesta.

Anexo 3.1. Formato técnico soporte de formulación proyecto MGA.
Anexo 3.2. Estudio de mercado.
Anexo 3.3. Cotizaciones. (No requiere formato)
Anexo 3.4. Carta de Intención de Alianza.
Anexo 3.5. Carta de propiedad intelectual.`
        }
      ]
    }
  ],

  capacidadInstalada: [
    {
      id: "CAP-01",
      area: "Ambiente 107 - Medialab CTM",
      categoria: "Electrónica, IoT y Realidad Virtual (Unity)",
      equipos: "Workstations de alto desempeño para motores gráficos (Unity 3D / BIM), Visores VR (Meta Quest / PCVR), Servidores locales Home Assistant, Microcontroladores ESP32, Sensores ambientales/térmicos, Instrumentación electrónica.",
      estado: "100% Disponible en Centro",
      actividadesSoportadas: ["A01", "A02", "A04", "A08", "A11", "A15"],
      argumentoEvaluacion: "Garantiza el desarrollo interno del Gemelo Digital VR en Unity y la programación de nodos ESPHome/MQTT sin requerir contratación de software propietario ni laboratorios externos."
    },
    {
      id: "CAP-02",
      area: "Taller de Mecanizado CNC y Fabricación Digital CTM",
      categoria: "Maquinaria Industrial y Corte de Precisión",
      equipos: "Routers CNC de 3 y 4 ejes de formato industrial, sistemas de extracción de partículas, software CAD/CAM licenciado para generación de G-Code y simulación de mecanizado.",
      estado: "100% Disponible en Centro",
      actividadesSoportadas: ["A05", "A06", "A07", "A09", "A13"],
      argumentoEvaluacion: "Permite fabricar con precisión milimétrica los marcos rígidos a escala, los bloques de unión, los ensambles a tope y el fresado de nichos embebidos para sensores y cableado oculto."
    },
    {
      id: "CAP-03",
      area: "Talleres de Ebanistería, Ensamble y Acabados CTM",
      categoria: "Construcción en Madera y Prototipado",
      equipos: "Bancos de ensamble en seco, prensas neumáticas/mecánicas, herramientas de carpintería convencional de apoyo, cabina de recubrimientos y área de pre-montaje modular.",
      estado: "100% Disponible en Centro",
      actividadesSoportadas: ["A10", "A12", "A13", "A14"],
      argumentoEvaluacion: "Habilita la construcción de la plataforma portante móvil, el pre-ensamble repetitivo del Kit de Partes del domo a escala y la fabricación de cajas de embalaje (flight-cases) rumbo a INTERZUM Bogotá."
    },
    {
      id: "CAP-04",
      area: "Talento Humano SENNOVA + Semilleros de Aprendices",
      categoria: "Capacidad Investigativa y Formativa",
      equipos: "5 Instructores investigadores multidisciplinarios (W. Tibavija, A. Hassan, A. Londoño, A. Zapata, V. Cardona) + 30 Aprendices de Diseño de Mobiliario y Automatización Industrial.",
      estado: "Vinculado y Activo (Acta No. 02)",
      actividadesSoportadas: ["A01", "A02", "A03", "A04", "A05", "A06", "A07", "A08", "A09", "A10", "A11", "A12", "A13", "A14", "A15"],
      argumentoEvaluacion: "Articulación real entre las redes de Construcción/Mobiliario y Electrónica/Informática, asegurando transferencia inmediata al currículo de Formación Profesional Integral."
    }
  ],

  fasesActa02: [
    {
      faseId: "FASE-ACTA-1",
      nombre: "1. Diseño y Modelado Estructura",
      descripcionActa: "Definición geométrica, planos constructivos y Gemelo Digital VR (soporte).",
      responsables: "W. Tibavija, A. Hassan, A. Londoño, A. Zapata, V. Cardona",
      compromisoActa: "Diseño estructural del domo (nodos y marcos) + Modelado VR (Gemelo Digital)"
    },
    {
      faseId: "FASE-ACTA-2",
      nombre: "2. Fabricación Estructural",
      descripcionActa: "Producción CNC de marcos rígidos (madera), ensambles a tope y bloques de unión.",
      responsables: "Equipo Total",
      compromisoActa: "Producción industrializada (kit de partes)"
    },
    {
      faseId: "FASE-ACTA-3",
      nombre: "3. Paneles y Cerramientos",
      descripcionActa: "Prefabricación de paneles en fibrocemento y ventanales con control domótico.",
      responsables: "Equipo Total",
      compromisoActa: "Producción industrializada (cerramientos)"
    },
    {
      faseId: "FASE-ACTA-4",
      nombre: "4. Canalización y Domótica",
      descripcionActa: "Integración de cableado oculto para domótica y sensores ambientales.",
      responsables: "A. Zapata, V. Cardona",
      compromisoActa: "Integración tecnológica (Domótica/Solar)"
    },
    {
      faseId: "FASE-ACTA-5",
      nombre: "5. Sistema Solar y Energía",
      descripcionActa: "Instalación de paneles fotovoltaicos y banco de baterías (gestión de autonomía).",
      responsables: "Equipo Total",
      compromisoActa: "Integración tecnológica (Domótica/Solar)"
    },
    {
      faseId: "FASE-ACTA-6",
      nombre: "6. Zonas Húmedas y Mobiliario",
      descripcionActa: "Adecuación de áreas sanitarias y fabricación de mobiliario ergonómico integrado.",
      responsables: "Equipo Total",
      compromisoActa: "Adecuación y mobiliario"
    }
  ],

  matrizActividades: [
    {
      id: "A01",
      codigoMGA: "Act. 1",
      objetivoId: "OE1",
      faseActaId: "FASE-ACTA-1",
      actividadMGA: "1. Diagnóstico de variables de confort.",
      alcanceAjustadoEscala: "Recopilación de normas técnicas (NSR-10), modelado preliminar de marcos rígidos e identificación de puntos críticos para sensores (temperatura, humedad, humo).",
      entregableVerificador: "Informe técnico avalado. (documento)",
      anexoSennova: "Documento técnico de especificaciones integradas (estructura + IoT)",
      responsables: "A. Zapata, V. Cardona, W. Tibavija",
      lineaInversion: "Servicios personales indirectos",
      duracionMeses: 2,
      inicio: "2026-11",
      fin: "2026-12",
      trimestre: "Fase 1",
      valorUnitario: 4500000,
      valorTotal: 9000000,
      progreso: 0,
      estado: "En Revisión"
    },
    {
      id: "A02",
      codigoMGA: "Act. 2",
      objetivoId: "OE1",
      faseActaId: "FASE-ACTA-4",
      actividadMGA: "2. Selección de hardware IoT.",
      alcanceAjustadoEscala: "Benchmarking de microcontroladores (ESP32) y sensores compatibles; validación de protocolos (MQTT/Wi-Fi/Zigbee) y Home Assistant.",
      entregableVerificador: "Matriz de selección y compatibilidad de hardware y software IoT.",
      anexoSennova: "Documento técnico de especificaciones integradas (estructura + IoT)",
      responsables: "A. Zapata, V. Cardona",
      lineaInversion: "Materiales para formación profesional",
      duracionMeses: 1,
      inicio: "2026-12",
      fin: "2027-01",
      trimestre: "Fase 1",
      valorUnitario: 12000000,
      valorTotal: 12000000,
      progreso: 0,
      estado: "En Revisión"
    },
    {
      id: "A03",
      codigoMGA: "Act. 3",
      objetivoId: "OE1",
      faseActaId: "FASE-ACTA-1",
      actividadMGA: "3. Análisis de cargas.",
      alcanceAjustadoEscala: "Análisis de comportamiento de cargas en marcos rígidos y nodos de unión a tope.",
      entregableVerificador: "Informe técnico de parámetros estructurales.",
      anexoSennova: "Documento técnico de especificaciones integradas (estructura + IoT)",
      responsables: "W. Tibavija, A. Hassan, A. Londoño",
      lineaInversion: "Materiales para formación profesional",
      duracionMeses: 1,
      inicio: "2027-01",
      fin: "2027-01",
      trimestre: "Fase 1",
      valorUnitario: 4500000,
      valorTotal: 4500000,
      progreso: 0,
      estado: "En Revisión"
    },
    {
      id: "A04",
      codigoMGA: "Act. 4",
      objetivoId: "OE1",
      faseActaId: "FASE-ACTA-1",
      actividadMGA: "4. Definición de parámetros.",
      alcanceAjustadoEscala: "Lineamientos para la integración nativa (diseño de nichos, canalizaciones para cableado embebido en madera y blindaje de sensores).",
      entregableVerificador: "Manual de parámetros de integración estructural-tecnológica.",
      anexoSennova: "Documento técnico de especificaciones integradas (estructura + IoT)",
      responsables: "Equipo Total",
      lineaInversion: "Servicios personales indirectos",
      duracionMeses: 1,
      inicio: "2027-02",
      fin: "2027-02",
      trimestre: "Fase 1",
      valorUnitario: 4500000,
      valorTotal: 4500000,
      progreso: 0,
      estado: "En Revisión"
    },
    {
      id: "A05",
      codigoMGA: "Act. 5",
      objetivoId: "OE2",
      faseActaId: "FASE-ACTA-1",
      actividadMGA: "5. Modelado 3D BIM.",
      alcanceAjustadoEscala: "Desarrollo del modelo estructural en software BIM incorporando los componentes del sistema constructivo.",
      entregableVerificador: "Archivos fuente del modelo (.ifc/.rvt) y planos arquitectónicos.",
      anexoSennova: "Modelo digital BIM y protocolos de fabricación CNC",
      responsables: "W. Tibavija, A. Hassan, A. Londoño, A. Zapata, V. Cardona",
      lineaInversion: "Servicios personales indirectos",
      duracionMeses: 3,
      inicio: "2027-02",
      fin: "2027-05",
      trimestre: "Fase 2",
      valorUnitario: 4500000,
      valorTotal: 13500000,
      progreso: 0,
      estado: "En Revisión"
    },
    {
      id: "A06",
      codigoMGA: "Act. 6",
      objetivoId: "OE2",
      faseActaId: "FASE-ACTA-4",
      actividadMGA: "6. Diseño de nichos.",
      alcanceAjustadoEscala: "Incorporación de nichos y canalizaciones en el modelo para la integración de sensores y actuadores sin comprometer la integridad estructural.",
      entregableVerificador: "Planos con detalle de instalaciones tecnológicas y nichos.",
      anexoSennova: "Modelo digital BIM y protocolos de fabricación CNC",
      responsables: "A. Zapata, V. Cardona, W. Tibavija",
      lineaInversion: "Servicios personales indirectos",
      duracionMeses: 1,
      inicio: "2027-05",
      fin: "2027-06",
      trimestre: "Fase 2",
      valorUnitario: 4500000,
      valorTotal: 4500000,
      progreso: 0,
      estado: "En Revisión"
    },
    {
      id: "A07",
      codigoMGA: "Act. 7",
      objetivoId: "OE2",
      faseActaId: "FASE-ACTA-2",
      actividadMGA: "7. Generación rutas CNC.",
      alcanceAjustadoEscala: "Generación de rutas de corte y mecanizado CNC para las piezas de madera asegurando tolerancias de ajuste.",
      entregableVerificador: "Planos de despiece y archivos de código G (G-code) validados.",
      anexoSennova: "Modelo digital BIM y protocolos de fabricación CNC",
      responsables: "Equipo Total",
      lineaInversion: "Servicios personales indirectos",
      duracionMeses: 2,
      inicio: "2027-06",
      fin: "2027-07",
      trimestre: "Fase 2",
      valorUnitario: 4500000,
      valorTotal: 9000000,
      progreso: 0,
      estado: "En Revisión"
    },
    {
      id: "A08",
      codigoMGA: "Act. 8",
      objetivoId: "OE2",
      faseActaId: "FASE-ACTA-4",
      actividadMGA: "8. Arquitectura lógica (MEDIALAB).",
      alcanceAjustadoEscala: "Definición de esquemas eléctricos y planos de canalización para el sistema de sensores/actuadores con asesoría del MEDIALAB.",
      entregableVerificador: "Planos detallados de instalaciones eléctricas y lógica de red IoT.",
      anexoSennova: "Modelo digital BIM y protocolos de fabricación CNC",
      responsables: "A. Zapata, V. Cardona (MEDIALAB)",
      lineaInversion: "Servicios personales indirectos",
      duracionMeses: 2,
      inicio: "2027-07",
      fin: "2027-08",
      trimestre: "Fase 2",
      valorUnitario: 4500000,
      valorTotal: 9000000,
      progreso: 0,
      estado: "En Revisión"
    },
    {
      id: "A09",
      codigoMGA: "Act. 9",
      objetivoId: "OE2",
      faseActaId: "FASE-ACTA-2",
      actividadMGA: "9. Carta de producción",
      alcanceAjustadoEscala: "Estandarización de secuencias, tiempos y parámetros de fabricación industrializada de las piezas.",
      entregableVerificador: "Carta de producción documentada.",
      anexoSennova: "Modelo digital BIM y protocolos de fabricación CNC",
      responsables: "Equipo Total",
      lineaInversion: "Servicios personales indirectos",
      duracionMeses: 3,
      inicio: "2027-08",
      fin: "2027-10",
      trimestre: "Fase 2",
      valorUnitario: 4500000,
      valorTotal: 13500000,
      progreso: 0,
      estado: "En Revisión"
    },
    {
      id: "A10",
      codigoMGA: "Act. 10",
      objetivoId: "OE2",
      faseActaId: "FASE-ACTA-3",
      actividadMGA: "10. Manual de ensamble",
      alcanceAjustadoEscala: "Documentación técnica paso a paso para el ensamble en seco de los componentes estructurales y cerramientos.",
      entregableVerificador: "Manual de ensamble validado.",
      anexoSennova: "Modelo digital BIM y protocolos de fabricación CNC",
      responsables: "Equipo Total",
      lineaInversion: "Servicios personales indirectos",
      duracionMeses: 3,
      inicio: "2027-09",
      fin: "2027-11",
      trimestre: "Fase 2",
      valorUnitario: 4500000,
      valorTotal: 13500000,
      progreso: 0,
      estado: "En Revisión"
    },
    {
      id: "A11",
      codigoMGA: "Act. 11",
      objetivoId: "OE2",
      faseActaId: "FASE-ACTA-1",
      actividadMGA: "11. Prototipo Gemelo digital",
      alcanceAjustadoEscala: "Modelado y programación del entorno virtual interactivo del Gemelo Digital VR en Unity.",
      entregableVerificador: "Prototipo de Gemelo Digital operativo.",
      anexoSennova: "Modelo digital BIM y protocolos de fabricación CNC",
      responsables: "A. Zapata, V. Cardona",
      lineaInversion: "Servicios personales indirectos",
      duracionMeses: 4,
      inicio: "2027-08",
      fin: "2027-12",
      trimestre: "Fase 2",
      valorUnitario: 4500000,
      valorTotal: 18000000,
      progreso: 0,
      estado: "En Revisión"
    },
    {
      id: "A12",
      codigoMGA: "Act. 12",
      objetivoId: "OE3",
      faseActaId: "FASE-ACTA-6",
      actividadMGA: "12. Adecuación del terreno y cimentación.",
      alcanceAjustadoEscala: "Adecuación de base portante y plataforma estructural para el montaje del prototipo.",
      entregableVerificador: "Registro fotográfico de adecuación de base.",
      anexoSennova: "Prototipo físico con gemelo digital y protocolo de transferencia",
      responsables: "Equipo Total",
      lineaInversion: "Adecuaciones y construcciones",
      duracionMeses: 2,
      inicio: "2027-10",
      fin: "2027-11",
      trimestre: "Fase 3",
      valorUnitario: 12000000,
      valorTotal: 12000000,
      progreso: 0,
      estado: "En Revisión"
    },
    {
      id: "A13",
      codigoMGA: "Act. 13",
      objetivoId: "OE3",
      faseActaId: "FASE-ACTA-2",
      actividadMGA: "13. Fabricación CNC / Carpintería convencional y transporte de componentes.",
      alcanceAjustadoEscala: "Mecanizado CNC y ensamble de marcos rígidos, dejando preparados los nichos y cavidades, y logística de transporte.",
      entregableVerificador: "Estructura modular lista para el montaje técnico.",
      anexoSennova: "Prototipo físico con gemelo digital y protocolo de transferencia",
      responsables: "Equipo Total",
      lineaInversion: "Materiales para formación profesional",
      duracionMeses: 2,
      inicio: "2027-11",
      fin: "2028-01",
      trimestre: "Fase 3",
      valorUnitario: 150000000,
      valorTotal: 150000000,
      progreso: 0,
      estado: "En Revisión"
    },
    {
      id: "A14",
      codigoMGA: "Act. 14",
      objetivoId: "OE3",
      faseActaId: "FASE-ACTA-3",
      actividadMGA: "14. Montaje estructural (in-situ).",
      alcanceAjustadoEscala: "Montaje estructural de componentes, paneles de cerramiento y mobiliario rumbo a exhibición en INTERZUM Bogotá (Mayo 2028).",
      entregableVerificador: "Prototipo ensamblado.",
      anexoSennova: "Prototipo físico con gemelo digital y protocolo de transferencia",
      responsables: "Equipo Total",
      lineaInversion: "Adecuaciones y construcciones",
      duracionMeses: 5,
      inicio: "2028-01",
      fin: "2028-05",
      trimestre: "Fase 3",
      valorUnitario: 30000000,
      valorTotal: 30000000,
      progreso: 0,
      estado: "En Revisión"
    },
    {
      id: "A15",
      codigoMGA: "Act. 15",
      objetivoId: "OE3",
      faseActaId: "FASE-ACTA-5",
      actividadMGA: "15. Instalación eléctrica, domótica y validación.",
      alcanceAjustadoEscala: "Cableado eléctrico, instalación de nodos (sensores/actuadores), sistema solar, configuración de Home Assistant y validación con Gemelo Digital.",
      entregableVerificador: "Acta de instalación eléctrica, pruebas de red (MEDIALAB) y Dashboard en tiempo real.",
      anexoSennova: "Prototipo físico con gemelo digital y protocolo de transferencia",
      responsables: "A. Zapata, V. Cardona + MEDIALAB",
      lineaInversion: "Materiales para formación profesional",
      duracionMeses: 2,
      inicio: "2028-03",
      fin: "2028-05",
      trimestre: "Fase 3",
      valorUnitario: 15000000,
      valorTotal: 15000000,
      progreso: 0,
      estado: "En Revisión"
    }
  ],

  documentosSennova: [
    {
      id: "DOC-MGA-COMPLETO",
      titulo: "1. Formulación Completa Proyecto MGA SENNOVA (Numerales 1 al 21)",
      categoria: "Plantilla MGA",
      estado: "Sincronizado con Sección Formulación",
      contenidoResumen: "Exporta en un documento Word (.doc) exactamente los textos e información que vayas redactando y aprobando en los 21 numerales de la sección Formulación."
    },
    {
      id: "DOC-FICHA-TECNICA",
      titulo: "2. Ficha Técnica Consolidada: Prototipo a Escala (3D + Madera CNC) y Gemelo Digital Unity VR",
      categoria: "Insumo de Investigación",
      estado: "Sincronizado con Sección Prototipo / Gemelo Digital",
      contenidoResumen: "Compila toda la trazabilidad técnica, fechas, estados, parámetros de impresión 3D de uniones, corte en madera, domótica, pruebas móviles/VR, archivos de diseño e imágenes registradas en el desarrollo del prototipo."
    },
    {
      id: "DOC-ACTA-02",
      titulo: "3. Acta No. 02 - Medialab: Domo Ecoturístico Inteligente – INTERZUM 2028",
      categoria: "Actas y Compromisos",
      estado: "Base Oficial",
      contenidoResumen: "Acta de constitución del proyecto en el Ambiente 107 - Medialab (CTM Itagüí), con las 6 fases de trabajo y firmas de compromisos."
    }
  ],

  // SECCIÓN 4: DESARROLLO DEL PROTOTIPO A ESCALA (IMPRESIÓN 3D -> MADERA CNC + NODOS 3D) Y GEMELO DIGITAL VR
  fichaTecnicaMeta: {
    codigoFicha: "FT-SENNOVA-CTM-GEODOME-001",
    nombreProducto: "Prototipo Funcional a Escala de Domo Ecoturístico Inteligente (Estructura en Madera + Nodos Impresos en 3D + Domótica IoT) y Gemelo Digital VR en Unity",
    lineaInvestigacion: "Construcción 4.0, Fabricación Digital Híbrida (CNC + manufactura aditiva FDM) y Sistemas Ciber-Físicos IoT",
    escalaPreliminar3D: "Escala 1:10 / 1:8 (Validación geométrica y mecánica de uniones en impresión 3D)",
    escalaFinalMadera: "Escala 1:3 / 1:4 (Prototipo funcional en madera con uniones impresas en 3D y domótica embebida)",
    materialUniones3D: "PLA+ (Prototipo inicial) / PETG o ABS/ASA con refuerzo interno (Uniones estructurales para madera)",
    materialEstructura: "Madera inmunizada / Tablero estructural mecanizado por CNC",
    arquitecturaDomotica: "ESP32 + ESPHome + Home Assistant + Broker MQTT Local + Sensores Térmicos/Humo/Solar + App Móvil",
    motorGemeloDigital: "Unity 3D (OpenXR / Meta Quest / PCVR) sincronizado en tiempo real con el prototipo físico"
  },

  desarrolloPrototipo: [
    {
      id: "DEV-01",
      orden: 1,
      tipoTarea: "Base",
      categoria: "Estructura & Diseño",
      titulo: "1. Investigación diseño estructural",
      descripcion: "Análisis geométrico del domo geodésico de marcos rígidos, frecuencia de subdivisión, cálculo de ángulos diedros y axiales, y definición de las dos escalas de trabajo (maqueta preliminar en impresión 3D y prototipo funcional en madera).",
      responsable: "Alex / Sebastián / Equipo Estructural CTM",
      fechaInicio: "2026-11-10",
      fechaFin: "2026-12-18",
      estado: "En Desarrollo",
      progreso: 20,
      parametrosTecnicos: "Geometría: Domo Geodésico de Marcos Rígidos | Escala Preliminar 3D: 1:10 | Escala Funcional Madera: 1:3 | Normativa de referencia: NSR-10 Título G.",
      documentacionAvance: "Se inicia la revisión de ángulos de corte y longitudes de aristas para estandarizar la menor cantidad de tipos de triángulos/marcos posibles.",
      archivos: [
        {
          nombre: "Calculo_Geodesico_Marcos_Rigidos_v1.xlsx",
          categoria: "Documento / Cálculo",
          tipo: "Hoja de Cálculo (.XLSX)",
          url: "",
          descripcion: "Matriz de cálculo de ángulos diedros, longitudes de aristas y frecuencias de subdivisión geodésica para escala 1:10 (3D) y 1:3 (Madera CNC).",
          fecha: "2026-11-10"
        },
        {
          nombre: "Especificacion_Estructural_NSR10_TituloG.pdf",
          categoria: "Documento / Norma",
          tipo: "Documento Técnico (.PDF)",
          url: "https://www.asosismica.org.co/",
          descripcion: "Referencia normativa colombiana NSR-10 Título G para estructuras de madera y uniones empernadas.",
          fecha: "2026-11-12"
        }
      ],
      imagenes: [
        {
          titulo: "Vista Isométrica General del Prototipo Domo Habitable",
          descripcion: "Definición arquitectónica e isométrica del prototipo a escala combinando estructura geodésica de madera mecanizada en CNC, cerramientos acristalados, terraza perimetral (deck) y módulos de domótica solar IoT.",
          fecha: "2026-11-10",
          autor: "Alex / Sebastián",
          url: "./assets/img/domo_isometrico_hero.png"
        },
        {
          titulo: "Esquema de Marcos Rígidos y Distribución Estructural",
          descripcion: "Revisión preliminar de la triangulación de marcos rígidos para minimizar la cantidad de referencias de listones en el proceso de corte CNC.",
          fecha: "2026-11-14",
          autor: "Sebastián / Equipo CTM",
          url: "./assets/img/image4.png"
        }
      ]
    },
    {
      id: "DEV-02",
      orden: 2,
      tipoTarea: "Base",
      categoria: "BIM & Modelado 3D",
      titulo: "2. Modelado estructural, integración de metodología BIM / Modelado VR Ready para Gemelo Digital",
      descripcion: "Desarrollo del modelo tridimensional paramétrico bajo metodología BIM (estructura, cerramientos, deck, zonas húmedas y mobiliario) y preparación de geometría optimizada (VR-Ready con mapeo UV y mallas limpias FBX/GLTF) lista para importar en Unity.",
      responsable: "Sebastián / Alex / Equipo Diseño CTM",
      fechaInicio: "2026-12-01",
      fechaFin: "2027-02-28",
      estado: "Pendiente",
      progreso: 0,
      parametrosTecnicos: "Software CAD/BIM: Revit / Rhino-Grasshopper / Fusion 360 | Exportación VR: .FBX / .GLTF (<150k polígonos para fluidez en gafas VR a 90 FPS).",
      documentacionAvance: "Pendiente definir la jerarquía de objetos en el modelo 3D para que los ventanales motorizados y las tiras LED tengan pivotes independientes en Unity.",
      archivos: [
        {
          nombre: "Domo_BIM_LOD350_Estructura.rvt",
          categoria: "Modelo 3D / BIM",
          tipo: "Modelo Revit BIM (.RVT)",
          url: "",
          descripcion: "Modelo paramétrico base con familias de marcos rígidos, deck y nichos para sensores.",
          fecha: "2026-12-02"
        }
      ],
      imagenes: [
        {
          titulo: "Referencia Interior VR-Ready Escala 1:1",
          descripcion: "Propuesta de espacialidad interior, iluminación natural cenital y mobiliario ergonómico integrado para navegación inmersiva en Unity VR.",
          fecha: "2026-12-01",
          autor: "Alex / Sebastián",
          url: "./assets/img/image5.png"
        }
      ]
    },
    {
      id: "DEV-03",
      orden: 3,
      tipoTarea: "Base",
      categoria: "Ingeniería de Nodos 3D",
      titulo: "3. Sistema de uniones de piezas estructurales (Diseñado para Impresión 3D)",
      descripcion: "Diseño mecánico de un sistema modular de nodos/conectores estructurales fabricables mediante impresión 3D (FDM) que reciban los perfiles de madera a los ángulos exactos del domo y cuenten con cavidad central pasacables para ocultar el cableado domótico.",
      responsable: "Alex / Sebastián",
      fechaInicio: "2027-01-15",
      fechaFin: "2027-03-15",
      estado: "Pendiente",
      progreso: 0,
      parametrosTecnicos: "Tipo de unión: Nodo central impreso en 3D con bolsillos hembra angulados + perforación para perno pasante M4/M5 y canal interno para cables JST de 4 pines.",
      documentacionAvance: "Se busca que el nodo impreso en 3D elimine cortes compuestos complejos en la madera y garantice el ángulo exacto de ensamble en seco.",
      archivos: [
        {
          nombre: "Nodo_Conector_Hexavalente_v1.stl",
          categoria: "Modelo 3D",
          tipo: "Malla Impresión 3D (.STL)",
          url: "",
          descripcion: "Geometría de conector estructural de 6 brazos con anillo central pasacables y alojamientos para pernos M6.",
          fecha: "2027-01-15"
        }
      ],
      imagenes: [
        {
          titulo: "Detalle Técnico Nodo Unión Impreso en 3D (Escala 1:3)",
          descripcion: "Diseño del conector estructural impreso en 3D (PETG/ABS con fibra) acoplado a los travesaños de madera mecanizada en CNC con fijación oculta y paso interno para sensores IoT.",
          fecha: "2027-01-15",
          autor: "Alex / Sebastián",
          url: "./assets/img/detalle_nodo_3d_es.png"
        }
      ]
    },
    {
      id: "DEV-04",
      orden: 4,
      tipoTarea: "Base",
      categoria: "Domótica & IoT",
      titulo: "4. Análisis Domótica aplicada, recursos, dispositivos, etc.",
      descripcion: "Definición de la lista de materiales electrónicos (BOM), arquitectura de comunicación (ESP32 + ESPHome + Home Assistant), sensores ambientales (estratificación térmica, humo en chimenea, radiación/corriente solar) y actuadores a escala (servomotores MG996R / micro-actuadores lineales).",
      responsable: "Alex / Liliana (Medialab)",
      fechaInicio: "2026-11-15",
      fechaFin: "2027-01-30",
      estado: "En Desarrollo",
      progreso: 15,
      parametrosTecnicos: "Microcontrolador: ESP32 Dual-Core Wi-Fi/BLE | Sensores: DHT22 (x2 cenital/base), Termocupla Tipo K MAX6675 (chimenea), INA219 (solar), Tiras LED WS2812B.",
      documentacionAvance: "Identificados los puntos críticos de sensado térmico para demostrar el efecto de ventilación cenital por estratificación en el prototipo.",
      archivos: [],
      imagenes: []
    },
    {
      id: "DEV-05",
      orden: 5,
      tipoTarea: "Base",
      categoria: "Prototipado 3D Preliminar",
      titulo: "5. Impresión 3D piezas estructurales y uniones (Versión preliminar a escala en Impresión 3D)",
      descripcion: "Fabricación aditiva de una primera versión completa del domo a pequeña escala (barras/marcos + nodos de unión en impresión 3D) para validar físicamente la geometría, estabilidad estructural, secuencia de montaje y ubicación de sensores antes de pasar a la escala mayor en madera.",
      responsable: "Alex / Sebastián",
      fechaInicio: "2027-02-15",
      fechaFin: "2027-04-30",
      estado: "Pendiente",
      progreso: 0,
      parametrosTecnicos: "Tecnología: FDM (PLA+ / PETG) | Boquilla: 0.4mm | Altura de capa: 0.2mm | Relleno en nodos: 40% Gyroid | Diámetro maqueta preliminar: ~45-60 cm.",
      documentacionAvance: "Esta maqueta preliminar impresa 100% en 3D servirá como validador geométrico de bajo costo antes del corte CNC en madera.",
      archivos: [],
      imagenes: []
    },
    {
      id: "DEV-06",
      orden: 6,
      tipoTarea: "Propuesta Sugerida",
      categoria: "Ingeniería de Nodos 3D",
      titulo: "6. [Propuesta] Pruebas de resistencia mecánica y tolerancias de Nodos 3D para ensamble con Madera",
      descripcion: "Ensayos de ajuste (tolerancia de holgura 0.2mm - 0.3mm), tracción y rigidez de los conectores impresos en 3D (en PETG / ABS / Nylon-CF) acoplados a probetas reales de madera mecanizada, asegurando que soporten el armado y desarmado repetitivo para INTERZUM 2028.",
      responsable: "Sebastián / Alex",
      fechaInicio: "2027-04-15",
      fechaFin: "2027-05-30",
      estado: "Pendiente",
      progreso: 0,
      parametrosTecnicos: "Material definitivo de nodos: PETG Técnico / ASA | Relleno estructural: 65% con 4 perímetros de pared | Inserto metálico roscado M4 por calor.",
      documentacionAvance: "Tarea propuesta para garantizar que los nodos impresos en 3D no se fisuren al apretar los listones de madera del prototipo grande.",
      archivos: [],
      imagenes: []
    },
    {
      id: "DEV-07",
      orden: 7,
      tipoTarea: "Propuesta Sugerida",
      categoria: "Domótica & IoT",
      titulo: "7. [Propuesta] Diseño e impresión 3D de encapsulados (Enclosures) para sensores y soportes de servomotores",
      descripcion: "Diseño CAD e impresión 3D de las carcasas a medida que se integran en la estructura de madera para alojar el ESP32, fijar los servomotores de apertura de ventanales cenitales y guiar las tiras LED sin dejar electrónica expuesta.",
      responsable: "Alex (Medialab)",
      fechaInicio: "2027-05-01",
      fechaFin: "2027-06-30",
      estado: "Pendiente",
      progreso: 0,
      parametrosTecnicos: "Encapsulados ventilados en PETG ignífugo con fijación snap-fit sobre los nodos y marcos del domo.",
      documentacionAvance: "Permite que la integración domótica luzca industrializada y limpia dentro del prototipo en madera.",
      archivos: [],
      imagenes: []
    },
    {
      id: "DEV-08",
      orden: 8,
      tipoTarea: "Base",
      categoria: "Gemelo Digital Unity VR",
      titulo: "8. Desarrollo de proyecto en Unity VR",
      descripcion: "Creación del proyecto en Unity 3D para visores de Realidad Virtual (escala humana 1:1), integrando el modelo BIM/VR-Ready, iluminación ambiental dinámica, paneles interactivos dentro de VR y animaciones de apertura de claraboyas, chimenea y flujo de aire.",
      responsable: "Alex / Equipo Medialab",
      fechaInicio: "2027-05-01",
      fechaFin: "2027-10-30",
      estado: "Pendiente",
      progreso: 0,
      parametrosTecnicos: "Motor: Unity 2022/6 LTS | Render Pipeline: URP optimizado para VR | SDK: OpenXR + XR Interaction Toolkit | Target: Meta Quest 3 / PCVR.",
      documentacionAvance: "El usuario podrá recorrer el domo a escala 1:1 en VR mientras manipula o visualiza los estados del prototipo físico.",
      archivos: [],
      imagenes: []
    },
    {
      id: "DEV-09",
      orden: 9,
      tipoTarea: "Base",
      categoria: "Producción Madera + 3D",
      titulo: "9. Producción a escala del proyecto en Madera con sistemas de uniones en Impresión 3D",
      descripcion: "Corte y mecanizado CNC de las piezas estructurales en madera, plataforma base (Deck) y cerramientos en los talleres del CTM, e impresión del lote completo de nodos conectores 3D definitivos para el ensamble del prototipo funcional a escala mayor.",
      responsable: "Sebastián / Alex / Talleres CTM",
      fechaInicio: "2027-08-01",
      fechaFin: "2027-12-15",
      estado: "Pendiente",
      progreso: 0,
      parametrosTecnicos: "Escala del prototipo en madera: 1:3 / 1:4 (Diámetro aprox. 1.8m - 2.4m) | Estructura: Madera mecanizada en CNC + Nodos estructurales impresos en 3D.",
      documentacionAvance: "Combina la calidez y rigidez de la madera mecanizada en el CTM con la versatilidad geométrica de los nodos impresos en 3D.",
      archivos: [],
      imagenes: []
    },
    {
      id: "DEV-10",
      orden: 10,
      tipoTarea: "Base",
      categoria: "Domótica & IoT",
      titulo: "10. Instalación domótica (En prototipo de madera a escala)",
      descripcion: "Tendido del cableado oculto a través de los canales y nodos impresos en 3D, montaje de sensores térmicos, sensor de chimenea, servomotores en ventanales cenitales, iluminación inteligente y sistema solar fotovoltaico a escala.",
      responsable: "Alex / Equipo Medialab",
      fechaInicio: "2027-11-15",
      fechaFin: "2028-01-31",
      estado: "Pendiente",
      progreso: 0,
      parametrosTecnicos: "Alimentación: Sistema Solar 12V DC con batería LiFePO4/Gel + Regulador MPPT y conversores Buck 5V para bus ESP32 y servomotores.",
      documentacionAvance: "",
      archivos: [],
      imagenes: []
    },
    {
      id: "DEV-11",
      orden: 11,
      tipoTarea: "Propuesta Sugerida",
      categoria: "Gemelo Digital Unity VR",
      titulo: "11. [Propuesta] Desarrollo del Puente Bidireccional MQTT (Sincronización Prototipo Físico ↔ Unity VR)",
      descripcion: "Implementación del broker MQTT local en Home Assistant y programación del cliente MQTT en C# dentro de Unity para que los datos reales de los sensores del domo en madera se reflejen en vivo dentro de las gafas VR y los comandos desde VR accionen los servomotores físicos.",
      responsable: "Alex (Medialab)",
      fechaInicio: "2027-11-01",
      fechaFin: "2028-02-15",
      estado: "Pendiente",
      progreso: 0,
      parametrosTecnicos: "Protocolo: MQTT sobre Wi-Fi local (Latencia < 100 ms) | Tópicos: geodome/sensores/temp, geodome/chimenea/alerta, geodome/actuadores/ventanal.",
      documentacionAvance: "Es el corazón del concepto de Gemelo Digital verdadero (comunicación bidireccional física-virtual).",
      archivos: [],
      imagenes: []
    },
    {
      id: "DEV-12",
      orden: 12,
      tipoTarea: "Base",
      categoria: "App Móvil & Control",
      titulo: "12. Pruebas con aplicación móvil",
      descripcion: "Configuración y pruebas de la interfaz móvil (App Home Assistant Companion en celular y tablet) con controles táctiles de apertura de ventanales, curvas de temperatura en vivo, estado de carga solar y notificaciones push de seguridad en chimenea.",
      responsable: "Alex / Liliana",
      fechaInicio: "2028-01-15",
      fechaFin: "2028-03-01",
      estado: "Pendiente",
      progreso: 0,
      parametrosTecnicos: "Plataforma Móvil: Home Assistant Companion App (Android / iOS) con Dashboard personalizado para huésped y administrador ecoturístico.",
      documentacionAvance: "",
      archivos: [],
      imagenes: []
    },
    {
      id: "DEV-13",
      orden: 13,
      tipoTarea: "Base",
      categoria: "Validación & Pruebas",
      titulo: "13. Pruebas de funcionamiento / Versión física / Versión VR",
      descripcion: "Ejecución de protocolos de prueba integrados: respuesta automática de los ventanales del prototipo físico ante aumento de temperatura, disparo de alerta en chimenea, autonomía energética y verificación simultánea en la App Móvil y en las gafas de Realidad Virtual (Unity).",
      responsable: "Alex / Sebastián / Liliana",
      fechaInicio: "2028-02-15",
      fechaFin: "2028-04-10",
      estado: "Pendiente",
      progreso: 0,
      parametrosTecnicos: "Métricas a validar: Tiempo de respuesta (<500ms), precisión térmica (±0.5°C), consumo en reposo/activo (W) y estabilidad de sincronización VR.",
      documentacionAvance: "",
      archivos: [],
      imagenes: []
    },
    {
      id: "DEV-14",
      orden: 14,
      tipoTarea: "Propuesta Sugerida",
      categoria: "Validación & Pruebas",
      titulo: "14. [Propuesta] Consolidación de Ficha Técnica del Producto y Dossier para INTERZUM Bogotá 2028",
      descripcion: "Sistematización final de todos los resultados experimentales, parámetros de impresión 3D de uniones, tiempos de mecanizado CNC en madera, diagramas de conexión IoT y manual de operación para entrega de investigación SENNOVA y exhibición en INTERZUM (Mayo 2028).",
      responsable: "Alex / Sebastián / Liliana",
      fechaInicio: "2028-03-15",
      fechaFin: "2028-04-30",
      estado: "Pendiente",
      progreso: 0,
      parametrosTecnicos: "Entregable: Ficha Técnica Estandarizada del Prototipo Ciber-Físico + Gemelo Digital VR.",
      documentacionAvance: "Esta etapa se alimenta automáticamente de todos los datos registrados en las tareas anteriores.",
      archivos: [],
      imagenes: []
    }
  ]
};
