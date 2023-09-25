/*
  --------------------------------------------------------------------------------------
  Função para obter aluno existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getAluno = async (doc) => {
    let url = 'http://127.0.0.1:5001/aluno?documento=' + doc;
    fetch(url, {
      method: 'get',
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        document.getElementById("newNome").value = data.nome;
        document.getElementById("newDocumento").value = data.documento;
        document.getElementById("newDataNascimento").value = data.data_nascimento;
        document.getElementById("newGenero").value = data.genero;
        document.getElementById("newEmail").value = data.email;
        document.getElementById("newTelefone").value = data.telefone;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const docParam = urlParams.get('doc');
    if (docParam !== null) {
      getAluno(docParam);
    }
});

/*
  --------------------------------------------------------------------------------------
  Função para atualizar um aluno PUT
  --------------------------------------------------------------------------------------
*/
const putItem = async (inputNome, inputDocumento, inputDataNascimento, inputGenero, inputEmail, inputTelefone) => {
    const formData = new FormData();
    formData.append('nome', inputNome);
    formData.append('documento', inputDocumento);
    formData.append('data_nascimento', inputDataNascimento);
    formData.append('genero', inputGenero);
    formData.append('email', inputEmail);
    formData.append('telefone', inputTelefone);
  
    let url = 'http://127.0.0.1:5001/aluno';
    fetch(url, {
      method: 'put',
      body: formData
    })
    .then((response) => response.json())
    .catch((error) => {
    console.error('Error:', error);
    });
  }

  /*
  --------------------------------------------------------------------------------------
  Função para atualizar o aluno
  --------------------------------------------------------------------------------------
*/
const updateItem = async () => {
    let inputNome = document.getElementById("newNome").value;
    let inputDocumento = document.getElementById("newDocumento").value;
    let inputDataNascimento = document.getElementById("newDataNascimento").value;
    let inputGenero = document.getElementById("newGenero").value;
    let inputEmail = document.getElementById("newEmail").value;
    let inputTelefone = document.getElementById("newTelefone").value;
  
    if (inputNome === '' || inputDocumento === '' || inputDataNascimento === '' || inputGenero === '' || inputEmail === '' || inputTelefone === '') {
      alert("Preencha todos os dados do aluno!");
    } else {
      await putItem(inputNome, inputDocumento, inputDataNascimento, inputGenero, inputEmail, inputTelefone)
      window.location.href = "index.html"
      alert("Aluno atualizado!")
    }
  }