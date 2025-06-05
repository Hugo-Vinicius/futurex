// Inicializa o localStorage se necessário
if (!localStorage.getItem('medications')) {
    const initialMedications = [
        { id: 1, name: "Dipirona", dosage: "10mg", stock: 120, expiry: "2024-10-15" },
        { id: 2, name: "Omeprazol", dosage: "5mg", stock: 85, expiry: "2024-09-20" },
        { id: 3, name: "Tramadol", dosage: "1mg", stock: 30, expiry: "2024-11-30" }
    ];
    localStorage.setItem('medications', JSON.stringify(initialMedications));
}

if (!localStorage.getItem('medicationExits')) {
    localStorage.setItem('medicationExits', JSON.stringify([]));
}

// Preenche tabela de medicamentos
function loadMedications() {
    const medications = JSON.parse(localStorage.getItem('medications') || '[]');
    const tbody = document.querySelector("#medication-table tbody");
    tbody.innerHTML = medications.map(med => `
        <tr>
            <td>${med.name}</td>
            <td>${med.dosage}</td>
            <td>${med.stock}</td>
            <td>${formatDate(med.expiry)}</td>
            <td>
                <button onclick="selectMedication(${med.id})" 
                        ${med.stock <= 0 ? 'disabled' : ''}>
                    ${med.stock <= 0 ? 'Sem Estoque' : 'Selecionar'}
                </button>
            </td>
        </tr>
    `).join("");

    // Carrega histórico de saídas
    loadExitHistory();
    
    // Atualiza lista de pacientes
    updatePatientSelect();
}

// Atualiza select de pacientes
function updatePatientSelect() {
    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    const activePatients = patients.filter(p => p.active);
    const select = document.getElementById('patient');
    
    if (select) {
        select.innerHTML = '<option value="">Selecione...</option>' +
            activePatients.map(p => `<option value="${p.id}">${p.name} (${p.bed})</option>`).join('');
    }
}

// Seleciona medicamento para saída
function selectMedication(id) {
    const medications = JSON.parse(localStorage.getItem('medications') || '[]');
    const med = medications.find(m => m.id === id);
    if (med) {
        document.getElementById("selected-med").value = `${med.name} - ${med.dosage}`;
        document.getElementById("selected-med").dataset.id = med.id;
    }
}

// Registra saída do medicamento
function registerExit() {
    const medInput = document.getElementById("selected-med");
    const medId = medInput.dataset.id;
    const bed = document.getElementById("bed-location").value;
    const patientId = document.getElementById("patient").value;
    const quantity = parseInt(document.getElementById("quantity").value);

    if (!medId || !bed || !patientId || !quantity) {
        alert("Preencha todos os campos!");
        return;
    }

    // Busca dados do medicamento e paciente
    const medications = JSON.parse(localStorage.getItem('medications') || '[]');
    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    
    const medication = medications.find(m => m.id === parseInt(medId));
    const patient = patients.find(p => p.id === parseInt(patientId));

    if (!medication || !patient) {
        alert("Dados inválidos!");
        return;
    }

    if (medication.stock < quantity) {
        alert("Quantidade indisponível em estoque!");
        return;
    }

    // Atualiza estoque
    medication.stock -= quantity;
    localStorage.setItem('medications', JSON.stringify(medications));

    // Registra saída
    const exit = {
        id: Date.now(),
        medicationId: medication.id,
        medicationName: medication.name,
        medicationDosage: medication.dosage,
        patientId: patient.id,
        patientName: patient.name,
        bed: bed,
        quantity: quantity,
        datetime: new Date().toISOString(),
        userId: JSON.parse(localStorage.getItem('currentUser') || '{}').id
    };

    const exits = JSON.parse(localStorage.getItem('medicationExits') || '[]');
    exits.unshift(exit); // Adiciona no início do array
    localStorage.setItem('medicationExits', JSON.stringify(exits));

    alert(`Saída registrada com sucesso!\nMedicamento: ${medication.name}\nPaciente: ${patient.name}\nQuantidade: ${quantity}`);
    
    // Limpa formulário e atualiza tabelas
    clearForm();
    loadMedications();
}

// Carrega histórico de saídas
function loadExitHistory() {
    const exits = JSON.parse(localStorage.getItem('medicationExits') || '[]');
    const tbody = document.querySelector("#exit-history tbody");
    
    tbody.innerHTML = exits.slice(0, 10).map(exit => `
        <tr>
            <td>${formatDateTime(exit.datetime)}</td>
            <td>${exit.medicationName} - ${exit.medicationDosage}</td>
            <td>${exit.bed}</td>
            <td>${exit.patientName}</td>
        </tr>
    `).join("");
}

// Limpa formulário
function clearForm() {
    document.getElementById("selected-med").value = "";
    document.getElementById("selected-med").dataset.id = "";
    document.getElementById("bed-location").value = "";
    document.getElementById("patient").value = "";
    document.getElementById("quantity").value = "1";
}

// Função auxiliar para formatar data
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR');
}

// Função auxiliar para formatar data e hora
function formatDateTime(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleString('pt-BR');
}

// Filtra medicamentos
document.getElementById('med-search')?.addEventListener('input', function(e) {
    const search = e.target.value.toLowerCase();
    const medications = JSON.parse(localStorage.getItem('medications') || '[]');
    const filtered = medications.filter(med => 
        med.name.toLowerCase().includes(search) || 
        med.dosage.toLowerCase().includes(search)
    );

    const tbody = document.querySelector("#medication-table tbody");
    tbody.innerHTML = filtered.map(med => `
        <tr>
            <td>${med.name}</td>
            <td>${med.dosage}</td>
            <td>${med.stock}</td>
            <td>${formatDate(med.expiry)}</td>
            <td>
                <button onclick="selectMedication(${med.id})"
                        ${med.stock <= 0 ? 'disabled' : ''}>
                    ${med.stock <= 0 ? 'Sem Estoque' : 'Selecionar'}
                </button>
            </td>
        </tr>
    `).join("");
});

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    loadMedications();
    // Adiciona alguns pacientes de exemplo se não existirem
    if (!localStorage.getItem('patients')) {
        const initialPatients = [
            { id: 1, name: "João Silva", bed: "Quarto 201 - Leito 01", active: true },
            { id: 2, name: "Maria Santos", bed: "Quarto 202 - Leito 05", active: true },
            { id: 3, name: "Pedro Costa", bed: "UTI - Leito 07", active: true }
        ];
        localStorage.setItem('patients', JSON.stringify(initialPatients));
        updatePatientSelect();
    }
});