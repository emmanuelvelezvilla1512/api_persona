function formatearFechaParaMySQL(fecha){
    return String(fecha).trim();
}

function formatearFechaLegible(fechaISO) {
    const [anio, mes, dia] = String(fechaISO).split('-');
    return `${dia}/${mes}/${anio}`;
}

module.exports = { formatearFechaParaMySQL, formatearFechaLegible };