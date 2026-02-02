document.addEventListener('DOMContentLoaded', function() {
    // Verifica autenticação admin
    const adminLogado = banco.obterAdminLogado();
    const tipoUsuario = banco.obterTipoUsuarioLogado();
    
    // Se NÃO é admin logado
    if (!adminLogado || tipoUsuario !== 'admin') {
        // REDIRECIONAMENTO SILENCIOSO (sem alert)
        window.location.href = 'login.html';
        return;
    }
    
    // Admin OK - mostra barra com info
    const adminInfo = document.getElementById('adminInfo');
    if (adminInfo) {
        adminInfo.textContent = `Admin logado: ${adminLogado.nome}`;
    }
    
    console.log('✅ Acesso admin liberado:', adminLogado);
});

// Logout Admin (adicione no profissionais.js ou inline)
function logoutAdminProf() {
    banco.logoutCompleto();
    window.location.href = 'index.html';
}
