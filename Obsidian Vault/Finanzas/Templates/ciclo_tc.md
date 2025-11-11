---
tipo: ciclo-tc
periodo: "{{date:YYYY-MM}}"
fecha-corte: "{{date:YYYY-MM-23}}"
fecha-pago: "{{date+1M:YYYY-MM-06}}"
total-gastado: 0
monto-a-pagar: 0
estado: abierto
---

# 💳 Ciclo TC - {{date:MMMM YYYY}}

> [!warning] Fechas Importantes
> **Corte**: {{date:YYYY-MM-23}} | **Vencimiento**: {{date+1M:YYYY-MM-06}} | **A Pagar**: $0

---

## 📊 Resumen del Ciclo

| Concepto | Monto |
|----------|-------|
| **Total Gastado** | $0 |
| **Saldo Anterior** | $0 |
| **Pagos Realizados** | $0 |
| **Total a Pagar** | $0 |

---

## 💸 Detalle de Compras

| Fecha | Descripción | Categoría | Monto | Cuotas | Cubeta | Estado |
|-------|-------------|-----------|-------|--------|--------|--------|


---

## 📊 Gastos por Categoría
```dataview
TABLE sum(rows.Monto) as "Total"
WHERE contains(file.path, "{{date:YYYY-MM}}")
GROUP BY Categoría
SORT sum(rows.Monto) DESC
```

---

## 💡 Análisis

### ⚠️ Alertas
- [ ] ¿Superó el 30% del ingreso?
- [ ] ¿Hay compras impulsivas?
- [ ] ¿Se respetó el presupuesto de Operativa?

### 📝 Notas


---

## 🔗 Links

- [[📊 Panel Principal]]
- [[Finanzas/04. Productos Financieros/Tarjeta de Crédito]]
- Flujo del mes: [[Finanzas/01. Flujo Mensual/{{date:YYYY-MM}}]]
- Ciclo anterior: [[{{date-1M:YYYY-MM}}]]
```

---

## ⚙️ PARTE 3: CONFIGURACIÓN DE QUICKADD

Ahora configuraremos QuickAdd para hacer todo automático. Ve a `Configuración → QuickAdd`:

### 1️⃣ Registrar Mes Nuevo
- **Nombre**: `📅 Nuevo Mes`
- **Tipo**: Template
- **Template**: `Finanzas/Templates/flujo_mensual.md`
- **Folder**: `Finanzas/01. Flujo Mensual`
- **Filename**: `{{DATE:YYYY-MM}}`
- ✅ Open file

### 2️⃣ Registrar Ingreso
- **Nombre**: `💵 Ingreso`
- **Tipo**: Capture
- **Capture to**: `Finanzas/01. Flujo Mensual/{{DATE:YYYY-MM}}.md`
- **Insert after**: `## 💵 Ingresos`
- **Format**:
```
| {{DATE:YYYY-MM-DD}} | {{VALUE:Descripción}} | {{VALUE:Categoría}} | ${{VALUE:Monto}} | {{VALUE:Cuenta}} | {{VALUE:Notas}} |
```

### 3️⃣ Registrar Gasto
- **Nombre**: `💸 Gasto`
- **Tipo**: Capture
- **Capture to**: `Finanzas/01. Flujo Mensual/{{DATE:YYYY-MM}}.md`
- **Insert after**: `## 💸 Gastos Efectivo/Débito`
- **Format**:
```
| {{DATE:YYYY-MM-DD}} | {{VALUE:Descripción}} | {{VALUE:Categoría}} | ${{VALUE:Monto}} | {{VALUE:Cuenta}} | {{VALUE:Cubeta}} |
```

### 4️⃣ Gasto en TC
- **Nombre**: `💳 Gasto TC`
- **Tipo**: Capture
- **Capture to**: `Finanzas/05. Control TC/Ciclo Actual.md`
- **Insert after**: `## 💸 Detalle de Compras`
- **Format**:
```
| {{DATE:YYYY-MM-DD}} | {{VALUE:Descripción}} | {{VALUE:Categoría}} | ${{VALUE:Monto}} | {{VALUE:Cuotas (1 si es sin cuotas)}} | {{VALUE:Cubeta}} | Pendiente |