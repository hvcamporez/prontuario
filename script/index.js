// index.js - Dashboard com estatísticas REAIS

document.addEventListener('DOMContentLoaded', () => {
    // Carrega dados do banco
    const profissionais = banco.obterProfissionais();
    const prontuarios = banco.obterProntuarios();
    const pacientesUnicos = [...new Set(prontuarios.map(p => p.paciente.nomeCompleto))].length;
    
    // Calcula registros de HOJE
    const hoje = new Date().toDateString();
    const registrosHoje = prontuarios.filter(pront => 
        new Date(pront.dataHora).toDateString() === hoje
    ).length;
    
    // Define valores REAIS nos data-target
    document.getElementById('registrosHoje').setAttribute('data-target', registrosHoje);
    document.getElementById('totalPacientes').setAttribute('data-target', pacientesUnicos);
    document.getElementById('totalProfissionais').setAttribute('data-target', profissionais.length);
    document.getElementById('totalRegistros').setAttribute('data-target', prontuarios.length);
    
    // Animação dos contadores
    animarContadores();
    
    // Parallax hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    });
});

function animarContadores() {
    const contadores = document.querySelectorAll('.stat-number[data-target]');
    
    contadores.forEach(contador => {
        const alvo = parseInt(contador.getAttribute('data-target'));
        const incremento = Math.ceil(alvo / 150);
        let atual = 0;
        
        const atualizar = () => {
            if (atual < alvo) {
                atual += incremento;
                if (atual > alvo) atual = alvo;
                contador.textContent = atual.toLocaleString('pt-BR');
                requestAnimationFrame(atualizar);
            }
        };
        atualizar();
    });
}
