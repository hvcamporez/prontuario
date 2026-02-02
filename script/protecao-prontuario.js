document.addEventListener('DOMContentLoaded', () => {
    const tipoUsuario = banco.obterTipoUsuarioLogado();
    const profissional = banco.obterProfissionalLogado();
    
    if (!tipoUsuario || tipoUsuario !== 'profissional' || !profissional) {
        alert('⚠️ Faça login como profissional primeiro!');
        window.location.href = 'login.html';
    }
    
    // Opcional: mostrar nome do profissional logado
    const header = document.querySelector('h1');
    if (header) {
        header.innerHTML += ` - ${profissional.nome}`;
    }
});
