---
tipo: analisis
---

# 📈 Evolución Patrimonial

## 💰 Patrimonio Neto Actual
```dataviewjs
const productos = dv.pages('"Finanzas/04. Productos Financieros"');
let totalActivos = 0;
let totalPasivos = 0;

for (let prod of productos) {
    const saldo = prod["saldo-actual"] || 0;
    const tipo = prod["tipo"] || "activo";
    
    if (tipo === "activo") {
        totalActivos += saldo;
    } else if (tipo === "pasivo") {
        totalPasivos += saldo;
    }
}

const patrimonioNeto = totalActivos - totalPasivos;

dv.header(2, `Patrimonio Neto: $${patrimonioNeto.toLocaleString('es-CL')}`);
dv.paragraph(`**Activos**: $${totalActivos.toLocaleString('es-CL')}`);
dv.paragraph(`**Pasivos**: $${totalPasivos.toLocaleString('es-CL')}`);
```

---

## 📊 Distribución de Activos

| Producto | Saldo | % del Total |
|----------|-------|-------------|
| Fintual | $4,500,000 | 75% |
| MACH | $1,200,000 | 20% |
| Mercado Pago | $85,000 | 1.4% |
| Tenpo | $63,000 | 1% |
| Banco de Chile | $150,000 | 2.5% |
| **TOTAL** | **$6,000,000** | **100%** |

---

## 📈 Evolución Mensual

| Mes | Patrimonio | Cambio | % Crecimiento |
|-----|------------|--------|---------------|
| 2025-02 | $6,000,000 | - | - |
| 2025-01 | $5,850,000 | +$150,000 | +2.6% |
| 2024-12 | $5,700,000 | +$180,000 | +3.3% |

---

## 🎯 Proyección a 12 Meses

**Supuestos**:
- Ingreso promedio: $900k
- Tasa de ahorro: 30%
- Rentabilidad inversiones: 8% anual

**Proyección**:
- Aporte anual: $3.24M
- Ganancias por rentabilidad: $360k
- **Patrimonio estimado en 12 meses**: $9.6M

---

## 📊 Gráfico de Crecimiento
```chart
type: line
labels: [Ene, Feb, Mar, Abr, May, Jun, Jul, Ago, Sep, Oct, Nov, Dic]
series:
  - title: Patrimonio
    data: [5700000, 5850000, 6000000, 6200000, 6400000, 6600000, 6850000, 7100000, 7350000, 7600000, 7900000, 8200000]
  - title: Meta Lineal
    data: [5700000, 5970000, 6240000, 6510000, 6780000, 7050000, 7320000, 7590000, 7860000, 8130000, 8400000, 8670000]
tension: 0.3
width: 100%
fill: true
```

---

## 💡 Insights

### ✅ Fortalezas
- Tasa de ahorro alta (~30%)
- Inversiones diversificadas
- Sistema de cubetas funcionando

### 🎯 Oportunidades
- Completar Fondo Emergencia (+$100k)
- Limpiar deuda TC
- Aumentar % de ahorro cuando se libere flujo

### ⚠️ Riesgos
- Renta variable (mitigado con Fondo Emergencia)
- Concentración en mercado de acciones (OK por horizonte largo)

---

## 🔗 Links

- [[📊 Panel Principal]]