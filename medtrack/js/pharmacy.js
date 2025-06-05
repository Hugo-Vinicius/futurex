// Simulação de banco de dados de medicamentos
const medications = [
    { id: 1, name: "Dipirona", dosage: "10mg", stock: 120, expiry: "15/10/2024" },
    { id: 2, name: "Omeprazol", dosage: "5mg", stock: 85, expiry: "20/09/2024" },
    { id: 3, name: "Tramadol", dosage: "1mg", stock: 30, expiry: "30/11/2024" }
];

// Preenche tabela de medicamentos
function loadMedications() {
    const tbody = document.querySelector("#medication-table tbody");
    tbody.innerHTML = medications.map(med => `
        <tr>
            <td>${med.name}</td>
            <td>${med.dosage}</td>
            <td>${med.stock}</td>
            <td>${med.expiry}</td>
            <td><button onclick="selectMedication(${med.id})">Selecionar</button></td>
        </tr>
    `).join("");
}

// Seleciona medicamento para saída
function selectMedication(id) {
    const med = medications.find(m => m.id === id);
    document.getElementById("selected-med").value = `${med.name} - ${med.dosage}`;
}

// Registra saída do medicamento
function registerExit() {
    const med = document.getElementById("selected-med").value;
    const bed = document.getElementById("bed-location").value;
    const patient = document.getElementById("patient").value;
    
    if (!med || !bed || !patient) {
        alert("Preencha todos os campos!");
        return;
    }

    alert(`Saída registrada:\nMedicamento: ${med}\nLeito: ${bed}\nPaciente: ${patient}`);
    document.getElementById("qr-code").style.display = "block";
}

// Inicialização
document.addEventListener("DOMContentLoaded", loadMedications);