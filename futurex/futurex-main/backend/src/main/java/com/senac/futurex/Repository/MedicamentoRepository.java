// MedicamentoRepository.java
package com.senac.futurex.Repository;

import com.senac.futurex.Entity.Rastreamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface MedicamentoRepository extends JpaRepository<Rastreamento, Long> {

    // Consulta para buscar por número de lote
    @Query("SELECT r FROM Rastreamento r WHERE r.lote.numeroLote = :numeroLote")
    List<Rastreamento> findByLoteNumeroLote(@Param("numeroLote") String numeroLote);

    // Consulta para buscar por CPF do paciente
    @Query("SELECT r FROM Rastreamento r WHERE r.paciente.cpf = :cpf")
    List<Rastreamento> findByPacienteCpf(@Param("cpf") String cpf);
}