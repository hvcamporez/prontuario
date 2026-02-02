document.addEventListener('DOMContentLoaded', function() {
    atualizarLista();
    document.getElementById('formCadastro').addEventListener('submit', cadastrarProfissional);
});

if (!adminLogado || tipoUsuario !== 'admin') {
    // Salva página de origem
    localStorage.setItem('paginaProibida', window.location.href);
    window.location.href = 'login.html';
    return;
}


function cadastrarProfissional(e) {
    e.preventDefault();
    
    const profissional = {
        id: Date.now(),
        nome: document.getElementById('nome').value,
        categoria: document.getElementById('categoria').value,
        conselho: document.getElementById('conselho').value,
        login: document.getElementById('login').value,
        senha: document.getElementById('senha').value
    };
    
    const profissionais = banco.obterProfissionais();
    profissionais.push(profissional);
    banco.salvarProfissionais(profissionais);
    
    alert('✅ Profissional cadastrado!');
    document.getElementById('formCadastro').reset();
    atualizarLista();
}

function atualizarLista() {
    const profissionais = banco.obterProfissionais();
    const lista = document.getElementById('listaProfissionais');
    const total = document.getElementById('totalProf');
    
    if (profissionais.length === 0) {
        lista.innerHTML = '<p style="text-align:center;color:#64748b;">Nenhum profissional cadastrado</p>';
        total.textContent = '0';
        return;
    }
    
    lista.innerHTML = profissionais.map(prof => `
        <div class="prof-item">
            <div class="prof-info">
                <h4>${prof.nome}</h4>
                <div class="prof-meta">${prof.categoria} • ${prof.conselho}</div>
                <div class="prof-meta">Login: ${prof.login}</div>
            </div>
            <button class="btn-excluir" onclick="excluirProfissional(${prof.id})">Excluir</button>
        </div>
    `).join('');
    
    total.textContent = profissionais.length;
}

function excluirProfissional(id) {
    if (confirm('Excluir este profissional?')) {
        let profissionais = banco.obterProfissionais();
        profissionais = profissionais.filter(p => p.id !== id);
        banco.salvarProfissionais(profissionais);
        atualizarLista();
    }
}

function logoutAdminProf() {
    banco.logoutCompleto();
    window.location.href = 'index.html';
}

