---
tipo: flujo-mensual
mes: "{{date:YYYY-MM}}"
ingreso-real: 0
gasto-total: 0
balance: 0
tasa-ahorro: 0
---

# 📊 Flujo Mensual - {{date:MMMM YYYY}}

> [!info] Estado del Mes
> **Ingreso Real**: $0 | **Gastos**: $0 | **Balance**: $0 | **Tasa Ahorro**: 0%

---

## 🏦 Distribución a Cubetas

**Ingreso Real Este Mes**: $<span class="ingreso-real">0</span>
```dataviewjs
// Obtener el ingreso del mes actual desde el frontmatter
const ingresoReal = dv.current()["ingreso-real"] || 0;

// Definir las cubetas con sus porcentajes
const cubetas = [
    { nombre: "💳 Operativa TC", actual: 29.5, meta: 22, link: "💳 Operativa TC" },
    { nombre: "📈 Ahorro/Inversión", actual: 22.4, meta: 26, link: "📈 Ahorro Inversión" },
    { nombre: "🛡️ Fondo Emergencia", actual: 10, meta: 10, link: "🛡️ Fondo Emergencia" },
    { nombre: "🎯 Presupuesto Libertad", actual: 9.5, meta: 8, link: "🎯 Presupuesto Libertad" },
    { nombre: "🔧 Mantenimiento", actual: 4, meta: 5, link: "🔧 Mantenimiento Reposición" },
    { nombre: "🎁 Dar & Regalos", actual: 3, meta: 3, link: "🎁 Dar Regalos" },
    { nombre: "✈️ Vacaciones", actual: 3, meta: 3, link: "✈️ Vacaciones" },
    { nombre: "⚡ Margen Estratégico", actual: 3, meta: 3, link: "⚡ Margen Estratégico" }
];

// Crear tabla
let tabla = "| Cubeta | % Actual | % Meta | Monto Asignado | Link |\n";
tabla += "|--------|----------|--------|----------------|------|\n";

let totalAsignado = 0;

for (let cubeta of cubetas) {
    const montoAsignado = Math.round((cubeta.actual / 100) * ingresoReal);
    totalAsignado += montoAsignado;
    
    const estado = cubeta.actual <= cubeta.meta ? '✅' : 
                   cubeta.actual <= cubeta.meta * 1.1 ? '🟡' : '🔴';
    
    tabla += `| ${cubeta.nombre} | ${cubeta.actual}% ${estado} | ${cubeta.meta}% | $${montoAsignado.toLocaleString('es-CL')} | [[${cubeta.link}]] |\n`;
}

tabla += `| **TOTAL** | **84.4%** | **80%** | **$${totalAsignado.toLocaleString('es-CL')}** | |\n`;

dv.paragraph(tabla);

// Alertas automáticas
if (ingresoReal === 0) {
    dv.paragraph("> ⚠️ **Actualiza el campo `ingreso-real` en el frontmatter** para calcular los montos.");
} else {
    const resto = ingresoReal - totalAsignado;
    if (resto > 0) {
        dv.paragraph(`> ✅ Distribuidos: $${totalAsignado.toLocaleString('es-CL')} | Resto sin asignar: $${resto.toLocaleString('es-CL')} (${Math.round((resto/ingresoReal)*100)}%)`);
    }
}
```

> [!warning] Ajustes Pendientes
> - Reducir Operativa TC de 29.5% a 22% (Operación Limpieza)
> - Aumentar Ahorro/Inversión de 22.4% a 26%
> - Ajustar Mantenimiento de 4% a 5%
> - Reducir Libertad de 9.5% a 8%

---

## 💵 Ingresos

| Fecha | Descripción | Categoría | Monto | Cuenta | Notas |
|-------|-------------|-----------|-------|--------|-------|


**Total Ingresos**: $0

---

## 💸 Gastos Efectivo/Débito

| Fecha | Descripción | Categoría | Monto | Cuenta | Cubeta |
|-------|-------------|-----------|-------|--------|--------|


**Total Gastos**: $0

---
## 📊 Resumen Automático
```dataviewjs
const ingresoReal = dv.current()["ingreso-real"] || 0;
const gastoTotal = dv.current()["gasto-total"] || 0;
const balance = ingresoReal - gastoTotal;
const tasaAhorro = ingresoReal > 0 ? Math.round((balance / ingresoReal) * 100) : 0;

// Actualizar automáticamente el frontmatter
const file = dv.current().file;
await dv.io.update(file.path, (content) => {
    content = content.replace(/balance: \d+/, `balance: ${balance}`);
    content = content.replace(/tasa-ahorro: \d+/, `tasa-ahorro: ${tasaAhorro}`);
    return content;
});

// Mostrar resumen visual
let html = '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0;">';

html += `
<div style="background: var(--background-secondary); padding: 20px; border-radius: 10px; text-align: center;">
    <div style="font-size: 14px; color: var(--text-muted);">💵 Ingresos</div>
    <div style="font-size: 28px; font-weight: bold; color: var(--text-success);">$${ingresoReal.toLocaleString('es-CL')}</div>
</div>

<div style="background: var(--background-secondary); padding: 20px; border-radius: 10px; text-align: center;">
    <div style="font-size: 14px; color: var(--text-muted);">💸 Gastos</div>
    <div style="font-size: 28px; font-weight: bold; color: var(--text-error);">$${gastoTotal.toLocaleString('es-CL')}</div>
</div>

<div style="background: var(--background-secondary); padding: 20px; border-radius: 10px; text-align: center;">
    <div style="font-size: 14px; color: var(--text-muted);">💰 Balance</div>
    <div style="font-size: 28px; font-weight: bold; color: ${balance >= 0 ? 'var(--text-success)' : 'var(--text-error)'};">$${balance.toLocaleString('es-CL')}</div>
</div>

<div style="background: var(--background-secondary); padding: 20px; border-radius: 10px; text-align: center;">
    <div style="font-size: 14px; color: var(--text-muted);">📈 Tasa Ahorro</div>
    <div style="font-size: 28px; font-weight: bold; color: ${tasaAhorro >= 30 ? 'var(--text-success)' : 'var(--text-warning)'};">${tasaAhorro}%</div>
</div>
`;

html += '</div>';

dv.paragraph(html);
```

---
## 💳 Gastos Tarjeta de Crédito

Ver detalle completo en: [[Finanzas/05. Control TC/Ciclo Actual]]

**Resumen TC Este Mes**:
- Total gastado: $0
- A pagar próximo mes: $0
- Fecha de pago: 

---

## 📊 Análisis por Categoría
```dataview
TABLE sum(rows.Monto) as "Total"
FROM ""
WHERE contains(file.path, "{{date:YYYY-MM}}")
GROUP BY Categoría
SORT sum(rows.Monto) DESC
```

---

## 📝 Notas y Aprendizajes del Mes

### ✅ Logros


### ⚠️ Desviaciones


### 💡 Insights


### 🎯 Ajustes para Próximo Mes


---

## 🔗 Links Relacionados

- [[📊 Panel Principal]]
- [[Finanzas/06. Análisis/Evolución Patrimonial]]
- Mes anterior: [[{{date-30d:YYYY-MM}}]]
- Próximo mes: [[{{date+30d:YYYY-MM}}]]