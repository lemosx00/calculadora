const display = document.getElementById('display');

// --- LÓGICA DA CALCULADORA ---

function add(valor) {
    display.value += valor;
}

function limpar() {
    display.value = '';
}

function apagarUm() {
    display.value = display.value.slice(0, -1);
}

function calcular() {
    const valorDisplay = display.value;
    if (!valorDisplay) return;

    try {
        const resultado = new Function(`return ${valorDisplay}`)();
        
        if (isNaN(resultado) || !isFinite(resultado)) {
            display.value = "Erro";
        } else {
            // Number() remove zeros desnecessários à direita após o toFixed
            display.value = Number(resultado.toFixed(8));
        }
    } catch (error) {
        display.value = "Erro";
    }
}

// --- LÓGICA DE TEMA (CLARO/ESCURO) ---

function toggleTheme() {
    // Adiciona ou remove a classe .dark-mode do body
    document.body.classList.toggle('dark-mode');
    
    // Salva a preferência atual para a próxima vez que abrir o site
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('tema-preferido', isDark ? 'dark' : 'light');
}

// Função que roda assim que o script carrega
function carregarConfiguracoes() {
    const temaSalvo = localStorage.getItem('tema-preferido');
    const prefereEscuroSistema = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Aplica o modo escuro se o usuário escolheu antes OU se o sistema estiver no modo escuro
    if (temaSalvo === 'dark' || (!temaSalvo && prefereEscuroSistema)) {
        document.body.classList.add('dark-mode');
    }
}

// Inicializa o tema ao carregar
carregarConfiguracoes();

// --- ATALHOS DE TECLADO ---

document.addEventListener('keydown', (evento) => {
    const tecla = evento.key;

    if (/[0-9]/.test(tecla)) add(tecla); 
    if (['+', '-', '*', '/'].includes(tecla)) add(tecla); 
    if (tecla === 'Enter') {
        evento.preventDefault(); 
        calcular();
    }
    if (tecla === 'Escape') limpar();
    if (tecla === 'Backspace') apagarUm();
});