let listaNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female',{rate1:2});
}

function exibeMsgInicial(){
    exibirTextoNaTela('h1', 'Jogo advinha o número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}`);
}

exibeMsgInicial();

function verificarChute(){
    console.log('clique no botao chute');
    let chute = document.querySelector('input').value;
    validaChute(chute);
}

function validaChute(chute){
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!!!');
        let palavraTentativas = tentativas > 1 ? 'tentativas': 'tentativa';
        let msgTentativas = `Você descobriu o número secreto em ${tentativas} ${palavraTentativas}!`;
        exibirTextoNaTela('p', msgTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', `O número secreto é menor que ${chute}.`);
        } else {
            exibirTextoNaTela('p', `O número secreto é maior que ${chute}.`);
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroSorteado = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementosLista = listaNumerosSorteados.length;

    if (quantidadeElementosLista == numeroLimite){
        listaNumerosSorteados = [];
    }
    if (listaNumerosSorteados.includes(numeroSorteado)){
        return gerarNumeroAleatorio();
    }else{
        listaNumerosSorteados.push(numeroSorteado);
        console.log('numeroSorteado: ' + numeroSorteado);
        return numeroSorteado;
    }
}

function limparCampo(params) {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibeMsgInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}