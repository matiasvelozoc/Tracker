---
month: <% tp.date.now("YYYY-MM") %>
type: flujo_mensual
ingresos:
  - Sueldo fijo: 250000
  - Sueldo variable: 700000
egresos:
  - Tarjeta crédito: 350000
  - Alimentación: 100000
  - Transporte: 50000
ahorros:
  - Vivienda: 100000
  - APV: 50000
  - ETF: 50000
  - Emergencia: 50000
---

# 🧾 Flujo Financiero - <% tp.date.now("MMMM YYYY") %>

### 💰 Totales

```dataviewjs
const ingresos = dv.current().ingresos.map(x => Object.values(x)[0]).reduce((a,b)=>a+b,0)
const egresos = dv.current().egresos.map(x => Object.values(x)[0]).reduce((a,b)=>a+b,0)
const ahorros = dv.current().ahorros.map(x => Object.values(x)[0]).reduce((a,b)=>a+b,0)
const tasa = ((ahorros/ingresos)*100).toFixed(1)
dv.paragraph(`**Ingresos:** ${ingresos.toLocaleString()} CLP  
**Gastos:** ${egresos.toLocaleString()} CLP  
**Ahorros:** ${ahorros.toLocaleString()} CLP  
**Tasa de ahorro:** ${tasa}%`)
```

---

### 📊 Distribución (detalle)

```dataview
TABLE WITHOUT ID
  choice(ingresos) as "Ingresos",
  choice(egresos) as "Gastos",
  choice(ahorros) as "Ahorros"
FROM ""
WHERE type = "flujo_mensual" AND month = this.file.name
```
