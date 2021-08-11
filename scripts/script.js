let allQuizzes;

function renderAllQuizzes() {
    let allQuizzesList = '';

    for (let i = 0.; i < allQuizzes.length; i++) {
        allQuizzesList += `
            <li class='single-quizz' id = "${allQuizzes[i].id}">
                <figure class = 'single-quizz-figure'>
                    <img class = 'single-quizz-img' src="${allQuizzes[i].image}" alt="Imagem de Fundo do Quizz">
                </figure>

                <header class = 'single-quizz-header'>
                    <h3 class = 'single-quizz-title'>${allQuizzes[i].title}</h3>
                </header>
            </li>
        `
    }

    document.querySelector('.all-quizzes-list').innerHTML = allQuizzesList;
}

function saveAllQuizzesAnswer(answer) {
    allQuizzes = answer.data;
    renderAllQuizzes();
}

function getAllQuizzes() {
    let promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes');
    promise.then(saveAllQuizzesAnswer);
}

function renderQuizzListPage() {

    document.querySelector('.style').href = './styles/quizzList.css'

    document.querySelector('main').innerHTML = `
        <header class="main-header">
            <h1 class="main-title">BuzzQuizz</h1>
        </header>

        <article class="create-new-quizz">
            
            <header class="create-new-quizz-header">
                <h2 class="create-new-quizz-title">Você não criou nenhum quizz ainda :(</h2>
            </header>

            <button class="create-new-quizz-button">Criar Quizz</button>
        
        </article>

        <article class="all-quizzes">

            <header class="all-quizzes-title">
                <h2>Todos os Quizzes</h2>
            </header>

            <ul class="all-quizzes-list">
            </ul>

        </article>
    `

    getAllQuizzes();
}

renderQuizzListPage()