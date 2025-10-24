class Aluno {
  constructor(nome, idade, curso, notaFinal) {
    this.nome = nome;
    this.idade = idade;
    this.curso = curso;
    this.notaFinal = parseFloat(notaFinal);
  }

  isAprovado = () => this.notaFinal >= 7;

  toString = () => `${this.nome}, ${this.idade} anos, curso de ${this.curso}, nota ${this.notaFinal}`;
}

let alunos = [];
let indexEdicao = -1;

const form = document.getElementById('formAluno');
const tabela = document.getElementById('tabelaAlunos').querySelector('tbody');
const btnCadastrar = document.getElementById('btnCadastrar');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const idade = document.getElementById('idade').value;
  const curso = document.getElementById('curso').value;
  const nota = document.getElementById('nota').value;

  const aluno = new Aluno(nome, idade, curso, nota);

  if (indexEdicao === -1) {
    alunos.push(aluno);
    alert("Aluno cadastrado com sucesso!");
    console.log(`✅ Cadastrado: ${aluno.toString()}`);
  } else {
    alunos[indexEdicao] = aluno;
    alert("Aluno editado com sucesso!");
    console.log(`✏️ Editado: ${aluno.toString()}`);
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

    const cellAcoes = row.insertCell(5);
    const btnEditar = document.createElement('button');
    const btnExcluir = document.createElement('button');
    const btnInfo = document.createElement('button');

    btnEditar.textContent = 'Editar';
    btnExcluir.textContent = 'Excluir';
    btnInfo.textContent = 'Info';

    btnEditar.addEventListener('click', () => {
      document.getElementById('nome').value = aluno.nome;
      document.getElementById('idade').value = aluno.idade;
      document.getElementById('curso').value = aluno.curso;
      document.getElementById('nota').value = aluno.notaFinal;
      indexEdicao = index;
    });

    btnExcluir.addEventListener('click', () => {
      if (confirm(`Tem certeza que deseja excluir ${aluno.nome}?`)) {
        alunos.splice(index, 1);
        alert("Aluno excluído!");
        console.log(`🗑️ Excluído: ${aluno.toString()}`);
        renderTabela();
      }
    });

    btnInfo.addEventListener('click', () => {
      alert(aluno.toString());
    });

    cellAcoes.appendChild(btnEditar);
    cellAcoes.appendChild(btnExcluir);
    cellAcoes.appendChild(btnInfo);
  });
};
