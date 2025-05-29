// Medicamento.java
package com.senac.futurex.Entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Medicamento {
    @Id
    private String codigoAnvisa;
    private String nomeComercial;
    private String principioAtivo;
    private String fabricante;

    @OneToMany(mappedBy = "medicamento")
    private List<Lote> lotes;

    // Getters e Setters

    public String getCodigoAnvisa() {
        return codigoAnvisa;
    }

    public void setCodigoAnvisa(String codigoAnvisa) {
        this.codigoAnvisa = codigoAnvisa;
    }

    public String getNomeComercial() {
        return nomeComercial;
    }

    public void setNomeComercial(String nomeComercial) {
        this.nomeComercial = nomeComercial;
    }

    public String getPrincipioAtivo() {
        return principioAtivo;
    }

    public void setPrincipioAtivo(String principioAtivo) {
        this.principioAtivo = principioAtivo;
    }

    public String getFabricante() {
        return fabricante;
    }

    public void setFabricante(String fabricante) {
        this.fabricante = fabricante;
    }

    public List<Lote> getLotes() {
        return lotes;
    }

    public void setLotes(List<Lote> lotes) {
        this.lotes = lotes;
    }

}
