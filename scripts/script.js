let allQuizzes;

function quizzListRenderAllQuizzes() {
    let allQuizzesList = '';

    for (let i = 0; i < allQuizzes.length; i++) {
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
    if (document.querySelector('.style-page').href) {
        quizzListRenderAllQuizzes();
    }
}

function quizzListGetAllQuizzes() {
    let promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes');
    promise.then(quizzListSaveAllQuizzesAnswer);
}

function renderQuizzListPage() {

    document.querySelector('.style-page').href = './styles/quizzList.css'

    document.querySelector('main').innerHTML = `

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

    document.querySelector('.style-page').href = './styles/quizzCreation.css'

    document.querySelector('main').innerHTML = `

        <article class='new-quizz-beggin'>

            <header class="new-quizz-header">
                <h2 class="new-quizz-title">Comece pelo começo</h2>
            </header>

            <ul class="new-quizz-form background-white">

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

            <button onclick='renderQuizzCreationQuestionsPage()' class="new-quizz-go-to-create-questions">Prosseguir para criar perguntas</button>
        </article>
    
    `
}

function quizzCreationQuestionToggleQuestion(element) {
    olderQuestion = document.querySelector('.quis-creation-question-inputs.show');
    olderQuestion.classList.toggle('show');
    olderQuestion.parentNode.querySelector('.create-new-question-button.hide').classList.toggle('hide');
    element.classList.toggle('hide');
    element.parentNode.parentNode.querySelector('.quis-creation-question-inputs').classList.toggle('show');
}

function renderQuizzCreationQuestionFields() {
    let questionsInputs = '';

    for (i = 1; i <= 3; i++) {
        questionsInputs += `
            <li class='new-quizz-input'>

                <header class="quizz-creation-question-header">
                    <h3 class="quizz-creation-question-title">Pergunta ${i}</h3>
            
                    <button onclick="quizzCreationQuestionToggleQuestion(this)" class="create-new-question-button ${i === 1 ? 'hide' : ''}">
                        <img class="create-new-question-img" src="./img/Vector.svg" alt="">
                    </button>
                    
                </header>

                <div class="quis-creation-question-inputs hide ${i === 1 ? 'show' : ''}">

                    <div class="quizz-creation-question-pair-input">
                        <input class="new-quizz-input-field quizz-question-text" type="text"
                            placeholder="Texto da pergunta">
                        <input class="new-quizz-input-field quizz-question-background" type="text"
                            placeholder="Cor de fundo da pergunta">
                    </div>

                    <h3 class="quizz-creation-question-title">Resposta Correta</h3>

                    <div class="quizz-creation-question-pair-input">
                        <input class="new-quizz-input-field quizz-corret-awnser" type="text"
                            placeholder="Resposta correta">
                        <input class="new-quizz-input-field quizz-img" type="text" placeholder="URL da imagem">
                    </div>

                    <h3 class="quizz-creation-question-title">Respostas Incorretas</h3>

                    <div class="quizz-creation-question-pair-input">
                        <input class="new-quizz-input-field quizz-incorrect-awser" type="text"
                            placeholder="Resposta incorreta 1">
                        <input class="new-quizz-input-field quizz-img" type="text" placeholder="URL da imagem 1">
                    </div>

                    <div class="quizz-creation-question-pair-input">
                        <input class="new-quizz-input-field quizz-incorrect-awser" type="text"
                            placeholder="Resposta incorreta 2">
                        <input class="new-quizz-input-field quizz-img" type="text" placeholder="URL da imagem 2">
                    </div>

                    <div class="quizz-creation-question-pair-input">
                        <input class="new-quizz-input-field quizz-incorrect-awser" type="text"
                            placeholder="Resposta incorreta 3">
                        <input class="new-quizz-input-field quizz-img" type="text" placeholder="URL da imagem 3">
                    </div>

                </div>

            </li>
        `
    }

    document.querySelector(`.new-quizz-form`).innerHTML = questionsInputs;
}

function renderQuizzCreationQuestionsPage() {

    document.querySelector('.style-page').href = './styles/quizzCreation.css'

    document.querySelector('main').innerHTML = `
        <header class="new-quizz-header">
            <h2 class="new-quizz-title">Crie suas perguntas</h2>
        </header>

        <ul class="new-quizz-form">
            
        </ul>

        <button class="new-quizz-go-to-create-questions">Prosseguir para criar Níveis</button>
    `
    renderQuizzCreationQuestionFields();
}

renderQuizzListPage();