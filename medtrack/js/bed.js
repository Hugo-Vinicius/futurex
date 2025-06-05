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