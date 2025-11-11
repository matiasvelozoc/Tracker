module.exports = async (params) => {
    const { app, quickAddApi: QuickAdd } = params;
    
    // Pedir el ingreso al usuario
    const ingresoStr = await QuickAdd.inputPrompt("💰 Ingreso del mes (ej: 950000):", "950000");
    
    if (!ingresoStr) {
        new Notice("❌ Cálculo cancelado");
        return;
    }
    
    const ingreso = parseFloat(ingresoStr.replace(/\./g, '').replace(/,/g, ''));
    
    if (isNaN(ingreso) || ingreso <= 0) {
        new Notice("❌ Por favor ingresa un número válido");
        return;
    }
    
    // Definir cubetas
    const cubetas = [
        { nombre: "💳 Operativa TC", actual: 29.5, meta: 22, producto: "Tarjeta de Crédito (no transferir)" },
        { nombre: "📈 Ahorro/Inversión", actual: 22.4, meta: 26, producto: "Fintual" },
        { nombre: "🛡️ Fondo Emergencia", actual: 10, meta: 10, producto: "MACH" },
        { nombre: "🎯 Presupuesto Libertad", actual: 9.5, meta: 8, producto: "Mercado Pago" },
        { nombre: "🔧 Mantenimiento", actual: 4, meta: 5, producto: "Tenpo - Bolsa Mantenimiento" },
        { nombre: "🎁 Dar & Regalos", actual: 3, meta: 3, producto: "Tenpo - Bolsa Regalos" },
        { nombre: "✈️ Vacaciones", actual: 3, meta: 3, producto: "DAP Banco Chile" },
        { nombre: "⚡ Margen Estratégico", actual: 3, meta: 3, producto: "Cuenta Corriente" }
    ];
    
    // Calcular montos
    let totalAsignado = 0;
    const fecha = window.moment().format('YYYY-MM-DD');
    const fechaLegible = window.moment().format('DD/MM/YYYY');
    
    let contenido = `---\nfecha: ${fecha}\ningreso: ${ingreso}\n---\n\n`;
    contenido += `# 🧮 Cálculo de Cubetas - ${fechaLegible}\n\n`;
    contenido += `## 💰 Ingreso Base: $${ingreso.toLocaleString('es-CL')}\n\n`;
    contenido += `---\n\n`;
    contenido += `## 📊 Distribución Calculada\n\n`;
    contenido += `| Cubeta | % Actual | % Meta | Monto Asignado | Estado |\n`;
    contenido += `|--------|----------|--------|----------------|--------|\n`;
    
    let checklistTransferencias = "";
    
    for (let cubeta of cubetas) {
        const monto = Math.round((cubeta.actual / 100) * ingreso);
        totalAsignado += monto;
        const estado = cubeta.actual <= cubeta.meta ? '✅' : 
                      cubeta.actual <= cubeta.meta * 1.1 ? '🟡' : '🔴';
        
        contenido += `| ${cubeta.nombre} | ${cubeta.actual}% | ${cubeta.meta}% | $${monto.toLocaleString('es-CL')} | ${estado} |\n`;
        
        // Agregar a checklist solo si NO es Operativa TC
        if (!cubeta.nombre.includes("Operativa TC")) {
            checklistTransferencias += `- [ ] **${cubeta.producto}**: $${monto.toLocaleString('es-CL')}\n`;
        }
    }
    
    const resto = ingreso - totalAsignado;
    const porcResto = ((resto / ingreso) * 100).toFixed(1);
    
    contenido += `| **TOTAL** | **84.4%** | **80%** | **$${totalAsignado.toLocaleString('es-CL')}** | |\n\n`;
    contenido += `**Sin asignar**: $${resto.toLocaleString('es-CL')} (${porcResto}%)\n\n`;
    contenido += `---\n\n## 💸 Lista de Transferencias\n\n`;
    contenido += `Copiar y pegar para hacer las transferencias:\n\n`;
    contenido += checklistTransferencias;
    contenido += `\n**💳 Operativa TC**: No transferir, se gasta directamente con la tarjeta.\n\n`;
    contenido += `---\n\n## ✅ Progreso de Transferencias\n\n`;
    contenido += `Una vez hechas las transferencias, marca aquí:\n\n`;
    contenido += checklistTransferencias;
    contenido += `\n---\n\n## 📝 Notas del Mes\n\n`;
    
    // Crear el archivo
    const nombreArchivo = `Finanzas/Calculos/${fecha}-Cubetas.md`;
    
    try {
        // Verificar si existe la carpeta Calculos
        const folder = app.vault.getAbstractFileByPath("Finanzas/Calculos");
        if (!folder) {
            await app.vault.createFolder("Finanzas/Calculos");
        }
        
        // Crear el archivo
        const file = await app.vault.create(nombreArchivo, contenido);
        
        // Abrir el archivo
        const leaf = app.workspace.getLeaf(false);
        await leaf.openFile(file);
        
        new Notice(`✅ Cálculo creado exitosamente`);
        
    } catch (error) {
        new Notice(`❌ Error: ${error.message}`);
        console.error(error);
    }
};