---
cssclasses: dashboard
---
```dataviewjs
// Fecha y hora actual
const ahora = moment();
dv.header(1, "💰 Sistema Financiero - " + ahora.format("MMMM YYYY"));
dv.paragraph("📅 Hoy: " + ahora.format("dddd, D [de] MMMM YYYY") + " | ⏰ " + ahora.format("HH:mm"));
```

---

## 🎯 OPERACIÓN LIMPIEZA TC - Estado Crítico
```dataviewjs
const meta = dv.page("Finanzas/03. Metas/🔥 Operación Limpieza TC");
if (meta) {
    const progreso = Math.round((meta["monto-pagado"] / meta["deuda-inicial"]) * 100);
    const faltante = meta["deuda-inicial"] - meta["monto-pagado"];
    const diasRestantes = moment(meta["fecha-objetivo"]).diff(moment(), 'days');
    
    dv.paragraph(`
### 🔥 Deuda TC: $${faltante.toLocaleString('es-CL')} restantes
**Progreso**: ${progreso}% completado
**Tiempo**: ${diasRestantes} días para cumplir meta
**Objetivo**: ${meta["fecha-objetivo"]}
    `);
    
    // Barra de progreso visual
    const barraCompleta = "█".repeat(Math.floor(progreso/5));
    const barraVacia = "░".repeat(20 - Math.floor(progreso/5));
    dv.paragraph(`\`${barraCompleta}${barraVacia}\` ${progreso}%`);
} else {
    dv.paragraph("⚠️ Crea el archivo de meta 'Operación Limpieza TC'");
}
```

---

## 📊 RESUMEN MES ACTUAL
```dataviewjs
const mesActual = moment().format("YYYY-MM");
const flujo = dv.page(`Finanzas/01. Flujo Mensual/${mesActual}`);

if (flujo) {
    const ingresos = flujo["ingreso-real"] || 0;
    const gastos = flujo["gasto-total"] || 0;
    const balance = ingresos - gastos;
    const tasa_ahorro = ingresos > 0 ? Math.round((balance / ingresos) * 100) : 0;
    
    dv.paragraph(`
| Concepto | Monto | Estado |
|----------|-------|--------|
| 💵 **Ingresos** | $${ingresos.toLocaleString('es-CL')} | ${ingresos >= 800000 ? '✅' : '⚠️'} |
| 💸 **Gastos** | $${gastos.toLocaleString('es-CL')} | ${gastos < ingresos ? '✅' : '🔴'} |
| 💰 **Balance** | $${balance.toLocaleString('es-CL')} | ${balance > 0 ? '✅' : '🔴'} |
| 📈 **Tasa Ahorro** | ${tasa_ahorro}% | ${tasa_ahorro >= 30 ? '✅' : tasa_ahorro >= 20 ? '🟡' : '🔴'} |
    `);
} else {
    dv.paragraph("⚠️ Crea el archivo del mes actual: `" + mesActual + ".md`");
}
```

---

## 🏦 SISTEMA DE CUBETAS - Distribución Actual vs Meta
```dataviewjs
const cubetas = dv.pages('"Finanzas/02. Cubetas"').sort(c => c["porcentaje-meta"], 'desc');

