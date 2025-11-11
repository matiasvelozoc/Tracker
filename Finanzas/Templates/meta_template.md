---
type: meta
nombre: "Meta Vivienda"
meta_total: 6000000
ahorrado_actual: 3500000
plazo: "2026-03-31"
estrategia: "Fintual fondo Liquidez"
---

# 🎯 Meta: {{nombre}}

**Objetivo total:** {{meta_total}} CLP  
**Progreso actual:** {{ahorrado_actual}} CLP  

```dataviewjs
let p = (dv.current().ahorrado_actual / dv.current().meta_total * 100).toFixed(1)
dv.paragraph(`Progreso: **${p}%**`)
dv.paragraph("▰".repeat(Math.floor(p/5)) + "▱".repeat(20-Math.floor(p/5)))
```
📆 **Plazo meta:** {{plazo}}  
📈 **Estrategia:** {{estrategia}}
