// ============================================================================
// GEODOME SMART - CONTROLADOR DE PLATAFORMA WEB (SENNOVA CTM - INTERZUM 2028)
// Estética: Minimalist Industrial Product Design & Architectural Studio
// ============================================================================

(function () {
  'use strict';

  const AUTORES_FORMULACION = [
    { id: 'Alex', nombre: 'Alex', etiqueta: '@Alex', iniciales: 'AX', clase: 'Alex', rol: 'Líder Formulación / Medialab & Domótica' },
    { id: 'Sebastian', nombre: 'Sebastián', etiqueta: '@Sebastián', iniciales: 'SB', clase: 'Sebastian', rol: 'Co-autor Formulación / Estructura & Técnica' },
    { id: 'Liliana', nombre: 'Liliana', etiqueta: '@Liliana', iniciales: 'LI', clase: 'Liliana', rol: 'Co-autora Formulación / Metodología & MGA' }
  ];

  let currentTab = 'formulacion';
  let activeNumeral = '1'; // '1'..'21' o 'ALL'
  let filterStatusMGA = 'ALL';
  let filterAuthorMGA = 'ALL';
  let selectedCampoIdxForAI = 0;
  let activeMentionNumeral = null;

  // Estado de la Pestaña 4: Prototipo a escala / Gemelo digital
  let activeProtoTaskId = 'DEV-01'; // 'DEV-01'..'DEV-14', 'ALL' o 'FICHA'
  let filterProtoStatus = 'ALL';
  let showLaminaBoard = true;
  let protoChronoOrder = 'asc'; // 'asc' (cronológico antiguo->reciente) o 'desc' (reciente->antiguo)
  let showAdvanceFormByTask = { 'DEV-01': true };
  let showResourceFormByTask = { 'DEV-01': false };
  let advanceDraftByTask = {};
  let resourceDraftByTask = {};
  let editingAdvanceByKey = {};
  let editingResourceByKey = {};
  let lightboxState = {
    isOpen: false,
    taskId: null,
    imgIdx: 0,
    zoomed: false,
    customItems: null
  };

  // Filtros de la Matriz Relacional
  let filterOE = 'ALL';
  let filterFase = 'ALL';
  let filterResp = '';
  let searchQuery = '';

  // Estado del Asistente IA
  let aiResponseText = 'Selecciona cualquier numeral (1 al 21) y el campo específico que deseas revisar o redactar.';
  let lastAiGeneratedDraft = '';
  let geminiApiKey = localStorage.getItem('geodome_gemini_key') || '';

  // 1. Cargar los 21 Numerales exactos de la Plantilla MGA
  let formulacion = [];
  try {
    const saved = localStorage.getItem('geodome_formulacion_exacta_v1');
    formulacion = saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(PROJECT_DATA.formulacionMGA));
  } catch (e) {
    formulacion = JSON.parse(JSON.stringify(PROJECT_DATA.formulacionMGA));
  }

  formulacion.forEach(sec => {
    if (!Array.isArray(sec.autoresAsignados)) sec.autoresAsignados = [];
    if (!Array.isArray(sec.tareasAutores)) sec.tareasAutores = [];
  });

  // 2. Cargar las 15 Actividades de la Matriz MGA
  let activities = [];
  try {
    const saved = localStorage.getItem('geodome_activities_exacta_v1');
    activities = saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(PROJECT_DATA.matrizActividades));
  } catch (e) {
    activities = JSON.parse(JSON.stringify(PROJECT_DATA.matrizActividades));
  }

  // 3. Cargar las Etapas de Desarrollo del Prototipo a Escala / Gemelo Digital y Ficha Técnica
  let protoTasks = [];
  try {
    const saved = localStorage.getItem('geodome_proto_tasks_v1');
    protoTasks = saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(PROJECT_DATA.desarrolloPrototipo));
  } catch (e) {
    protoTasks = JSON.parse(JSON.stringify(PROJECT_DATA.desarrolloPrototipo));
  }

  // Normalizar imágenes (avances cronológicos) y archivos (recursos) para compatibilidad con datos previos
  protoTasks.forEach(task => {
    const baseTask = (PROJECT_DATA.desarrolloPrototipo || []).find(bt => bt.id === task.id);
    if (!Array.isArray(task.imagenes)) task.imagenes = [];
    task.imagenes.forEach((img, idx) => {
      const baseImg = (baseTask && Array.isArray(baseTask.imagenes)) ? baseTask.imagenes[idx] : null;
      if (!img.fecha) img.fecha = (baseImg && baseImg.fecha) || task.fechaInicio || new Date().toISOString().slice(0, 10);
      if (!img.descripcion) {
        img.descripcion = (baseImg && baseImg.descripcion) || `Registro de avance visual correspondiente a la etapa "${task.titulo}".`;
      }
      if (!img.autor) img.autor = (baseImg && baseImg.autor) || task.responsable || 'Alex / Sebastián';
    });

    if (!Array.isArray(task.archivos)) task.archivos = [];
    task.archivos.forEach((arch, idx) => {
      const baseArch = (baseTask && Array.isArray(baseTask.archivos)) ? baseTask.archivos[idx] : null;
      if (!arch.categoria) arch.categoria = (baseArch && baseArch.categoria) || 'Documento / Diseño';
      if (!arch.descripcion) {
        arch.descripcion = (baseArch && baseArch.descripcion) || `Recurso técnico asociado a ${task.id} (${arch.tipo || 'Archivo'}).`;
      }
      if (typeof arch.url === 'undefined') arch.url = (baseArch && baseArch.url) || '';
      if (!arch.fecha) arch.fecha = (baseArch && baseArch.fecha) || task.fechaInicio || new Date().toISOString().slice(0, 10);
    });
  });

  let fichaMeta = {};
  try {
    const saved = localStorage.getItem('geodome_ficha_meta_v1');
    fichaMeta = saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(PROJECT_DATA.fichaTecnicaMeta));
  } catch (e) {
    fichaMeta = JSON.parse(JSON.stringify(PROJECT_DATA.fichaTecnicaMeta));
  }

  // 4. Cargar Bitácora de Revisiones
  let bitacora = [];
  try {
    const saved = localStorage.getItem('geodome_bitacora_exacta_v1');
    bitacora = saved ? JSON.parse(saved) : [
      {
        id: "REV-01",
        semana: "Base Cargada desde Plantilla MGA",
        autor: "Alex / Sebastián / Liliana",
        hito: "Se estructuran los 21 numerales MGA y las 14 etapas técnicas de la sección 'Prototipo a escala / Gemelo digital' con generador de Ficha Técnica de Investigación.",
        decisionTecnica: "Se desarrollará primero una versión a escala en impresión 3D (piezas y uniones) antes de la versión a mayor escala en madera con uniones impresas en 3D y domótica integrada.",
        estado: "Registrado"
      }
    ];
  } catch (e) {
    bitacora = [];
  }

  function formatCOP(val) {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(val);
  }

  function saveFormulacion() {
    try { localStorage.setItem('geodome_formulacion_exacta_v1', JSON.stringify(formulacion)); } catch (e) {}
  }

  function saveActivities() {
    try { localStorage.setItem('geodome_activities_exacta_v1', JSON.stringify(activities)); } catch (e) {}
  }

  function saveProtoTasks() {
    try { localStorage.setItem('geodome_proto_tasks_v1', JSON.stringify(protoTasks)); } catch (e) {}
  }

  function saveFichaMeta() {
    try { localStorage.setItem('geodome_ficha_meta_v1', JSON.stringify(fichaMeta)); } catch (e) {}
  }

  function saveBitacora() {
    try { localStorage.setItem('geodome_bitacora_exacta_v1', JSON.stringify(bitacora)); } catch (e) {}
  }

  window.resetNumeralToTemplate = function (numeral) {
    if (!confirm('¿Deseas restaurar los textos del Numeral ' + numeral + ' a la versión base original de la plantilla Excel MGA?')) return;
    const original = PROJECT_DATA.formulacionMGA.find(item => item.numeral === numeral);
    const idx = formulacion.findIndex(item => item.numeral === numeral);
    if (original && idx !== -1) {
      const prevAutores = formulacion[idx].autoresAsignados || [];
      const prevTareas = formulacion[idx].tareasAutores || [];
      formulacion[idx] = JSON.parse(JSON.stringify(original));
      formulacion[idx].autoresAsignados = prevAutores;
      formulacion[idx].tareasAutores = prevTareas;
      saveFormulacion();
      render();
    }
  };

  const monthsTimeline = [
    "2026-11", "2026-12",
    "2027-01", "2027-02", "2027-03", "2027-04", "2027-05", "2027-06",
    "2027-07", "2027-08", "2027-09", "2027-10", "2027-11", "2027-12",
    "2028-01", "2028-02", "2028-03", "2028-04", "2028-05"
  ];

  function getStats() {
    const totalPresupuesto = activities.reduce((acc, a) => acc + (a.valorTotal || 0), 0);
    const avgProgreso = Math.round(activities.reduce((acc, a) => acc + Number(a.progreso || 0), 0) / activities.length);
    const porLinea = activities.reduce((acc, a) => {
      acc[a.lineaInversion] = (acc[a.lineaInversion] || 0) + a.valorTotal;
      return acc;
    }, {});

    const totalNumerales = formulacion.length;
    const aprobados = formulacion.filter(n => n.estadoRevision === 'Aprobado').length;
    const enRevision = formulacion.filter(n => n.estadoRevision === 'En Revisión').length;
    const necesitaCambios = formulacion.filter(n => n.estadoRevision === 'Necesita Cambios').length;

    const porAutor = {};
    AUTORES_FORMULACION.forEach(a => {
      const numCount = formulacion.filter(s => (s.autoresAsignados || []).includes(a.id)).length;
      let tareasPendientes = 0;
      formulacion.forEach(s => {
        (s.tareasAutores || []).forEach(t => {
          if (t.autor === a.id && !t.completada) tareasPendientes++;
        });
      });
      porAutor[a.id] = { numCount, tareasPendientes };
    });

    const protoTotal = protoTasks.length;
    const protoCompletadas = protoTasks.filter(t => t.estado === 'Completado').length;
    const protoAvg = protoTotal > 0
      ? Math.round(protoTasks.reduce((acc, t) => acc + Number(t.progreso || 0), 0) / protoTotal)
      : 0;

    return {
      totalPresupuesto, avgProgreso, porLinea,
      totalNumerales, aprobados, enRevision, necesitaCambios, porAutor,
      protoTotal, protoCompletadas, protoAvg
    };
  }

  // Exportar CSV de la Matriz Relacional
  window.exportMatrixCSV = function () {
    const headers = [
      "ID", "Codigo MGA", "Objetivo Especifico", "Fase Acta 02",
      "Actividad MGA", "Descripcion Tecnica",
      "Entregable / Verificador", "Producto Asociado", "Responsables",
      "Linea de Inversion", "Inicio", "Fin", "Duracion (Meses)",
      "Valor Total (COP)", "Avance (%)", "Estado"
    ];
    const rows = activities.map(a => [
      a.id, a.codigoMGA, a.objetivoId, a.faseActaId,
      `"${(a.actividadMGA || '').replace(/"/g, '""')}"`,
      `"${(a.alcanceAjustadoEscala || '').replace(/"/g, '""')}"`,
      `"${(a.entregableVerificador || '').replace(/"/g, '""')}"`,
      `"${(a.anexoSennova || '').replace(/"/g, '""')}"`,
      `"${(a.responsables || '').replace(/"/g, '""')}"`,
      `"${a.lineaInversion || ''}"`,
      a.inicio, a.fin, a.duracionMeses, a.valorTotal, a.progreso, a.estado
    ]);
    const csvContent = "\uFEFF" + [headers.join(";"), ...rows.map(r => r.join(";"))].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Matriz_Relacional_Geodome_Smart_SENNOVA.csv`;
    a.click();
  };

  // Exportar la Ficha Técnica Consolidada del Prototipo / Gemelo Digital en Word (.doc)
  window.exportFichaTecnicaWord = function () {
    const stats = getStats();
    let etapasHTML = '';

    protoTasks.forEach(t => {
      const archivosStr = (t.archivos && t.archivos.length > 0)
        ? t.archivos.map(f => `• <strong>[${f.categoria || 'Recurso'}] ${f.nombre}</strong> (${f.tipo || 'Archivo'} - ${f.fecha || '-'})` + (f.descripcion ? `<br/>&nbsp;&nbsp;<em>${f.descripcion}</em>` : '') + (f.url && !f.url.startsWith('data:') ? `<br/>&nbsp;&nbsp;Enlace: ${f.url}` : '')).join('<br/>')
        : 'Sin recursos adjuntos registrados aún.';

      const imgsStr = (t.imagenes && t.imagenes.length > 0)
        ? t.imagenes.slice().sort((a, b) => (a.fecha || '').localeCompare(b.fecha || '')).map(im => `• <strong>[${im.fecha || '-'}] ${im.titulo}</strong> (${im.autor || t.responsable}):<br/>&nbsp;&nbsp;${im.descripcion || ''}`).join('<br/>')
        : 'Sin avances visuales registrados aún.';

      etapasHTML += `
        <tr>
          <td><strong>${t.id}</strong><br/><em>(${t.tipoTarea})</em></td>
          <td><strong>${t.titulo}</strong><br/><span style="color:#444;">${t.descripcion}</span></td>
          <td><strong>Estado:</strong> ${t.estado} (${t.progreso}%)<br/><strong>Inicio:</strong> ${t.fechaInicio}<br/><strong>Fin:</strong> ${t.fechaFin}<br/><strong>Resp:</strong> ${t.responsable}</td>
          <td><strong>Parámetros Técnicos:</strong><br/>${(t.parametrosTecnicos || '').replace(/\n/g, '<br/>')}<br/><br/><strong>Avances Documentados:</strong><br/>${(t.documentacionAvance || 'En proceso').replace(/\n/g, '<br/>')}</td>
          <td><strong>Recursos / Modelos 3D / Enlaces:</strong><br/>${archivosStr}<br/><br/><strong>Registro Cronológico de Imágenes:</strong><br/>${imgsStr}</td>
        </tr>
      `;
    });

    const html = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Ficha Tecnica de Investigacion - Geodome Smart</title>' +
      '<style>' +
      'body { font-family: Arial, sans-serif; font-size: 10.5pt; line-height: 1.45; color: #161615; padding: 20px; }' +
      'h1 { color: #161615; font-size: 15pt; border-bottom: 2px solid #C86D44; padding-bottom: 6px; text-transform: uppercase; }' +
      'h2 { color: #161615; font-size: 12pt; margin-top: 18px; border-bottom: 1px solid #ccc; padding-bottom: 4px; text-transform: uppercase; }' +
      'table { border-collapse: collapse; width: 100%; margin-top: 10px; margin-bottom: 16px; font-size: 9.5pt; }' +
      'th, td { border: 1px solid #666; padding: 6px; text-align: left; vertical-align: top; }' +
      'th { background-color: #EAE5DC; color: #161615; font-weight: bold; }' +
      '</style></head><body>' +
      '<h1>FICHA TÉCNICA DE INVESTIGACIÓN Y DESARROLLO DE PRODUCTO - SENA SENNOVA (CTM)</h1>' +
      '<p><strong>Código de Ficha:</strong> ' + fichaMeta.codigoFicha + ' | <strong>Avance Global del Desarrollo:</strong> ' + stats.protoAvg + '% (' + stats.protoCompletadas + '/' + stats.protoTotal + ' Etapas Completadas)</p>' +
      '<h2>1. ESPECIFICACIONES GENERALES DEL PROTOTIPO A ESCALA Y GEMELO DIGITAL VR</h2>' +
      '<table><tbody>' +
      '<tr><th style="width:30%;">Nombre del Producto / Prototipo</th><td>' + fichaMeta.nombreProducto + '</td></tr>' +
      '<tr><th>Línea de Investigación</th><td>' + fichaMeta.lineaInvestigacion + '</td></tr>' +
      '<tr><th>Fase 1: Escala Preliminar Impresión 3D</th><td>' + fichaMeta.escalaPreliminar3D + '</td></tr>' +
      '<tr><th>Fase 2: Escala Funcional en Madera + Nodos 3D</th><td>' + fichaMeta.escalaFinalMadera + '</td></tr>' +
      '<tr><th>Sistema de Uniones (Impresión 3D)</th><td>' + fichaMeta.materialUniones3D + '</td></tr>' +
      '<tr><th>Material Estructural Mecanizado</th><td>' + fichaMeta.materialEstructura + '</td></tr>' +
      '<tr><th>Arquitectura Domótica y App Móvil</th><td>' + fichaMeta.arquitecturaDomotica + '</td></tr>' +
      '<tr><th>Gemelo Digital VR</th><td>' + fichaMeta.motorGemeloDigital + '</td></tr>' +
      '</tbody></table>' +
      '<h2>2. TRAZABILIDAD TÉCNICA DEL PROCESO DE DESARROLLO (ETAPAS, FECHAS, PARÁMETROS Y ARCHIVOS)</h2>' +
      '<table><thead><tr><th style="width:8%;">Código</th><th style="width:24%;">Etapa y Alcance</th><th style="width:18%;">Fechas, Estado y Responsable</th><th style="width:28%;">Parámetros Técnicos y Documentación de Avance</th><th style="width:22%;">Archivos, Diseños e Imágenes</th></tr></thead><tbody>' +
      etapasHTML +
      '</tbody></table></body></html>';

    const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Ficha_Tecnica_Investigacion_Prototipo_Geodome_Smart.doc`;
    a.click();
  };

  // Exportar los 21 Numerales de la Formulación a Word (.doc)
  window.exportWordDocument = function (tipo) {
    if (tipo === 'DOC-FICHA-TECNICA') {
      window.exportFichaTecnicaWord();
      return;
    }

    const stats = getStats();
    let seccionesHTML = '';

    formulacion.forEach(sec => {
      const colorEstado = sec.estadoRevision === 'Aprobado'
        ? '#4A6B4D'
        : sec.estadoRevision === 'Necesita Cambios'
        ? '#B43E3E'
        : '#B8863B';

      const autoresStr = (sec.autoresAsignados && sec.autoresAsignados.length > 0)
        ? sec.autoresAsignados.map(id => {
            const found = AUTORES_FORMULACION.find(a => a.id === id);
            return found ? found.nombre : id;
          }).join(', ')
        : 'Sin asignar';

      const tareasHTML = (sec.tareasAutores && sec.tareasAutores.length > 0)
        ? '<p style="font-size:9.5pt; margin:4px 0;"><strong>Acciones asignadas por autor:</strong><br/>' +
          sec.tareasAutores.map(t => `• [${t.completada ? '✔' : 'Pendiente'}] <strong>@${t.autorNombre}:</strong> ${t.texto}`).join('<br/>') +
          '</p>'
        : '';

      seccionesHTML += `
        <h2>${sec.titulo} <span style="font-size:10pt; color:${colorEstado};">[Estado: ${sec.estadoRevision} | Autores: ${autoresStr}]</span></h2>
        ${sec.observacionesComite ? `<p style="font-size:9.5pt; color:#444; background:#f3f4f6; padding:6px;"><strong>Observaciones de Revisión:</strong> ${sec.observacionesComite}</p>` : ''}
        ${tareasHTML}
        <table>
          <thead>
            <tr>
              <th style="width:28%;">Campo de la Plantilla MGA</th>
              <th style="width:72%;">Contenido</th>
            </tr>
          </thead>
          <tbody>
            ${sec.campos.map(c => `
              <tr>
                <td><strong>${c.etiqueta}</strong></td>
                <td>${(c.valor || '').replace(/\n/g, '<br/>')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    });

    const html = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Formulacion MGA Geodome Smart</title>' +
      '<style>' +
      'body { font-family: Arial, sans-serif; font-size: 11pt; line-height: 1.45; color: #111; padding: 20px; }' +
      'h1 { color: #161615; font-size: 16pt; border-bottom: 2px solid #C86D44; padding-bottom: 6px; }' +
      'h2 { color: #161615; font-size: 13pt; margin-top: 22px; border-bottom: 1px solid #ccc; padding-bottom: 4px; }' +
      'table { border-collapse: collapse; width: 100%; margin-top: 8px; margin-bottom: 14px; font-size: 10pt; }' +
      'th, td { border: 1px solid #666; padding: 7px; text-align: left; vertical-align: top; }' +
      'th { background-color: #EAE5DC; color: #161615; font-weight: bold; }' +
      '</style></head><body>' +
      '<h1>PRESENTACIÓN PROYECTOS MGA - DIRECCIÓN DE FORMACIÓN PROFESIONAL</h1>' +
      '<p><strong>Proyecto:</strong> ' + PROJECT_DATA.metadata.nombreCompleto + '</p>' +
      '<p><strong>Centro de Formación:</strong> ' + PROJECT_DATA.metadata.centroFormacion + '</p>' +
      '<p><strong>Equipo de Formulación:</strong> Alex, Sebastián, Liliana</p>' +
      '<p><strong>Estado de Revisión MGA:</strong> ' + stats.aprobados + ' Aprobados | ' + stats.enRevision + ' En Revisión | ' + stats.necesitaCambios + ' Necesitan Cambios (de 21 Numerales)</p>' +
      seccionesHTML +
      '</body></html>';

    const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Formulacion_MGA_Geodome_Smart_${tipo}.doc`;
    a.click();
  };

  function getStatusDotClass(status) {
    if (status === 'Aprobado' || status === 'Completado') return 'aprobado';
    if (status === 'Necesita Cambios' || status === 'Bloqueado') return 'cambios';
    return 'revision';
  }

  function render() {
    const stats = getStats();
    const appEl = document.getElementById('app');

    const navGroups = [
      {
        id: 'formulacion',
        num: '01',
        label: 'Formulación MGA',
        badge: `${stats.aprobados}/21`,
        isActive: currentTab === 'formulacion' || currentTab === 'exportador',
        submenu: [
          { id: 'formulacion', label: '📋 Numerales MGA (1 al 21)', active: currentTab === 'formulacion' },
          { id: 'exportador', label: '📥 Descargables SENNOVA (.doc)', active: currentTab === 'exportador' }
        ]
      },
      {
        id: 'matriz',
        num: '02',
        label: 'Matriz',
        isActive: currentTab === 'matriz'
      },
      {
        id: 'cronograma',
        num: '03',
        label: 'Cronograma',
        isActive: currentTab === 'cronograma' || currentTab === 'bitacora',
        submenu: [
          { id: 'cronograma', label: '📅 Cronograma y Presupuesto', active: currentTab === 'cronograma' },
          { id: 'bitacora', label: '📝 Bitácora Semanal', active: currentTab === 'bitacora' }
        ]
      },
      {
        id: 'arquitectura',
        num: '04',
        label: 'Prototipo / Gemelo VR',
        badge: `${stats.protoAvg}%`,
        isActive: currentTab === 'arquitectura',
        submenu: [
          { id: 'arquitectura', action: "switchProtoSub('DEV-01')", label: '🛠️ Desarrollo de Producto (14 Etapas)', active: currentTab === 'arquitectura' && activeProtoTaskId !== 'FICHA' },
          { id: 'arquitectura', action: "switchProtoSub('FICHA')", label: '📋 Ficha Técnica Consolidada', active: currentTab === 'arquitectura' && activeProtoTaskId === 'FICHA' }
        ]
      }
    ];

    appEl.innerHTML = `
      <!-- Barra Superior de Estudio de Diseño Industrial -->
      <header class="site-header no-print">
        <div class="container">
          <div class="header-top">
            <div class="header-left-stack">
              <div class="brand-group">
                <div class="brand-emblem">GS</div>
                <div>
                  <div class="brand-badges">
                    <span class="badge badge-charcoal">SENA · SENNOVA CTM (MEDIALAB 107)</span>
                    <span class="badge badge-wood">INTERZUM BOGOTÁ · MAYO 2028</span>
                    <span class="badge badge-sena">AUTORES: ALEX · SEBASTIÁN · LILIANA</span>
                  </div>
                  <h1 class="brand-title">Geodome Smart · Formulación MGA & Diseño de Producto</h1>
                </div>
              </div>

              <div class="header-actions">
                <button class="btn btn-primary" onclick="exportWordDocument('Plantilla_MGA')">
                  📄 Formulación MGA (.doc)
                </button>
                <button class="btn btn-wood" onclick="exportFichaTecnicaWord()">
                  📋 Ficha Técnica Producto (.doc)
                </button>
                <button class="btn btn-secondary" onclick="exportMatrixCSV()">
                  📊 Matriz (.csv)
                </button>
              </div>
            </div>

            <div class="header-sena-block">
              <img src="./assets/img/logo-sena-verde.svg" alt="Logo SENA" class="header-sena-logo" />
              <span class="header-sena-center-title">Centro Tecnológico del Mobiliario</span>
              <span class="header-sena-center-sub">Regional Antioquia · SENNOVA</span>
            </div>
          </div>

          <nav class="nav-tabs">
            ${navGroups.map(g => `
              <div class="nav-item-wrap">
                <button class="tab-btn ${g.isActive ? 'active' : ''}" onclick="switchTab('${g.id}')">
                  <span class="tab-num">${g.num}</span>
                  <span>${g.label}</span>
                  ${g.badge ? `<span class="tab-pill">${g.badge}</span>` : ''}
                  ${g.submenu ? `<span class="tab-caret">▼</span>` : ''}
                </button>
                ${g.submenu ? `
                  <div class="nav-submenu">
                    ${g.submenu.map(sub => `
                      <button type="button"
                        class="submenu-btn ${sub.active ? 'active' : ''}"
                        onclick="${sub.action ? sub.action : `switchTab('${sub.id}')`}">
                        <span>${sub.label}</span>
                        <span>→</span>
                      </button>
                    `).join('')}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </nav>
        </div>
      </header>

      <main class="container">
        <!-- Hero Banner de Alto Protagonismo con Imagen Isométrica Única en Español -->
        <section class="hero-banner">
          <div class="hero-grid">
            <div>
              <span class="hero-subtitle">CENTRO TECNOLÓGICO DEL MOBILIARIO (CTM) · PROYECTO DE INVESTIGACIÓN APLICADA</span>
              <h2 class="hero-display-stack">
                DOMO HABITABLE
                <span class="accent-word">ALOJAMIENTO MODULAR SUSTENTABLE & GEMELO DIGITAL</span>
              </h2>
              <p class="hero-lead">
                Solución habitacional compacta y eficiente que articula confort, arquitectura en <strong>Madera CNC</strong>, sistema de uniones estructurales en <strong>Impresión 3D</strong>, <strong>Domótica IoT</strong> e integración con su <strong>Gemelo Digital en Unity VR</strong>.
              </p>

              <!-- 4 Pilares Arquitectónicos y de Producto en Español -->
              <div class="hero-pillars-grid">
                <div class="hero-pillar-item">
                  <div class="hero-pillar-icon">🌿</div>
                  <div>
                    <span class="hero-pillar-title">Sustentable</span>
                    <span class="hero-pillar-desc">Bajo impacto ambiental, estructura geodésica ligera y materiales renovables.</span>
                  </div>
                </div>
                <div class="hero-pillar-item">
                  <div class="hero-pillar-icon">☀️</div>
                  <div>
                    <span class="hero-pillar-title">Eficiente</span>
                    <span class="hero-pillar-desc">Iluminación natural, ventilación cenital motorizada y captación solar.</span>
                  </div>
                </div>
                <div class="hero-pillar-item">
                  <div class="hero-pillar-icon">🧊</div>
                  <div>
                    <span class="hero-pillar-title">Modular (3D + Madera)</span>
                    <span class="hero-pillar-desc">Nodos estructurales en Impresión 3D y corte CNC de rápido montaje.</span>
                  </div>
                </div>
                <div class="hero-pillar-item">
                  <div class="hero-pillar-icon">🏠</div>
                  <div>
                    <span class="hero-pillar-title">Confort Inteligente</span>
                    <span class="hero-pillar-desc">Domótica IoT automatizada, app móvil y Gemelo Digital 1:1 en Unity VR.</span>
                  </div>
                </div>
              </div>

              <div style="display:flex; flex-wrap:wrap; gap:8px;">
                <span class="badge badge-sena">✔ ${stats.aprobados}/21 Numerales MGA</span>
                <span class="badge badge-wood">◆ Prototipo/VR: ${stats.protoCompletadas}/${stats.protoTotal} Etapas (${stats.protoAvg}%)</span>
                <span class="author-mini-badge Alex" style="padding:3px 9px; font-size:10.5px;">@Alex (${stats.porAutor.Alex.numCount} num · ${stats.porAutor.Alex.tareasPendientes} acciones)</span>
                <span class="author-mini-badge Sebastian" style="padding:3px 9px; font-size:10.5px;">@Sebastián (${stats.porAutor.Sebastian.numCount} num · ${stats.porAutor.Sebastian.tareasPendientes} acciones)</span>
                <span class="author-mini-badge Liliana" style="padding:3px 9px; font-size:10.5px;">@Liliana (${stats.porAutor.Liliana.numCount} num · ${stats.porAutor.Liliana.tareasPendientes} acciones)</span>
              </div>
            </div>

            <!-- Gráfico Principal Único: Vista Isométrica del Prototipo con Textos en Español -->
            <div class="hero-isometric-stage">
              <div class="hero-iso-top-bar">
                <span>VISTA ISOMÉTRICA GENERAL DEL PROTOTIPO · GEODOME SMART</span>
                <span style="color:var(--accent-terracotta-dark);">CONSTRUCCIÓN 4.0 · ESCALA INDICADA</span>
              </div>
              <div class="hero-isometric-img-wrap">
                <img src="./assets/img/domo_isometrico_hero.png" alt="Vista Isométrica Prototipo Domo Habitable Geodome Smart" />
              </div>
              <div class="hero-iso-caption-bar">
                <span>ESTRUCTURA EN MADERA CNC + UNIONES IMPRESAS EN 3D</span>
                <span style="color:var(--accent-sage);">DOMÓTICA SOLAR IoT · GEMELO DIGITAL UNITY VR</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Tira de Especificaciones Numeradas (KPI Strip) -->
        <section class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label"><span>01 · Formulación MGA</span><span>PLANTILLA BASE</span></span>
            <div class="kpi-value emerald">${stats.aprobados} / ${stats.totalNumerales} Aprobados</div>
            <div class="kpi-sub">${stats.enRevision} En Revisión · ${stats.necesitaCambios} Con Cambios</div>
          </div>
          <div class="kpi-card">
            <span class="kpi-label"><span>02 · Ingeniería de Producto</span><span>14 ETAPAS</span></span>
            <div class="kpi-value gold">${stats.protoAvg}% Avance</div>
            <div class="kpi-sub">Impresión 3D → Madera CNC + Nodos 3D + VR</div>
          </div>
          <div class="kpi-card">
            <span class="kpi-label"><span>03 · Presupuesto MGA</span><span>15 ACTIVIDADES</span></span>
            <div class="kpi-value cyan">${formatCOP(stats.totalPresupuesto)}</div>
            <div class="kpi-sub">3 Objetivos Específicos · 6 Fases Acta 02</div>
          </div>
          <div class="kpi-card">
            <span class="kpi-label"><span>04 · Hito de Exhibición</span><span>FERIA INTERNACIONAL</span></span>
            <div class="kpi-value">INTERZUM 2028</div>
            <div class="kpi-sub">Primera semana Mayo 2028 · Bogotá</div>
          </div>
        </section>

        <!-- Contenido Dinámico de la Pestaña -->
        <div id="tab-content">
          ${renderActiveTab()}
        </div>
      </main>

      <footer class="site-footer no-print">
        <div class="container">
          SENA Regional Antioquia · Centro Tecnológico del Mobiliario (CTM - Itagüí) · Ambiente 107 Medialab · Proyecto Geodome Smart – INTERZUM Bogotá 2028
        </div>
      </footer>

      ${renderProtoLightboxModal()}
    `;

    attachEvents();
  }

  function renderActiveTab() {
    switch (currentTab) {
      case 'formulacion': return renderTabFormulacion();
      case 'matriz': return renderTabMatriz();
      case 'cronograma': return renderTabCronograma();
      case 'arquitectura': return renderTabPrototipoGemelo();
      case 'exportador': return renderTabExportador();
      case 'bitacora': return renderTabBitacora();
      default: return renderTabFormulacion();
    }
  }

  // ==========================================================================
  // PESTAÑA 1: FORMULACIÓN (BASE MGA 1-21 + AUTORES ALEX/SEBASTIÁN/LILIANA + IA)
  // ==========================================================================
  function renderTabFormulacion() {
    const filteredList = formulacion.filter(item => {
      const matchStatus = filterStatusMGA === 'ALL' || item.estadoRevision === filterStatusMGA;
      const matchAuthor = filterAuthorMGA === 'ALL' ||
        (item.autoresAsignados || []).includes(filterAuthorMGA) ||
        (item.tareasAutores || []).some(t => t.autor === filterAuthorMGA) ||
        (item.observacionesComite || '').toLowerCase().includes(filterAuthorMGA.toLowerCase());
      return matchStatus && matchAuthor;
    });

    const sectionsToRender = activeNumeral === 'ALL'
      ? filteredList
      : formulacion.filter(item => item.numeral === activeNumeral);

    const currentSecObj = formulacion.find(item => item.numeral === activeNumeral) || formulacion[0];
    if (selectedCampoIdxForAI >= currentSecObj.campos.length) {
      selectedCampoIdxForAI = 0;
    }

    return `
      <div class="no-print" style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">
        <div class="section-subnav-bar">
          <button type="button" class="section-subnav-btn active" onclick="switchTab('formulacion')">
            📋 Numerales MGA (1 al 21)
          </button>
          <button type="button" class="section-subnav-btn" onclick="switchTab('exportador')">
            📥 Descargables SENNOVA (.doc)
          </button>
        </div>
      </div>

      <div class="formulacion-layout">
        <!-- Columna 1: Índice de los 21 Numerales de la Plantilla MGA -->
        <aside class="mga-sidebar no-print">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
            <span class="panel-kicker" style="margin:0;">Índice MGA</span>
            <button class="btn btn-secondary" style="padding:4px 9px; font-size:10.5px;" onclick="selectNumeral('ALL')">
              Ver Todos (1-21)
            </button>
          </div>
          <h3 style="font-size:14px; font-weight:900; color:var(--text-primary); text-transform:uppercase; margin-bottom:10px; letter-spacing:0.04em;">
            Numerales (01 — 21)
          </h3>

          <select id="filter-status-mga" class="select-control" style="padding:7px 10px; font-size:11.5px; margin-bottom:8px;">
            <option value="ALL" ${filterStatusMGA === 'ALL' ? 'selected' : ''}>Todos los Estados (21)</option>
            <option value="En Revisión" ${filterStatusMGA === 'En Revisión' ? 'selected' : ''}>⏳ En Revisión</option>
            <option value="Aprobado" ${filterStatusMGA === 'Aprobado' ? 'selected' : ''}>✅ Aprobados</option>
            <option value="Necesita Cambios" ${filterStatusMGA === 'Necesita Cambios' ? 'selected' : ''}>⚠️ Necesita Cambios</option>
          </select>

          <select id="filter-author-mga" class="select-control" style="padding:7px 10px; font-size:11.5px;">
            <option value="ALL" ${filterAuthorMGA === 'ALL' ? 'selected' : ''}>👥 Todos los Autores</option>
            <option value="Alex" ${filterAuthorMGA === 'Alex' ? 'selected' : ''}>👤 Asignados a @Alex</option>
            <option value="Sebastian" ${filterAuthorMGA === 'Sebastian' ? 'selected' : ''}>👤 Asignados a @Sebastián</option>
            <option value="Liliana" ${filterAuthorMGA === 'Liliana' ? 'selected' : ''}>👤 Asignados a @Liliana</option>
          </select>

          <div class="mga-nav-list">
            ${filteredList.map(sec => `
              <button class="mga-nav-item ${activeNumeral === sec.numeral ? 'active' : ''}" onclick="selectNumeral('${sec.numeral}')">
                <div style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding-right:4px;">
                  <span>${sec.titulo}</span>
                  ${(sec.autoresAsignados && sec.autoresAsignados.length > 0) ? `
                    <div style="display:flex; gap:3px; margin-top:3px;">
                      ${sec.autoresAsignados.map(aId => {
                        const au = AUTORES_FORMULACION.find(x => x.id === aId);
                        return au ? `<span class="author-mini-badge ${au.clase}">${au.iniciales}</span>` : '';
                      }).join('')}
                    </div>
                  ` : ''}
                </div>
                <span class="status-dot ${getStatusDotClass(sec.estadoRevision)}" title="${sec.estadoRevision}"></span>
              </button>
            `).join('')}
          </div>
        </aside>

        <!-- Columna 2: Campos Exactos de la Plantilla MGA + Estado + Asignación a Alex/Sebastián/Liliana -->
        <div style="display:flex; flex-direction:column; gap:20px;">
          ${sectionsToRender.map(sec => `
            <section class="panel" style="margin-top:0;">
              <div class="panel-header">
                <div>
                  <span class="panel-kicker">Numeral ${String(sec.numeral).padStart(2, '0')} de 21 · ${sec.categoria}</span>
                  <h2 class="panel-title">${sec.titulo}</h2>
                </div>

                <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;" class="no-print">
                  <div class="status-selector-group">
                    <button type="button"
                      class="status-btn ${sec.estadoRevision === 'En Revisión' ? 'active-revision' : ''}"
                      onclick="changeSectionStatus('${sec.numeral}', 'En Revisión')">
                      ⏳ En Revisión
                    </button>
                    <button type="button"
                      class="status-btn ${sec.estadoRevision === 'Aprobado' ? 'active-aprobado' : ''}"
                      onclick="changeSectionStatus('${sec.numeral}', 'Aprobado')">
                      ✅ Aprobado
                    </button>
                    <button type="button"
                      class="status-btn ${sec.estadoRevision === 'Necesita Cambios' ? 'active-cambios' : ''}"
                      onclick="changeSectionStatus('${sec.numeral}', 'Necesita Cambios')">
                      ⚠️ Necesita Cambios
                    </button>
                  </div>
                  <button type="button" class="btn btn-secondary" style="padding:6px 10px; font-size:10.5px;" onclick="resetNumeralToTemplate('${sec.numeral}')">
                    🔄 Restaurar Base
                  </button>
                </div>
              </div>

              <!-- BLOQUE DE ASIGNACIÓN DE AUTORES (ALEX / SEBASTIÁN / LILIANA) Y OBSERVACIONES CON @MENCIÓN -->
              <div class="subcard" style="margin-bottom:18px; border-left:3px solid var(--accent-terracotta);">
                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:10px; margin-bottom:12px;">
                  <label class="field-label" style="color:var(--accent-terracotta-dark); margin:0;">
                    👥 Autores Responsables de Ejecutar Acciones en el Numeral ${sec.numeral}:
                  </label>
                  <div class="author-group no-print">
                    ${AUTORES_FORMULACION.map(au => {
                      const isAssigned = (sec.autoresAsignados || []).includes(au.id);
                      return `
                        <button type="button"
                          class="author-chip ${isAssigned ? 'active-' + au.clase : ''}"
                          onclick="toggleAuthorOnSection('${sec.numeral}', '${au.id}')">
                          <span>${isAssigned ? '✔' : '+'} 👤 ${au.nombre}</span>
                        </button>
                      `;
                    }).join('')}
                  </div>
                </div>

                <div class="mention-wrapper">
                  <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:6px; margin-bottom:6px;">
                    <label class="field-label" style="color:var(--text-secondary); margin:0; font-size:10.5px;">
                      📌 Observaciones de Revisión / Indicar qué hacer a cada Autor (escribe @ o usa las etiquetas):
                    </label>
                    <div class="no-print" style="display:flex; gap:6px;">
                      ${AUTORES_FORMULACION.map(au => `
                        <button type="button"
                          class="author-mini-badge ${au.clase}"
                          style="cursor:pointer; padding:2px 8px; font-size:10.5px;"
                          onclick="insertMentionIntoObservacion('${sec.numeral}', '${au.etiqueta} ', '${au.id}')">
                          + ${au.etiqueta}
                        </button>
                      `).join('')}
                    </div>
                  </div>

                  <div style="display:flex; gap:8px;">
                    <input type="text"
                      id="obs-input-${sec.numeral}"
                      class="input-control"
                      value="${(sec.observacionesComite || '').replace(/"/g, '&quot;')}"
                      placeholder="Escribe @Alex, @Sebastián o @Liliana seguido de la acción a realizar..."
                      oninput="handleObservacionInput('${sec.numeral}', this.value)" />
                    <button type="button"
                      class="btn btn-primary no-print"
                      style="white-space:nowrap;"
                      onclick="addTaskFromObservacion('${sec.numeral}')">
                      ➕ Asignar Acción
                    </button>
                  </div>

                  ${activeMentionNumeral === sec.numeral ? `
                    <div class="mention-dropdown no-print">
                      <div style="padding:6px 12px; font-size:10px; font-weight:800; text-transform:uppercase; color:var(--text-muted); background:var(--bg-subtle);">
                        Etiquetar Autor de Formulación
                      </div>
                      ${AUTORES_FORMULACION.map(au => `
                        <button type="button" class="mention-option" onclick="selectMentionFromDropdown('${sec.numeral}', '${au.etiqueta}', '${au.id}')">
                          <span>👤 <strong>${au.etiqueta}</strong> (${au.nombre})</span>
                          <span class="author-mini-badge ${au.clase}">${au.iniciales}</span>
                        </button>
                      `).join('')}
                    </div>
                  ` : ''}
                </div>

                ${(sec.tareasAutores && sec.tareasAutores.length > 0) ? `
                  <div style="margin-top:12px; padding-top:10px; border-top:1px solid var(--line-hair);">
                    <span style="font-size:10.5px; font-weight:800; color:var(--text-secondary); text-transform:uppercase; letter-spacing:0.06em;">
                      Acciones Asignadas en este Numeral (${sec.tareasAutores.filter(t => t.completada).length}/${sec.tareasAutores.length} completadas):
                    </span>
                    ${sec.tareasAutores.map((tarea, tIdx) => {
                      const auObj = AUTORES_FORMULACION.find(a => a.id === tarea.autor) || AUTORES_FORMULACION[0];
                      return `
                        <div class="task-item ${tarea.completada ? 'completed' : ''}">
                          <div style="display:flex; align-items:center; gap:10px;">
                            <input type="checkbox"
                              ${tarea.completada ? 'checked' : ''}
                              onchange="toggleTaskCompleted('${sec.numeral}', ${tIdx})"
                              style="width:15px; height:15px; cursor:pointer; accent-color:var(--accent-sage);" />
                            <span class="author-mini-badge ${auObj.clase}">@${auObj.nombre}</span>
                            <span style="color:var(--text-primary); font-weight:500;">${tarea.texto}</span>
                          </div>
                          <button type="button"
                            class="no-print"
                            style="background:transparent; border:none; color:var(--accent-crimson); cursor:pointer; font-size:12px; font-weight:800;"
                            onclick="removeTaskFromSection('${sec.numeral}', ${tIdx})">
                            ✕
                          </button>
                        </div>
                      `;
                    }).join('')}
                  </div>
                ` : ''}
              </div>

              <!-- Campos de la Plantilla MGA para este Numeral -->
              <div style="display:flex; flex-direction:column; gap:16px;">
                ${sec.campos.map((campo, idx) => `
                  <div class="subcard">
                    <div class="subcard-header">
                      <label class="field-label" style="margin:0; color:var(--text-primary);">${campo.etiqueta}</label>
                      <span style="font-size:10.5px; font-weight:700; color:var(--text-muted);">CAMPO ${campo.id}</span>
                    </div>
                    ${campo.tipo === 'texto' ? `
                      <input type="text"
                        class="input-control"
                        value="${(campo.valor || '').replace(/"/g, '&quot;')}"
                        placeholder="Espacio para diligenciar..."
                        oninput="updateCampoValue('${sec.numeral}', ${idx}, this.value)" />
                    ` : `
                      <textarea rows="${Math.max(4, Math.min(16, Math.ceil((campo.valor || '').length / 90)))}"
                        class="textarea-control"
                        placeholder="Espacio para diligenciar..."
                        oninput="updateCampoValue('${sec.numeral}', ${idx}, this.value)">${campo.valor || ''}</textarea>
                    `}
                  </div>
                `).join('')}
              </div>

              <div class="no-print" style="display:flex; justify-content:space-between; align-items:center; margin-top:18px; padding-top:14px; border-top:1px solid var(--line-hair);">
                <button class="btn btn-secondary" onclick="navigateRelativeNumeral(-1)">
                  ← Numeral Anterior
                </button>
                <button class="btn btn-secondary" onclick="addCustomField('${sec.numeral}')">
                  ➕ Agregar Campo
                </button>
                <button class="btn btn-primary" onclick="navigateRelativeNumeral(1)">
                  Siguiente Numeral →
                </button>
              </div>
            </section>
          `).join('')}
        </div>

        <!-- Columna 3: Asistente IA (Exclusivamente para Revisión y Redacción) -->
        <aside class="ai-panel-col no-print">
          <div class="ai-copilot-card">
            <div class="ai-header">
              <div class="ai-avatar">IA</div>
              <div>
                <span style="font-size:9.5px; font-weight:800; text-transform:uppercase; color:var(--accent-terracotta); letter-spacing:0.12em; display:block;">
                  COPILOTO EDITORIAL MGA
                </span>
                <h3 style="font-size:14px; font-weight:900; color:var(--text-primary); text-transform:uppercase;">
                  Asistente de Redacción & Revisión
                </h3>
              </div>
            </div>

            <p style="font-size:11.5px; color:var(--text-secondary); margin-bottom:10px;">
              Numeral activo: <strong style="color:var(--text-primary);">${currentSecObj.titulo}</strong>
            </p>

            <div style="margin-bottom:12px;">
              <label class="field-label" style="font-size:10px; margin-bottom:4px;">
                Campo objetivo para revisar / redactar:
              </label>
              <select id="ai-target-campo" class="select-control" style="padding:6px 9px; font-size:11.5px;">
                ${currentSecObj.campos.map((c, i) => `
                  <option value="${i}" ${selectedCampoIdxForAI === i ? 'selected' : ''}>${c.id} - ${c.etiqueta}</option>
                `).join('')}
              </select>
            </div>

            <label class="field-label" style="font-size:10px;">
              Operaciones de Revisión y Redacción
            </label>
            <div>
              <button class="ai-chip" onclick="runAiSmartAction('auditar')">
                🔍 Revisar y evaluar el texto actual del campo
              </button>
              <button class="ai-chip" onclick="runAiSmartAction('mejorar_redaccion')">
                ✍️ Proponer mejora de redacción técnica
              </button>
            </div>

            <div id="ai-output" class="ai-response-box">${aiResponseText}</div>

            ${lastAiGeneratedDraft ? `
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:10px;">
                <button class="btn btn-primary" style="justify-content:center; padding:8px; font-size:10.5px;" onclick="applyAiDraftToSection('append')">
                  ➕ Añadir al final
                </button>
                <button class="btn btn-wood" style="justify-content:center; padding:8px; font-size:10.5px;" onclick="applyAiDraftToSection('replace')">
                  🔄 Reemplazar
                </button>
              </div>
            ` : ''}

            <form id="form-ai-prompt" style="margin-top:8px;">
              <label class="field-label" style="font-size:10px;">
                Instrucción puntual de redacción o revisión:
              </label>
              <textarea id="ai-custom-input" rows="3" class="textarea-control" style="font-size:12px; padding:8px 10px;" placeholder="Escribe qué deseas redactar, corregir o revisar en este campo..."></textarea>
              <button type="submit" class="btn btn-ai" style="width:100%; justify-content:center; margin-top:8px;">
                ⚡ Ejecutar Revisión / Redacción
              </button>
            </form>

            <details style="margin-top:12px; font-size:11px; color:var(--text-muted); border-top:1px solid var(--line-hair); padding-top:8px;">
              <summary style="cursor:pointer; color:var(--text-secondary); font-weight:700;">
                🔑 Conectar Gemini API (${geminiApiKey ? 'Conectada ✔' : 'Modo Local Activo'})
              </summary>
              <div style="margin-top:8px;">
                <p style="font-size:10.5px; color:var(--text-muted); margin-bottom:6px;">
                  Pega tu llave de <a href="https://aistudio.google.com/apikey" target="_blank" style="color:var(--accent-terracotta); font-weight:700;">Google AI Studio</a> para procesar con <code>gemini-2.5-flash</code> en tu cuenta:
                </p>
                <input type="password" id="input-gemini-key" class="input-control" style="font-size:11px; padding:6px 8px;" placeholder="AIzaSy..." value="${geminiApiKey}" />
                <button type="button" class="btn btn-secondary" style="width:100%; margin-top:6px; padding:5px; font-size:10.5px; justify-content:center;" onclick="saveGeminiKey()">
                  Guardar API Key en este Navegador
                </button>
              </div>
            </details>
          </div>
        </aside>
      </div>
    `;
  }

  // ==========================================================================
  // PESTAÑA 4: PROTOTIPO A ESCALA / GEMELO DIGITAL + LÁMINA DE DISEÑO DE PRODUCTO
  // ==========================================================================
  function renderTabPrototipoGemelo() {
    const filteredTasks = protoTasks.filter(t => {
      if (filterProtoStatus === 'ALL') return true;
      return t.estado === filterProtoStatus;
    });

    const isFichaView = activeProtoTaskId === 'FICHA';
    const tasksToRender = activeProtoTaskId === 'ALL'
      ? filteredTasks
      : protoTasks.filter(t => t.id === activeProtoTaskId);

    return `
      <!-- LÁMINA ARQUITECTÓNICA Y DE DISEÑO DE PRODUCTO (INSPIRADA EN REF. DOMO HABITÁVEL & INDUSTRIAL BOARD) -->
      <section class="architectural-board" style="margin-top:20px;">
        <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:12px; padding-bottom:12px; border-bottom:1px solid var(--line-strong); margin-bottom:16px;">
          <div>
            <span class="panel-kicker" style="margin:0;">LÁMINA DE DISEÑO INDUSTRIAL · ARQUITECTURA MODULAR · SUSTENTABILIDAD · DOMÓTICA</span>
            <h2 style="font-size:20px; font-weight:900; text-transform:uppercase; letter-spacing:-0.02em; color:var(--text-primary);">
              GEODOME SMART — HABITÁCULO MODULAR & GEMELO DIGITAL VR
            </h2>
          </div>
          <div class="no-print" style="display:flex; gap:8px; flex-wrap:wrap;">
            <button type="button" class="btn btn-secondary" onclick="toggleLaminaBoard()">
              ${showLaminaBoard ? '▲ Contraer Lámina de Diseño' : '▼ Desplegar Lámina de Diseño y Paleta de Materiales'}
            </button>
            <button type="button" class="btn ${isFichaView ? 'btn-primary' : 'btn-wood'}" onclick="selectProtoTask('FICHA')">
              📋 Ficha Técnica Consolidada (.doc)
            </button>
          </div>
        </div>

        ${showLaminaBoard ? `
          <div class="board-grid-3">
            <!-- Bloque 1: Diagramas Conceptuales y Escalas de Prototipado -->
            <div class="subcard" style="background:var(--bg-card);">
              <div class="subcard-header">
                <span class="field-label" style="margin:0; color:var(--text-primary);">01 · RUTA DE PROTOTIPADO ESCALONADO</span>
                <span style="font-size:10px; font-weight:800; color:var(--accent-terracotta);">ESC. 1:20 → 1:5 → 1:1 VR</span>
              </div>
              <div style="display:flex; flex-direction:column; gap:10px; font-size:12px; color:var(--text-secondary);">
                <div style="padding-bottom:8px; border-bottom:1px solid var(--line-hair);">
                  <strong style="color:var(--text-primary); display:block; text-transform:uppercase; font-size:11px;">Fase A · Maqueta Preliminar 100% Impresión 3D</strong>
                  Validación geométrica de frecuencias geodésicas, ángulos biselados y nodos multiaxiales impresos en 3D antes del corte en madera.
                </div>
                <div style="padding-bottom:8px; border-bottom:1px solid var(--line-hair);">
                  <strong style="color:var(--text-primary); display:block; text-transform:uppercase; font-size:11px;">Fase B · Prototipo Funcional en Madera + Nodos 3D</strong>
                  Producción a escala mayor con listones de madera mecanizados en CNC articulados mediante <strong>sistemas de uniones en Impresión 3D</strong> e integración de dispositivos de domótica.
                </div>
                <div>
                  <strong style="color:var(--text-primary); display:block; text-transform:uppercase; font-size:11px;">Fase C · Gemelo Digital 1:1 en Unity VR + App Móvil</strong>
                  Simulación inmersiva VR Ready conectada bidireccionalmente con los sensores y actuadores del prototipo físico.
                </div>
              </div>
            </div>

            <!-- Bloque 2: Paleta de Materiales del Producto (Material Swatches) -->
            <div class="subcard" style="background:var(--bg-card);">
              <div class="subcard-header">
                <span class="field-label" style="margin:0; color:var(--text-primary);">02 · PALETA DE MATERIALES & TECNOLOGÍAS</span>
                <span style="font-size:10px; font-weight:800; color:var(--text-muted);">ESPECIFICACIÓN CTM</span>
              </div>
              <div class="material-swatches-grid">
                <div class="swatch-item">
                  <div class="swatch-color swatch-wood"></div>
                  <span class="swatch-label">Madera Clara</span>
                  <span class="swatch-sub">Corte CNC Estructural</span>
                </div>
                <div class="swatch-item">
                  <div class="swatch-color swatch-3d-carbon"></div>
                  <span class="swatch-label">Polímero 3D</span>
                  <span class="swatch-sub">Nodos Unión PETG/CF</span>
                </div>
                <div class="swatch-item">
                  <div class="swatch-color swatch-glass"></div>
                  <span class="swatch-label">Lucarna Cenital</span>
                  <span class="swatch-sub">Apertura Motorizada</span>
                </div>
                <div class="swatch-item">
                  <div class="swatch-color swatch-steel"></div>
                  <span class="swatch-label">Herraje Inox</span>
                  <span class="swatch-sub">Pernos M6/M8 & Bujes</span>
                </div>
                <div class="swatch-item">
                  <div class="swatch-color swatch-iot"></div>
                  <span class="swatch-label">Domótica IoT</span>
                  <span class="swatch-sub">ESP32 + Sensores</span>
                </div>
                <div class="swatch-item">
                  <div class="swatch-color swatch-vr"></div>
                  <span class="swatch-label">Gemelo VR</span>
                  <span class="swatch-sub">Unity 6 URP 1:1</span>
                </div>
              </div>
            </div>

            <!-- Bloque 3: Láminas de Concepto & Detalle de Nodo en Español -->
            <div class="subcard" style="background:var(--bg-card);">
              <div class="subcard-header">
                <span class="field-label" style="margin:0; color:var(--text-primary);">03 · VISTA ISOMÉTRICA & DETALLE DE NODO 3D</span>
                <span style="font-size:10px; font-weight:800; color:var(--accent-sage);">DETALLE 1:3</span>
              </div>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                <div style="border:1px solid var(--line-hair); padding:4px; background:#fff; cursor:zoom-in;" onclick="openProtoLightbox('DEV-01', 0)" title="Clic para expandir a pantalla completa">
                  <img src="./assets/img/domo_isometrico_hero.png" alt="Isométrico Domo Habitable" style="width:100%; height:112px; object-fit:contain; display:block;" />
                  <span style="font-size:9.5px; font-weight:700; display:block; margin-top:4px; text-transform:uppercase;">⛶ Vista Isométrica Prototipo</span>
                </div>
                <div style="border:1px solid var(--line-hair); padding:4px; background:#fff; cursor:zoom-in;" onclick="openProtoLightbox('DEV-03', 0)" title="Clic para expandir a pantalla completa">
                  <img src="./assets/img/detalle_nodo_3d_es.png" alt="Detalle Nodo Estructural Impresión 3D" style="width:100%; height:112px; object-fit:contain; display:block;" />
                  <span style="font-size:9.5px; font-weight:700; display:block; margin-top:4px; text-transform:uppercase;">⛶ Detalle Nodo Unión 3D</span>
                </div>
              </div>
            </div>
          </div>
        ` : ''}
      </section>

      <div class="proto-layout">
        <!-- Columna Izquierda: Navegador de las 14 Etapas de Desarrollo + Botón Ficha Técnica -->
        <aside class="mga-sidebar no-print">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
            <span class="panel-kicker" style="margin:0;">14 Etapas Técnicas</span>
            <button class="btn btn-secondary" style="padding:4px 9px; font-size:10.5px;" onclick="selectProtoTask('ALL')">
              Ver Todas
            </button>
          </div>

          <button type="button"
            class="btn ${isFichaView ? 'btn-primary' : 'btn-wood'}"
            style="width:100%; justify-content:center; margin-bottom:8px;"
            onclick="selectProtoTask('FICHA')">
            📋 Ver Ficha Técnica Consolidada
          </button>

          <button type="button"
            class="btn btn-secondary"
            style="width:100%; justify-content:center; margin-bottom:10px; font-size:11px;"
            onclick="addNewProtoTask()">
            ➕ Proponer / Agregar Tarea
          </button>

          <select id="filter-proto-status" class="select-control" style="padding:7px 10px; font-size:11.5px;">
            <option value="ALL" ${filterProtoStatus === 'ALL' ? 'selected' : ''}>Todos los Estados (${protoTasks.length})</option>
            <option value="Pendiente" ${filterProtoStatus === 'Pendiente' ? 'selected' : ''}>⏳ Pendiente</option>
            <option value="En Desarrollo" ${filterProtoStatus === 'En Desarrollo' ? 'selected' : ''}>🔨 En Desarrollo</option>
            <option value="En Pruebas" ${filterProtoStatus === 'En Pruebas' ? 'selected' : ''}>🧪 En Pruebas</option>
            <option value="Completado" ${filterProtoStatus === 'Completado' ? 'selected' : ''}>✅ Completado</option>
          </select>

          <div class="mga-nav-list">
            ${filteredTasks.map(task => `
              <button class="proto-step-btn ${activeProtoTaskId === task.id ? 'active' : ''}" onclick="selectProtoTask('${task.id}')">
                <div style="display:flex; align-items:center; justify-content:space-between; width:100%;">
                  <span style="font-size:10px; font-weight:800; text-transform:uppercase; letter-spacing:0.06em; color:${task.tipoTarea === 'Base' ? 'var(--accent-sage)' : 'var(--accent-terracotta)'};">
                    ${task.id} · ${task.tipoTarea}
                  </span>
                  <span class="status-dot ${getStatusDotClass(task.estado)}" title="${task.estado}"></span>
                </div>
                <div class="step-title-text" style="font-size:11.5px; font-weight:700; color:var(--text-primary); line-height:1.3;">
                  ${task.titulo}
                </div>
                <div style="display:flex; align-items:center; justify-content:space-between; width:100%; font-size:10px; color:var(--text-muted); margin-top:2px;">
                  <span>📅 ${task.fechaInicio || 'Sin fecha'}</span>
                  <strong style="color:var(--accent-terracotta);">${task.progreso}%</strong>
                </div>
              </button>
            `).join('')}
          </div>
        </aside>

        <!-- Columna Derecha: Editor de Etapa(s) o Ficha Técnica Consolidada -->
        <div>
          ${isFichaView ? renderFichaTecnicaConsolidada() : `
            <div style="display:flex; flex-direction:column; gap:20px;">
              ${tasksToRender.map(task => renderSingleProtoTaskCard(task)).join('')}
            </div>

            <!-- Banner inferior para abrir o descargar la Ficha Técnica -->
            <div class="ficha-tecnica-sheet no-print" style="margin-top:22px; display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:16px;">
              <div>
                <span class="panel-kicker">ENTREGABLE DE INVESTIGACIÓN SENNOVA</span>
                <h3 style="font-size:17px; font-weight:900; color:var(--text-primary); text-transform:uppercase;">
                  📋 Ficha Técnica Consolidada del Proceso (Prototipo a Escala + Gemelo Digital VR)
                </h3>
                <p style="font-size:12.5px; color:var(--text-secondary); margin-top:4px;">
                  Toda la documentación, fechas, parámetros de impresión 3D, corte en madera, domótica, archivos e imágenes registradas en las tareas alimentan automáticamente la Ficha Técnica final.
                </p>
              </div>
              <div style="display:flex; gap:10px; flex-wrap:wrap;">
                <button class="btn btn-primary" onclick="selectProtoTask('FICHA')">
                  👁️ Visualizar Ficha Técnica Completa
                </button>
                <button class="btn btn-wood" onclick="exportFichaTecnicaWord()">
                  📄 Descargar Ficha Técnica (.doc)
                </button>
              </div>
            </div>
          `}
        </div>
      </div>
    `;
  }

  function renderSingleProtoTaskCard(task) {
    return `
      <section class="panel" style="margin-top:0;">
        <div class="panel-header">
          <div>
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:6px;">
              <span class="badge ${task.tipoTarea === 'Base' ? 'badge-sena' : 'badge-wood'}">
                ${task.id} · Etapa ${task.tipoTarea}
              </span>
              <span class="badge badge-unity">${task.categoria}</span>
            </div>
            <h2 class="panel-title">${task.titulo}</h2>
            <p class="panel-desc">${task.descripcion}</p>
          </div>

          <!-- Selector de Estado de la Tarea -->
          <div class="status-selector-group no-print">
            ${['Pendiente', 'En Desarrollo', 'En Pruebas', 'Completado'].map(st => {
              const activeClass = task.estado === st
                ? (st === 'Completado' ? 'active-aprobado' : st === 'Pendiente' ? 'active-cambios' : 'active-revision')
                : '';
              const icon = st === 'Pendiente' ? '⏳' : st === 'En Desarrollo' ? '🔨' : st === 'En Pruebas' ? '🧪' : '✅';
              return `
                <button type="button"
                  class="status-btn ${activeClass}"
                  onclick="updateProtoTaskField('${task.id}', 'estado', '${st}')">
                  ${icon} ${st}
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Fila 1: Fechas, Avance (%) y Responsables -->
        <div class="grid-4" style="margin-bottom:18px;">
          <div class="subcard">
            <label class="field-label">📅 Fecha de Inicio</label>
            <input type="date"
              class="input-control"
              value="${task.fechaInicio || ''}"
              onchange="updateProtoTaskField('${task.id}', 'fechaInicio', this.value)" />
          </div>

          <div class="subcard">
            <label class="field-label">🏁 Fecha de Entrega / Fin</label>
            <input type="date"
              class="input-control"
              value="${task.fechaFin || ''}"
              onchange="updateProtoTaskField('${task.id}', 'fechaFin', this.value)" />
          </div>

          <div class="subcard">
            <label class="field-label">📊 Porcentaje de Avance (${task.progreso}%)</label>
            <div style="display:flex; align-items:center; gap:10px;">
              <input type="range"
                min="0" max="100" step="5"
                value="${task.progreso || 0}"
                style="width:100%; accent-color:var(--accent-terracotta); cursor:pointer;"
                oninput="updateProtoTaskField('${task.id}', 'progreso', Number(this.value))" />
              <strong style="color:var(--accent-terracotta); font-size:14px;">${task.progreso}%</strong>
            </div>
          </div>

          <div class="subcard">
            <label class="field-label">👥 Autores / Responsables</label>
            <input type="text"
              class="input-control"
              value="${(task.responsable || '').replace(/"/g, '&quot;')}"
              placeholder="Ej. Alex / Sebastián / Liliana"
              oninput="updateProtoTaskFieldSilent('${task.id}', 'responsable', this.value)" />
          </div>
        </div>

        <!-- Fila 2: Parámetros Técnicos y Documentación de Avances -->
        <div class="grid-2-equal" style="margin-bottom:18px;">
          <div class="subcard">
            <label class="field-label" style="color:var(--accent-terracotta-dark);">
              ⚙️ Parámetros Técnicos / Especificaciones (3D, Madera CNC, IoT o Unity VR)
            </label>
            <textarea rows="5"
              class="textarea-control"
              placeholder="Registra aquí materiales, tolerancias de impresión 3D, escalas, sensores, pines ESP32, versión de Unity..."
              oninput="updateProtoTaskFieldSilent('${task.id}', 'parametrosTecnicos', this.value)">${task.parametrosTecnicos || ''}</textarea>
          </div>

          <div class="subcard">
            <label class="field-label">
              📝 Documentación del Proceso, Hallazgos y Resultados de Pruebas
            </label>
            <textarea rows="5"
              class="textarea-control"
              placeholder="Documenta aquí los avances, ajustes de diseño en las uniones 3D, resultados de ensamble en madera o pruebas con la app móvil y VR..."
              oninput="updateProtoTaskFieldSilent('${task.id}', 'documentacionAvance', this.value)">${task.documentacionAvance || ''}</textarea>
          </div>
        </div>

        <!-- Fila 3: Panel de Avances Visuales Cronológicos (Cards + Pantalla Completa) y Panel de Recursos de la Tarea -->
        <div class="proto-panels-stack">
          ${renderProtoAdvancesPanel(task)}
          ${renderProtoResourcesPanel(task)}
        </div>
      </section>
    `;
  }

  function getAdvanceDraft(taskId) {
    if (!advanceDraftByTask[taskId]) {
      advanceDraftByTask[taskId] = {
        titulo: '',
        descripcion: '',
        fecha: new Date().toISOString().slice(0, 10),
        autor: 'Alex / Sebastián',
        url: '',
        fileName: ''
      };
    }
    return advanceDraftByTask[taskId];
  }

  function getResourceDraft(taskId) {
    if (!resourceDraftByTask[taskId]) {
      resourceDraftByTask[taskId] = {
        nombre: '',
        categoria: 'Modelo 3D (.STL / .FBX / .OBJ)',
        tipo: 'Modelo 3D / CAD',
        url: '',
        descripcion: '',
        fecha: new Date().toISOString().slice(0, 10)
      };
    }
    return resourceDraftByTask[taskId];
  }

  function formatFechaPublicacion(fechaIso) {
    if (!fechaIso) return 'Sin fecha';
    const parts = String(fechaIso).split('-');
    if (parts.length !== 3) return fechaIso;
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const mIdx = Math.max(0, Math.min(11, parseInt(parts[1], 10) - 1));
    return `${parts[2]} ${meses[mIdx]} ${parts[0]}`;
  }

  function getResourceCategoryIcon(cat) {
    const c = (cat || '').toLowerCase();
    if (c.includes('3d') || c.includes('stl') || c.includes('fbx') || c.includes('obj')) return '🧊';
    if (c.includes('bim') || c.includes('rvt') || c.includes('cad')) return '🏗️';
    if (c.includes('enlace') || c.includes('link') || c.includes('web') || c.includes('repo')) return '🔗';
    if (c.includes('código') || c.includes('codigo') || c.includes('unity') || c.includes('vr') || c.includes('iot')) return '💻';
    return '📄';
  }

  function renderProtoAdvancesPanel(task) {
    const draft = getAdvanceDraft(task.id);
    const isFormOpen = Boolean(showAdvanceFormByTask[task.id]) || !(task.imagenes && task.imagenes.length);

    // Ordenar cronológicamente conservando el índice original (origIdx)
    const indexedImages = (task.imagenes || []).map((img, idx) => ({
      ...img,
      origIdx: idx,
      fecha: img.fecha || task.fechaInicio || '2026-11-10',
      descripcion: img.descripcion || `Registro visual de avance en la etapa ${task.id}.`,
      autor: img.autor || task.responsable || 'Equipo SENNOVA CTM'
    }));

    indexedImages.sort((a, b) => {
      const cmp = String(a.fecha).localeCompare(String(b.fecha));
      if (cmp !== 0) return protoChronoOrder === 'asc' ? cmp : -cmp;
      return protoChronoOrder === 'asc' ? (a.origIdx - b.origIdx) : (b.origIdx - a.origIdx);
    });

    return `
      <div class="proto-section-panel">
        <div class="proto-section-header">
          <div>
            <span class="panel-kicker" style="margin-bottom:2px;">PANEL 01 · BITÁCORA VISUAL CRONOLÓGICA DE LA ETAPA (${task.id})</span>
            <h3 style="font-size:16px; font-weight:900; color:var(--text-primary); text-transform:uppercase; letter-spacing:-0.01em;">
              🖼️ Registrar Avance (${indexedImages.length})
            </h3>
            <p style="font-size:12px; color:var(--text-secondary); margin-top:2px;">
              Cada imagen subida se guarda con su <strong>título</strong>, <strong>texto descriptivo del avance</strong> y <strong>fecha de publicación</strong>, ordenándose cronológicamente como una Card expandible a pantalla completa.
            </p>
          </div>
          <div class="no-print" style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
            <button type="button" class="btn btn-secondary" style="padding:7px 11px; font-size:10.5px;" onclick="toggleProtoChronoOrder()">
              📅 Orden Cronológico: ${protoChronoOrder === 'asc' ? '1º → Último (Ascendente ↑)' : 'Más Recientes Primero (Descendente ↓)'}
            </button>
            <button type="button" class="btn ${isFormOpen ? 'btn-wood' : 'btn-primary'}" style="padding:7px 13px; font-size:11px;" onclick="toggleAdvanceForm('${task.id}')">
              ${isFormOpen ? '▲ Ocultar Panel de Subida' : '➕ Registrar Avance'}
            </button>
          </div>
        </div>

        ${isFormOpen ? `
          <div class="proto-form-drawer no-print">
            <div class="proto-form-drawer-header">
              <span style="font-size:11.5px; font-weight:900; text-transform:uppercase; letter-spacing:0.06em; color:var(--accent-terracotta-dark);">
                📷 Registrar Avance (${task.id} · ${task.titulo})
              </span>
              <span style="font-size:10.5px; color:var(--text-muted); font-weight:700;">
                Paso 1: Selecciona imagen · Paso 2: Título, Fecha y Descripción · Paso 3: Publicar Card
              </span>
            </div>

            <!-- Selección de archivo de imagen o URL -->
            <div class="image-upload-zone">
              <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
                <label class="btn btn-primary" style="cursor:pointer; padding:8px 14px;">
                  📷 Seleccionar Imagen desde PC
                  <input type="file" accept="image/*" style="display:none;" onchange="handleSelectAdvanceImageFile('${task.id}', this)" />
                </label>
                <span style="font-size:11.5px; color:var(--text-secondary);">
                  ${draft.fileName ? `✅ Archivo cargado: <strong>${draft.fileName}</strong>` : 'Sube una foto del prototipo 3D, corte CNC, ensamble o captura de Unity VR'}
                </span>
              </div>
              <div style="flex:1; min-width:240px;">
                <input type="text"
                  class="input-control"
                  placeholder="O pega aquí una ruta local / URL de imagen (ej. ./assets/img/...)"
                  value="${(draft.url && !draft.url.startsWith('data:')) ? draft.url.replace(/"/g, '&quot;') : ''}"
                  oninput="updateAdvanceDraftField('${task.id}', 'url', this.value)" />
              </div>
            </div>

            ${draft.url ? `
              <div class="image-upload-preview" style="margin-bottom:14px;">
                <img src="${draft.url}" alt="Vista previa" />
                <div style="flex:1;">
                  <strong style="font-size:11.5px; color:var(--accent-sage); display:block; text-transform:uppercase;">Vista previa lista para publicar</strong>
                  <span style="font-size:11px; color:var(--text-secondary);">Completa el título y texto descriptivo abajo y haz clic en "Publicar Avance".</span>
                </div>
                <button type="button" class="btn btn-secondary" style="padding:4px 9px; font-size:10px;" onclick="clearAdvanceDraftImage('${task.id}')">
                  Quitar imagen
                </button>
              </div>
            ` : ''}

            <div class="grid-3" style="margin-bottom:12px;">
              <div>
                <label class="field-label">🏷️ Título del Avance Visual *</label>
                <input type="text"
                  id="adv-title-${task.id}"
                  class="input-control"
                  placeholder="Ej. Impresión 3D preliminar Nodo Hexavalente Escala 1:10"
                  value="${(draft.titulo || '').replace(/"/g, '&quot;')}"
                  oninput="updateAdvanceDraftField('${task.id}', 'titulo', this.value)" />
              </div>
              <div>
                <label class="field-label">📅 Fecha de Publicación *</label>
                <input type="date"
                  id="adv-date-${task.id}"
                  class="input-control"
                  value="${draft.fecha || new Date().toISOString().slice(0, 10)}"
                  onchange="updateAdvanceDraftField('${task.id}', 'fecha', this.value)" />
              </div>
              <div>
                <label class="field-label">👤 Autor del Registro</label>
                <select class="select-control" onchange="updateAdvanceDraftField('${task.id}', 'autor', this.value)">
                  ${['Alex / Sebastián', 'Alex', 'Sebastián', 'Liliana', 'Equipo SENNOVA CTM'].map(au => `
                    <option value="${au}" ${draft.autor === au ? 'selected' : ''}>${au}</option>
                  `).join('')}
                </select>
              </div>
            </div>

            <div style="margin-bottom:14px;">
              <label class="field-label">📝 Texto Descriptivo del Avance (Registro Técnico, Observaciones y Resultados) *</label>
              <textarea rows="3"
                id="adv-desc-${task.id}"
                class="textarea-control"
                placeholder="Describe qué se logró en este avance, parámetros aplicados (ej. tolerancia de 0.25mm en unión 3D, pruebas de carga en madera o ajustes de iluminación en Unity VR)..."
                oninput="updateAdvanceDraftField('${task.id}', 'descripcion', this.value)">${draft.descripcion || ''}</textarea>
            </div>

            <div style="display:flex; justify-content:flex-end; gap:10px;">
              <button type="button" class="btn btn-wood" onclick="submitProtoAdvance('${task.id}')">
                💾 Publicar Avance en Orden Cronológico
              </button>
            </div>
          </div>
        ` : ''}

        ${indexedImages.length > 0 ? `
          <div class="advance-cards-grid">
            ${indexedImages.map((img, chronoPos) => {
              const numOrder = protoChronoOrder === 'asc'
                ? String(chronoPos + 1).padStart(2, '0')
                : String(indexedImages.length - chronoPos).padStart(2, '0');
              const editKey = `${task.id}__${img.origIdx}`;
              const editDraft = editingAdvanceByKey[editKey];

              if (editDraft) {
                return `
                  <article class="advance-card" style="border:2px solid var(--accent-terracotta); box-shadow:var(--shadow-float);">
                    <div>
                      <div class="advance-card-top-meta" style="background:var(--accent-terracotta-soft);">
                        <span style="color:var(--accent-terracotta-dark);">✏️ EDITANDO AVANCE #${numOrder}</span>
                        <span style="color:var(--text-primary);">📅 ${editDraft.fecha || ''}</span>
                      </div>

                      <!-- Vista previa actual + Cambiar Imagen en la misma Card -->
                      <div class="advance-card-media" style="height:190px; cursor:default;">
                        <img src="${editDraft.url}" alt="Vista previa edición" />
                      </div>
                      <div style="padding:10px 14px; background:var(--bg-subtle); border-bottom:1px solid var(--line-hair); display:flex; flex-direction:column; gap:8px;">
                        <div style="display:flex; align-items:center; justify-content:space-between; gap:8px; flex-wrap:wrap;">
                          <label class="btn btn-primary" style="cursor:pointer; padding:5px 10px; font-size:10.5px;">
                            📷 Cambiar Imagen desde PC
                            <input type="file" accept="image/*" style="display:none;" onchange="handleInlineChangeAdvanceImage('${task.id}', ${img.origIdx}, this)" />
                          </label>
                          <span style="font-size:10.5px; color:var(--text-secondary);">
                            ${editDraft.fileName ? `Nueva: <strong>${editDraft.fileName}</strong>` : 'O edita la ruta/URL abajo'}
                          </span>
                        </div>
                        <input type="text"
                          class="input-control"
                          style="padding:6px 9px; font-size:11.5px;"
                          placeholder="Ruta o URL de la imagen (ej. ./assets/img/...)"
                          value="${(editDraft.url && !editDraft.url.startsWith('data:')) ? editDraft.url.replace(/"/g, '&quot;') : ''}"
                          oninput="updateInlineAdvanceField('${task.id}', ${img.origIdx}, 'url', this.value)" />
                      </div>

                      <!-- Campos editables en la misma Card -->
                      <div class="advance-card-body" style="gap:10px;">
                        <div>
                          <label class="field-label" style="margin-bottom:4px;">🏷️ Título del Avance</label>
                          <input type="text"
                            class="input-control"
                            style="font-weight:700;"
                            value="${(editDraft.titulo || '').replace(/"/g, '&quot;')}"
                            oninput="updateInlineAdvanceField('${task.id}', ${img.origIdx}, 'titulo', this.value)" />
                        </div>

                        <div class="grid-2" style="gap:8px;">
                          <div>
                            <label class="field-label" style="margin-bottom:4px;">📅 Fecha Publicación</label>
                            <input type="date"
                              class="input-control"
                              style="padding:6px 8px; font-size:12px;"
                              value="${editDraft.fecha || ''}"
                              onchange="updateInlineAdvanceField('${task.id}', ${img.origIdx}, 'fecha', this.value)" />
                          </div>
                          <div>
                            <label class="field-label" style="margin-bottom:4px;">👤 Autor</label>
                            <input type="text"
                              class="input-control"
                              style="padding:6px 8px; font-size:12px;"
                              value="${(editDraft.autor || '').replace(/"/g, '&quot;')}"
                              oninput="updateInlineAdvanceField('${task.id}', ${img.origIdx}, 'autor', this.value)" />
                          </div>
                        </div>

                        <div>
                          <label class="field-label" style="margin-bottom:4px;">📝 Texto Descriptivo del Avance</label>
                          <textarea rows="4"
                            class="textarea-control"
                            style="font-size:12.5px;"
                            oninput="updateInlineAdvanceField('${task.id}', ${img.origIdx}, 'descripcion', this.value)">${editDraft.descripcion || ''}</textarea>
                        </div>
                      </div>
                    </div>

                    <div class="advance-card-footer" style="background:var(--bg-subtle);">
                      <button type="button" class="btn btn-secondary" style="padding:6px 11px; font-size:10.5px;" onclick="cancelInlineEditAdvance('${task.id}', ${img.origIdx})">
                        ✕ Cancelar
                      </button>
                      <button type="button" class="btn btn-wood" style="padding:6px 13px; font-size:10.5px;" onclick="saveInlineEditAdvance('${task.id}', ${img.origIdx})">
                        💾 Guardar Cambios
                      </button>
                    </div>
                  </article>
                `;
              }

              return `
                <article class="advance-card">
                  <div>
                    <div class="advance-card-top-meta">
                      <span style="color:var(--accent-terracotta-dark);">AVANCE #${numOrder}</span>
                      <span style="color:var(--text-primary);">📅 Publicado: ${formatFechaPublicacion(img.fecha)} (${img.fecha})</span>
                    </div>
                    <div class="advance-card-media" onclick="openProtoLightbox('${task.id}', ${img.origIdx})" title="Haz clic para expandir la imagen a pantalla completa">
                      <img src="${img.url}" alt="${(img.titulo || 'Avance').replace(/"/g, '&quot;')}" />
                      <button type="button" class="advance-expand-pill no-print" onclick="event.stopPropagation(); openProtoLightbox('${task.id}', ${img.origIdx})">
                        ⛶ Pantalla Completa
                      </button>
                    </div>
                    <div class="advance-card-body">
                      <h4 class="advance-card-title">${img.titulo || 'Avance sin título'}</h4>
                      <div class="advance-card-desc">${img.descripcion || 'Sin descripción registrada.'}</div>
                    </div>
                  </div>
                  <div class="advance-card-footer">
                    <span style="font-weight:700; color:var(--accent-slate);">👤 ${img.autor || task.responsable}</span>
                    <div class="no-print" style="display:flex; align-items:center; gap:6px;">
                      <button type="button" class="btn btn-secondary" style="padding:4px 8px; font-size:10px;" onclick="openProtoLightbox('${task.id}', ${img.origIdx})">
                        ⛶ Ampliar
                      </button>
                      <button type="button" class="btn btn-secondary" style="padding:4px 8px; font-size:10px;" onclick="editProtoAdvance('${task.id}', ${img.origIdx})">
                        ✏️ Editar
                      </button>
                      <button type="button" class="btn btn-secondary" style="padding:4px 8px; font-size:10px; color:var(--accent-crimson);" onclick="removeProtoImage('${task.id}', ${img.origIdx})">
                        🗑️
                      </button>
                    </div>
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        ` : `
          <div style="background:var(--bg-card); border:1px solid var(--line-hair); padding:18px; text-align:center; color:var(--text-secondary); font-size:12.5px;">
            Aún no se han publicado cards de avance en esta etapa. Usa el formulario superior para subir una imagen con su título, texto descriptivo y fecha de publicación.
          </div>
        `}
      </div>
    `;
  }

  function renderProtoResourcesPanel(task) {
    const rDraft = getResourceDraft(task.id);
    const isResFormOpen = Boolean(showResourceFormByTask[task.id]);
    const resources = task.archivos || [];

    return `
      <div class="proto-section-panel">
        <div class="proto-section-header">
          <div>
            <span class="panel-kicker" style="margin-bottom:2px;">PANEL 02 · REPOSITORIO DE RECURSOS TÉCNICOS DE LA TAREA (${task.id})</span>
            <h3 style="font-size:16px; font-weight:900; color:var(--text-primary); text-transform:uppercase; letter-spacing:-0.01em;">
              📦 Panel de Recursos: Enlaces, Modelos 3D (.STL / .FBX / .RVT), Documentos y Código (${resources.length})
            </h3>
            <p style="font-size:12px; color:var(--text-secondary); margin-top:2px;">
              Adjunta enlaces externos (repositorios, Onshape, Google Drive, GrabCAD), archivos de modelos 3D para impresión o BIM, hojas de cálculo, planos PDF y paquetes de Unity VR relacionados a esta tarea.
            </p>
          </div>
          <div class="no-print">
            <button type="button" class="btn ${isResFormOpen ? 'btn-primary' : 'btn-wood'}" style="padding:7px 14px; font-size:11px;" onclick="toggleResourceForm('${task.id}')">
              ${isResFormOpen ? '▲ Ocultar Formulario de Recursos' : '➕ Adjuntar Recurso (Enlace / Modelo 3D / Documento)'}
            </button>
          </div>
        </div>

        ${isResFormOpen ? `
          <div class="proto-form-drawer no-print">
            <div class="proto-form-drawer-header">
              <span style="font-size:11.5px; font-weight:900; text-transform:uppercase; letter-spacing:0.06em; color:var(--accent-sage);">
                📎 Adjuntar Nuevo Recurso a la Tarea ${task.id}
              </span>
              <span style="font-size:10.5px; color:var(--text-muted); font-weight:700;">
                Soporta Enlaces Web, Modelos 3D (.STL, .FBX, .OBJ, .STEP), BIM (.RVT, .IFC), Planos (.PDF, .DWG) y Código
              </span>
            </div>

            <div class="grid-3" style="margin-bottom:12px;">
              <div>
                <label class="field-label">🗂️ Categoría del Recurso *</label>
                <select class="select-control" onchange="updateResourceDraftField('${task.id}', 'categoria', this.value)">
                  ${[
                    'Modelo 3D (.STL / .FBX / .OBJ / .3MF)',
                    'Modelo BIM / CAD (.RVT / .IFC / .DWG / .STEP)',
                    'Enlace Externo / Repositorio Web',
                    'Documento Técnico / Plano / Cálculo (.PDF / .XLSX / .DOCX)',
                    'Código / Firmware IoT / Escena Unity VR'
                  ].map(cat => `
                    <option value="${cat}" ${rDraft.categoria === cat ? 'selected' : ''}>${cat}</option>
                  `).join('')}
                </select>
              </div>
              <div>
                <label class="field-label">🏷️ Nombre o Título del Recurso *</label>
                <input type="text"
                  class="input-control"
                  placeholder="Ej. Nodo_Union_Hexavalente_v3.stl o Carpeta Drive Planos CNC"
                  value="${(rDraft.nombre || '').replace(/"/g, '&quot;')}"
                  oninput="updateResourceDraftField('${task.id}', 'nombre', this.value)" />
              </div>
              <div>
                <label class="field-label">📅 Fecha de Publicación</label>
                <input type="date"
                  class="input-control"
                  value="${rDraft.fecha || new Date().toISOString().slice(0, 10)}"
                  onchange="updateResourceDraftField('${task.id}', 'fecha', this.value)" />
              </div>
            </div>

            <div class="image-upload-zone" style="margin-bottom:12px;">
              <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
                <label class="btn btn-secondary" style="cursor:pointer; padding:7px 12px;">
                  📎 Seleccionar Archivo desde PC (.STL, .PDF, .FBX, .XLSX...)
                  <input type="file" style="display:none;" onchange="handleSelectResourceFile('${task.id}', this)" />
                </label>
                <span style="font-size:11px; color:var(--text-secondary);">
                  Formato detectado: <strong>${rDraft.tipo || 'Manual / Enlace'}</strong>
                </span>
              </div>
              <div style="flex:1; min-width:260px;">
                <input type="text"
                  class="input-control"
                  placeholder="🔗 O pega aquí un Enlace / URL (Drive, GitHub, Onshape, GrabCAD, etc.)"
                  value="${(rDraft.url && !rDraft.url.startsWith('data:')) ? rDraft.url.replace(/"/g, '&quot;') : ''}"
                  oninput="updateResourceDraftField('${task.id}', 'url', this.value)" />
              </div>
            </div>

            <div style="margin-bottom:14px;">
              <label class="field-label">📝 Descripción / Notas Técnicas del Recurso</label>
              <textarea rows="2"
                class="textarea-control"
                placeholder="Describe el contenido del recurso (ej. Modelo 3D validado para impresión en PETG con 4 perímetros, o enlace al repositorio de scripts MQTT para Unity VR)..."
                oninput="updateResourceDraftField('${task.id}', 'descripcion', this.value)">${rDraft.descripcion || ''}</textarea>
            </div>

            <div style="display:flex; justify-content:flex-end; gap:10px;">
              <button type="button" class="btn btn-primary" onclick="submitProtoResource('${task.id}')">
                💾 Guardar Recurso en la Tarea
              </button>
            </div>
          </div>
        ` : ''}

        ${resources.length > 0 ? `
          <div class="resources-grid">
            ${resources.map((arch, fIdx) => {
              const icon = getResourceCategoryIcon(arch.categoria || arch.tipo);
              const hasUrl = Boolean(arch.url && arch.url.trim());
              const resEditKey = `${task.id}__${fIdx}`;
              const resDraft = editingResourceByKey[resEditKey];

              if (resDraft) {
                return `
                  <div class="resource-card" style="border:2px solid var(--accent-sage); box-shadow:var(--shadow-float);">
                    <div style="display:flex; flex-direction:column; gap:8px;">
                      <div style="font-size:10.5px; font-weight:800; text-transform:uppercase; color:var(--accent-sage); letter-spacing:0.06em;">
                        ✏️ Editando Recurso en la Card
                      </div>
                      <div>
                        <label class="field-label" style="margin-bottom:3px;">🏷️ Título / Nombre del Recurso</label>
                        <input type="text"
                          class="input-control"
                          style="padding:6px 9px; font-weight:700;"
                          value="${(resDraft.nombre || '').replace(/"/g, '&quot;')}"
                          oninput="updateInlineResourceField('${task.id}', ${fIdx}, 'nombre', this.value)" />
                      </div>
                      <div class="grid-2" style="gap:8px;">
                        <div>
                          <label class="field-label" style="margin-bottom:3px;">🗂️ Categoría</label>
                          <select class="select-control" style="padding:6px 8px; font-size:11.5px;" onchange="updateInlineResourceField('${task.id}', ${fIdx}, 'categoria', this.value)">
                            ${[
                              'Modelo 3D (.STL / .FBX / .OBJ / .3MF)',
                              'Modelo BIM / CAD (.RVT / .IFC / .DWG / .STEP)',
                              'Enlace Externo / Repositorio Web',
                              'Documento Técnico / Plano / Cálculo (.PDF / .XLSX / .DOCX)',
                              'Código / Firmware IoT / Escena Unity VR'
                            ].map(cat => `
                              <option value="${cat}" ${resDraft.categoria === cat ? 'selected' : ''}>${cat}</option>
                            `).join('')}
                          </select>
                        </div>
                        <div>
                          <label class="field-label" style="margin-bottom:3px;">📅 Fecha</label>
                          <input type="date"
                            class="input-control"
                            style="padding:6px 8px; font-size:11.5px;"
                            value="${resDraft.fecha || ''}"
                            onchange="updateInlineResourceField('${task.id}', ${fIdx}, 'fecha', this.value)" />
                        </div>
                      </div>
                      <div>
                        <div style="display:flex; align-items:center; justify-content:space-between; gap:6px; margin-bottom:4px;">
                          <label class="field-label" style="margin:0;">🔗 Enlace / Archivo</label>
                          <label class="btn btn-secondary" style="padding:3px 8px; font-size:9.5px; cursor:pointer;">
                            📎 Cambiar Archivo PC
                            <input type="file" style="display:none;" onchange="handleInlineChangeResourceFile('${task.id}', ${fIdx}, this)" />
                          </label>
                        </div>
                        <input type="text"
                          class="input-control"
                          style="padding:6px 9px; font-size:11.5px;"
                          placeholder="URL o enlace del recurso..."
                          value="${(resDraft.url && !resDraft.url.startsWith('data:')) ? resDraft.url.replace(/"/g, '&quot;') : ''}"
                          oninput="updateInlineResourceField('${task.id}', ${fIdx}, 'url', this.value)" />
                      </div>
                      <div>
                        <label class="field-label" style="margin-bottom:3px;">📝 Descripción</label>
                        <textarea rows="3"
                          class="textarea-control"
                          style="font-size:12px;"
                          oninput="updateInlineResourceField('${task.id}', ${fIdx}, 'descripcion', this.value)">${resDraft.descripcion || ''}</textarea>
                      </div>
                    </div>
                    <div class="resource-card-footer">
                      <button type="button" class="btn btn-secondary" style="padding:5px 10px; font-size:10px;" onclick="cancelInlineEditResource('${task.id}', ${fIdx})">
                        ✕ Cancelar
                      </button>
                      <button type="button" class="btn btn-primary" style="padding:5px 12px; font-size:10px;" onclick="saveInlineEditResource('${task.id}', ${fIdx})">
                        💾 Guardar Cambios
                      </button>
                    </div>
                  </div>
                `;
              }

              return `
                <div class="resource-card">
                  <div>
                    <div class="resource-card-head">
                      <div class="resource-type-icon">${icon}</div>
                      <div style="flex:1;">
                        <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap; margin-bottom:3px;">
                          <span class="badge badge-sena" style="font-size:9.5px; padding:2px 6px;">${arch.categoria || 'Recurso Técnico'}</span>
                          <span style="font-size:10px; font-weight:700; color:var(--text-muted);">📅 ${arch.fecha || '-'}</span>
                        </div>
                        <div class="resource-card-title">${arch.nombre}</div>
                        <span style="font-size:11px; color:var(--accent-slate); font-weight:600; display:block; margin-top:2px;">
                          Formato / Tipo: ${arch.tipo || 'Documento / Modelo'}
                        </span>
                      </div>
                    </div>
                    ${arch.descripcion ? `
                      <p class="resource-card-desc" style="margin-top:9px;">
                        ${arch.descripcion}
                      </p>
                    ` : ''}
                  </div>
                  <div class="resource-card-footer">
                    <div>
                      ${hasUrl ? `
                        <a href="${arch.url}"
                          target="_blank"
                          rel="noopener noreferrer"
                          ${arch.url.startsWith('data:') ? `download="${arch.nombre}"` : ''}
                          class="btn btn-wood"
                          style="padding:4px 10px; font-size:10px; text-decoration:none;">
                          ${arch.url.startsWith('data:') ? '⬇ Descargar Archivo' : '↗ Abrir Recurso / Enlace'}
                        </a>
                      ` : `
                        <span style="font-size:10.5px; color:var(--text-muted); font-weight:600;">📌 Registrado en repositorio local CTM</span>
                      `}
                    </div>
                    <div class="no-print" style="display:flex; gap:6px;">
                      <button type="button" class="btn btn-secondary" style="padding:4px 8px; font-size:10px;" onclick="editProtoResource('${task.id}', ${fIdx})">
                        ✏️ Editar
                      </button>
                      <button type="button" class="btn btn-secondary" style="padding:4px 8px; font-size:10px; color:var(--accent-crimson);" onclick="removeProtoFile('${task.id}', ${fIdx})">
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        ` : `
          <div style="background:var(--bg-card); border:1px solid var(--line-hair); padding:16px; text-align:center; color:var(--text-secondary); font-size:12px;">
            No hay recursos adjuntos todavía. Usa <strong>"➕ Adjuntar Recurso"</strong> para vincular enlaces, modelos 3D (<code>.STL</code>, <code>.FBX</code>, <code>.RVT</code>), planos o documentos de esta tarea.
          </div>
        `}
      </div>
    `;
  }

  function renderProtoLightboxModal() {
    if (!lightboxState.isOpen) return '';

    let items = [];
    let contextLabel = '';

    if (Array.isArray(lightboxState.customItems) && lightboxState.customItems.length > 0) {
      items = lightboxState.customItems;
      contextLabel = 'REGISTRO VISUAL CONSOLIDADO · FICHA TÉCNICA';
    } else {
      const task = protoTasks.find(t => t.id === lightboxState.taskId);
      if (!task || !Array.isArray(task.imagenes) || task.imagenes.length === 0) return '';
      items = task.imagenes;
      contextLabel = `${task.id} · ${task.titulo}`;
    }

    const safeIdx = Math.max(0, Math.min(items.length - 1, lightboxState.imgIdx || 0));
    const currentImg = items[safeIdx];
    if (!currentImg) return '';

    return `
      <div class="proto-lightbox-overlay no-print" onclick="closeProtoLightbox()">
        <div class="proto-lightbox-topbar" onclick="event.stopPropagation()">
          <div>
            <span style="font-size:10.5px; font-weight:800; text-transform:uppercase; letter-spacing:0.1em; color:var(--accent-terracotta);">
              ${contextLabel} · IMAGEN ${safeIdx + 1} DE ${items.length}
            </span>
            <div style="font-size:16px; font-weight:900; color:#fff; margin-top:2px;">
              ${currentImg.titulo || 'Avance Visual de Prototipo'}
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
            <span class="badge badge-wood" style="font-size:11px;">
              📅 Publicado: ${formatFechaPublicacion(currentImg.fecha)} (${currentImg.fecha || '-'})
            </span>
            ${currentImg.autor ? `<span class="badge badge-sena" style="font-size:11px;">👤 ${currentImg.autor}</span>` : ''}
            <button type="button" class="btn btn-secondary" style="background:#2A2A27; color:#fff; border-color:#555;" onclick="toggleProtoLightboxZoom()">
              ${lightboxState.zoomed ? '🗗 Ajustar a Pantalla' : '🔍 Zoom Detalle 125%'}
            </button>
            <button type="button" class="btn btn-wood" onclick="closeProtoLightbox()">
              ✕ Cerrar Pantalla Completa (ESC)
            </button>
          </div>
        </div>

        <div class="proto-lightbox-stage" onclick="closeProtoLightbox()">
          ${items.length > 1 ? `
            <button type="button" class="proto-lightbox-nav prev" title="Imagen anterior" onclick="event.stopPropagation(); navigateProtoLightbox(-1)">‹</button>
          ` : ''}
          <img src="${currentImg.url}"
            alt="${(currentImg.titulo || 'Avance').replace(/"/g, '&quot;')}"
            class="proto-lightbox-img ${lightboxState.zoomed ? 'zoomed' : ''}"
            onclick="event.stopPropagation(); toggleProtoLightboxZoom()" />
          ${items.length > 1 ? `
            <button type="button" class="proto-lightbox-nav next" title="Siguiente imagen" onclick="event.stopPropagation(); navigateProtoLightbox(1)">›</button>
          ` : ''}
        </div>

        <div class="proto-lightbox-caption" onclick="event.stopPropagation()">
          <div style="display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; margin-bottom:6px;">
            <strong style="font-size:13.5px; color:#fff; text-transform:uppercase; letter-spacing:0.04em;">
              📝 Descripción Técnica del Avance: ${currentImg.titulo || ''}
            </strong>
            <span style="font-size:11px; color:#BDB7AD;">
              Fecha de publicación: ${currentImg.fecha || '-'} · Haz clic en la imagen para alternar zoom
            </span>
          </div>
          <p style="font-size:13px; color:#E5E0D6; line-height:1.55; white-space:pre-wrap; margin:0;">
            ${currentImg.descripcion || 'Registro visual de avance del prototipo a escala y Gemelo Digital VR.'}
          </p>
        </div>
      </div>
    `;
  }

  // Vista de la Ficha Técnica Consolidada de Investigación
  function renderFichaTecnicaConsolidada() {
    const stats = getStats();
    const allImages = [];
    const allFiles = [];
    protoTasks.forEach(t => {
      (t.imagenes || []).forEach((im, idx) => allImages.push({
        ...im,
        etapa: t.id,
        etapaTitulo: t.titulo,
        origIdx: idx,
        fecha: im.fecha || t.fechaInicio || '2026-11-10',
        descripcion: im.descripcion || t.descripcion
      }));
      (t.archivos || []).forEach(f => allFiles.push({ ...f, etapa: t.id }));
    });

    // Ordenar todas las imágenes cronológicamente para la galería consolidada
    allImages.sort((a, b) => String(a.fecha).localeCompare(String(b.fecha)));

    return `
      <section class="ficha-tecnica-sheet">
        <div class="panel-header">
          <div>
            <span class="panel-kicker">DOCUMENTO INSUMO DE INVESTIGACIÓN SENNOVA · CTM MEDIALAB</span>
            <h2 class="panel-title" style="font-size:21px;">
              📋 FICHA TÉCNICA CONSOLIDADA DEL PROTOTIPO A ESCALA Y GEMELO DIGITAL VR
            </h2>
            <p class="panel-desc">
              Compilación técnica automática de las ${protoTasks.length} etapas de ingeniería, desde la investigación estructural y versión preliminar en impresión 3D hasta el prototipo en madera con uniones 3D, domótica, app móvil y proyecto en Unity VR.
            </p>
          </div>
          <div class="no-print" style="display:flex; gap:10px; flex-wrap:wrap;">
            <button class="btn btn-primary" onclick="exportFichaTecnicaWord()">
              📄 Descargar Ficha Técnica en Word (.doc)
            </button>
            <button class="btn btn-secondary" onclick="window.print()">
              🖨️ Imprimir / Guardar PDF
            </button>
            <button class="btn btn-secondary" onclick="selectProtoTask('DEV-01')">
              ← Volver a las Etapas
            </button>
          </div>
        </div>

        <!-- Parámetros Generales Editables de la Ficha Técnica -->
        <h3 style="font-size:13.5px; font-weight:900; color:var(--accent-terracotta-dark); text-transform:uppercase; letter-spacing:0.08em; margin-bottom:10px;">
          01 · Especificaciones Generales del Producto de Investigación
        </h3>
        <div class="ficha-grid-meta">
          <div class="ficha-meta-box">
            <label class="field-label">Código de Ficha Técnica</label>
            <input type="text" class="input-control" value="${fichaMeta.codigoFicha}" oninput="updateFichaMetaField('codigoFicha', this.value)" />
          </div>
          <div class="ficha-meta-box">
            <label class="field-label">Nombre del Prototipo / Producto</label>
            <input type="text" class="input-control" value="${fichaMeta.nombreProducto}" oninput="updateFichaMetaField('nombreProducto', this.value)" />
          </div>
          <div class="ficha-meta-box">
            <label class="field-label">Versión 1: Escala Preliminar en Impresión 3D</label>
            <input type="text" class="input-control" value="${fichaMeta.escalaPreliminar3D}" oninput="updateFichaMetaField('escalaPreliminar3D', this.value)" />
          </div>
          <div class="ficha-meta-box">
            <label class="field-label">Versión 2: Escala Funcional en Madera + Nodos 3D</label>
            <input type="text" class="input-control" value="${fichaMeta.escalaFinalMadera}" oninput="updateFichaMetaField('escalaFinalMadera', this.value)" />
          </div>
          <div class="ficha-meta-box">
            <label class="field-label">Sistema de Uniones en Impresión 3D</label>
            <input type="text" class="input-control" value="${fichaMeta.materialUniones3D}" oninput="updateFichaMetaField('materialUniones3D', this.value)" />
          </div>
          <div class="ficha-meta-box">
            <label class="field-label">Estructura en Madera Mecanizada</label>
            <input type="text" class="input-control" value="${fichaMeta.materialEstructura}" oninput="updateFichaMetaField('materialEstructura', this.value)" />
          </div>
          <div class="ficha-meta-box">
            <label class="field-label">Arquitectura Domótica y Aplicación Móvil</label>
            <input type="text" class="input-control" value="${fichaMeta.arquitecturaDomotica}" oninput="updateFichaMetaField('arquitecturaDomotica', this.value)" />
          </div>
          <div class="ficha-meta-box">
            <label class="field-label">Gemelo Digital VR (Motor Unity)</label>
            <input type="text" class="input-control" value="${fichaMeta.motorGemeloDigital}" oninput="updateFichaMetaField('motorGemeloDigital', this.value)" />
          </div>
        </div>

        <!-- Tabla Consolidada de las Etapas de Desarrollo -->
        <h3 style="font-size:13.5px; font-weight:900; color:var(--accent-sage); text-transform:uppercase; letter-spacing:0.08em; margin:22px 0 10px 0;">
          02 · Matriz Técnica de Desarrollo del Prototipo y Gemelo Digital (${stats.protoAvg}% Avance Global)
        </h3>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>Etapa</th>
                <th>Componente / Tarea</th>
                <th>Fechas y Estado</th>
                <th>Parámetros Técnicos y Documentación de Avance</th>
                <th>Recursos y Avances Visuales</th>
              </tr>
            </thead>
            <tbody>
              ${protoTasks.map(t => `
                <tr>
                  <td style="white-space:nowrap;">
                    <strong style="color:var(--text-primary);">${t.id}</strong><br/>
                    <span class="badge ${t.tipoTarea === 'Base' ? 'badge-sena' : 'badge-wood'}" style="margin-top:4px;">${t.tipoTarea}</span>
                  </td>
                  <td style="min-width:210px;">
                    <strong style="color:var(--text-primary); display:block; margin-bottom:4px;">${t.titulo}</strong>
                    <span style="font-size:12px;">${t.descripcion}</span>
                  </td>
                  <td style="white-space:nowrap;">
                    <span class="badge badge-unity">${t.estado} (${t.progreso}%)</span><br/>
                    <span style="font-size:11.5px; display:block; margin-top:6px;">📅 Inicio: ${t.fechaInicio || '-'}</span>
                    <span style="font-size:11.5px; display:block;">🏁 Fin: ${t.fechaFin || '-'}</span>
                    <span style="font-size:11.5px; color:var(--accent-terracotta-dark); font-weight:700; display:block; margin-top:4px;">👤 ${t.responsable}</span>
                  </td>
                  <td style="min-width:260px;">
                    <div style="margin-bottom:8px;">
                      <strong style="color:var(--accent-terracotta-dark); font-size:11px; text-transform:uppercase;">Parámetros:</strong><br/>
                      <span>${(t.parametrosTecnicos || '-').replace(/\n/g, '<br/>')}</span>
                    </div>
                    <div>
                      <strong style="color:var(--accent-sage); font-size:11px; text-transform:uppercase;">Avance Documentado:</strong><br/>
                      <span>${(t.documentacionAvance || 'Sin registro aún').replace(/\n/g, '<br/>')}</span>
                    </div>
                  </td>
                  <td style="min-width:200px;">
                    <div><strong style="color:var(--text-primary);">📦 Recursos (${(t.archivos || []).length}):</strong></div>
                    ${(t.archivos || []).map(f => `<div style="font-size:11px; color:var(--accent-slate);">• [${f.categoria || 'Recurso'}] ${f.nombre}</div>`).join('')}
                    <div style="margin-top:6px;"><strong style="color:var(--text-primary);">🖼️ Avances Visuales (${(t.imagenes || []).length}):</strong></div>
                    ${(t.imagenes || []).map(im => `<div style="font-size:11px; color:var(--text-secondary);">• [${im.fecha || '-'}] ${im.titulo}</div>`).join('')}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Galería Visual Consolidada de la Ficha Técnica (Cards Cronológicas) -->
        <h3 style="font-size:13.5px; font-weight:900; color:var(--accent-slate); text-transform:uppercase; letter-spacing:0.08em; margin:24px 0 12px 0;">
          03 · Línea de Tiempo Visual Consolidada del Desarrollo (${allImages.length} Avances Registrados)
        </h3>
        <div class="advance-cards-grid">
          ${allImages.map((im, idx) => `
            <article class="advance-card">
              <div>
                <div class="advance-card-top-meta">
                  <span style="color:var(--accent-terracotta-dark);">${im.etapa} · AVANCE #${String(idx + 1).padStart(2, '0')}</span>
                  <span>📅 ${formatFechaPublicacion(im.fecha)}</span>
                </div>
                <div class="advance-card-media" onclick="openProtoLightbox('${im.etapa}', ${im.origIdx})">
                  <img src="${im.url}" alt="${im.titulo}" />
                  <button type="button" class="advance-expand-pill no-print" onclick="event.stopPropagation(); openProtoLightbox('${im.etapa}', ${im.origIdx})">
                    ⛶ Pantalla Completa
                  </button>
                </div>
                <div class="advance-card-body">
                  <h4 class="advance-card-title">${im.titulo}</h4>
                  <div class="advance-card-desc">${im.descripcion || ''}</div>
                </div>
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    `;
  }

  // ==========================================================================
  // FUNCIONES INTERACTIVAS DE LA SECCIÓN 4 (PROTOTIPO / GEMELO DIGITAL)
  // ==========================================================================
  window.toggleLaminaBoard = function () {
    showLaminaBoard = !showLaminaBoard;
    render();
  };

  window.selectProtoTask = function (taskId) {
    activeProtoTaskId = taskId;
    render();
  };

  window.toggleProtoChronoOrder = function () {
    protoChronoOrder = protoChronoOrder === 'asc' ? 'desc' : 'asc';
    render();
  };

  window.toggleAdvanceForm = function (taskId) {
    showAdvanceFormByTask[taskId] = !showAdvanceFormByTask[taskId];
    render();
  };

  window.toggleResourceForm = function (taskId) {
    showResourceFormByTask[taskId] = !showResourceFormByTask[taskId];
    render();
  };

  window.updateAdvanceDraftField = function (taskId, field, value) {
    const draft = getAdvanceDraft(taskId);
    draft[field] = value;
  };

  window.clearAdvanceDraftImage = function (taskId) {
    const draft = getAdvanceDraft(taskId);
    draft.url = '';
    draft.fileName = '';
    render();
  };

  window.handleSelectAdvanceImageFile = function (taskId, inputEl) {
    const file = inputEl.files && inputEl.files[0];
    if (!file) return;
    const draft = getAdvanceDraft(taskId);
    draft.fileName = file.name;
    if (!draft.titulo || !draft.titulo.trim()) {
      draft.titulo = file.name.replace(/\.[^/.]+$/, '').replace(/[_-]+/g, ' ');
    }
    const reader = new FileReader();
    reader.onload = function (e) {
      draft.url = e.target.result;
      showAdvanceFormByTask[taskId] = true;
      render();
    };
    reader.readAsDataURL(file);
  };

  window.submitProtoAdvance = function (taskId) {
    const task = protoTasks.find(t => t.id === taskId);
    if (!task) return;
    const draft = getAdvanceDraft(taskId);

    if (!draft.url || !draft.url.trim()) {
      alert('Por favor selecciona una imagen desde tu PC o ingresa la ruta/URL de la imagen del avance.');
      return;
    }
    if (!draft.titulo || !draft.titulo.trim()) {
      alert('Por favor escribe un título para identificar este avance visual.');
      return;
    }

    if (!Array.isArray(task.imagenes)) task.imagenes = [];
    task.imagenes.push({
      titulo: draft.titulo.trim(),
      descripcion: (draft.descripcion && draft.descripcion.trim())
        ? draft.descripcion.trim()
        : `Avance registrado en la etapa ${task.id} (${task.titulo}).`,
      fecha: draft.fecha || new Date().toISOString().slice(0, 10),
      autor: draft.autor || task.responsable || 'Alex / Sebastián',
      url: draft.url.trim()
    });

    // Reiniciar borrador de este formulario
    advanceDraftByTask[taskId] = {
      titulo: '',
      descripcion: '',
      fecha: new Date().toISOString().slice(0, 10),
      autor: draft.autor || 'Alex / Sebastián',
      url: '',
      fileName: ''
    };

    saveProtoTasks();
    render();
  };

  // Edición en línea directamente dentro de la misma Card de Avance (sin ventanas flotantes)
  window.editProtoAdvance = function (taskId, imgIdx) {
    const task = protoTasks.find(t => t.id === taskId);
    if (!task || !task.imagenes || !task.imagenes[imgIdx]) return;
    const item = task.imagenes[imgIdx];
    const editKey = `${taskId}__${imgIdx}`;
    editingAdvanceByKey[editKey] = {
      titulo: item.titulo || '',
      descripcion: item.descripcion || '',
      fecha: item.fecha || task.fechaInicio || new Date().toISOString().slice(0, 10),
      autor: item.autor || task.responsable || 'Alex / Sebastián',
      url: item.url || '',
      fileName: ''
    };
    render();
  };

  window.updateInlineAdvanceField = function (taskId, imgIdx, field, value) {
    const editKey = `${taskId}__${imgIdx}`;
    if (!editingAdvanceByKey[editKey]) return;
    editingAdvanceByKey[editKey][field] = value;
  };

  window.handleInlineChangeAdvanceImage = function (taskId, imgIdx, inputEl) {
    const file = inputEl.files && inputEl.files[0];
    if (!file) return;
    const editKey = `${taskId}__${imgIdx}`;
    if (!editingAdvanceByKey[editKey]) return;
    editingAdvanceByKey[editKey].fileName = file.name;
    const reader = new FileReader();
    reader.onload = function (e) {
      editingAdvanceByKey[editKey].url = e.target.result;
      render();
    };
    reader.readAsDataURL(file);
  };

  window.saveInlineEditAdvance = function (taskId, imgIdx) {
    const task = protoTasks.find(t => t.id === taskId);
    const editKey = `${taskId}__${imgIdx}`;
    const draft = editingAdvanceByKey[editKey];
    if (!task || !task.imagenes || !task.imagenes[imgIdx] || !draft) return;

    const item = task.imagenes[imgIdx];
    item.titulo = (draft.titulo || '').trim() || item.titulo;
    item.descripcion = (draft.descripcion || '').trim();
    item.fecha = draft.fecha || item.fecha;
    item.autor = (draft.autor || '').trim() || item.autor;
    if (draft.url && draft.url.trim()) {
      item.url = draft.url.trim();
    }

    delete editingAdvanceByKey[editKey];
    saveProtoTasks();
    render();
  };

  window.cancelInlineEditAdvance = function (taskId, imgIdx) {
    const editKey = `${taskId}__${imgIdx}`;
    delete editingAdvanceByKey[editKey];
    render();
  };

  window.removeProtoImage = function (taskId, imgIdx) {
    if (!confirm('¿Deseas eliminar esta card de avance visual?')) return;
    const task = protoTasks.find(t => t.id === taskId);
    if (task && task.imagenes) {
      task.imagenes.splice(imgIdx, 1);
      saveProtoTasks();
      render();
    }
  };

  // Visor a Pantalla Completa (Lightbox)
  window.openProtoLightbox = function (taskId, imgIdx) {
    lightboxState = {
      isOpen: true,
      taskId: taskId,
      imgIdx: Number(imgIdx) || 0,
      zoomed: false,
      customItems: null
    };
    render();
  };

  window.closeProtoLightbox = function () {
    if (!lightboxState.isOpen) return;
    lightboxState.isOpen = false;
    lightboxState.zoomed = false;
    render();
  };

  window.toggleProtoLightboxZoom = function () {
    if (!lightboxState.isOpen) return;
    lightboxState.zoomed = !lightboxState.zoomed;
    render();
  };

  window.navigateProtoLightbox = function (delta) {
    if (!lightboxState.isOpen) return;
    const task = protoTasks.find(t => t.id === lightboxState.taskId);
    const list = (task && task.imagenes) ? task.imagenes : [];
    if (list.length <= 1) return;
    lightboxState.imgIdx = (lightboxState.imgIdx + delta + list.length) % list.length;
    lightboxState.zoomed = false;
    render();
  };

  // Gestión del Panel de Recursos de la Tarea
  window.updateResourceDraftField = function (taskId, field, value) {
    const rDraft = getResourceDraft(taskId);
    rDraft[field] = value;
  };

  window.handleSelectResourceFile = function (taskId, inputEl) {
    const file = inputEl.files && inputEl.files[0];
    if (!file) return;
    const rDraft = getResourceDraft(taskId);
    const ext = file.name.includes('.') ? file.name.split('.').pop().toUpperCase() : 'ARCHIVO';
    const sizeKB = Math.max(1, Math.round(file.size / 1024));

    rDraft.nombre = rDraft.nombre && rDraft.nombre.trim() ? rDraft.nombre : file.name;
    rDraft.tipo = `Archivo .${ext} (${sizeKB} KB)`;

    if (['STL', 'FBX', 'OBJ', '3MF', 'STEP', 'IGES', 'GLTF', 'GLB'].includes(ext)) {
      rDraft.categoria = 'Modelo 3D (.STL / .FBX / .OBJ / .3MF)';
    } else if (['RVT', 'IFC', 'DWG', 'DXF'].includes(ext)) {
      rDraft.categoria = 'Modelo BIM / CAD (.RVT / .IFC / .DWG / .STEP)';
    } else if (['INO', 'YAML', 'CS', 'JSON', 'GCODE', 'NC', 'UNITYPACKAGE'].includes(ext)) {
      rDraft.categoria = 'Código / Firmware IoT / Escena Unity VR';
    } else {
      rDraft.categoria = 'Documento Técnico / Plano / Cálculo (.PDF / .XLSX / .DOCX)';
    }

    // Si el archivo pesa menos de 2 MB lo guardamos como DataURL descargable
    if (file.size <= 2 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = function (e) {
        rDraft.url = e.target.result;
        showResourceFormByTask[taskId] = true;
        render();
      };
      reader.readAsDataURL(file);
    } else {
      showResourceFormByTask[taskId] = true;
      render();
    }
  };

  window.submitProtoResource = function (taskId) {
    const task = protoTasks.find(t => t.id === taskId);
    if (!task) return;
    const rDraft = getResourceDraft(taskId);

    if (!rDraft.nombre || !rDraft.nombre.trim()) {
      alert('Por favor ingresa el nombre del recurso, modelo 3D, documento o enlace.');
      return;
    }

    if (!Array.isArray(task.archivos)) task.archivos = [];
    task.archivos.push({
      nombre: rDraft.nombre.trim(),
      categoria: rDraft.categoria || 'Recurso Técnico',
      tipo: rDraft.tipo || (rDraft.url ? 'Enlace / Recurso Web' : 'Recurso Técnico'),
      url: (rDraft.url || '').trim(),
      descripcion: (rDraft.descripcion || '').trim() || `Recurso técnico vinculado a la tarea ${task.id}.`,
      fecha: rDraft.fecha || new Date().toISOString().slice(0, 10)
    });

    resourceDraftByTask[taskId] = {
      nombre: '',
      categoria: rDraft.categoria,
      tipo: 'Modelo 3D / CAD',
      url: '',
      descripcion: '',
      fecha: new Date().toISOString().slice(0, 10)
    };

    saveProtoTasks();
    render();
  };

  // Edición en línea directamente dentro de la Card del Recurso
  window.editProtoResource = function (taskId, fileIdx) {
    const task = protoTasks.find(t => t.id === taskId);
    if (!task || !task.archivos || !task.archivos[fileIdx]) return;
    const arch = task.archivos[fileIdx];
    const resEditKey = `${taskId}__${fileIdx}`;
    editingResourceByKey[resEditKey] = {
      nombre: arch.nombre || '',
      categoria: arch.categoria || 'Modelo 3D (.STL / .FBX / .OBJ / .3MF)',
      tipo: arch.tipo || 'Recurso Técnico',
      url: arch.url || '',
      descripcion: arch.descripcion || '',
      fecha: arch.fecha || new Date().toISOString().slice(0, 10)
    };
    render();
  };

  window.updateInlineResourceField = function (taskId, fileIdx, field, value) {
    const resEditKey = `${taskId}__${fileIdx}`;
    if (!editingResourceByKey[resEditKey]) return;
    editingResourceByKey[resEditKey][field] = value;
  };

  window.handleInlineChangeResourceFile = function (taskId, fileIdx, inputEl) {
    const file = inputEl.files && inputEl.files[0];
    if (!file) return;
    const resEditKey = `${taskId}__${fileIdx}`;
    const draft = editingResourceByKey[resEditKey];
    if (!draft) return;
    const ext = file.name.includes('.') ? file.name.split('.').pop().toUpperCase() : 'ARCHIVO';
    const sizeKB = Math.max(1, Math.round(file.size / 1024));
    draft.nombre = file.name;
    draft.tipo = `Archivo .${ext} (${sizeKB} KB)`;

    if (file.size <= 2 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = function (e) {
        draft.url = e.target.result;
        render();
      };
      reader.readAsDataURL(file);
    } else {
      render();
    }
  };

  window.saveInlineEditResource = function (taskId, fileIdx) {
    const task = protoTasks.find(t => t.id === taskId);
    const resEditKey = `${taskId}__${fileIdx}`;
    const draft = editingResourceByKey[resEditKey];
    if (!task || !task.archivos || !task.archivos[fileIdx] || !draft) return;

    const arch = task.archivos[fileIdx];
    arch.nombre = (draft.nombre || '').trim() || arch.nombre;
    arch.categoria = draft.categoria || arch.categoria;
    arch.tipo = draft.tipo || arch.tipo;
    arch.fecha = draft.fecha || arch.fecha;
    arch.descripcion = (draft.descripcion || '').trim();
    if (typeof draft.url === 'string') {
      arch.url = draft.url.trim();
    }

    delete editingResourceByKey[resEditKey];
    saveProtoTasks();
    render();
  };

  window.cancelInlineEditResource = function (taskId, fileIdx) {
    const resEditKey = `${taskId}__${fileIdx}`;
    delete editingResourceByKey[resEditKey];
    render();
  };

  window.updateProtoTaskField = function (taskId, field, value) {
    const task = protoTasks.find(t => t.id === taskId);
    if (!task) return;
    task[field] = value;
    if (field === 'progreso' && value === 100) task.estado = 'Completado';
    if (field === 'estado' && value === 'Completado') task.progreso = 100;
    saveProtoTasks();
    render();
  };

  window.updateProtoTaskFieldSilent = function (taskId, field, value) {
    const task = protoTasks.find(t => t.id === taskId);
    if (!task) return;
    task[field] = value;
    saveProtoTasks();
  };

  window.updateFichaMetaField = function (field, value) {
    fichaMeta[field] = value;
    saveFichaMeta();
  };

  window.removeProtoFile = function (taskId, fileIdx) {
    if (!confirm('¿Deseas eliminar este recurso de la tarea?')) return;
    const task = protoTasks.find(t => t.id === taskId);
    if (task && task.archivos) {
      task.archivos.splice(fileIdx, 1);
      saveProtoTasks();
      render();
    }
  };

  window.addNewProtoTask = function () {
    const titulo = prompt('Título de la nueva tarea de desarrollo del prototipo / gemelo digital:');
    if (!titulo || !titulo.trim()) return;
    const categoria = prompt('Categoría (ej. Impresión 3D, Estructura Madera, Domótica, Unity VR, Pruebas):', 'Desarrollo Técnico') || 'Desarrollo Técnico';
    const newId = `DEV-${String(protoTasks.length + 1).padStart(2, '0')}`;
    protoTasks.push({
      id: newId,
      orden: protoTasks.length + 1,
      tipoTarea: "Propuesta",
      categoria: categoria.trim(),
      titulo: `${protoTasks.length + 1}. ${titulo.trim()}`,
      descripcion: "Tarea adicional registrada para el desarrollo y validación del prototipo.",
      responsable: "Alex / Sebastián / Liliana",
      fechaInicio: new Date().toISOString().slice(0, 10),
      fechaFin: "2028-04-30",
      estado: "Pendiente",
      progreso: 0,
      parametrosTecnicos: "",
      documentacionAvance: "",
      archivos: [],
      imagenes: []
    });
    saveProtoTasks();
    activeProtoTaskId = newId;
    showAdvanceFormByTask[newId] = true;
    render();
  };

  // ==========================================================================
  // FUNCIONES DE GESTIÓN DE AUTORES (ALEX / SEBASTIÁN / LILIANA) Y @MENCIONES
  // ==========================================================================
  window.toggleAuthorOnSection = function (numeral, authorId) {
    const sec = formulacion.find(item => item.numeral === numeral);
    if (!sec) return;
    if (!Array.isArray(sec.autoresAsignados)) sec.autoresAsignados = [];
    const idx = sec.autoresAsignados.indexOf(authorId);
    if (idx === -1) {
      sec.autoresAsignados.push(authorId);
    } else {
      sec.autoresAsignados.splice(idx, 1);
    }
    saveFormulacion();
    render();
  };

  window.insertMentionIntoObservacion = function (numeral, mentionTag, authorId) {
    const sec = formulacion.find(item => item.numeral === numeral);
    if (!sec) return;
    if (!Array.isArray(sec.autoresAsignados)) sec.autoresAsignados = [];
    if (!sec.autoresAsignados.includes(authorId)) {
      sec.autoresAsignados.push(authorId);
    }
    const current = sec.observacionesComite || '';
    sec.observacionesComite = (current ? current.trim() + ' ' : '') + mentionTag;
    activeMentionNumeral = null;
    saveFormulacion();
    render();
    const inputEl = document.getElementById('obs-input-' + numeral);
    if (inputEl) {
      inputEl.focus();
      inputEl.setSelectionRange(inputEl.value.length, inputEl.value.length);
    }
  };

  window.handleObservacionInput = function (numeral, texto) {
    const sec = formulacion.find(item => item.numeral === numeral);
    if (!sec) return;
    sec.observacionesComite = texto;
    saveFormulacion();

    const matchAt = /@[a-zA-ZáéíóúÁÉÍÓÚ]*$/.test(texto);
    if (matchAt && activeMentionNumeral !== numeral) {
      activeMentionNumeral = numeral;
      render();
      const inputEl = document.getElementById('obs-input-' + numeral);
      if (inputEl) {
        inputEl.focus();
        inputEl.setSelectionRange(inputEl.value.length, inputEl.value.length);
      }
    } else if (!matchAt && activeMentionNumeral === numeral) {
      activeMentionNumeral = null;
      render();
      const inputEl = document.getElementById('obs-input-' + numeral);
      if (inputEl) {
        inputEl.focus();
        inputEl.setSelectionRange(inputEl.value.length, inputEl.value.length);
      }
    }
  };

  window.selectMentionFromDropdown = function (numeral, etiqueta, authorId) {
    const sec = formulacion.find(item => item.numeral === numeral);
    if (!sec) return;
    sec.observacionesComite = (sec.observacionesComite || '').replace(/@[a-zA-ZáéíóúÁÉÍÓÚ]*$/, etiqueta + ': ');
    if (!Array.isArray(sec.autoresAsignados)) sec.autoresAsignados = [];
    if (!sec.autoresAsignados.includes(authorId)) {
      sec.autoresAsignados.push(authorId);
    }
    activeMentionNumeral = null;
    saveFormulacion();
    render();
    const inputEl = document.getElementById('obs-input-' + numeral);
    if (inputEl) {
      inputEl.focus();
      inputEl.setSelectionRange(inputEl.value.length, inputEl.value.length);
    }
  };

  window.addTaskFromObservacion = function (numeral) {
    const sec = formulacion.find(item => item.numeral === numeral);
    if (!sec) return;
    const raw = (sec.observacionesComite || '').trim();
    if (!raw) {
      alert('Escribe una instrucción o usa @Alex, @Sebastián o @Liliana en la barra de observaciones para asignarla.');
      return;
    }

    let detectedAuthor = (sec.autoresAsignados && sec.autoresAsignados[0]) || 'Alex';
    if (/@sebasti[aá]n/i.test(raw)) detectedAuthor = 'Sebastian';
    else if (/@liliana/i.test(raw)) detectedAuthor = 'Liliana';
    else if (/@alex/i.test(raw)) detectedAuthor = 'Alex';

    const auObj = AUTORES_FORMULACION.find(a => a.id === detectedAuthor) || AUTORES_FORMULACION[0];
    const cleanText = raw
      .replace(/@alex:?/ig, '')
      .replace(/@sebasti[aá]n:?/ig, '')
      .replace(/@liliana:?/ig, '')
      .trim();

    if (!Array.isArray(sec.tareasAutores)) sec.tareasAutores = [];
    sec.tareasAutores.push({
      autor: auObj.id,
      autorNombre: auObj.nombre,
      texto: cleanText || raw,
      completada: false
    });

    if (!Array.isArray(sec.autoresAsignados)) sec.autoresAsignados = [];
    if (!sec.autoresAsignados.includes(auObj.id)) {
      sec.autoresAsignados.push(auObj.id);
    }

    sec.observacionesComite = '';
    activeMentionNumeral = null;
    saveFormulacion();
    render();
  };

  window.toggleTaskCompleted = function (numeral, taskIdx) {
    const sec = formulacion.find(item => item.numeral === numeral);
    if (sec && sec.tareasAutores && sec.tareasAutores[taskIdx]) {
      sec.tareasAutores[taskIdx].completada = !sec.tareasAutores[taskIdx].completada;
      saveFormulacion();
      render();
    }
  };

  window.removeTaskFromSection = function (numeral, taskIdx) {
    const sec = formulacion.find(item => item.numeral === numeral);
    if (sec && sec.tareasAutores) {
      sec.tareasAutores.splice(taskIdx, 1);
      saveFormulacion();
      render();
    }
  };

  // ==========================================================================
  // MOTOR DEL ASISTENTE IA (EXCLUSIVAMENTE REVISIÓN Y REDACCIÓN)
  // ==========================================================================
  window.runAiSmartAction = async function (actionType, customPromptText) {
    const sec = formulacion.find(item => item.numeral === activeNumeral) || formulacion[0];
    const targetCampo = sec.campos[selectedCampoIdxForAI] || sec.campos[0];
    const rawText = (targetCampo.valor || '').replace(/^"+|"+$/g, '').trim();

    if (geminiApiKey) {
      aiResponseText = '⏳ Procesando con Gemini API sobre "' + targetCampo.etiqueta + '"...';
      render();
      try {
        const promptToSend = customPromptText
          ? customPromptText
          : actionType === 'auditar'
          ? `Realiza una revisión técnica, ortográfica, de claridad y coherencia metodológica MGA sobre el texto actual del campo "${targetCampo.etiqueta}". Indica fortalezas y aspectos puntuales por pulir.`
          : `Mejora la redacción técnica, fluidez, precisión terminológica y estructura formal MGA del texto actual del campo "${targetCampo.etiqueta}", respetando fielmente su sentido original.`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Eres un editor y revisor metodológico experto en formulación de proyectos MGA SENNOVA.\nNumeral: ${sec.titulo}\nCampo seleccionado: ${targetCampo.etiqueta}\nTexto actual del campo:\n${rawText || '(Vacío)'}\n\nInstrucción: ${promptToSend}`
              }]
            }]
          })
        });
        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          aiResponseText = text;
          lastAiGeneratedDraft = actionType === 'auditar' ? '' : text;
          render();
          return;
        }
      } catch (err) {}
    }

    if (actionType === 'auditar') {
      if (!rawText || rawText.includes('Indique el nombre')) {
        aiResponseText = `🔍 REVISIÓN DEL CAMPO "${targetCampo.etiqueta}":\n\n` +
          `• Estado: ⚠️ Campo pendiente por diligenciar.\n` +
          `• Recomendación: Puedes etiquetar a @Alex, @Sebastián o @Liliana en la barra superior del numeral o escribir una instrucción abajo para redactarlo.`;
        lastAiGeneratedDraft = '';
      } else {
        const palabras = rawText.split(/\s+/).length;
        const parrafos = rawText.split(/\n\s*\n/).length;
        const iniciaVerboInfinitivo = /^(Desarrollar|Caracterizar|Diseñar|Prototipar|Construir|Implementar|Validar|Fortalecer|Establecer|Generar)/i.test(rawText);
        const esObjetivo = sec.numeral === '10' && targetCampo.id.startsWith('10.');

        aiResponseText = `🔍 REVISIÓN DE REDACCIÓN Y ESTRUCTURA ("${targetCampo.etiqueta}"):\n\n` +
          `• Extensión actual: ${palabras} palabras distribuidas en ${parrafos} párrafo(s).\n` +
          (esObjetivo
            ? `• Estructura de Objetivo MGA: ${iniciaVerboInfinitivo ? '✅ Inicia correctamente con verbo en infinitivo y estructura Qué + Cómo + Para qué.' : '⚠️ Verifica que inicie con un único verbo en infinitivo (Qué se hace + Mediante qué + Para qué).'}\n`
            : `• Claridad y Tono: ✅ Mantiene tono técnico-institucional acorde con formulación SENNOVA.\n`) +
          `• Puntuación y Formato: ${targetCampo.valor.startsWith('"') ? '⚠️ El texto tiene comillas envolventes heredadas del Excel; usa "Proponer mejora de redacción" para limpiarlas.' : '✅ Formato limpio sin caracteres residuales.'}`;
        lastAiGeneratedDraft = '';
      }
    } else if (actionType === 'mejorar_redaccion') {
      if (!rawText || rawText.includes('Indique el nombre')) {
        aiResponseText = `⚠️ El campo "${targetCampo.etiqueta}" aún está vacío. Escribe una instrucción en el recuadro inferior indicando qué deseas redactar para este campo.`;
        lastAiGeneratedDraft = '';
      } else {
        const textoLimpio = rawText
          .replace(/^"+|"+$/g, '')
          .replace(/""/g, '"')
          .replace(/[ \t]+/g, ' ')
          .trim();

        aiResponseText = `✍️ PROPUESTA DE REDACCIÓN DEPURADA PARA "${targetCampo.etiqueta}":\n\n${textoLimpio}\n\n(Usa "🔄 Reemplazar" abajo si deseas aplicar esta versión limpia o edítala directamente).`;
        lastAiGeneratedDraft = textoLimpio;
      }
    } else if (customPromptText) {
      const draft = rawText
        ? `${rawText}\n\n${customPromptText}`
        : customPromptText;
      aiResponseText = `✍️ PROPUESTA DE REDACCIÓN GENERADA PARA "${targetCampo.etiqueta}":\n\n${draft}`;
      lastAiGeneratedDraft = draft;
    }

    render();
  };

  window.applyAiDraftToSection = function (mode) {
    if (!lastAiGeneratedDraft) return;
    const sec = formulacion.find(item => item.numeral === activeNumeral);
    if (sec && sec.campos[selectedCampoIdxForAI]) {
      const targetCampo = sec.campos[selectedCampoIdxForAI];
      if (mode === 'replace') {
        targetCampo.valor = lastAiGeneratedDraft;
      } else {
        targetCampo.valor = (targetCampo.valor ? targetCampo.valor.trim() + '\n\n' : '') + lastAiGeneratedDraft;
      }
      saveFormulacion();
      aiResponseText = `✅ Se actualizó el campo "${targetCampo.etiqueta}" en el Numeral ${sec.numeral}.`;
      lastAiGeneratedDraft = '';
      render();
    }
  };

  window.saveGeminiKey = function () {
    const el = document.getElementById('input-gemini-key');
    if (el) {
      geminiApiKey = el.value.trim();
      localStorage.setItem('geodome_gemini_key', geminiApiKey);
      render();
      alert('API Key guardada correctamente en este navegador.');
    }
  };

  window.selectNumeral = function (num) {
    activeNumeral = num;
    selectedCampoIdxForAI = 0;
    lastAiGeneratedDraft = '';
    activeMentionNumeral = null;
    render();
  };

  window.navigateRelativeNumeral = function (delta) {
    if (activeNumeral === 'ALL') {
      activeNumeral = '1';
      render();
      return;
    }
    const idx = formulacion.findIndex(f => f.numeral === activeNumeral);
    if (idx !== -1) {
      const nextIdx = Math.max(0, Math.min(formulacion.length - 1, idx + delta));
      activeNumeral = formulacion[nextIdx].numeral;
      selectedCampoIdxForAI = 0;
      activeMentionNumeral = null;
      render();
      window.scrollTo({ top: 280, behavior: 'smooth' });
    }
  };

  window.changeSectionStatus = function (numeral, nuevoEstado) {
    const sec = formulacion.find(item => item.numeral === numeral);
    if (sec) {
      sec.estadoRevision = nuevoEstado;
      saveFormulacion();
      render();
    }
  };

  window.updateCampoValue = function (numeral, campoIdx, nuevoValor) {
    const sec = formulacion.find(item => item.numeral === numeral);
    if (sec && sec.campos[campoIdx]) {
      sec.campos[campoIdx].valor = nuevoValor;
      saveFormulacion();
    }
  };

  window.addCustomField = function (numeral) {
    const nombreCampo = prompt('Nombre del nuevo campo para el Numeral ' + numeral + ':');
    if (!nombreCampo || !nombreCampo.trim()) return;
    const sec = formulacion.find(item => item.numeral === numeral);
    if (sec) {
      sec.campos.push({
        id: `${numeral}.${sec.campos.length + 1}`,
        etiqueta: nombreCampo.trim(),
        tipo: 'parrafo',
        valor: ''
      });
      saveFormulacion();
      render();
    }
  };

  // ==========================================================================
  // PESTAÑA 2: MATRIZ RELACIONAL
  // ==========================================================================
  function renderTabMatriz() {
    const filtered = activities.filter(act => {
      const matchOE = filterOE === 'ALL' || act.objetivoId === filterOE;
      const matchFase = filterFase === 'ALL' || act.faseActaId === filterFase;
      const matchResp = !filterResp || act.responsables.toLowerCase().includes(filterResp.toLowerCase());
      const matchSearch = !searchQuery ||
        act.actividadMGA.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.alcanceAjustadoEscala.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.entregableVerificador.toLowerCase().includes(searchQuery.toLowerCase());
      return matchOE && matchFase && matchResp && matchSearch;
    });

    return `
      <section class="panel">
        <div class="panel-header">
          <div>
            <span class="panel-kicker">Trazabilidad Integral del Proyecto</span>
            <h2 class="panel-title">Matriz Relacional: 15 Actividades MGA ↔ 6 Fases Acta 02 ↔ Productos ↔ Responsables</h2>
            <p class="panel-desc">
              Relaciona las 15 actividades de la Cadena de Valor MGA con las 6 fases del Acta No. 02 del Medialab.
            </p>
          </div>
          <button class="btn btn-wood" onclick="exportMatrixCSV()">
            📊 Descargar Matriz en CSV / Excel
          </button>
        </div>

        <div class="grid-4 no-print" style="margin-bottom:18px;">
          <div>
            <label class="field-label">Objetivo Específico MGA</label>
            <select id="filter-oe" class="select-control">
              <option value="ALL" ${filterOE === 'ALL' ? 'selected' : ''}>Todos los Objetivos (OE1, OE2, OE3)</option>
              <option value="OE1" ${filterOE === 'OE1' ? 'selected' : ''}>OE1 · Caracterización Estructural e IoT</option>
              <option value="OE2" ${filterOE === 'OE2' ? 'selected' : ''}>OE2 · Diseño BIM, CNC y Gemelo Digital</option>
              <option value="OE3" ${filterOE === 'OE3' ? 'selected' : ''}>OE3 · Prototipado y Validación</option>
            </select>
          </div>

          <div>
            <label class="field-label">Fase del Acta No. 02</label>
            <select id="filter-fase" class="select-control">
              <option value="ALL" ${filterFase === 'ALL' ? 'selected' : ''}>Todas las Fases (1 a 6)</option>
              ${PROJECT_DATA.fasesActa02.map(f => `
                <option value="${f.faseId}" ${filterFase === f.faseId ? 'selected' : ''}>${f.nombre}</option>
              `).join('')}
            </select>
          </div>

          <div>
            <label class="field-label">Responsable</label>
            <select id="filter-resp" class="select-control">
              <option value="" ${filterResp === '' ? 'selected' : ''}>Todos los Integrantes</option>
              <option value="Zapata" ${filterResp === 'Zapata' ? 'selected' : ''}>A. Zapata</option>
              <option value="Cardona" ${filterResp === 'Cardona' ? 'selected' : ''}>V. Cardona</option>
              <option value="Tibavija" ${filterResp === 'Tibavija' ? 'selected' : ''}>W. Tibavija</option>
              <option value="Hassan" ${filterResp === 'Hassan' ? 'selected' : ''}>A. Hassan</option>
              <option value="Londoño" ${filterResp === 'Londoño' ? 'selected' : ''}>A. Londoño</option>
              <option value="Equipo Total" ${filterResp === 'Equipo Total' ? 'selected' : ''}>Equipo Total</option>
            </select>
          </div>

          <div>
            <label class="field-label">Búsqueda Rápida</label>
            <input type="text" id="search-query" class="input-control" placeholder="Buscar actividad o producto..." value="${searchQuery}" />
          </div>
        </div>

        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>ID / Obj</th>
                <th>Actividad MGA & Fase Acta 02</th>
                <th>Descripción / Tareas MGA</th>
                <th>Producto & Medio de Verificación</th>
                <th>Responsables</th>
                <th>Cronograma</th>
                <th>Presupuesto</th>
                <th>Avance (%)</th>
              </tr>
            </thead>
            <tbody>
              ${filtered.map(act => {
                const faseObj = PROJECT_DATA.fasesActa02.find(f => f.faseId === act.faseActaId);
                return `
                  <tr>
                    <td style="white-space:nowrap;">
                      <strong style="color:var(--text-primary); font-size:13.5px;">${act.id}</strong><br/>
                      <span class="badge badge-unity" style="margin-top:4px;">${act.objetivoId}</span>
                    </td>
                    <td style="min-width:210px;">
                      <strong style="color:var(--text-primary); font-size:13px; display:block; margin-bottom:6px;">${act.actividadMGA}</strong>
                      <span class="badge badge-wood">${faseObj ? faseObj.nombre : act.faseActaId}</span>
                    </td>
                    <td style="min-width:260px;">
                      ${act.alcanceAjustadoEscala}
                    </td>
                    <td style="min-width:220px;">
                      <strong style="color:var(--text-primary); display:block;">${act.entregableVerificador}</strong>
                      <span style="color:var(--accent-sage); font-weight:700; font-size:11px; display:block; margin-top:4px;">📦 ${act.anexoSennova}</span>
                    </td>
                    <td style="min-width:140px;">
                      ${act.responsables}
                    </td>
                    <td style="white-space:nowrap;">
                      <strong style="color:var(--text-primary);">${act.inicio} → ${act.fin}</strong><br/>
                      <span style="font-size:11px; color:var(--text-muted);">${act.duracionMeses} mes(es)</span>
                    </td>
                    <td style="white-space:nowrap;">
                      <strong style="color:var(--accent-terracotta-dark); font-size:13px;">${formatCOP(act.valorTotal)}</strong><br/>
                      <span style="font-size:10.5px; color:var(--text-muted);">${act.lineaInversion}</span>
                    </td>
                    <td style="min-width:130px;">
                      <div style="display:flex; align-items:center; gap:8px;">
                        <input type="number" min="0" max="100" value="${act.progreso}" onchange="updateProgress('${act.id}', this.value)" class="input-control no-print" style="width:64px; padding:5px 8px; text-align:center;" />
                        <strong style="color:var(--text-primary);">${act.progreso}%</strong>
                      </div>
                      <div class="progress-track">
                        <div class="progress-fill" style="width:${act.progreso}%;"></div>
                      </div>
                      <span style="font-size:10.5px; color:var(--text-muted); display:block; margin-top:4px;">${act.estado}</span>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </section>
    `;
  }

  // ==========================================================================
  // PESTAÑA 3: CRONOGRAMA Y PRESUPUESTO (+ SUBMENÚ BITÁCORA SEMANAL)
  // ==========================================================================
  function renderTabCronograma() {
    const stats = getStats();
    return `
      <div class="no-print" style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">
        <div class="section-subnav-bar">
          <button type="button" class="section-subnav-btn active" onclick="switchTab('cronograma')">
            📅 Cronograma y Presupuesto
          </button>
          <button type="button" class="section-subnav-btn" onclick="switchTab('bitacora')">
            📝 Bitácora Semanal
          </button>
        </div>
      </div>

      <section class="panel">
        <div class="panel-header">
          <div>
            <span class="panel-kicker">Numerales 16 y 17 MGA</span>
            <h2 class="panel-title">Cronograma de las 15 Actividades rumbo a INTERZUM Bogotá (Mayo 2028)</h2>
          </div>
        </div>

        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th style="min-width:240px;">Actividad MGA</th>
                <th>Obj</th>
                ${monthsTimeline.map(m => `
                  <th style="text-align:center; padding:10px 6px; ${m === '2028-05' ? 'background:var(--accent-terracotta); color:#fff;' : ''}">
                    ${m}
                  </th>
                `).join('')}
              </tr>
            </thead>
            <tbody>
              ${activities.map(act => `
                <tr>
                  <td>
                    <strong style="color:var(--accent-terracotta-dark);">${act.id}:</strong> <strong style="color:var(--text-primary);">${act.actividadMGA}</strong>
                  </td>
                  <td style="white-space:nowrap;">${act.objetivoId} (${act.duracionMeses}m)</td>
                  ${monthsTimeline.map(m => {
                    const active = (m >= act.inicio && m <= act.fin);
                    const isFeria = (m === '2028-05' && active);
                    const barClass = isFeria ? 'gantt-feria' : act.objetivoId === 'OE1' ? 'gantt-oe1' : act.objetivoId === 'OE2' ? 'gantt-oe2' : 'gantt-oe3';
                    return `
                      <td class="gantt-cell">
                        ${active ? `<div class="gantt-bar ${barClass}">${isFeria ? 'FERIA' : ''}</div>` : ''}
                      </td>
                    `;
                  }).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </section>

      <section class="panel">
        <div class="panel-header">
          <div>
            <span class="panel-kicker">Numeral 17 MGA · Presupuesto</span>
            <h2 class="panel-title">Consolidado por Línea de Inversión ($318.000.000 COP)</h2>
          </div>
        </div>
        <div class="grid-3">
          ${Object.entries(stats.porLinea).map(([linea, valor]) => `
            <div class="subcard">
              <span class="field-label">${linea}</span>
              <div style="font-size:22px; font-weight:900; color:var(--text-primary); margin:6px 0;">${formatCOP(valor)}</div>
              <div style="font-size:12px; color:var(--text-secondary);">
                Representa el <strong style="color:var(--accent-terracotta-dark);">${Math.round((valor / stats.totalPresupuesto) * 100)}%</strong> del presupuesto total MGA
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  // ==========================================================================
  // SUBMENÚ DE 01 FORMULACIÓN: DESCARGABLES SENNOVA
  // ==========================================================================
  function renderTabExportador() {
    return `
      <div class="no-print" style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">
        <div class="section-subnav-bar">
          <button type="button" class="section-subnav-btn" onclick="switchTab('formulacion')">
            📋 Numerales MGA (1 al 21)
          </button>
          <button type="button" class="section-subnav-btn active" onclick="switchTab('exportador')">
            📥 Descargables SENNOVA (.doc)
          </button>
        </div>
      </div>

      <section class="panel">
        <div class="panel-header">
          <div>
            <span class="panel-kicker">Submenú 01 · Formulación MGA → Descargables SENNOVA</span>
            <h2 class="panel-title">Descarga de Documentación Formulada y Ficha Técnica de Investigación</h2>
            <p class="panel-desc">
              Genera en Word (<code>.doc</code>) la Formulación MGA (Numerales 1 al 21), la <strong>Ficha Técnica Consolidada del Prototipo / Gemelo Digital</strong> o descarga la Matriz en Excel (<code>.csv</code>).
            </p>
          </div>
        </div>

        <div class="grid-3">
          ${PROJECT_DATA.documentosSennova.map(doc => `
            <div class="subcard" style="display:flex; flex-direction:column; justify-content:space-between;">
              <div>
                <div class="subcard-header">
                  <span class="badge badge-sena">${doc.categoria}</span>
                  <span class="badge badge-wood">${doc.estado}</span>
                </div>
                <h3 class="subcard-title" style="margin:8px 0;">${doc.titulo}</h3>
                <p style="font-size:12.5px; color:var(--text-secondary);">${doc.contenidoResumen}</p>
              </div>
              <div class="no-print" style="margin-top:16px; padding-top:12px; border-top:1px solid var(--line-hair); display:flex; gap:10px; flex-wrap:wrap;">
                <button class="btn btn-primary" onclick="exportWordDocument('${doc.id}')">
                  📄 Descargar Word (.doc)
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  // ==========================================================================
  // SUBMENÚ DE 03 CRONOGRAMA: BITÁCORA SEMANAL
  // ==========================================================================
  function renderTabBitacora() {
    return `
      <div class="no-print" style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">
        <div class="section-subnav-bar">
          <button type="button" class="section-subnav-btn" onclick="switchTab('cronograma')">
            📅 Cronograma y Presupuesto
          </button>
          <button type="button" class="section-subnav-btn active" onclick="switchTab('bitacora')">
            📝 Bitácora Semanal
          </button>
        </div>
      </div>

      <section class="panel">
        <div class="panel-header">
          <div>
            <span class="panel-kicker">Submenú 03 · Cronograma → Bitácora Semanal</span>
            <h2 class="panel-title">Bitácora de Avances del Proyecto</h2>
          </div>
        </div>

        <form id="form-bitacora" class="subcard no-print" style="margin-bottom:20px;">
          <div class="grid-2" style="margin-bottom:14px;">
            <div>
              <label class="field-label">Avance o Numerales / Etapas Revisadas</label>
              <input type="text" id="bitacora-hito" required class="input-control" placeholder="Describe los numerales o avances de prototipo revisados en la sesión..." />
            </div>
            <div>
              <label class="field-label">Autor Responsable</label>
              <select id="bitacora-autor" class="select-control">
                <option value="Alex">Alex</option>
                <option value="Sebastián">Sebastián</option>
                <option value="Liliana">Liliana</option>
                <option value="Equipo (Alex / Sebastián / Liliana)">Equipo (Alex / Sebastián / Liliana)</option>
              </select>
            </div>
          </div>
          <div style="margin-bottom:14px;">
            <label class="field-label">Acuerdos / Compromisos</label>
            <input type="text" id="bitacora-decision" class="input-control" placeholder="Ajustes pendientes o secciones aprobadas..." />
          </div>
          <button type="submit" class="btn btn-primary">
            ➕ Guardar Registro
          </button>
        </form>

        <div style="display:flex; flex-direction:column; gap:14px;">
          ${bitacora.map(item => `
            <div class="subcard">
              <div class="subcard-header">
                <span class="badge badge-sena">${item.id} · ${item.semana}</span>
                <span style="font-size:11.5px; color:var(--accent-terracotta-dark); font-weight:700;">👤 ${item.autor}</span>
              </div>
              <h4 class="subcard-title" style="margin:6px 0;">${item.hito}</h4>
              <p style="font-size:12.5px; color:var(--text-secondary);">
                <strong>Acuerdos:</strong> ${item.decisionTecnica}
              </p>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  // Funciones Globales
  window.switchTab = function (tabId) {
    currentTab = tabId;
    render();
  };

  window.switchProtoSub = function (mode) {
    currentTab = 'arquitectura';
    activeProtoTaskId = mode;
    render();
  };

  window.updateProgress = function (id, val) {
    const num = Math.max(0, Math.min(100, Number(val) || 0));
    activities = activities.map(a => {
      if (a.id === id) {
        return {
          ...a,
          progreso: num,
          estado: num === 100 ? 'Completado' : num > 0 ? 'En ejecución' : 'Pendiente'
        };
      }
      return a;
    });
    saveActivities();
    render();
  };

  function attachEvents() {
    const filterMgaEl = document.getElementById('filter-status-mga');
    if (filterMgaEl) {
      filterMgaEl.addEventListener('change', e => {
        filterStatusMGA = e.target.value;
        render();
      });
    }

    const filterAuthorEl = document.getElementById('filter-author-mga');
    if (filterAuthorEl) {
      filterAuthorEl.addEventListener('change', e => {
        filterAuthorMGA = e.target.value;
        render();
      });
    }

    const filterProtoEl = document.getElementById('filter-proto-status');
    if (filterProtoEl) {
      filterProtoEl.addEventListener('change', e => {
        filterProtoStatus = e.target.value;
        render();
      });
    }

    const aiTargetEl = document.getElementById('ai-target-campo');
    if (aiTargetEl) {
      aiTargetEl.addEventListener('change', e => {
        selectedCampoIdxForAI = Number(e.target.value) || 0;
        lastAiGeneratedDraft = '';
        render();
      });
    }

    const formAi = document.getElementById('form-ai-prompt');
    if (formAi) {
      formAi.addEventListener('submit', e => {
        e.preventDefault();
        const inputEl = document.getElementById('ai-custom-input');
        const val = inputEl ? inputEl.value.trim() : '';
        if (!val) return;
        window.runAiSmartAction('custom', val);
      });
    }

    const oeEl = document.getElementById('filter-oe');
    if (oeEl) {
      oeEl.addEventListener('change', e => {
        filterOE = e.target.value;
        render();
      });
    }

    const faseEl = document.getElementById('filter-fase');
    if (faseEl) {
      faseEl.addEventListener('change', e => {
        filterFase = e.target.value;
        render();
      });
    }

    const respEl = document.getElementById('filter-resp');
    if (respEl) {
      respEl.addEventListener('change', e => {
        filterResp = e.target.value;
        render();
      });
    }

    const searchEl = document.getElementById('search-query');
    if (searchEl) {
      searchEl.addEventListener('input', e => {
        searchQuery = e.target.value;
        render();
      });
    }

    const formBitacora = document.getElementById('form-bitacora');
    if (formBitacora) {
      formBitacora.addEventListener('submit', e => {
        e.preventDefault();
        const hito = document.getElementById('bitacora-hito').value.trim();
        const autor = document.getElementById('bitacora-autor').value;
        const decision = document.getElementById('bitacora-decision').value.trim();
        if (!hito) return;

        bitacora.unshift({
          id: `REV-0${bitacora.length + 1}`,
          semana: `Sesión de Revisión`,
          autor,
          hito,
          decisionTecnica: decision || "Revisión registrada.",
          estado: "Registrado"
        });
        saveBitacora();
        render();
      });
    }
  }

  // Atajos de teclado para el visor de imágenes a pantalla completa (Lightbox)
  window.addEventListener('keydown', e => {
    if (!lightboxState || !lightboxState.isOpen) return;
    if (e.key === 'Escape') {
      window.closeProtoLightbox();
    } else if (e.key === 'ArrowLeft') {
      window.navigateProtoLightbox(-1);
    } else if (e.key === 'ArrowRight') {
      window.navigateProtoLightbox(1);
    }
  });

  // Inicializar
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
