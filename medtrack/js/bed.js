// Simula o escaneamento do QR Code
function scanQR() {
    document.getElementById("scanned-info").style.display = "block";
    document.getElementById("scanned-med").value = "Dipirona - 10mg";
    document.getElementById("scanned-bed").value = "Quarto 20 - Leito 01";
    document.getElementById("scanned-patient").value = "João Silva";
}

// Confirma chegada do medicamento
function confirmArrival() {
    alert("Medicamento registrado no leito com sucesso!");
}

// Agenda administração
function scheduleAdmin() {
    const time = document.getElementById("admin-time").value;
    const nurse = document.getElementById("nurse").value;
    
    if (!time || !nurse) {
        alert("Preencha todos os campos!");
        return;
    }

    alert(`Medicamento agendado para ${time} com ${nurse}`);
}

// Simula administração
function administerMed(button) {
    const row = button.closest("tr");
    row.querySelector(".status").className = "status status-administered";
    row.querySelector(".status").textContent = "Administrado";
    button.disabled = true;
}

// Inicializa o localStorage se necessário
if (!localStorage.getItem('medicationAdministrations')) {
    localStorage.setItem('medicationAdministrations', JSON.stringify([]));
}

// Carrega medicamentos pendentes
function loadPendingMedications() {
    const exits = JSON.parse(localStorage.getItem('medicationExits') || '[]');
    const administrations = JSON.parse(localStorage.getItem('medicationAdministrations') || '[]');
    
    // Filtra saídas que ainda não foram administradas
    const pending = exits.filter(exit => 
        !administrations.some(adm => adm.exitId === exit.id)
    );

    const tbody = document.querySelector("#pending-meds tbody");
    tbody.innerHTML = pending.map(med => `
        <tr>
            <td>${med.patientName}</td>
            <td>${med.medicationName} - ${med.medicationDosage}</td>
            <td>${formatScheduledTime(med.datetime)}</td>
            <td><span class="status status-pending">Pendente</span></td>
            <td>
                <button onclick="showAdminForm('${med.id}')">Administrar</button>
            </td>
        </tr>
    `).join("");

    if (pending.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="no-data">Não há medicamentos pendentes</td>
            </tr>
        `;
    }
}

// Mostra formulário de administração
function showAdminForm(exitId) {
    const exits = JSON.parse(localStorage.getItem('medicationExits') || '[]');
    const exit = exits.find(e => e.id === parseInt(exitId));
    
    if (exit) {
        document.getElementById("scanned-med-name").textContent = `${exit.medicationName} - ${exit.medicationDosage}`;
        document.getElementById("scanned-patient").textContent = exit.patientName;
        document.getElementById("scanned-bed").textContent = exit.bed;
        document.getElementById("admin-form").dataset.exitId = exitId;
        
        // Preenche o horário atual como padrão
        const now = new Date();
        const timeStr = now.toTimeString().slice(0, 5);
        document.getElementById("admin-time").value = timeStr;
    }
}

// Confirma administração do medicamento
function confirmAdministration(event) {
    event.preventDefault();
    
    const exitId = document.getElementById("admin-form").dataset.exitId;
    const adminTime = document.getElementById("admin-time").value;
    const nurse = document.getElementById("nurse").value;
    const notes = document.getElementById("notes").value;
    
    if (!exitId || !adminTime || !nurse) {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }

    const exits = JSON.parse(localStorage.getItem('medicationExits') || '[]');
    const exit = exits.find(e => e.id === parseInt(exitId));

    if (!exit) {
        alert("Medicamento não encontrado!");
        return;
    }

    // Registra a administração
    const administration = {
        id: Date.now(),
        exitId: parseInt(exitId),
        medicationName: exit.medicationName,
        medicationDosage: exit.medicationDosage,
        patientName: exit.patientName,
        patientId: exit.patientId,
        bed: exit.bed,
        adminTime: adminTime,
        nurse: nurse,
        notes: notes,
        datetime: new Date().toISOString(),
        userId: JSON.parse(localStorage.getItem('currentUser') || '{}').id
    };

    const administrations = JSON.parse(localStorage.getItem('medicationAdministrations') || '[]');
    administrations.unshift(administration);
    localStorage.setItem('medicationAdministrations', JSON.stringify(administrations));

    alert("Medicamento administrado com sucesso!");
    clearAdminForm();
    loadPendingMedications();
}

// Limpa formulário de administração
function clearAdminForm() {
    document.getElementById("admin-time").value = "";
    document.getElementById("nurse").value = "";
    document.getElementById("notes").value = "";
    document.getElementById("admin-form").dataset.exitId = "";
    document.getElementById("scanned-med-name").textContent = "-";
    document.getElementById("scanned-patient").textContent = "-";
    document.getElementById("scanned-bed").textContent = "-";
}

// Função auxiliar para formatar horário agendado
function formatScheduledTime(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    loadPendingMedications();
    
    // Configura o formulário de administração
    document.getElementById("admin-form").addEventListener("submit", (e) => {
        e.preventDefault();
        confirmAdministration(e);
    });
});