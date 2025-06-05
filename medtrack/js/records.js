// Inicializa dados de exemplo se necessário
if (!localStorage.getItem('medicationAdministrations')) {
    const sampleAdministrations = [
        {
            id: Date.now() - 5000,
            medicationName: "Dipirona",
            medicationDosage: "10mg",
            patientName: "João Silva",
            patientId: 1,
            bed: "Quarto 201 - Leito 01",
            adminTime: "09:20",
            nurse: "Enfermeira Ana",
            notes: "Paciente relatou melhora da dor",
            datetime: new Date(Date.now() - 5000).toISOString(),
            status: "administered"
        },
        {
            id: Date.now() - 10000,
            medicationName: "Omeprazol",
            medicationDosage: "5mg",
            patientName: "Maria Santos",
            patientId: 2,
            bed: "Quarto 202 - Leito 05",
            adminTime: "08:45",
            nurse: "Enfermeiro Carlos",
            notes: "Administrado em jejum",
            datetime: new Date(Date.now() - 10000).toISOString(),
            status: "administered"
        },
        {
            id: Date.now() - 15000,
            medicationName: "Tramadol",
            medicationDosage: "1mg",
            patientName: "Pedro Costa",
            patientId: 3,
            bed: "UTI - Leito 07",
            adminTime: "08:15",
            nurse: "Enfermeira Ana",
            notes: "Paciente com dor intensa",
            datetime: new Date(Date.now() - 15000).toISOString(),
            status: "administered"
        }
    ];
    localStorage.setItem('medicationAdministrations', JSON.stringify(sampleAdministrations));
}

// Carrega registros
function loadRecords(filters = {}) {
    const administrations = JSON.parse(localStorage.getItem('medicationAdministrations') || '[]');
    let filteredRecords = [...administrations];

    // Aplica filtros
    if (filters.patient) {
        filteredRecords = filteredRecords.filter(record => 
            record.patientId === parseInt(filters.patient)
        );
    }

    if (filters.date) {
        const filterDate = new Date(filters.date);
        filterDate.setHours(0, 0, 0, 0);
        const nextDay = new Date(filterDate);
        nextDay.setDate(nextDay.getDate() + 1);

        filteredRecords = filteredRecords.filter(record => {
            const recordDate = new Date(record.datetime);
            return recordDate >= filterDate && recordDate < nextDay;
        });
    }

    // Ordena por data decrescente
    filteredRecords.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

    const tbody = document.querySelector("#records-table tbody");
    tbody.innerHTML = filteredRecords.map(record => `
        <tr>
            <td>${formatDateTime(record.datetime)}</td>
            <td>${record.patientName}</td>
            <td>${record.medicationName} - ${record.medicationDosage}</td>
            <td>${record.bed}</td>
            <td>${record.nurse}</td>
            <td><span class="status status-administered">Administrado</span></td>
        </tr>
    `).join("");

    // Atualiza os filtros com dados dinâmicos
    updateFilterOptions();
}

// Atualiza opções dos filtros
function updateFilterOptions() {
    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    const patientSelect = document.getElementById("filter-patient");
    
    if (patientSelect) {
        const currentValue = patientSelect.value;
        patientSelect.innerHTML = '<option value="">Todos</option>' +
            patients.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
        patientSelect.value = currentValue;
    }
}

// Aplica filtros
function applyFilters() {
    const patient = document.getElementById("filter-patient").value;
    const date = document.getElementById("filter-date").value;
    
    loadRecords({ patient, date });
}

// Função auxiliar para formatar data e hora
function formatDateTime(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleString('pt-BR');
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    loadRecords();
});