// RastreamentoService.java
// Camada de serviço para operações relacionadas a Medicamentos.
package com.senac.futurex.Service;

import com.senac.futurex.Entity.Rastreamento;
import com.senac.futurex.Repository.MedicamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class RastreamentoService {

    private final MedicamentoRepository MedicamentoRepository;

    //Salva ou atualiza um medicamento
    @Autowired
    public RastreamentoService(MedicamentoRepository rastreamentoRepository) {
        this.MedicamentoRepository = rastreamentoRepository;
    }

    @Transactional
    public Rastreamento registrarMovimento(Rastreamento rastreamento) {
        if (rastreamento.getDataHora() == null) {
            rastreamento.setDataHora(LocalDateTime.now());
        }
        return MedicamentoRepository.save(rastreamento);
    }

    public List<Rastreamento> buscarHistoricoPorLote(String numeroLote) {
        return MedicamentoRepository.findByLoteNumeroLote(numeroLote);
    }

    public List<Rastreamento> buscarHistoricoPorPaciente(String cpf) {
        return MedicamentoRepository.findByPacienteCpf(cpf);
    }
}