---
tipo: cubeta
nombre: "Presupuesto Libertad"
porcentaje-actual: 9.5
porcentaje-meta: 8
monto-asignado-mes: 0
gastado-mes: 0
disponible: 0
producto-asociado: "[[Mercado Pago]]"
---

# 🎯 Presupuesto Libertad

> [!info] Estado Actual
> **% Asignado**: 9.5% (Meta: 8%) | **Este Mes**: $0 | **Disponible**: $0

> [!quote] Filosofía
> "Dinero para gastar sin culpa" - Morgan Housel

---

## 🎯 Propósito de Esta Cubeta

Este es mi **presupuesto para disfrutar la vida SIN culpa**:
- Salidas a comer/beber
- Ropa y accesorios
- Hobbies y entretenimiento
- Compras personales "porque quiero"
- Gustos y caprichos

**La regla**: Una vez asignado, puedo gastarlo en lo que quiera sin justificarme.

---

## 📊 Configuración

| Parámetro | Valor Actual | Valor Meta |
|-----------|--------------|------------|
| % del Ingreso | 9.5% | 8% |
| Producto | Mercado Pago | |
| Estrategia | Tarjeta Mercado Pago para trackear automático | |
| Frecuencia | Transferencia al inicio del mes | |

---

## 💰 Movimientos del Mes

| Fecha | Descripción | Monto | Balance |
|-------|-------------|-------|---------|


---

## 📊 Categorías Típicas
```dataview
TABLE sum(rows.Monto) as "Total Gastado"
WHERE contains(file.path, "Libertad")
GROUP BY Categoría
SORT sum(rows.Monto) DESC
```

---

## 📝 Reglas y Lineamientos

### ✅ Usar para:
- Restaurantes, cafés, bares
- Ropa y accesorios que me gusten
- Libros, cursos que me interesen
- Salidas con amigos/familia
- Hobbies (ej: fotografía, deportes)
- Streaming (Netflix, etc.)

### ❌ NO usar para:
- Gastos esenciales (eso va a Operativa)
- Reparaciones (eso va a Mantenimiento)
- Regalos (eso va a Dar & Regalos)

### 💡 Tips:
- Si llega a $0 antes de fin de mes → esperar al próximo mes
- No "pedir prestado" de otras cubetas
- Celebrar cuando quede saldo positivo (ahorro extra)

---

## 🎯 Plan de Ajuste

**Objetivo**: Reducir de 9.5% a 8% (liberar 1.5 puntos)

**Estrategia**:
- Identificar gastos recurrentes que podrían optimizarse
- Ser más consciente en salidas a comer fuera
- Usar Mercado Pago para tracking visual del gasto

**Meta**: Una vez optimizado, ese 1.5% va a [[📈 Ahorro Inversión]]

---

## 🔗 Links

- [[📊 Panel Principal]]
- [[Finanzas/04. Productos Financieros/Mercado Pago]]