//sparar mina element som jag ska manipulera här.
const inputField = document.getElementById("input-field");
const submitButton = document.getElementById("submit-todo");
const todoList = document.getElementById("todo-list");

const newTodo = () => {

    if(inputField.value === "") {
       return alert("You cant save a empty string");
    }

    else {
        const newLi = document.createElement("li");
        newLi.innerHTML = inputField.value;
        todoList.append(newLi);
        localStorage.setItem("todo", todoList.innerHTML);
        inputField.value = "";
    }
    
};
//Känner av hela dokumentet om användaren tycker på input eller inte, 
//därifrån tar den bort placeholder eller inte.
document.addEventListener("click", (e) => {
    if(e.target === inputField) {
        inputField.removeAttribute("placeholder");
        }
    else {
        inputField.setAttribute("placeholder", "Write your todo!");
    }
});

document.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        newTodo()
    };
});

submitButton.addEventListener("click", newTodo);

todoList.addEventListener("click", (e) => {
    if(e.target.tagName === "LI") {
        e.target.remove();
        localStorage.setItem("todo", todoList.innerHTML);
    }
    

})

todoList.innerHTML = localStorage.getItem("todo");




