let allQuizzes;

function quizzListRenderAllQuizzes() {
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

function quizzListSaveAllQuizzesAnswer(answer) {
    allQuizzes = answer.data;
    quizzListRenderAllQuizzes();
}

function quizzListGetAllQuizzes() {
    let promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes');
    promise.then(quizzListSaveAllQuizzesAnswer);
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

            <button onclick="renderQuizzCreationPage()" class="create-new-quizz-button">Criar Quizz</button>
        
        </article>

        <article class="all-quizzes">

            <header class="all-quizzes-title">
                <h2>Todos os Quizzes</h2>
            </header>

            <ul class="all-quizzes-list">
            </ul>

        </article>
    `

    quizzListGetAllQuizzes();
}

function renderQuizzCreationPage() {

    document.querySelector('.style').href = './styles/quizzCreation.css'

    document.querySelector('main').innerHTML = `
        <header class="main-header">
            <h1 class="main-title">BuzzQuizz</h1>
        </header>

        <article class='new-quizz-beggin'>

            <header class="new-quizz-header">
                <h2 class="new-quizz-title">Comece pelo começo</h2>
            </header>

            <ul class="new-quizz-form">

                <li class="new-quizz-input">
                    <input class="new-quizz-input-field quizz-title" type="text" placeholder="Título do seu quizz">
                </li>

                <li class="new-quizz-input">
                    <input class="new-quizz-input-field quizz-img" type="text" placeholder="URL da imagem do seu quizz">
                </li>

                <li class="new-quizz-input">
                    <input class="new-quizz-input-field quizz-questions" type="text"
                        placeholder="Quantidade de perguntas do quizz">
                </li>

                <li class="new-quizz-input">
                    <input class="new-quizz-input-field quizz-level" type="text"
                        placeholder="Quantidade de níveis do quizz">
                </li>

            </ul>

            <button class="new-quizz-go-to-create-questions">Prosseguir para criar perguntas</button>
        </article>
    
    `
}

//renderQuizzListPage()