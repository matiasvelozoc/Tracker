````markdown
---
tipo: producto
nombre: "Fintual"
categoria: inversiones
tipo: activo
saldo-actual: 4500000
---

# 📈 Fintual

## 📊 Información General

| Atributo | Valor |
|----------|-------|
| **Tipo** | Plataforma de Inversiones |
| **Saldo Total** | $4,500,000 |
| **Rentabilidad Anual** | ~7-10% |

---

## 💼 Mis Portafolios

### 1. APV (Ahorro Previsional Voluntario)
- **Monto**: $X
- **Objetivo**: Jubilación + beneficio tributario
- **Portafolio**: Acciones (agresivo)
- **Aporte**: Automático mensual

### 2. Pie de Casa
- **Monto**: $3,500,000
- **Objetivo**: [[🏠 Pie Casa 6M]]
- **Portafolio**: Acciones
- **Horizonte**: 2-3 años

### 3. ETFs
- **Monto**: $500,000
- **Composición**:
  - 70% VOO (S&P 500): $350,000
  - 30% VXUS (Mundo ex-USA): $150,000
- **Objetivo**: [[📈 ETFs Post-Metas]]
- **Horizonte**: 20-30 años

---

## 📈 Rentabilidad Histórica
```dataview
TABLE rentabilidad, fecha
FROM "Finanzas/06. Análisis"
WHERE contains(file.name, "Fintual")
SORT fecha DESC
LIMIT 12
```

---

## 🎯 Estrategia

- **APV**: Maximar beneficio tributario, reinvertir dividendos
- **Pie Casa**: Agresivo mientras tengo tiempo, bajar riesgo cerca de 2026
- **ETFs**: 100% pasivo, buy & hold, DCA mensual

---

## 💡 Tips

- Revisar solo 1 vez al mes (evitar pánico por volatilidad)
- No vender en caídas
- Rebalancear 1 vez al año
- Aprovechar caídas para aportar más

---

## 🔗 Links

- [[📊 Panel Principal]]
- [[📈 Ahorro Inversión]]
- [[🏠 Pie Casa 6M]]
- [[📈 ETFs Post-Metas]]
````