/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5001/alunos';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.alunos.forEach(item => insertList(item.nome, item.documento, item.data_nascimento))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputNome, inputDocumento, inputDataNascimento, inputGenero, inputEmail, inputTelefone) => {
  const formData = new FormData();
  formData.append('nome', inputNome);
  formData.append('documento', inputDocumento);
  formData.append('vadata_nascimentolor', inputDataNascimento);
  formData.append('genero', inputGenero);
  formData.append('email', inputEmail);
  formData.append('telefone', inputTelefone);

  let url = 'http://127.0.0.1:5001/aluno';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}

/*
  --------------------------------------------------------------------------------------
  Função para criar um link de editar para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertEditButton = (parent, doc) => {
  let anchor = document.createElement("a");
  let txt = document.createTextNode("Editar");
  anchor.appendChild(txt);
  anchor.href = "editar.html?doc=" + doc;
  parent.appendChild(anchor);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const documento = div.getElementsByTagName('td')[1].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(documento)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5001/aluno?documento=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com nome, quantidade e valor 
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let inputNome = document.getElementById("newNome").value;
  let inputDocumento = document.getElementById("newDocumento").value;
  let inputDataNascimento = document.getElementById("newDataNascimento").value;
  let inputGenero = document.getElementById("newGenero").value;
  let inputEmail = document.getElementById("newEmail").value;
  let inputTelefone = document.getElementById("newTelefone").value;

  if (inputNome === '' || inputDocumento === '' || inputDataNascimento === '' || inputGenero === '' || inputEmail === '' || inputTelefone === '') {
    alert("Preencha todos os dados do aluno!");
  } else {
    insertList(inputNome, inputDocumento, inputDataNascimento)
    postItem(inputNome, inputDocumento, inputDataNascimento, inputGenero, inputEmail, inputTelefone)
    alert("Aluno cadastrado!")
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (name, doc, data_nascimento) => {
  var item = [name, doc, data_nascimento]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertEditButton(row.insertCell(-1), doc)
  insertButton(row.insertCell(-1))
  document.getElementById("newNome").value = "";
  document.getElementById("newDocumento").value = "";
  document.getElementById("newDataNascimento").value = "";
  document.getElementById("newGenero").value = "";
  document.getElementById("newEmail").value = "";
  document.getElementById("newTelefone").value = "";

  removeElement()
}


async function verificaOperadora(numero) {
  try {
    // Remove caracteres especiais
    const numeroLimpo = numero.replace(/\D/g, '');

    // Define a chave da API
    const apiKey = "029e5b301413c616bc77b1adf9b7aa2a";

    // Monta a URL da API com o número limpo e a chave API
    const url = `http://apilayer.net/api/validate?access_key=${apiKey}&number=${numeroLimpo}&country_code=BR&format=1`;

    // Faz a chamada da API
    const response = await fetch(url);

    // Verifica se a resposta é válida
    if (!response.ok) {
      throw new Error('Erro na chamada da API');
    }

    // Converte a resposta para JSON
    const data = await response.json();

    // Exibe um alerta com informações sobre a validade e a operadora do número
    if (data.valid) {
      alert(`O número de telefone é válido! Operadora: ${data.carrier}`);
    } else {
      alert('O número de telefone não é válido.');
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}

document.getElementById('newTelefone').addEventListener('blur', () => {
  verificaOperadora(document.getElementById('newTelefone').value);
});