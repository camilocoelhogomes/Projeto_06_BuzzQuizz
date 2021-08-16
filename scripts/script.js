const SECONDS = 1000;
const API_URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes/';
let scrollId;
let allQuizzes;
/* Temos que tirar vários console.log que estão no código para enviar*/

let newQuizz = {
    title: '',
    image: '',
    questions: [],
    levels: []
}

//Screen 3 start here
{
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

        <ul class="new-quizz-form padding">
            <li class='single-quizz' id = "${newQuizz.id}" onclick="goToScreen2(${newQuizz.id})">
                <figure class = 'single-quizz-figure'>
                    <img class = 'single-quizz-img' src="${newQuizz.image}" alt="Imagem de Fundo do Quizz">
                </figure>

                <header class = 'single-quizz-header'>
                    <h3 class = 'single-quizz-title'>${newQuizz.title}</h3>
                </header>
            </li>
        </ul>
        
        <div class="buttons">
            <button onclick="goToScreen2(${newQuizz.id})" class="new-quizz-go-to-quizz">Acessar Quizz</button>
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

    function saveDataInPc(data) {
        console.log(data.data);
        if (!localStorage.getItem('userQuizzes')) {
            let userQuizzesArray = [];
            userQuizzesArray.push({ id: data.data.id, key: data.data.key });
            userQuizzes = JSON.stringify(userQuizzesArray);
            localStorage.setItem('userQuizzes', userQuizzes);
        }
        else {
            let userQuizzes = localStorage.getItem('userQuizzes');
            let userQuizzesArray = JSON.parse(userQuizzes)
            userQuizzesArray.push({ id: data.data.id, key: data.data.key });
            userQuizzes = JSON.stringify(userQuizzesArray);
            localStorage.setItem('userQuizzes', userQuizzes);
        }
        newQuizz = data.data;
        renderQuizzCreationEndPage();
    }

    function sendQuizzToServer() {
        axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes', newQuizz).then((data) => { saveDataInPc(data) });
    }

    function transitionPage_3_3_4() {
        const allLevels = document.querySelectorAll('.new-quizz-input');
        let allValuesMinValue = [];
        let allLevelsArray = [];


        let error = false;

        allLevels.forEach((item) => {

            const title = item.querySelector('.quizz-question-text').value;
            const image = item.querySelector('.quizz-url').value;
            const text = item.querySelector('.quizz-level-description').value;
            const minValue = Number(item.querySelector('.quizz-question-min-value').value);
            allValuesMinValue.push(minValue);

            if (title.length < 10) {
                console.log(1);
                error = true;
            }
            if (!validURL(image) || !checkURL(image)) {
                error = true;
                console.log(2);
            }
            if (minValue < 0 && minValue > 100) {
                error = true;
            }
            if (text.length < 30) {
                error = true;
                console.log(3);
            }

            allLevelsArray.push({
                title,
                image,
                text,
                minValue,
            })

        });

        if (allValuesMinValue.indexOf(0) === -1) {
            error = true;
            console.log(4);
        }

        if (error) {
            alert('Informaões inseridas incorretas');
        }
        else {
            newQuizz.levels = allLevelsArray;
            sendQuizzToServer();
        }


    }

    function renderQuizzCreationLevelInputs(numberLevels) {
        let levelInputs = ''
        for (let i = 1; i <= numberLevels; i++) {
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
                <input class="new-quizz-input-field quizz-question-min-value" type="number"
                    placeholder="% de acerto mínima">
                <input class="new-quizz-input-field quizz-url" type="text"
                    placeholder="URL da imagem do nível">
                <textarea class="new-quizz-input-field quizz-level-description" type="text"
                    placeholder="Descrição do nível"></textarea>

            </div>

        </li>                
        `
        }
        document.querySelector(`.new-quizz-form`).innerHTML = levelInputs;

    }

    function renderQuizzCreationLevelPage(numberLevels) {

        document.querySelector('.style-page').href = './styles/quizzCreation.css';

        document.querySelector('main').innerHTML = `
        <header class="new-quizz-header">
            <h2 class="new-quizz-title">Agora, decida os níveis!</h2>
        </header>

        <ul class="new-quizz-form">

        </ul>

        <button onclick="transitionPage_3_3_4()" class="new-quizz-go-to-create-questions">Finalizar Quizz</button>
    `;

        renderQuizzCreationLevelInputs(numberLevels);
        window.scrollTo(0, 0);
    }

    function transitionPage_3_2_3() {
        const allQuestions = document.querySelectorAll('.new-quizz-input');


        let error = false;

        for (let i = 0; i < allQuestions.length; i++) {
            const title = allQuestions[i].querySelector('.quizz-question-text').value;
            const correctAnswerText = allQuestions[i].querySelector('.quizz-correct-awnser').value;
            const correctImage = allQuestions[i].querySelector('.quizz-correct-img').value;


            if (title < 20) {
                error = true;
            }
            if ((correctAnswerText === '') && (!validURL(correctImage) || !checkURL(correctImage))) {
                error = true;
            } else {
                newQuizz.questions[i].title = title;
                newQuizz.questions[i].color = allQuestions[i].querySelector('.quizz-question-background').value;
                let correctAnswer = [{
                    text: correctAnswerText,
                    image: correctImage,
                    isCorrectAnswer: true
                }]
                const incorrectAnswer = allQuestions[i].querySelectorAll('.quizz-incorrect-awser');
                let incorrecAnswerArray = [];

                incorrectAnswer.forEach((item, k) => {
                    const incorretText = item.value;
                    const incorretImg = item.parentNode.querySelector('.quizz-img').value;

                    if (!(incorretText === '') && !(!validURL(incorretImg) || !checkURL(incorretImg))) {
                        incorrecAnswerArray.push(
                            {
                                text: incorretText,
                                image: incorretImg,
                                isCorrectAnswer: false
                            }
                        )
                    }

                });


                if (incorrecAnswerArray.length === 0) {
                    error = true;
                } else {
                    newQuizz.questions[i].answers = correctAnswer.concat(incorrecAnswerArray);
                }
            }
        }

        if (error) {
            alert('Informações inseridas invalidas');
        }
        else {
            renderQuizzCreationLevelPage(newQuizz.levels.length);
        }


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

        if (!validURL(url) || !checkURL(url)) {
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
        if (test) {
            newQuizz.title = title;
            newQuizz.image = url;


            for (let i = 0; i < numberQuestions; i++) {
                newQuizz.questions.push({});
            }
            for (let i = 0; i < numberLevels; i++) { newQuizz.levels.push({}); }
            renderQuizzCreationQuestionsPage_3_2(newQuizz.questions.length);
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
}
//Screen 1 start here
{
    function deleteQuizz(id) {
        alert(id);
    }

    function quizzListRenderAllQuizzes_1_1() {
        let allQuizzesList = '';
        let userQuizzes = '';
        let userQuizzesList;
        let userQuizzesIds = [];
        let userQuizzesKeys = [];

        if (!localStorage.getItem('userQuizzes')) {
            userQuizzesList = [];
        }
        else {
            userQuizzesList = JSON.parse(localStorage.getItem('userQuizzes'));
            for (let i = 0; i < userQuizzesList.length; i++) {
                userQuizzesIds.push(userQuizzesList[i].id);
                userQuizzesKeys.push(userQuizzesList[i].key);
            }
        }

        console.log(userQuizzesList);
        for (let i = 0; i < allQuizzes.length; i++) {

            if (userQuizzesIds.includes(allQuizzes[i].id)) {
                userQuizzes += `
                <li class='single-quizz' id = "${allQuizzes[i].id}" >
                    <div class = 'position-absolute' onclick="goToScreen2(${allQuizzes[i].id})">
                        <figure class = 'single-quizz-figure'>
                            <img class = 'single-quizz-img' src="${allQuizzes[i].image}" alt="Imagem de Fundo do Quizz">
                        </figure>
 
                        <header class = 'single-quizz-header'>
                            <h3 class = 'single-quizz-title'>${allQuizzes[i].title}</h3>
                        </header>
                    </div>

                    <button class="delete-button" onclick = 'deleteQuizz(${userQuizzesKeys[userQuizzesIds.indexOf(allQuizzes[i].id)]})'>
                        <ion-icon class="trash" name="trash"></ion-icon>
                    </button>
                    
                </li>
                `

            } else {
                allQuizzesList += `
                <li class='single-quizz' id = "${allQuizzes[i].id}" onclick="goToScreen2(${allQuizzes[i].id})">
                    <figure class = 'single-quizz-figure'>
                        <img class = 'single-quizz-img' src="${allQuizzes[i].image}" alt="Imagem de Fundo do Quizz">
                    </figure>
    
                    <header class = 'single-quizz-header'>
                        <h3 class = 'single-quizz-title'>${allQuizzes[i].title}</h3>
                    </header>
                </li>
            `
            }

        }

        if (userQuizzes.length > 0) {
            document.querySelector('.all-quizzes-user').innerHTML = userQuizzes;
        } else if (document.querySelector('.user-quizzes')) {
            document.querySelector('.user-quizzes').innerHTML = `
            <article class="create-new-quizz">
                            
                <header class="create-new-quizz-header">
                    <h2 class="create-new-quizz-title">Você não criou nenhum quizz ainda :(</h2>
                </header>

                <button onclick="renderQuizzCreationPage_3_1()" class="create-new-quizz-button">Criar Quizz</button>
            
            </article>
            `
        }

        document.querySelector('.all-quizzes-list').innerHTML = allQuizzesList;
    }

    function quizzListSaveAllQuizzesAnswer_1_1(answer) {
        allQuizzes = answer.data;
        if (document.querySelector('.style-page').href.includes('quizzList')) {
            quizzListRenderAllQuizzes_1_1();
        }
    }

    function quizzListGetAllQuizzes_1_1() {
        let promise = axios.get(API_URL);
        promise.then(quizzListSaveAllQuizzesAnswer_1_1);
    }

    function renderQuizzListPage_1_1() {

        document.querySelector('.style-page').href = './styles/quizzList.css'
        let createNewQuizzArea = '';

        if (!localStorage.getItem('userQuizzes')) {
            createNewQuizzArea = `
                <article class="create-new-quizz">
                        
                    <header class="create-new-quizz-header">
                        <h2 class="create-new-quizz-title">Você não criou nenhum quizz ainda :(</h2>
                    </header>
    
                    <button onclick="renderQuizzCreationPage_3_1()" class="create-new-quizz-button">Criar Quizz</button>
                
                </article>
            `
        } else {
            createNewQuizzArea = `
                <article class="user-quizzes all-quizzes">

                    <header class="all-quizzes-title">
                        <h2>Seus Quizzes</h2>
                        <button class='new-quizz-circle-button' onclick="renderQuizzCreationPage_3_1()">
                            <ion-icon class="new-quizz-pluss-sign" name="add-circle-sharp"></ion-icon>
                        </button>
                    </header>

                    <ul class="all-quizzes-user">
                    </ul>

                </article>
            `
        }


        const allQuizzArea = `
            <article class="all-quizzes">

                <header class="all-quizzes-title">
                    <h2>Todos os Quizzes</h2>
                </header>

                <ul class="all-quizzes-list">
                </ul>

            </article>
        `


        document.querySelector('main').innerHTML = createNewQuizzArea + allQuizzArea;
        window.scrollTo(0, 0);
        quizzListGetAllQuizzes_1_1();
    }
}
// Screen 2 start here
{
    let quizzSelected;
    let questionsNumber, hitPercentage;
    let questionsAnswered;
    let questionsHitted;

    function goToScreen2(quizzId) {
        questionsAnswered = 0;
        questionsHitted = 0;
        document.querySelector('.style-page').href = './styles/quizzPage.css';
        let promise = axios.get(API_URL + quizzId);
        promise.then(renderQuizzPage)
    }

    function renderQuizzPage(answer) {
        quizzSelected = answer.data;
        window.scrollTo(0, 0);
        document.querySelector('main').innerHTML = `
    <div class="quizz-banner">     
    <img
    src="${quizzSelected.image}"
    />
        <div class="quizz-banner-cover">
            <h1>${quizzSelected.title}</h1>
        </div>
</div>

<ul class="questions-container">      

</ul>
</div>
`
        renderQuizzQuestions();
    }
    function shufle() {
        return Math.random() - 0.5;
    }
    function scrollToNextQuestion(element) {
        let parentId = element.parentNode.id;
        const justNumberIdArray = [];
        let justNumberIdString = "";

        for (let i = 11; i < parentId.length; i++) {
            justNumberIdArray.push(parentId[i]);
        }
        for (let i = 0; i < justNumberIdArray.length; i++) {
            justNumberIdString += justNumberIdArray[i];
        }
        const nextNumberId = Number(justNumberIdString) + 1;
        const nextId = "question-id" + nextNumberId;
        document.getElementById(nextId).scrollIntoView();
        window.scrollBy({
            top: -69,
            left: 0,
            behavior: 'smooth'
        });
    }
    function scrollToResult() {
        document.querySelector('.result-title').scrollIntoView();
    }
    function showQuizzResult(resultLevel) {
        document.querySelector('main').innerHTML += `
    <div class="result-container">
            <h1 class="result-title"> <strong>${hitPercentage}% de acerto: ${resultLevel.title}</strong></h1>
            <div class="result-content">
                <img src="${resultLevel.image}" alt="">
                <p> <strong> ${resultLevel.text}</strong></p>
            </div>
        </div>
        <button class="restart" onclick="goToScreen2(${quizzSelected.id})">Reiniciar Quizz</button>
        <button class="go-to-home" onclick="renderQuizzListPage_1_1()">Voltar para home</button>
        `;
        setTimeout(scrollToResult, 2000);
    }
    function calcResult() {
        hitPercentage = (questionsHitted / questionsNumber) * 100;
        hitPercentage = Math.round(hitPercentage);
        const levels = quizzSelected.levels;
        const clientLevelsAchived = levels.filter(level => { if (level.minValue <= hitPercentage) return true });
        let higherLevel = clientLevelsAchived[0];
        for (let i = 1; i < clientLevelsAchived.length; i++) {
            if (higherLevel.minValue < clientLevelsAchived[i].minValue) higherLevel = clientLevelsAchived[i];
        }
        showQuizzResult(higherLevel);

    }
    function chooseAnswer(element) {
        clearTimeout(scrollId);
        element.classList.add('selected');
        element.parentNode.classList.add('selected');
        const trueAnswer = element.parentNode.querySelector('.true');
        const falseAnswers = element.parentNode.querySelectorAll('.false');
        trueAnswer.classList.add('green');
        for (let i = 0; i < falseAnswers.length; i++) {
            falseAnswers[i].classList.add('red');
        }
        element.setAttribute('onclick', "");
        if (element.querySelector('.true')) questionsHitted++;
        questionsAnswered++;
        if (questionsAnswered === questionsNumber) return calcResult();
        scrollId = setTimeout(scrollToNextQuestion, 2 * SECONDS, element);

    }
    function renderQuestionAnswers(questionId) {
        const answersArray = quizzSelected.questions[questionId].answers;
        const answerLength = answersArray.length;
        answersArray.sort(shufle);

        for (let i = 0; i < answerLength; i++) {
            document.querySelector('.answer-options#question-id' + questionId).innerHTML += `
    <li class="answer-option" onclick="chooseAnswer(this)">
              <img src="${answersArray[i].image}" alt="gato">
              <h3 class="${answersArray[i].isCorrectAnswer}"><strong>${answersArray[i].text}</strong></h3>
          </li>
    `
        }
    }
    function renderQuizzQuestions() {
        questionsNumber = quizzSelected.questions.length;
        for (let i = 0; i < questionsNumber; i++) {
            document.querySelector('.questions-container').innerHTML += `
        <li class="question-container" id="question-id${i}">
        <h1 class="question-title" style="background-color:${quizzSelected.questions[i].color}">
           <strong> ${quizzSelected.questions[i].title} </strong>
          </h1>
          <ul class="answer-options" id="question-id${i}">
          <div class="blank-hide-option"></div>
              
          </ul>
          </li>
        `
            renderQuestionAnswers(i);
        }
    }
}
renderQuizzListPage_1_1();