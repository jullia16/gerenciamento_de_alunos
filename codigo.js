class Aluno {
  constructor(nome, idade, curso, notaFinal) {
    this.nome = nome;
    this.idade = idade;
    this.curso = curso;
    this.notaFinal = parseFloat(notaFinal);
  }

  isAprovado() {
    return this.notaFinal >= 7;
  }

  toString() {
    return `${this.nome}, ${this.idade} anos, curso de ${this.curso}, nota ${this.notaFinal}`;
  }
}

let alunos = [];
let indexEdicao = -1;

const form = document.getElementById('formAluno');
const tabela = document.getElementById('tabelaAlunos').getElementsByTagName('tbody')[0];

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const idade = document.getElementById('idade').value;
  const curso = document.getElementById('curso').value;
  const nota = document.getElementById('nota').value;

  const novoAluno = new Aluno(nome, idade, curso, nota);

  if (indexEdicao === -1) {
    alunos.push(novoAluno);
  } else {
    alunos[indexEdicao] = novoAluno;
    indexEdicao = -1;
  }

  form.reset();
  renderTabela();
});

function renderTabela() {
  tabela.innerHTML = '';

  alunos.forEach((aluno, index) => {
    const row = tabela.insertRow();

    row.insertCell(0).textContent = aluno.nome;
    row.insertCell(1).textContent = aluno.idade;
    row.insertCell(2).textContent = aluno.curso;
    row.insertCell(3).textContent = aluno.notaFinal;

    const situacao = aluno.isAprovado() ? 'Aprovado ✅' : 'Reprovado ❌';
    row.insertCell(4).textContent = situacao;

    const acoes = row.insertCell(5);
    acoes.innerHTML = `
      <button onclick="editarAluno(${index})">Editar</button>
      <button onclick="excluirAluno(${index})">Excluir</button>
      <button onclick="mostrarInfo(${index})">Ver Info</button>
    `;
  });
}

function excluirAluno(index) {
  alunos.splice(index, 1);
  renderTabela();
}

function editarAluno(index) {
  const aluno = alunos[index];
  document.getElementById('nome').value = aluno.nome;
  document.getElementById('idade').value = aluno.idade;
  document.getElementById('curso').value = aluno.curso;
  document.getElementById('nota').value = aluno.notaFinal;
  indexEdicao = index;
}

function mostrarInfo(index) {
  const aluno = alunos[index];
  alert(aluno.toString());
}
