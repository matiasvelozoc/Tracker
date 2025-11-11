---
type: cubeta
nombre: "Cubeta Operativa"
porcentaje_asignado: 29.5
saldo_actual: 0
objetivo: "Cubrir gastos mensuales esenciales"
---

# 💰 Cubeta: {{nombre}}

**Objetivo:** {{objetivo}}  
**Porcentaje asignado:** {{porcentaje_asignado}} %  
**Saldo actual:** {{saldo_actual}} CLP

```dataview
TABLE nombre AS "Cubeta", porcentaje_asignado AS "% Asignado", saldo_actual AS "Saldo (CLP)"
FROM "Finanzas/02. Cubetas"
WHERE type = "cubeta"
SORT porcentaje_asignado DESC
```
