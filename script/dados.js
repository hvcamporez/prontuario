// ========================================
// BANCO CENTRALIZADO - PRONTUÁRIO v2
// ========================================

class BancoProntuario {
    constructor() {
        this.CHAVE_PROFISSIONAIS = 'profissionais_v1';
        this.CHAVE_PACIENTES = 'pacientes_v1';
        this.CHAVE_PRONTUARIOS = 'prontuarios_v1';
        this.CHAVE_LOGADO = 'profissionalLogado_v1';
        this.CHAVE_ADMIN_LOGADO = 'adminLogado_v1';
        this.CHAVE_TIPO_USUARIO = 'tipoUsuarioLogado_v1';
    }

    // PROFISSIONAIS
    obterProfissionais() {
        return JSON.parse(localStorage.getItem(this.CHAVE_PROFISSIONAIS) || '[]');
    }

    salvarProfissionais(profissionais) {
        localStorage.setItem(this.CHAVE_PROFISSIONAIS, JSON.stringify(profissionais));
    }

    // PACIENTES (dados fictícios para teste)
    obterPacientes() {
        let pacientes = JSON.parse(localStorage.getItem(this.CHAVE_PACIENTES) || '[]');
        if (pacientes.length === 0) {
            pacientes = [
                {
                    id: 1,
                    nomeCompleto: "Maria Silva Santos",
                    dataNascimento: "1985-03-15",
                    cartaoSUS: "123456789012345",
                    sexo: "F",
                    nomeMae: "Ana Silva",
                    naturalidade: "São Paulo/SP"
                },
                {
                    id: 2,
                    nomeCompleto: "José Oliveira",
                    dataNascimento: "1990-07-22",
                    cartaoSUS: "987654321098765",
                    sexo: "M",
                    nomeMae: "Maria Oliveira",
                    naturalidade: "Rio de Janeiro/RJ"
                }
            ];
            this.salvarPacientes(pacientes);
        }
        return pacientes;
    }

    salvarPacientes(pacientes) {
        localStorage.setItem(this.CHAVE_PACIENTES, JSON.stringify(pacientes));
    }

    // PRONTUÁRIOS/ANOTAÇÕES
    obterProntuarios() {
        return JSON.parse(localStorage.getItem(this.CHAVE_PRONTUARIOS) || '[]');
    }

    salvarProntuario(prontuario) {
        const prontuarios = this.obterProntuarios();
        prontuario.id = Date.now(); // ID único
        prontuarios.push(prontuario);
        localStorage.setItem(this.CHAVE_PRONTUARIOS, JSON.stringify(prontuarios));
        return prontuario.id;
    }

    // PROFISSIONAL LOGADO
    obterProfissionalLogado() {
        return JSON.parse(localStorage.getItem(this.CHAVE_LOGADO) || 'null');
    }

    salvarProfissionalLogado(profissional) {
        localStorage.setItem(this.CHAVE_LOGADO, JSON.stringify(profissional));
    }

    logoutProfissional() {
        localStorage.removeItem(this.CHAVE_LOGADO);
    }

    // ADMIN
    obterAdminLogado() {
        return JSON.parse(localStorage.getItem(this.CHAVE_ADMIN_LOGADO) || 'null');
    }

    salvarAdminLogado(admin) {
        localStorage.setItem(this.CHAVE_ADMIN_LOGADO, JSON.stringify(admin));
    }

    logoutAdmin() {
        localStorage.removeItem(this.CHAVE_ADMIN_LOGADO);
    }

    // TIPO DE USUÁRIO
    obterTipoUsuarioLogado() {
        return localStorage.getItem(this.CHAVE_TIPO_USUARIO) || null;
    }

    salvarTipoUsuarioLogado(tipo) {
        localStorage.setItem(this.CHAVE_TIPO_USUARIO, tipo);
    }

    // LOGOUT COMPLETO
    logoutCompleto() {
        this.logoutProfissional();
        this.logoutAdmin();
        localStorage.removeItem(this.CHAVE_TIPO_USUARIO);
    }

    // UTILITÁRIOS
    formatarDataHora(data) {
        return new Date(data).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

// ADMIN PADRÃO (para uso didático)
const ADMIN_PADRAO = {
    usuario: 'admin',
    senha: 'admin123',
    nome: 'Administrador do Sistema'
};

// INSTÂNCIA GLOBAL
const banco = new BancoProntuario();
window.banco = banco;
