let allQuizzes;

const newQuizz = {
    title: '',
    image: '',
    questions: [],
    levels: []
}


function validURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

function checkURL(url) {
    return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
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
            <button onclick="renderQuizzListPage_1_1()" class="new-quizz-go-to-home">Voltar para a Home</button>
        </div>
    `;
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

function verifyer_3_2_3() {
    let text = true;
    console.log('entrei');

    const inputs = {
        questionTexts: document.querySelectorAll('.quizz-question-text'),
        questionCollor: document.querySelectorAll('.quizz-question-background'),
        questionCorrectText: document.querySelectorAll('.quizz-correct-awnser'),
        questionCorrectImg: document.querySelectorAll('.quizz-correct-img'),
    }

    for (let i = 0; i < inputs.questionTexts.length; i++) {
        if (inputs.questionTexts[i].value.length < 20) {
            text = false;
        }
    }



    if (!text) {
        console.log('texto');
    }

}

function transitionPage_3_2_3() {
    let questions = [];

    let question = {
        title: '',
        color: '',
        answers: []
    }

    verifyer_3_2_3();

}

function renderQuizzCreationQuestionFields_3_2(questions) {
    let questionsInputs = '';

    for (i = 1; i <= questions; i++) {
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
                        <input class="new-quizz-input-field quizz-question-background" type="color"
                            placeholder="Cor de fundo da pergunta">
                    </div>

                    <h3 class="quizz-creation-question-title">Resposta Correta</h3>

                    <div class="quizz-creation-question-pair-input">
                        <input class="new-quizz-input-field quizz-correct-awnser" type="text"
                            placeholder="Resposta correta">
                        <input class="new-quizz-input-field quizz-correct-img" type="text" placeholder="URL da imagem">
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

function renderQuizzCreationQuestionsPage_3_2(questions) {

    document.querySelector('.style-page').href = './styles/quizzCreation.css'

    document.querySelector('main').innerHTML = `
        <header class="new-quizz-header">
            <h2 class="new-quizz-title">Crie suas perguntas</h2>
        </header>

        <ul class="new-quizz-form">
            
        </ul>

        <button onclick="transitionPage_3_2_3()" class="new-quizz-go-to-create-questions">Prosseguir para criar Níveis</button>
        `
    renderQuizzCreationQuestionFields_3_2(questions);

    window.scrollTo(0, 0);
}

function transitionPage_3_1_2() {
    let test = true;
    const title = document.querySelector('.quizz-title').value;
    const url = document.querySelector('.quizz-img').value;
    const numberQuestions = Number(document.querySelector('.quizz-questions').value);
    const numberLevels = Number(document.querySelector('.quizz-level').value);

    if (title.length < 20 || title.length > 60) {
        test = false;
    }

    if (!validURL(url) && checkURL(url)) {
        test = false;
    }

    if (numberQuestions < 3) {
        test = false;
    }

    if (numberLevels < 2) {
        test = false;
    }

    if (!test) {
        alert('Informações inseridas invalidas');
    }
    else if (test) {
        newQuizz.title = title;
        newQuizz.imgage = url;

        let level = {
            title: "",
            image: "",
            text: "",
            minValue: 0
        }

        renderQuizzCreationQuestionsPage_3_2(numberQuestions);
    }
}

function renderQuizzCreationPage_3_1() {

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

                <li class="new-quizz-input url">
                    <input class="new-quizz-input-field quizz-img" type="text" placeholder="URL da imagem do seu quizz">
                </li>

                <li class="new-quizz-input numberQuestions">
                    <input class="new-quizz-input-field quizz-questions" type="number"
                        placeholder="Quantidade de perguntas do quizz">
                </li>

                <li class="new-quizz-input numberLevels">
                    <input class="new-quizz-input-field quizz-level" type="number"
                        placeholder="Quantidade de níveis do quizz">
                </li>

            </ul>

            <button onclick='transitionPage_3_1_2()' class="new-quizz-go-to-create-questions">
                Prosseguir para criar perguntas
            </button>
        </article>
    
    `
    window.scrollTo(0, 0);

}

function quizzListRenderAllQuizzes_1_1() {
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

function quizzListSaveAllQuizzesAnswer_1_1(answer) {
    allQuizzes = answer.data;
    if (document.querySelector('.style-page').href.includes('quizzList')) {
        quizzListRenderAllQuizzes_1_1();
    }
    if (document.querySelector('.style-page').href.includes('quizzPage')) {
        renderQuizzPage(allQuizzes.length -1);
    }
}

function quizzListGetAllQuizzes_1_1() {
    let promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes');
    promise.then(quizzListSaveAllQuizzesAnswer_1_1);
}

function renderQuizzListPage_1_1() {

    document.querySelector('.style-page').href = './styles/quizzList.css'

    document.querySelector('main').innerHTML = `

        <article class="create-new-quizz">
            
            <header class="create-new-quizz-header">
                <h2 class="create-new-quizz-title">Você não criou nenhum quizz ainda :(</h2>
            </header>

            <button onclick="renderQuizzCreationPage_3_1()" class="create-new-quizz-button">Criar Quizz</button>
        
        </article>

        <article class="all-quizzes">

            <header class="all-quizzes-title">
                <h2>Todos os Quizzes</h2>
            </header>

            <ul class="all-quizzes-list">
            </ul>

        </article>
    `

    quizzListGetAllQuizzes_1_1();
}

// Screen 2 start here
function goToScreen2() {
    document.querySelector('.style-page').href = './styles/quizzPage.css';
    quizzListGetAllQuizzes_1_1();
}

function renderQuizzPage(quizzId) {

    document.querySelector('main').innerHTML = `
    <div class="quizz-banner">     
    <img
    src="${allQuizzes[quizzId].image}"
    />
        <div class="quizz-banner-cover">
            <h1>${allQuizzes[quizzId].title}</h1>
        </div>
</div>

<ul class="questions-container">      

</ul>
</div>
`
    renderQuizzQuestions(quizzId);
}
function shufle() {
    return Math.random() - 0.5;
}
function choseAnswer (element) {
    element.classList.add('selected');
    element.parentNode.classList.add('selected');
}
function renderQuestionAnswers(quizzId, questionId) {
    const answersArray = allQuizzes[quizzId].questions[questionId].answers;
    const answerLength = answersArray.length;
    answersArray.sort(shufle);

    for (let i = 0; i < answerLength; i++) {
        document.querySelector('#question-id' + questionId).innerHTML += `
    <li class="answer-option" onclick="choseAnswer(this)">
              <img src="${answersArray[i].image}" alt="gato">
              <h3>${answersArray[i].text} </h3>
          </li>
    `
    }
}

function renderQuizzQuestions(quizzId) {
    const questionsLength = allQuizzes[quizzId].questions.length;
    for (let i = 0; i < questionsLength; i++) {
        document.querySelector('.questions-container').innerHTML += `
        <li class="question-container">
        <h1 class="question-title" style="background-color:${allQuizzes[quizzId].questions[i].color}">
           <strong> ${allQuizzes[quizzId].questions[i].title} </strong>
          </h1>
          <ul class="answer-options" id="question-id${i}">
          <div class="blank-hide-option"></div>
              
          </ul>
          </li>
        `
        renderQuestionAnswers(quizzId, i);
    }
}