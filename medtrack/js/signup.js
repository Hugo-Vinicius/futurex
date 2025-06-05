// Cadastra novo paciente
function savePatient() {
    const name = document.getElementById("patient-name").value;
    const bed = document.getElementById("patient-bed").value;
    
    if (!name || !bed) {
        alert("Preencha todos os campos!");
        return;
    }

    alert(`Paciente ${name} cadastrado para o leito ${bed}`);
    document.getElementById("patient-name").value = "";
    document.getElementById("patient-bed").value = "";
}

// Cadastra novo profissional
function saveProfessional() {
    const name = document.getElementById("professional-name").value;
    const register = document.getElementById("professional-register").value;
    const role = document.getElementById("professional-role").value;
    
    if (!name || !register) {
        alert("Preencha todos os campos!");
        return;
    }

    alert(`Profissional ${name} (${role}) cadastrado com sucesso!`);
}