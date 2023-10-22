 async function getQuestions(numberOfQuestions, categoryNumber, difficulty) {
    try {
        const response = await fetch(
            `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${categoryNumber}&difficulty=${difficulty}&type=multiple`);
        const data = await response.json();
        return data.results
    }
    catch(error) {
        console.log(error);
    }
};

startQuiz()

async function startQuiz() {
    const categoryDiv = document.querySelectorAll("[data-category]");
    const categoryArray = Array.from(categoryDiv);

    categoryArray.forEach(div => {
        div.addEventListener("click", async () => {
            hideElements();
            await displayQuestions(div);
            showElements();
        });
    });
};


//takes the div as a parameter and checked the category
async function displayQuestions(element) {
    const requestedQuestions = document.getElementById("questions").value;
    const requestedDifficulty = document.querySelectorAll("[data-difficulty]");

    const choosenDifficulty = [...requestedDifficulty].filter(input => input.checked)
            
    const data = await getQuestions(requestedQuestions, element.id, choosenDifficulty[0].id);

    for (let i = 0; i < requestedQuestions; i++) {

        let answersArray = [];
        data[i].incorrect_answers.forEach(answer => answersArray.push(answer));
        answersArray.push(data[i].correct_answer);

        shuffleArray(answersArray);

        const questionDiv = document.createElement("div");

        questionDiv.innerHTML = 
            `<section class='flex flex-col items-center w-full px-6'>
                <h1 class='mt-10 text-5xl text-center font-bold'>${data[i].category}</h1>
                <h2 class='my-48 text-lg font-bold text-center'>${data[i].question}</h2>
                <div class='grid grid-cols-2 gap-4 w-full'>
                    <div data-id="answer" class='flex items-center font-bold justify-center h-32 p-2 text-base
                     whitespace-normal text-center bg-red-600 rounded-md shadow-lg min-w-full shadow-slate-600'>${answersArray[0]}</div>
                    <div data-id="answer" class='flex items-center font-bold justify-center h-32 p-2 text-base
                     whitespace-normal text-center bg-yellow-300 rounded-md shadow-lg min-w-full shadow-slate-600'>${answersArray[1]}</div>
                    <div data-id="answer" class='flex items-center font-bold justify-center h-32 p-2 text-base
                     whitespace-normal text-center bg-blue-600 rounded-md shadow-lg min-w-full shadow-slate-600'>${answersArray[2]}</div>
                    <div data-id="answer" class='flex items-center font-bold justify-center h-32 p-2 text-base
                     whitespace-normal text-center bg-green-500 rounded-md shadow-lg min-w-full shadow-slate-600'>${answersArray[3]}</div>
                </div>
            </section>`
        document.body.appendChild(questionDiv);

        const allAnswers = document.querySelectorAll("[data-id]");

        const answer = await awaitAnswer(allAnswers);

        console.log(answer)

        if(answer === data[i].correct_answer) console.log("right");
        else console.log("fel");

        questionDiv.remove();
        
    }
}

function awaitAnswer(elements) {
    return new Promise((resolve, reject) => {
        elements.forEach(answer => {
            answer.addEventListener("click", div => {
                resolve(div.target.innerHTML);
            });
        });
    });
}

function hideElements() {
    const header = document.getElementById("header");
    const categoryContainer = document.getElementById("category-container");

    header.classList.add("hidden");
    categoryContainer.classList.add("hidden");
}

function showElements() {
    const header = document.getElementById("header");
    const categoryContainer = document.getElementById("category-container");

    header.classList.remove("hidden");
    categoryContainer.classList.remove("hidden");
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
