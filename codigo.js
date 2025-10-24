class Aluno {
  constructor(nome, idade, curso, notaFinal) {
    this.nome = nome;
    this.idade = parseInt(idade);
    this.curso = curso;
    this.notaFinal = parseFloat(notaFinal);
  }

  isAprovado = () => this.notaFinal >= 7;
  toString = () => `${this.nome}, ${this.idade} anos, curso de ${this.curso}, nota ${this.notaFinal}`;
}

let alunos = [];
let indexEdicao = -1;

const form = document.getElementById('formAluno');
const tabela = document.querySelector('#tabelaAlunos tbody');
const relatoriosDiv = document.getElementById('relatorios');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const idade = document.getElementById('idade').value;
  const curso = document.getElementById('curso').value;
  const nota = document.getElementById('nota').value;

  const aluno = new Aluno(nome, idade, curso, nota);

  if (indexEdicao === -1) {
    alunos.push(aluno);
    alert("Aluno cadastrado!");
  } else {
    alunos[indexEdicao] = aluno;
    alert("Aluno atualizado!");
    indexEdicao = -1;
  }

  form.reset();
  renderTabela();
});

const renderTabela = () => {
  tabela.innerHTML = '';

  alunos.forEach((aluno, index) => {
    const row = tabela.insertRow();

    row.insertCell(0).textContent = aluno.nome;
    row.insertCell(1).textContent = aluno.idade;
    row.insertCell(2).textContent = aluno.curso;
    row.insertCell(3).textContent = aluno.notaFinal;
    row.insertCell(4).textContent = aluno.isAprovado() ? 'Aprovado ✅' : 'Reprovado ❌';

    const acoes = row.insertCell(5);
    const btnEditar = document.createElement('button');
    const btnExcluir = document.createElement('button');

    btnEditar.textContent = 'Editar';
    btnExcluir.textContent = 'Excluir';

    btnEditar.addEventListener('click', () => editarAluno(index));
    btnExcluir.addEventListener('click', () => excluirAluno(index));

    acoes.appendChild(btnEditar);
    acoes.appendChild(btnExcluir);
  });
};

const editarAluno = (index) => {
  const aluno = alunos[index];
  document.getElementById('nome').value = aluno.nome;
  document.getElementById('idade').value = aluno.idade;
  document.getElementById('curso').value = aluno.curso;
  document.getElementById('nota').value = aluno.notaFinal;
  indexEdicao = index;
};

const excluirAluno = (index) => {
  if (confirm(`Deseja excluir ${alunos[index].nome}?`)) {
    alunos.splice(index, 1);
    renderTabela();
  }
};

document.getElementById('btnAprovados').addEventListener('click', () => {
  const aprovados = alunos.filter(a => a.isAprovado());
  if (aprovados.length === 0) {
    relatoriosDiv.innerHTML = "<p>Nenhum aluno aprovado.</p>";
  } else {
    relatoriosDiv.innerHTML = "<h4>Alunos Aprovados:</h4>" +
      aprovados.map(a => `<p>${a.nome} - Nota ${a.notaFinal}</p>`).join('');
  }
});

document.getElementById('btnMediaNotas').addEventListener('click', () => {
  if (alunos.length === 0) return alert("Nenhum aluno cadastrado.");
  const media = alunos.reduce((acc, a) => acc + a.notaFinal, 0) / alunos.length;
  relatoriosDiv.innerHTML = `<p>Média das notas: <strong>${media.toFixed(2)}</strong></p>`;
});

document.getElementById('btnMediaIdades').addEventListener('click', () => {
  if (alunos.length === 0) return alert("Nenhum aluno cadastrado.");
  const media = alunos.reduce((acc, a) => acc + a.idade, 0) / alunos.length;
  relatoriosDiv.innerHTML = `<p>Média das idades: <strong>${media.toFixed(1)}</strong></p>`;
});

document.getElementById('btnOrdenarNomes').addEventListener('click', () => {
  const nomesOrdenados = alunos.map(a => a.nome).sort();
  relatoriosDiv.innerHTML = "<h4>Nomes em Ordem Alfabética:</h4>" +
    nomesOrdenados.map(n => `<p>${n}</p>`).join('');
});

document.getElementById('btnQtdPorCurso').addEventListener('click', () => {
  const qtdPorCurso = {};
  alunos.forEach(a => {
    qtdPorCurso[a.curso] = (qtdPorCurso[a.curso] || 0) + 1;
  });

  let html = "<h4>Quantidade de alunos por curso:</h4>";
  for (const curso in qtdPorCurso) {
    html += `<p>${curso}: ${qtdPorCurso[curso]}</p>`;
  }

  relatoriosDiv.innerHTML = html;
});
