<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Escolha seu Projeto</title>
    <link rel="stylesheet" href="cursos.css">
    <style>
        /* Pra garantir que detalhes fiquem escondidos inicialmente */
        .project-detalhes {
            display: none;
            margin-top: 10px;
            padding: 10px;
            border: 1px solid #ddd;
            background-color: #f9f9f9;
        }
        .project {
            cursor: pointer;
            margin-bottom: 15px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        .project:hover {
            background-color: #f0f8ff;
        }
        button {
            cursor: pointer;
            padding: 6px 12px;
            background-color: #0077cc;
            border: none;
            color: white;
            border-radius: 4px;
            margin-top: 5px;
        }
        button:hover {
            background-color: #005fa3;
        }
        input[type="text"] {
            padding: 5px;
            width: 200px;
            margin-right: 10px;
        }
    </style>
</head>
<body>

<header>
    <nav>
        <ul>
            <li class="active">Cursos</li>
            <li><a href="usuario.html" style="color: white;">Usuário</a></li>
        </ul>
    </nav>
    <div class="user-photo-container" title="Adicionar foto">
        <img id="userPhoto" src="" alt="Foto do Usuário" />
        <input type="file" id="photoInput" accept="image/*" />
    </div>
</header>

<main>
    <h2>Escolha um Projeto para Aprender</h2>
    <div id="projetos"></div>
</main>

<script>
document.addEventListener("DOMContentLoaded", function () {
    const projetosDiv = document.getElementById("projetos");

    if (projetosDiv) {
        const projetos = [
            {
                nome: "Calculadora Simples",
                descricao: "Uma calculadora básica.",
                icon: "📈",
                introducao: "Aprenda operações matemáticas básicas com JavaScript.",
                dataLiberacao: "2025-05-25T15:00:00"
            },
            {
                nome: "Conversor de Moedas",
                descricao: "Converta moedas facilmente.",
                icon: "💸",
                introducao: "Entenda como usar APIs de câmbio em tempo real.",
                dataLiberacao: "2025-05-23T17:20:00"
            }
        ];

        projetos.forEach((projeto, index) => {
            const projetoDiv = document.createElement("div");
            projetoDiv.className = "project";
            projetoDiv.innerHTML = `
                <h3>${projeto.icon} ${projeto.nome}</h3>
                <p>${projeto.descricao}</p>
                <div class="project-detalhes" id="detalhes-${index}">
                    <p><strong>Introdução:</strong> ${projeto.introducao}</p>
                    <form onsubmit="inscreverUsuario(event, '${projeto.nome}')">
                        <input type="text" name="nomeAluno" placeholder="Seu nome" required />
                        <button type="submit">Inscrever</button>
                    </form>
                    <div class="material-didatico" id="material-${index}">
                        ${checarLiberacao(projeto.dataLiberacao) ?
                            '<a href="#" style="color: #90e0ef;">📘 Acessar material didático</a>' :
                            '<p class="material-bloqueado">⏰ Material disponível a partir de: ' + formatarData(projeto.dataLiberacao) + '</p>'
                        }
                    </div>
                </div>
            `;

            // Toggle exibição dos detalhes ao clicar no projeto (menos no form)
            projetoDiv.addEventListener("click", function () {
                const detalhes = document.getElementById(`detalhes-${index}`);
                detalhes.style.display = detalhes.style.display === "block" ? "none" : "block";
            });

            // Impede o clique dentro do painel de detalhes de fechar o mesmo
            projetoDiv.querySelector(`#detalhes-${index}`).addEventListener("click", function(e) {
                e.stopPropagation();
            });

            projetosDiv.appendChild(projetoDiv);
        });
    }
});

function checarLiberacao(data) {
    const agora = new Date();
    const dataLiberada = new Date(data);
    return agora >= dataLiberada;
}

function formatarData(data) {
    const d = new Date(data);
    return d.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}

function inscreverUsuario(event, projeto) {
    event.preventDefault();
    const nomeAluno = event.target.nomeAluno.value;

    // Pega lista existente ou cria nova
    let lista = JSON.parse(localStorage.getItem(`inscritos_${projeto}`)) || [];

    // Adiciona novo aluno
    lista.push(nomeAluno);

    // Salva de volta no localStorage
    localStorage.setItem(`inscritos_${projeto}`, JSON.stringify(lista));

    alert(`Inscrição confirmada para ${nomeAluno} no projeto "${projeto}"!`);
    event.target.reset();
}

// Controle para upload da foto no header (opcional)
const userPhotoHeader = document.getElementById('userPhoto');
const photoInputHeader = document.getElementById('photoInput');

photoInputHeader.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            userPhotoHeader.src = e.target.result;
            localStorage.setItem('userPhotoHeader', e.target.result);
        }
        reader.readAsDataURL(file);
    }
});

const savedPhotoHeader = localStorage.getItem('userPhotoHeader');
if (savedPhotoHeader) {
    userPhotoHeader.src = savedPhotoHeader;
} else {
    userPhotoHeader.src = 'https://via.placeholder.com/40?text=Usu';
}
</script>

</body>
</html>
