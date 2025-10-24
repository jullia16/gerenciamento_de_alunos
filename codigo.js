let alunos = [];
let indexEdicao = -1; // Armazena o índice do aluno que está sendo editado

const form = document.getElementById('formAluno');
const tabela = document.getElementById('tabelaAlunos').getElementsByTagName('tbody')[0];

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const idade = document.getElementById('idade').value;
  const curso = document.getElementById('curso').value;
  const nota = document.getElementById('nota').value;

  if (indexEdicao === -1) {
    alunos.push({ nome, idade, curso, nota });
  } else {
    alunos[indexEdicao] = { nome, idade, curso, nota };
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
    row.insertCell(3).textContent = aluno.nota;

    const acoes = row.insertCell(4);
    acoes.innerHTML = `
      <button onclick="editarAluno(${index})">Editar</button>
      <button onclick="excluirAluno(${index})">Excluir</button>
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
  document.getElementById('nota').value = aluno.nota;
  indexEdicao = index;
}
