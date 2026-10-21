/* ==========================================================
   QUIZ "NÃO CAIA NESSA!"
   Para adicionar uma pergunta nova, copie um bloco da lista
   "perguntas" abaixo e mude os textos. Não precisa mexer em
   mais nada!
   ========================================================== */

// Lista de perguntas. Cada uma tem:
//   texto       -> a pergunta
//   opcoes      -> as respostas possíveis
//   correta     -> posição da resposta certa (começa do 0!)
//   explicacao  -> aparece depois que a pessoa responde
const perguntas = [
  {
    texto: "Você recebeu uma mensagem pedindo um código enviado ao seu celular. O que deve fazer?",
    opcoes: [
      "Enviar o código imediatamente",
      "Não compartilhar o código com ninguém",
      "Enviar só se a pessoa disser que é urgente"
    ],
    correta: 1,
    explicacao: "Esse código é a chave da sua conta. Nenhuma empresa de verdade pede ele por mensagem."
  },
  {
    texto: "Alguém chama no WhatsApp dizendo ser seu parente, com número novo, e pede um Pix urgente. E agora?",
    opcoes: [
      "Fazer o Pix rápido, é um parente",
      "Perguntar o nome completo pelo mesmo chat",
      "Ligar para o número antigo do parente e confirmar"
    ],
    correta: 2,
    explicacao: "Golpistas copiam foto e nome de parentes. Confirmar por outro canal (ligação) é o jeito mais seguro."
  },
  {
    texto: "Chegou um link com 90% de desconto em um celular. O que fazer?",
    opcoes: [
      "Clicar rápido antes que acabe",
      "Digitar o endereço oficial da loja e conferir a oferta lá",
      "Compartilhar com os amigos para eles aproveitarem"
    ],
    correta: 1,
    explicacao: "Oferta boa demais é sinal de alerta. Acesse sempre o site oficial digitando o endereço."
  },
  {
    texto: "Qual destas senhas é a mais segura?",
    opcoes: [
      "123456",
      "joao1998",
      "Meu gato dorme 14h por dia!"
    ],
    correta: 2,
    explicacao: "Senhas longas, com letras, números e símbolos, são muito mais difíceis de descobrir."
  },
  {
    texto: "Para que serve a autenticação em dois fatores?",
    opcoes: [
      "Pedir uma segunda confirmação além da senha",
      "Deixar o celular mais rápido",
      "Trocar a senha automaticamente todo dia"
    ],
    correta: 0,
    explicacao: "Mesmo que roubem sua senha, o golpista ainda precisaria da segunda confirmação."
  }
];

/* ---------- Pegando os elementos da página (pelo id do HTML) ---------- */
const areaPergunta = document.getElementById("area-pergunta");
const areaFinal = document.getElementById("area-final");
const progresso = document.getElementById("progresso");
const textoPergunta = document.getElementById("pergunta");
const caixaOpcoes = document.getElementById("opcoes");
const feedback = document.getElementById("feedback");
const botaoProxima = document.getElementById("proxima");
const botaoRecomecar = document.getElementById("recomecar");
const textoPontuacao = document.getElementById("pontuacao");
const mensagemFinal = document.getElementById("mensagem-final");

/* ---------- Variáveis que guardam o andamento do quiz ---------- */
let perguntaAtual = 0; // em qual pergunta estamos
let acertos = 0;       // quantas a pessoa já acertou

/* Mostra a pergunta da vez */
function mostrarPergunta() {
  const p = perguntas[perguntaAtual];

  progresso.textContent = "Pergunta " + (perguntaAtual + 1) + " de " + perguntas.length;
  textoPergunta.textContent = p.texto;
  feedback.textContent = "";
  feedback.className = "";
  botaoProxima.hidden = true;
  caixaOpcoes.innerHTML = ""; // limpa as opções antigas

  // Cria um botão para cada opção
  p.opcoes.forEach(function (texto, indice) {
    const botao = document.createElement("button");
    botao.className = "opcao";
    botao.textContent = texto;
    botao.addEventListener("click", function () {
      responder(indice);
    });
    caixaOpcoes.appendChild(botao);
  });
}

/* Chamada quando a pessoa clica em uma opção */
function responder(escolhida) {
  const p = perguntas[perguntaAtual];
  const botoes = caixaOpcoes.querySelectorAll("button");

  // Trava os botões para não responder duas vezes
  botoes.forEach(function (b) { b.disabled = true; });

  // Pinta a resposta certa de verde
  botoes[p.correta].classList.add("certa");

  if (escolhida === p.correta) {
    acertos++;
    feedback.textContent = "✅ Correto! " + p.explicacao;
    feedback.className = "acertou";
  } else {
    botoes[escolhida].classList.add("errada");
    feedback.textContent = "❌ Ops! " + p.explicacao;
    feedback.className = "errou";
  }

  // Na última pergunta o botão vira "Ver resultado"
  const ultima = perguntaAtual === perguntas.length - 1;
  botaoProxima.textContent = ultima ? "Ver resultado" : "Próxima pergunta";
  botaoProxima.hidden = false;
  botaoProxima.focus();
}

/* Vai para a próxima pergunta, ou para o resultado final */
function avancar() {
  perguntaAtual++;
  if (perguntaAtual < perguntas.length) {
    mostrarPergunta();
  } else {
    mostrarResultado();
  }
}

/* Tela final com a pontuação */
function mostrarResultado() {
  areaPergunta.hidden = true;
  areaFinal.hidden = false;

  textoPontuacao.textContent = "Você acertou " + acertos + " de " + perguntas.length + "!";

  if (acertos === perguntas.length) {
    mensagemFinal.textContent = "🏆 Parabéns! Você está pronto(a) para não cair em golpes. Compartilhe esse conhecimento com família e amigos.";
  } else if (acertos >= 3) {
    mensagemFinal.textContent = "👏 Muito bem! Você já sabe bastante. Releia as dicas acima e tente de novo para gabaritar.";
  } else {
    mensagemFinal.textContent = "📚 Vale revisar o conteúdo! Leia os golpes e as dicas de novo e refaça o quiz.";
  }
}

/* Volta tudo ao começo */
function recomecar() {
  perguntaAtual = 0;
  acertos = 0;
  areaFinal.hidden = true;
  areaPergunta.hidden = false;
  mostrarPergunta();
}

/* Liga os botões às funções */
botaoProxima.addEventListener("click", avancar);
botaoRecomecar.addEventListener("click", recomecar);

/* Começa o quiz quando a página abre */
mostrarPergunta();