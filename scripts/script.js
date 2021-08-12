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
    if (document.querySelector('.style-page').href.includes('quizzList')) {
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

function renderQuizzCreationEndPage() {
    document.querySelector('.style-page').href = './styles/quizzCreation.css'
    document.querySelector('main').innerHTML = `
        <header class="new-quizz-header">
            <h2 class="new-quizz-title">Seu quizz está pronto!</h2>
        </header>

        <ul class="new-quizz-form">
            <li class='single-quizz'>
                <figure class='single-quizz-figure'>
                    <img class='single-quizz-img' src="" alt="Imagem de Fundo do Quizz">
                </figure>

                <header class='single-quizz-header'>
                    <h3 class='single-quizz-title'></h3>
                </header>
            </li>
        </ul>
        
        <div class="buttons">
            <button class="new-quizz-go-to-quizz">Acessar Quizz</button>
            <button onclick="renderQuizzListPage()" class="new-quizz-go-to-home">Voltar para a Home</button>
        </div>
    `;
    window.scrollTo(0, 0);
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
    window.scrollTo(0, 0);
}

function quizzCreationQuestionToggleQuestion(element) {
    olderQuestion = document.querySelector('.quis-creation-question-inputs.show');
    olderQuestion.classList.toggle('show');
    olderQuestion.parentNode.querySelector('.create-new-question-button.hide').classList.toggle('hide');
    element.classList.toggle('hide');
    element.parentNode.parentNode.querySelector('.quis-creation-question-inputs').classList.toggle('show');
}

function renderQuizzCreationLevelInputs() {
    let levelInputs = ''
    for (let i = 1; i <= 3; i++) {
        levelInputs += `
        <li class='new-quizz-input'>

            <header class="quizz-creation-question-header">
                <h3 class="quizz-creation-question-title">Nível ${i}</h3>

                <button onclick="quizzCreationQuestionToggleQuestion(this)"
                    class="create-new-question-button ${i === 1 ? 'hide' : ''}">
                    <img class="create-new-question-img" src="./img/Vector.svg" alt="">
                </button>

            </header>

            <div class="quis-creation-question-inputs hide ${i === 1 ? 'show' : ''}">

                <input class="new-quizz-input-field quizz-question-text" type="text" placeholder="Título do nível">
                <input class="new-quizz-input-field quizz-question-background" type="text"
                    placeholder="% de acerto mínima">
                <input class="new-quizz-input-field quizz-corret-awnser" type="text"
                    placeholder="URL da imagem do nível">
                <textarea class="new-quizz-input-field quizz-level-description" type="text"
                    placeholder="Descrição do nível"></textarea>

            </div>

        </li>                
        `
    }
    document.querySelector(`.new-quizz-form`).innerHTML = levelInputs;

}

function renderQuizzCreationLevelPage() {

    document.querySelector('.style-page').href = './styles/quizzCreation.css';

    document.querySelector('main').innerHTML = `
        <header class="new-quizz-header">
            <h2 class="new-quizz-title">Agora, decida os níveis!</h2>
        </header>

        <ul class="new-quizz-form">

        </ul>

        <button onclick="renderQuizzCreationEndPage()" class="new-quizz-go-to-create-questions">Finalizar Quizz</button>
    `;

    renderQuizzCreationLevelInputs();
    window.scrollTo(0, 0);
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

        <button onclick="renderQuizzCreationLevelPage()" class="new-quizz-go-to-create-questions">Prosseguir para criar Níveis</button>
        `
    renderQuizzCreationQuestionFields();

    window.scrollTo(0, 0);
}

function renderQuizzPage() {
    document.querySelector('.style-page').href = './styles/quizzPage.css'
    // let promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes');
    // promise.then(function (response) {
    //     console.log(response.data[0]);
    // });


    document.querySelector('main').innerHTML += `
    <div class="quizz-banner-cover">
    <h1>O quão potterhead é você?</h1>
  </div>
</div>

<div class="questions-container">
  <div class="question-container">
      <h1 class="question-title">
       <strong> Em qual animal Olho-Tonto Moody transfigurou Malfoy? </strong>
      </h1>
      <ul class="answer-options">
          <li class="answer-option">
              <img src="data:image/jpeg;base64,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" alt="gato">
              <h3>Num bixu</h3>
          </li>
          <li class="answer-option">
              <img src="data:image/jpeg;base64,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" alt="gato">
              <h3>Num bixu</h3>
          </li>
          <li class="answer-option">
              <img src="data:image/jpeg;base64,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" alt="gato">
              <h3>Num bixu</h3>
          </li>
          <li class="answer-option">
              <img src="data:image/jpeg;base64,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" alt="gato">
              <h3>Num bixu</h3>
          </li>
      </ul>
    </div>
</div>
</div>

    `
}

//renderQuizzListPage();