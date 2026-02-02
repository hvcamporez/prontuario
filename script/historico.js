let anotacoes = [];
let profissionais = [];
let pacientes = [];
let filtroAtual = {};
let paginaAtual = 1;
const ITENS_POR_PAGINA = 10;

document.addEventListener('DOMContentLoaded', carregarHistorico);

function carregarHistorico() {
    anotacoes = banco.obterProntuarios();
    profissionais = banco.obterProfissionais();
    pacientes = banco.obterPacientes();
    
    atualizarEstatisticas();
    popularFiltros();
    exibirAnotacoesAjustada(anotacoes, paginaAtual);
}

function atualizarEstatisticas() {
    document.getElementById('totalAnotacoes').textContent = anotacoes.length;
    document.getElementById('totalPacientes').textContent = [...new Set(anotacoes.map(a => a.paciente.nomeCompleto))].length;
}

function popularFiltros() {
    const filtroProf = document.getElementById('filtroProfissional');
    filtroProf.innerHTML = '<option value="">Todos os profissionais</option>' + 
        profissionais.map(p => `<option value="${p.id}">${p.nome} (${p.categoria})</option>`).join('');
}

function aplicarFiltro() {
    const termo = document.getElementById('buscaPaciente').value.toLowerCase();
    const profId = document.getElementById('filtroProfissional').value;
    
    let filtradas = anotacoes.filter(anotacao => {
        const paciente = anotacao.paciente.nomeCompleto?.toLowerCase() || '';
        const matchPaciente = !termo || paciente.includes(termo);
        const matchProf = !profId || anotacao.profissional.id == profId;
        return matchPaciente && matchProf;
    });
    
    paginaAtual = 1;
    exibirAnotacoesAjustada(filtradas, paginaAtual);
}

function exibirAnotacoesAjustada(listaCompleta, pagina) {
    const inicio = (pagina - 1) * ITENS_POR_PAGINA;
    const fim = inicio + ITENS_POR_PAGINA;
    const paginaAtualLista = listaCompleta.slice(inicio, fim);
    
    exibirAnotacoes(paginaAtualLista);
    criarPaginacao(listaCompleta.length, pagina);
    
    document.getElementById('registrosMostrados').textContent = paginaAtualLista.length;
    document.getElementById('totalFiltrado').textContent = listaCompleta.length;
}

function exibirAnotacoes(listaPagina) {
    const tbody = document.getElementById('tbodyHistorico');
    
    if (listaPagina.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#94a3b8;padding:60px;">Nenhuma anotação encontrada</td></tr>';
        return;
    }
    
    tbody.innerHTML = listaPagina.map(anotacao => {
        const prof = profissionais.find(p => p.id === anotacao.profissional.id);
        return `
            <tr>
                <td>${banco.formatarDataHora(anotacao.dataHora)}</td>
                <td>${anotacao.paciente.nomeCompleto || 'Paciente não identificado'}</td>
                <td class="anotacao-resumo" title="${anotacao.anotacoes}">${anotacao.anotacoes.substring(0, 80)}...</td>
                <td class="assinatura">
                    ${prof ? prof.nome : 'Desconhecido'}<br>
                    <small>${anotacao.profissional.categoria} - ${anotacao.profissional.conselho}</small>
                </td>
                <td>
                    <button class="btn-acao" onclick="verDetalhes('${bancoidAnotacao(anotacao)}')">Ver</button>
                    <button class="btn-acao" style="background:#ef4444" onclick="excluirAnotacao('${bancoidAnotacao(anotacao)}')">Excluir</button>
                </td>
            </tr>
        `;
    }).join('');
}

