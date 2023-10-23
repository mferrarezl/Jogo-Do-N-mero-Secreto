let listaNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = geraNumeroAleatorio();
let tentativas = 1;

function exibeTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function exibirTextoInicial() {
    exibeTextoNaTela('h1', 'Jogo do número secreto');
    exibeTextoNaTela('p', 'Escolha um número entre 1 e 100');
}

exibirTextoInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibeTextoNaTela('h1', 'Você acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Parabéns, você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibeTextoNaTela('p', mensagemTentativa)
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else if (chute > numeroSecreto) {
        exibeTextoNaTela('p', 'O número secreto é menor')
    } else {
        exibeTextoNaTela('p', 'O número secreto é maior')
    }
    tentativas++;
    limparCampo();
}

function geraNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeNumerosNaLista = listaNumerosSorteados.length;

    if (quantidadeDeNumerosNaLista == numeroLimite) {
        listaNumerosSorteados = [];
    }
    if (listaNumerosSorteados.includes(numeroEscolhido)) {
        return geraNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarBotao() {
    tentativas = 1;
    numeroSecreto = geraNumeroAleatorio();
    limparCampo();
    exibirTextoInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}