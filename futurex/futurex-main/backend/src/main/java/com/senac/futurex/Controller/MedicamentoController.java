// MedicamentoController.java
package com.senac.futurex.Controller;

import com.senac.futurex.Entity.Rastreamento;
import com.senac.futurex.Service.RastreamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/rastreamento")
public class MedicamentoController {
    @Autowired
    private RastreamentoService rastreamentoService;

    @GetMapping("/novo")
    public String mostrarFormularioRegistro(Model model) {
        model.addAttribute("rastreamento", new Rastreamento());
        return "rastreamento/formulario";
    }

    @PostMapping("/registrar")
    public String registrarMovimento(@ModelAttribute Rastreamento rastreamento) {
        rastreamentoService.registrarMovimento(rastreamento);
        return "redirect:/rastreamento";
    }

    @GetMapping("/lote/{numeroLote}")
    public String mostrarHistoricoLote(@PathVariable String numeroLote, Model model) {
        model.addAttribute("historico", rastreamentoService.buscarHistoricoPorLote(numeroLote));
        return "rastreamento/historico";
    }
}