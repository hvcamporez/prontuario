function fazerLoginAdmin(event) {
    event.preventDefault();

    const usuario = document.getElementById('adminUsuario').value;
    const senha = document.getElementById('adminSenha').value;

    if (usuario === ADMIN_PADRAO.usuario && senha === ADMIN_PADRAO.senha) {
        banco.salvarAdminLogado({
            usuario,
            nome: ADMIN_PADRAO.nome
        });
        alert('✅ Acesso administrativo liberado!');
        // volta para gestão de profissionais
        window.location.href = 'profissionais.html';
    } else {
        alert('❌ Usuário ou senha de administrador inválidos.');
    }

    return false;
}
