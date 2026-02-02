// login.js COMPLETO - Suporte Profissional + Admin + Redirecionamento inteligente

const ADMIN_PADRAO = {
    usuario: 'admin',
    senha: 'admin123',
    nome: 'Administrador do Sistema'
};

function fazerLogin(event) {
    event.preventDefault();
    
    const usuario = document.getElementById('usuario').value.trim();
    const senha = document.getElementById('senha').value;
    
    // 1. Tenta login PROFISSIONAL
    const profissionais = banco.obterProfissionais();
    const profissional = profissionais.find(p => p.login === usuario && p.senha === senha);
    
    if (profissional) {
        banco.salvarProfissionalLogado(profissional);
        banco.salvarTipoUsuarioLogado('profissional');
        
        // Redireciona para prontuário
        window.location.href = 'prontuario.html';
        return;
    }
    
    // 2. Tenta login ADMIN
    if (usuario === ADMIN_PADRAO.usuario && senha === ADMIN_PADRAO.senha) {
        banco.salvarAdminLogado(ADMIN_PADRAO);
        banco.salvarTipoUsuarioLogado('admin');
        
        // Verifica se veio de página protegida
        const paginaProibida = localStorage.getItem('paginaProibida');
        if (paginaProibida) {
            localStorage.removeItem('paginaProibida');
            window.location.href = paginaProibida; // Volta direto para onde tentou acessar
        } else {
            window.location.href = 'admin-dashboard.html'; // Dashboard padrão
        }
        return;
    }
    
    // 3. Credenciais inválidas
    document.querySelector('.login-container').classList.add('login-error');
    setTimeout(() => {
        document.querySelector('.login-container').classList.remove('login-error');
    }, 2000);
    
    alert('❌ Usuário ou senha incorretos!\n💡 Profissional: cadastre em profissionais.html\n💡 Admin: admin / admin123');
}

// Logout (caso precise em algum lugar)
function logoutCompleto() {
    banco.logoutCompleto();
    window.location.href = 'index.html';
}
