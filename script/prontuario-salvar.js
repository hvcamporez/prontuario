function salvarProntuario() {
    const profissionalLogado = banco.obterProfissionalLogado();
    
    if (!profissionalLogado) {
        alert('❌ Faça login como profissional primeiro!');
        window.location.href = 'login.html';
        return;
    }

    // Coleta TODOS os dados do formulário
    const dadosPaciente = {
        paciente: {
            nomeCompleto: document.getElementById('nomeCompleto')?.value || '',
            nomeSocial: document.getElementById('nomeSocial')?.value || '',
            dataNascimento: document.getElementById('dataNascimento')?.value || '',
            sexo: document.getElementById('sexo')?.value || '',
            nomeMae: document.getElementById('nomeMae')?.value || '',
            naturalidade: document.getElementById('naturalidade')?.value || '',
            endereco: document.getElementById('endereco')?.value || '',
            documento: document.getElementById('documento')?.value || '',
            estadoCivil: document.getElementById('estadoCivil')?.value || '',
            cartaoSUS: document.getElementById('cartaoSUS')?.value || '',
            convenio: document.getElementById('convenio')?.value || '',
            contatoFamiliar: document.getElementById('contatoFamiliar')?.value || ''
        },
        sinaisVitais: {
            pa: document.querySelector('[placeholder*="PA"]')?.value || '',
            fc: document.querySelector('[placeholder*="FC"]')?.value || '',
            fr: document.querySelector('[placeholder*="FR"]')?.value || '',
            temp: document.querySelector('[placeholder*="Temperatura"]')?.value || ''
        },
        anotacoes: document.getElementById('anotacoes')?.value || '',
        profissional: {
            id: profissionalLogado.id,
            nome: profissionalLogado.nome,
            categoria: profissionalLogado.categoria,
            conselho: profissionalLogado.conselho
        },
        dataHora: new Date().toISOString(),
        timestampFormatado: banco.formatarDataHora(new Date())
    };

    // Salva no banco
    const idRegistro = banco.salvarProntuario(dadosPaciente);
    
    // MOSTRA ASSINATURA AUTOMÁTICA
    const assinatura = document.getElementById('assinatura');
    if (assinatura) {
        assinatura.style.display = 'block';
        document.getElementById('profNome').textContent = profissionalLogado.nome;
        document.getElementById('profCat').textContent = profissionalLogado.categoria;
        document.getElementById('profConselho').textContent = profissionalLogado.conselho;
        document.getElementById('dataRegistro').textContent = banco.formatarDataHora(new Date());
    }
    
    alert(`✅ Anotação #${idRegistro} salva com assinatura digital!\n\nProfissional: ${profissionalLogado.nome}`);
    
    console.log('✅ Registro completo salvo:', dadosPaciente);
    
    // Limpa formulário (opcional)
    // document.querySelector('form')?.reset();
}
