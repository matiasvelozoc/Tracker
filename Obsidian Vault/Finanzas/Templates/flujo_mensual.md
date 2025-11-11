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

**Ingreso Base para Cálculo**: $0 
| Cubeta | % Actual | % Meta | Monto Asignado | Link |
|--------|----------|--------|----------------|------|
| 💳 Operativa TC | 29.5% | 22% | $0 | [[💳 Operativa TC]] | 
| 📈 Ahorro/Inversión | 22.4% | 26% | $0 | [[📈 Ahorro Inversión]] | 
| 🛡️ Fondo Emergencia | 10% | 10% | $0 | [[🛡️ Fondo Emergencia]] | 
| 🎯 Presupuesto Libertad | 9.5% | 8% | $0 | [[🎯 Presupuesto Libertad]] | 
| 🔧 Mantenimiento | 4% | 5% | $0 | [[🔧 Mantenimiento Reposición]] | 
| 🎁 Dar & Regalos | 3% | 3% | $0 | [[🎁 Dar Regalos]] | 
| ✈️ Vacaciones | 3% | 3% | $0 | [[✈️ Vacaciones]] | 
| ⚡ Margen Estratégico | 3% | 3% | $0 | [[⚡ Margen Estratégico]] | 
| **TOTAL** | **84.4%** | **80%** | **$0** | 

| > [!warning] Ajustes Pendientes 
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