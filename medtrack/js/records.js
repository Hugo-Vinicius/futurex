// Dados de exemplo
const records = [
    { date: "05/06/2024 09:20", patient: "Pedro Melo", med: "Dipirona - 20mg", bed: "Quarto 201 - Leito 06", nurse: "Enfermeira Ana", status: "administered" },
    { date: "05/06/2024 09:15", patient: "Maria Oliveira", med: "Paracetamol - 500mg", bed: "Quarto 105 - Leito 03", nurse: "Enfermeiro Marcos", status: "administered" },
    { date: "05/06/2024 08:30", patient: "Carlos Andrade", med: "Amoxicilina - 250mg", bed: "UTI - Leito 02", nurse: "Enfermeira Carla", status: "missed" }
];

// Carrega registros
function loadRecords() {
    const tbody = document.querySelector("#records-table tbody");
    tbody.innerHTML = records.map(record => `
        <tr>
            <td>${record.date}</td>
            <td>${record.patient}</td>
            <td>${record.med}</td>
            <td>${record.bed}</td>
            <td>${record.nurse}</td>
            <td><span class="status status-${record.status}">${
                record.status === "administered" ? "Administrado" : 
                record.status === "missed" ? "Não administrado" : "Pendente"
            }</span></td>
        </tr>
    `).join("");
}

// Filtra registros
function applyFilters() {
    const patient = document.getElementById("filter-patient").value;
    const date = document.getElementById("filter-date").value;
    
    // Implementação real exigiria integração com back-end
    alert(`Filtros aplicados:\nPaciente: ${patient || "Todos"}\nData: ${date || "Todas"}`);
}

document.addEventListener("DOMContentLoaded", loadRecords);