if (cubetas.length > 0) {
    const mesActual = moment().format("YYYY-MM");
    const flujo = dv.page(`Finanzas/01. Flujo Mensual/${mesActual}`);
    const ingresoBase = flujo ? flujo["ingreso-real"] : 900000; // Default promedio
    
    let tabla = "| Cubeta | Actual | Meta | Monto Asignado | Usado | Disponible | Estado |\n";
    tabla += "|--------|--------|------|----------------|-------|------------|--------|\n";
    
    for (let cubeta of cubetas) {
        const porcActual = cubeta["porcentaje-actual"] || 0;
        const porcMeta = cubeta["porcentaje-meta"] || 0;
        const montoAsignado = Math.round((porcActual / 100) * ingresoBase);
        const usado = cubeta["gastado-mes"] || 0;
        const disponible = montoAsignado - usado;
        
        const estado = porcActual <= porcMeta ? '✅' : 
                      porcActual <= porcMeta * 1.1 ? '🟡' : '🔴';
        
        const emoji = cubeta.file.name.split(' ')[0]; // Extrae emoji del nombre
        const nombre = cubeta.file.name.replace(emoji, '').trim();
        
        tabla += `| ${emoji} [[${cubeta.file.name}\\|${nombre}]] | ${porcActual}% | ${porcMeta}% | $${montoAsignado.toLocaleString('es-CL')} | $${usado.toLocaleString('es-CL')} | $${disponible.toLocaleString('es-CL')} | ${estado} |\n`;
    }
    
    dv.paragraph(tabla);
} else {
    dv.paragraph("⚠️ No hay cubetas creadas. [[#Crear Cubetas]]");
}
```

---

## 🎯 METAS ACTIVAS - Roadmap
```dataviewjs
const metas = dv.pages('"Finanzas/03. Metas"')
    .where(m => m.estado === "activa")
    .sort(m => m.prioridad, 'asc');

if (metas.length > 0) {
    for (let meta of metas) {
        const progreso = Math.round((meta["monto-actual"] / meta["monto-objetivo"]) * 100);
        const faltante = meta["monto-objetivo"] - meta["monto-actual"];
        
        const emoji = progreso >= 90 ? '🎉' : progreso >= 75 ? '🔥' : progreso >= 50 ? '⚡' : '🎯';
        
        dv.paragraph(`### ${emoji} [[${meta.file.name}]]`);
        dv.paragraph(`**Objetivo**: $${meta["monto-objetivo"].toLocaleString('es-CL')} | **Actual**: $${meta["monto-actual"].toLocaleString('es-CL')} | **Falta**: $${faltante.toLocaleString('es-CL')}`);
        
        const barraCompleta = "█".repeat(Math.floor(progreso/5));
        const barraVacia = "░".repeat(20 - Math.floor(progreso/5));
        dv.paragraph(`\`${barraCompleta}${barraVacia}\` ${progreso}%`);
        dv.paragraph("---");
    }
} else {
    dv.paragraph("✅ No hay metas activas");
}
```

---

## 💳 CONTROL TARJETA DE CRÉDITO
```dataviewjs
const cicloActual = dv.page("Finanzas/05. Control TC/Ciclo Actual");

if (cicloActual) {
    const gastadoMes = cicloActual["total-gastado"] || 0;
    const aPagar = cicloActual["monto-a-pagar"] || 0;
    const fechaPago = cicloActual["fecha-pago"] || "No definida";
    const diasPago = moment(fechaPago).diff(moment(), 'days');
    
    const alerta = diasPago <= 7 ? '🔴' : diasPago <= 14 ? '🟡' : '✅';
    
    dv.paragraph(`
### 💳 Ciclo de Facturación Actual
| Concepto | Valor |
|----------|-------|
| **Gastado este mes** | $${gastadoMes.toLocaleString('es-CL')} |
| **A pagar próximo** | $${aPagar.toLocaleString('es-CL')} |
| **Fecha de pago** | ${fechaPago} (${diasPago} días) ${alerta} |
| **Estado** | ${aPagar === 0 ? '✅ Limpia' : aPagar > 300000 ? '🔴 Alta' : '🟡 Normal'} |
    `);
} else {
    dv.paragraph("⚠️ Crea el archivo 'Ciclo Actual' en Control TC");
}
```

---

## 📈 PATRIMONIO NETO
```dataviewjs
const productos = dv.pages('"Finanzas/04. Productos Financieros"');

