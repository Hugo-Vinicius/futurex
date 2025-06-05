// Inicializa o localStorage se necessário
if (!localStorage.getItem('patients')) {
    localStorage.setItem('patients', JSON.stringify([]));
}

if (!localStorage.getItem('professionals')) {
    localStorage.setItem('professionals', JSON.stringify([]));
}

// Função para validar campos do paciente
function validatePatient(name, bed, allergies) {
    if (!name || name.length < 3) {
        alert('Nome do paciente deve ter no mínimo 3 caracteres!');
        return false;
    }
    
    if (!bed || bed.length < 5) {
        alert('Informe um leito válido!');
        return false;
    }
    
    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    if (patients.some(p => p.bed === bed && p.active)) {
        alert('Este leito já está ocupado!');
        return false;
    }
    
    return true;
}

// Função para validar campos do profissional
function validateProfessional(name, register, role, sector) {
    if (!name || name.length < 3) {
        alert('Nome do profissional deve ter no mínimo 3 caracteres!');
        return false;
    }
    
    if (!register) {
        alert('Número de registro é obrigatório!');
        return false;
    }
    
    // Validação específica por função
    if (role === 'nurse' && !/^\d{6}$/.test(register)) {
        alert('COREN deve ter 6 dígitos!');
        return false;
    }
    
    if (role === 'pharmacist' && !/^\d{5}$/.test(register)) {
        alert('CRF deve ter 5 dígitos!');
        return false;
    }
    
    if (!sector) {
        alert('Selecione um setor!');
        return false;
    }
    
    const professionals = JSON.parse(localStorage.getItem('professionals') || '[]');
    if (professionals.some(p => p.register === register)) {
        alert('Este número de registro já está cadastrado!');
        return false;
    }
    
    return true;
}

// Cadastra novo paciente
function savePatient() {
    const name = document.getElementById("patient-name").value;
    const bed = document.getElementById("patient-bed").value;
    const allergies = document.getElementById("patient-allergies").value;
    
    if (!validatePatient(name, bed, allergies)) {
        return;
    }

    const newPatient = {
        id: Date.now(),
        name: name,
        bed: bed,
        allergies: allergies,
        active: true,
        admissionDate: new Date().toISOString()
    };

    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    patients.push(newPatient);
    localStorage.setItem('patients', JSON.stringify(patients));

    alert(`Paciente ${name} cadastrado com sucesso no leito ${bed}!`);
    clearPatientForm();
    updatePatientSelects(); // Atualiza os selects em outras páginas
}

// Cadastra novo profissional
function saveProfessional() {
    const name = document.getElementById("professional-name").value;
    const register = document.getElementById("professional-register").value;
    const role = document.getElementById("professional-role").value;
    const sector = document.getElementById("professional-sector").value;
    
    if (!validateProfessional(name, register, role, sector)) {
        return;
    }

    const newProfessional = {
        id: Date.now(),
        name: name,
        register: register,
        role: role,
        sector: sector,
        active: true,
        admissionDate: new Date().toISOString()
    };

    const professionals = JSON.parse(localStorage.getItem('professionals') || '[]');
    professionals.push(newProfessional);
    localStorage.setItem('professionals', JSON.stringify(professionals));

    alert(`Profissional ${name} cadastrado com sucesso!`);
    clearProfessionalForm();
    updateProfessionalSelects(); // Atualiza os selects em outras páginas
}

// Limpa formulário de paciente
function clearPatientForm() {
    document.getElementById("patient-name").value = "";
    document.getElementById("patient-bed").value = "";
    document.getElementById("patient-allergies").value = "";
}

// Limpa formulário de profissional
function clearProfessionalForm() {
    document.getElementById("professional-name").value = "";
    document.getElementById("professional-register").value = "";
    document.getElementById("professional-role").value = "";
    document.getElementById("professional-sector").value = "";
}

// Atualiza selects de pacientes em todas as páginas
function updatePatientSelects() {
    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    const activePatients = patients.filter(p => p.active);
    
    // Atualiza selects em outras páginas que listam pacientes
    const patientSelects = document.querySelectorAll('select[data-type="patient"]');
    patientSelects.forEach(select => {
        const currentValue = select.value;
        select.innerHTML = '<option value="">Selecione...</option>' +
            activePatients.map(p => `<option value="${p.id}">${p.name} (${p.bed})</option>`).join('');
        select.value = currentValue;
    });
}

// Atualiza selects de profissionais em todas as páginas
function updateProfessionalSelects() {
    const professionals = JSON.parse(localStorage.getItem('professionals') || '[]');
    const activeProfessionals = professionals.filter(p => p.active);
    
    // Atualiza selects em outras páginas que listam profissionais
    const professionalSelects = document.querySelectorAll('select[data-type="professional"]');
    professionalSelects.forEach(select => {
        const currentValue = select.value;
        select.innerHTML = '<option value="">Selecione...</option>' +
            activeProfessionals.map(p => `<option value="${p.id}">${p.name} (${p.role})</option>`).join('');
        select.value = currentValue;
    });
}

// Inicializa os selects quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    updatePatientSelects();
    updateProfessionalSelects();
});