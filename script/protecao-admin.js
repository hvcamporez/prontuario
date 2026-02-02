document.addEventListener('DOMContentLoaded', () => {
    const admin = banco.obterAdminLogado();
    if (!admin) {
        
        alert('⚠️ Esta área é restrita a administradores.\nVocê será redirecionado para o login de admin.');
        window.location.href = 'admin-login.html';
    }

    const info = document.getElementById('adminInfo');
    if (info) {
        info.textContent = `Administrador logado: ${admin.nome} (${admin.usuario})`;
    }

});