if (productos.length > 0) {
    let totalActivos = 0;
    let totalPasivos = 0;
    
    let tablaActivos = "### 💰 Activos\n| Producto | Saldo |\n|----------|-------|\n";
    let tablaPasivos = "### 💸 Pasivos\n| Producto | Saldo |\n|----------|-------|\n";
    
    for (let prod of productos) {
        const saldo = prod["saldo-actual"] || 0;
        const tipo = prod["tipo"] || "activo";
        
        if (tipo === "activo" && saldo > 0) {
            totalActivos += saldo;
            tablaActivos += `| [[${prod.file.name}]] | $${saldo.toLocaleString('es-CL')} |\n`;
        } else if (tipo === "pasivo" && saldo > 0) {
            totalPasivos += saldo;
            tablaPasivos += `| [[${prod.file.name}]] | $${saldo.toLocaleString('es-CL')} |\n`;
        }
    }
    
    const patrimonioNeto = totalActivos - totalPasivos;
    
    dv.paragraph(tablaActivos);
    dv.paragraph(`**Total Activos**: $${totalActivos.toLocaleString('es-CL')}`);
    dv.paragraph("---");
    dv.paragraph(tablaPasivos);
    dv.paragraph(`**Total Pasivos**: $${totalPasivos.toLocaleString('es-CL')}`);
    dv.paragraph("---");
    dv.paragraph(`# 🏆 Patrimonio Neto: $${patrimonioNeto.toLocaleString('es-CL')}`);
} else {
    dv.paragraph("⚠️ No hay productos financieros registrados");
}
```

---
## 📊 Evolución Últimos 6 Meses
```chart
type: line
labels: [Ago, Sep, Oct, Nov, Dic, Ene]
series:
  - title: Ingresos
    data: [900000, 850000, 1000000, 920000, 880000, 950000]
  - title: Gastos
    data: [650000, 700000, 720000, 680000, 720000, 690000]
tension: 0.2
width: 100%
labelColors: true
fill: true
```

---

## 🚀 ACCIONES RÁPIDAS

- [[#Registrar Ingreso]] | [[#Registrar Gasto]] | [[#Gasto TC]]
- [[Finanzas/01. Flujo Mensual/{{date:YYYY-MM}}|Ver Flujo del Mes]]
- [[Finanzas/06. Análisis/Evolución Patrimonial|Ver Análisis Patrimonial]]

---

## ⚡ INSIGHTS Y ALERTAS
```dataviewjs
const mesActual = moment().format("YYYY-MM");
const flujo = dv.page(`Finanzas/01. Flujo Mensual/${mesActual}`);
const cicloTC = dv.page("Finanzas/05. Control TC/Ciclo Actual");

let alertas = [];

// Alerta: Gasto TC alto
if (cicloTC && flujo) {
    const gastoTC = cicloTC["total-gastado"] || 0;
    const ingreso = flujo["ingreso-real"] || 900000;
    if (gastoTC > ingreso * 0.35) {
        alertas.push("🔴 **TC MUY ALTA**: Gastos en TC superan el 35% del ingreso ($" + gastoTC.toLocaleString('es-CL') + ")");
    }
}

// Alerta: Tasa de ahorro baja
if (flujo) {
    const ingresos = flujo["ingreso-real"] || 0;
    const gastos = flujo["gasto-total"] || 0;
    const tasaAhorro = ingresos > 0 ? ((ingresos - gastos) / ingresos) * 100 : 0;
    
    if (tasaAhorro < 20) {
        alertas.push("⚠️ **AHORRO BAJO**: Tasa de ahorro bajo meta (actual: " + Math.round(tasaAhorro) + "%)");
    }
}

// Alerta: Fondo de emergencia cerca
const fondoEmergencia = dv.page("Finanzas/03. Metas/✅ Fondo Emergencia 1.3M");
if (fondoEmergencia) {
    const progreso = (fondoEmergencia["monto-actual"] / fondoEmergencia["monto-objetivo"]) * 100;
    if (progreso >= 95) {
        alertas.push("🎉 **FONDO CASI COMPLETO**: Solo falta el " + Math.round(100-progreso) + "% para completar tu Fondo de Emergencia!");
    }
}

// Mostrar alertas
if (alertas.length > 0) {
    dv.header(3, "🔔 Alertas Activas");
    dv.list(alertas);
} else {
    dv.paragraph("✅ **Todo bajo control** - Sin alertas activas");
}
```

---

_Última actualización: `= date(now)`_