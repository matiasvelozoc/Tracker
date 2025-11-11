---
tipo: cubeta
nombre: "Operativa TC"
porcentaje-actual: 29.5
porcentaje-meta: 22
monto-asignado-mes: 0
gastado-mes: 0
disponible: 0
producto-asociado: "[[Tarjeta de Crédito]]"
---

# 💳 Operativa TC

> [!info] Estado Actual
> **% Asignado**: 29.5% (Meta: 22%) | **Este Mes**: $0 | **Usado**: $0 | **Disponible**: $0

> [!warning] En Proceso de Reducción
> Estamos en **Operación Limpieza** para bajar del 29.5% al 22%. Se espera completar en 3 meses.

---

## 🎯 Propósito de Esta Cubeta

Esta cubeta cubre todos los **gastos operativos y esenciales** que realizo con tarjeta de crédito:
- Supermercado
- Farmacia
- Transporte (Uber, combustible)
- Servicios básicos recurrentes
- Suscripciones esenciales

**Filosofía**: Uso la TC para aprovechar protección y cashback, pero SIEMPRE pago el total antes del vencimiento (5-6 de cada mes).

---

## 📊 Configuración

| Parámetro | Valor Actual | Valor Meta |
|-----------|--------------|------------|
| % del Ingreso | 29.5% | 22% |
| Producto Financiero | Tarjeta de Crédito Banco de Chile | |
| Prioridad | Crítica | |
| Automatización | PAT configurado para pago total | |

---

## 💰 Movimientos del Mes Actual

Ver detalle completo en: [[Finanzas/05. Control TC/Ciclo Actual]]

---

## 📈 Histórico de Asignaciones
```dataview
TABLE 
  ingreso-real as "Ingreso",
  porcentaje-actual as "%",
  monto-asignado-mes as "Asignado",
  gastado-mes as "Gastado"
FROM "Finanzas/01. Flujo Mensual"
SORT file.name DESC
LIMIT 6
```

---

## 📝 Reglas y Lineamientos

### ✅ Usar para:
- Supermercado y alimentación del hogar
- Farmacia y salud esencial
- Transporte necesario
- Servicios básicos (luz, agua, internet, teléfono)
- Suscripciones esenciales (Spotify, etc.)

### ❌ NO usar para:
- Salidas a comer fuera (eso va a Libertad)
- Compras impulsivas
- Ropa no esencial (eso va a Libertad)
- Electrónicos o tecnología (planificar con Mantenimiento)

### 💡 Tips:
- Revisar estado de TC cada semana
- Usar la app del banco para alertas de gastos
- Si supera el 25% del ingreso → revisar qué está pasando

---

## 🎯 Plan de Reducción

**Objetivo**: Bajar de 29.5% a 22% (reducción de 7.5 puntos)

**Estrategia**:
1. ✅ Identificar gastos "fantasma" en TC (cursos, ropa innecesaria)
2. 🔄 Pagar deudas menores (Operación Limpieza - 3 meses)
3. ⏳ Transferir gradualmente gastos opcionales a cubeta Libertad
4. ⏳ Optimizar compras de supermercado (comprar por mayor, planificar)

---

## 🔗 Links

- [[📊 Panel Principal]]
- [[Finanzas/04. Productos Financieros/Tarjeta de Crédito]]
- [[Finanzas/03. Metas/🔥 Operación Limpieza TC]]