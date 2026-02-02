document.addEventListener('DOMContentLoaded', () => {
    const admin = banco.obterAdminLogado();
    if (!admin) {
        window.location.href = 'index.html';
        return;
    }
    
    document.getElementById('adminNome').textContent = admin.nome;
});

function logoutAdmin() {
    banco.logoutAdmin();
    banco.logout();
    banco.logoutCompleto();
    window.location.href = 'index.html';
}