function criarPaginacao(totalItens, paginaAtual) {
    const totalPaginas = Math.ceil(totalItens / ITENS_POR_PAGINA);
    const paginacao = document.getElementById('paginacao');
    
    if (totalPaginas <= 1) {
        paginacao.innerHTML = '';
        return;
    }
    
    let botoes = '';
    
    // Primeira página
    botoes += `<button onclick="irParaPagina(1)" ${paginaAtual === 1 ? 'class="active"' : ''}>1</button>`;
    
    // Páginas intermediárias
    const inicioIntervalo = Math.max(2, paginaAtual - 1);
    const fimIntervalo = Math.min(totalPaginas - 1, paginaAtual + 1);
    
    for (let i = inicioIntervalo; i <= fimIntervalo; i++) {
        botoes += `<button onclick="irParaPagina(${i})" ${paginaAtual === i ? 'class="active"' : ''}>${i}</button>`;
    }
    
    // Última página
    if (totalPaginas > 1) {
        botoes += `<button onclick="irParaPagina(${totalPaginas})" ${paginaAtual === totalPaginas ? 'class="active"' : ''}>${totalPaginas}</button>`;
    }
    
    // Navegação anterior/próxima
    if (paginaAtual > 1) {
        botoes = `<button onclick="paginaAnterior()" class="nav-btn">‹ Anterior</button> ${botoes}`;
    }
    if (paginaAtual < totalPaginas) {
        botoes += `<button onclick="proximaPagina()" class="nav-btn">Próxima ›</button>`;
    }
    
    paginacao.innerHTML = botoes;
}

function irParaPagina(pagina) {
    paginaAtual = pagina;
    aplicarFiltro();
}

function paginaAnterior() {
    if (paginaAtual > 1) {
        paginaAtual--;
        aplicarFiltro();
    }
}

function proximaPagina() {
    const totalPaginas = Math.ceil(anotacoesFiltradas().length / ITENS_POR_PAGINA);
    if (paginaAtual < totalPaginas) {
        paginaAtual++;
        aplicarFiltro();
    }
}

function anotacoesFiltradas() {
    const termo = document.getElementById('buscaPaciente').value.toLowerCase();
    const profId = document.getElementById('filtroProfissional').value;
    
    return anotacoes.filter(anotacao => {
        const paciente = anotacao.paciente.nomeCompleto?.toLowerCase() || '';
        return (!termo || paciente.includes(termo)) && (!profId || anotacao.profissional.id == profId);
    });
}

function filtrarAnotacoes() {
    paginaAtual = 1;
    aplicarFiltro();
}

function limparFiltros() {
    document.getElementById('buscaPaciente').value = '';
    document.getElementById('filtroProfissional').value = '';
    paginaAtual = 1;
    exibirAnotacoesAjustada(anotacoes, 1);
}

function verDetalhes(id) {
    const anotacao = anotacoes.find(a => a.id === id);
    if (anotacao) {
        const prof = profissionais.find(p => p.id === anotacao.profissional.id);
        const detalhes = `
            📋 DETALHES DA ANOTAÇÃO #${id}
            
            👤 PACIENTE: ${anotacao.paciente.nomeCompleto}
            📅 DATA/HORA: ${banco.formatarDataHora(anotacao.dataHora)}
            
            📝 ANOTAÇÃO:
            ${anotacao.anotacoes}
            
            ✅ RESPONSÁVEL:
            ${prof.nome}
            ${prof.categoria} - ${prof.conselho}
        `;
        alert(detalhes);
    }
}

function excluirAnotacao(id) {
    if (confirm('Excluir esta anotação permanentemente?')) {
        anotacoes = anotacoes.filter(a => a.id !== id);
        banco.salvarProntuarios(anotacoes);
        if (paginaAtualLista.length === 1 && paginaAtual > 1) paginaAtual--;
        aplicarFiltro();
    }
}

function exportarCSV() {
    let csv = 'Data,Paciente,Anotação,Profissional,Categoria,Conselho\n';
    anotacoesFiltradas().forEach(a => {
        csv += `"${banco.formatarDataHora(a.dataHora)}","${a.paciente.nomeCompleto}","${a.anotacoes.replace(/"/g, '""')}","${a.profissional.nome}","${a.profissional.categoria}","${a.profissional.conselho}"\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `historico-anotacoes-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
}
