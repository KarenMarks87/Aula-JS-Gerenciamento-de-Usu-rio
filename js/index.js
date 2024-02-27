selecionarUsuarios();

// Evento botão salvar após preenchimento do formulário
document.querySelector('#salvar').addEventListener('click', () =>{
let nome = document.querySelector('#exampleInputName').value;
let genero = document.querySelector('input[name=gender]:checked').value;
let dateBirth = document.querySelector('#exampleInputBirth').value;
let country = document.querySelector('#exampleInputCountry').value;
let email = document.querySelector('#exampleInputEmail1').value;
let senha = document.querySelector('#exampleInputPassword1').value;
let foto = document.querySelector('#exampleInputFile').value;
let admin = document.querySelector('#exampleInputAdmin').checked;

if (admin == true) {
    admin = 'Sim';
}                          // Condicional para verificar se o campo admin foi selecionado e trocar a mensagem para Sim ou Não na listagem

else {
    admin = 'Não';
}

// Armazena os dados fornecidos pelos usuários para o banco de dados
let json = { nome: nome, genero: genero, dateBirth: dateBirth, country: country, email: email, senha: senha, foto: foto, admin: admin};

addLinha(json);    // Com a função criada, passamos o json como parametro para captção dos dados cadastrados e adicionar uma nova linha

inserir(json);
});

// Função para criar uma nova linha HTML e aparecerá na listagem da página, contém data e horário da criação do cadastro e botões para editar e excluir usuários
function addLinha(usuario) {
    let tr = document.createElement('tr');

    tr.innerHTML = `
    <td><img src="dist/img/avatar2.png" alt="Imagem do usuário" class="img-sm img-circle"></td>
    <td>${usuario.nome}</td>
    <td>${usuario.email}</td>
    <td>${usuario.admin}</td>
    <td>${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</td>
    <td>
    <button type="button" class="btn btn-primary btn-sm">Editar</button>
    <button type="button" class="btn btn-danger btn-sm btn-delete" data-toggle="modal" data-target="#modalExcluir">Excluir</button>
    </td>
    `;

    document.querySelector('#table-users').appendChild(tr);        // appendChild adiciona valor 
    
    addEventosBtn(tr);   // Função cria eventos para os botões da lista

    atualizaContagem();  
}

// Função para contagem dos usuários e admins cadastrados
function atualizaContagem () {
    let numUsuarios = 0;
    let numAdmins = 0;

    numUsuarios = document.querySelector('#table-users').children.length;  // children pega o elemento filho da tag pai no caso - tbody (pai) tr (filho)

    [...document.querySelector('#table-users').children].forEach(tr => {   // [...] array para verificação, também serve para incluir valor dentro de um array
        if (tr.children[3].innerHTML == 'Sim') {
             numAdmins = numAdmins + 1;
        }
    });

    document.querySelector('#number-users').innerHTML = numUsuarios;
    document.querySelector('#number-users-admin').innerHTML = numAdmins;
}

// Função cria eventos botão excluir, deleta o numero de usuarios e admins e cria um modal na tela para o usuário confirmar a exclusão.
function addEventosBtn(tr) {
    tr.querySelector('.btn-delete').addEventListener('click', t => {
        document.querySelector('#confirmar-exclusao').addEventListener('click', e => {
            tr.remove();
            atualizaContagem();
            $('#modalExcluir').modal('hide');     // jquery (modelo de modal, possível editar a caixa de texto)
        });  
    });
}

// Função para adicionar dados no session storage
function inserir(json) {
    let usuarios = [];

    if (sessionStorage.getItem('usuarios')) {
        usuarios = JSON.parse(sessionStorage.getItem('usuarios'));  // parse converte string para valor (objeto). getItem retorna o valor do dado armazenado na sessão
    }

    usuarios.push(json);  // push adiciona valores dentro do array, sempre na última posição

    sessionStorage.setItem('usuarios', JSON.stringify(usuarios));  // JSON método para converter arquivo json (object) para string. setItem add chave e valor
}

//  insert(data) {
//     quando utiliza sessionStorage, mesmo passando um JSON, o próprio método converte o objeto para string.
//     O toString do objeto JSON retorna [Object]. Teste:
//     sessionStorage.setItem("user", data);
// }
 
function selecionarUsuarios() {
    let usuarios = [];

    if (sessionStorage.getItem('usuarios')) {
        usuarios = JSON.parse(sessionStorage.getItem('usuarios'));
    }     

    usuarios.forEach(usuario => {
        addLinha(usuario);
    });
}