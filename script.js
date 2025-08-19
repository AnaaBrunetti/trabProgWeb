// cadastro
function cadastrarUsuario() {
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value;
  const confirmar = document.getElementById('confirmarSenha').value;
  const msg = document.getElementById('mensagemCadastro');

  if (senha.length < 6) {
    msg.textContent = 'A senha deve ter pelo menos 6 caracteres.';
    return false;
  }

  if (senha !== confirmar) {
    msg.textContent = 'As senhas não coincidem.';
    return false;
  }

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const existe = usuarios.find(u => u.email === email);

  if (existe) {
    msg.textContent = 'Email já cadastrado.';
    return false;
  }

  usuarios.push({ nome, email, senha });
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  alert('Cadastro realizado com sucesso!');
  window.location.href = 'login.html';
  return false;
}

// login
function fazerLogin() {
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value;
  const msg = document.getElementById('mensagem');

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);

  if (usuario) {
    alert(`Bem-vindo, ${usuario.nome}!`);
    window.location.href = 'index.html';
  } else {
    msg.textContent = 'Email ou senha incorretos.';
  }

  return false;
}

// rec senha
function recuperarSenha() {
  const email = document.getElementById('recuperarEmail').value.trim();
  const msg = document.getElementById('mensagemRecuperar');

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const existe = usuarios.find(u => u.email === email);

  if (existe) {
    msg.textContent = 'Um link de recuperação foi enviado para seu email (simulado).';
  } else {
    msg.textContent = 'Email não cadastrado.';
  }

  return false;
}

// jogo

const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const gameArea = document.getElementById("gameArea");

const lastTimeEl = document.getElementById("lastTime");
const bestTimeEl = document.getElementById("bestTime");
const averageTimeEl = document.getElementById("averageTime");
const attemptsEl = document.getElementById("attempts");

let startTime = 0;
let timeoutId;
let results = [];

// iniciar o jogo
startBtn.addEventListener("click", () => {
    gameArea.style.backgroundColor = "red";
    gameArea.textContent = "Espere ficar verde...";
    
    // Tempo aleatório entre 1 e 5 segundos
    const delay = Math.floor(Math.random() * 4000) + 1000;
    
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        gameArea.style.backgroundColor = "green";
        gameArea.textContent = "CLIQUE AGORA!";
        startTime = Date.now();
    }, delay);
});

// Função de clique no jogo
gameArea.addEventListener("click", () => {
    if (startTime === 0) {
        // Clicou antes 
        gameArea.textContent = "Cedo demais! Clique em Iniciar.";
        clearTimeout(timeoutId);
    } else {
        // Calcula tempo
        const reactionTime = Date.now() - startTime;
        results.push(reactionTime);

        // Atualiza 
        lastTimeEl.textContent = reactionTime;
        bestTimeEl.textContent = Math.min(...results);
        averageTimeEl.textContent = Math.round(results.reduce((a,b)=>a+b,0)/results.length);
        attemptsEl.textContent = results.length;

        // Reseta 
        gameArea.style.backgroundColor = "lightgray";
        gameArea.textContent = "Clique em Iniciar para tentar novamente";
        startTime = 0;
    }
});

// Botão de reset
resetBtn.addEventListener("click", () => {
    results = [];
    lastTimeEl.textContent = "-";
    bestTimeEl.textContent = "-";
    averageTimeEl.textContent = "-";
    attemptsEl.textContent = "0";
    gameArea.style.backgroundColor = "lightgray";
    gameArea.textContent = "Clique em Iniciar para começar";
    startTime = 0;
});

