import {qs, ce, GET, DELETE} from "./utils.js";

const BASE_URL = "https://jsonplaceholder.typicode.com/todos";
let i = 1;

const bodyEl = qs("body");
const heroEl = qs(".hero");
const titleEl = qs(".title");
const btnCard = qs(".btnCard");
const btnEl = qs(".btn");
const modalBtn = qs(".modal_btn");
let modalEl = qs(".cancel_modal");

heroEl.append(titleEl, btnEl);

let list = [];
let highPriorityList = [];
let medPriorityList = [];
let lowPriorityList = [];
let completedList = [];

function generateRandomInteger(max = 5) { //STABILISCO RANGE 1-5 DI NUMERI INTERI
    return Math.floor(Math.random() * max) + 1; //GENERAZIONE NUMERI RANDOM
} 

const createCard = (res, containerId) => {

    const cardEl = ce("div");
    const cardId = ce("h2");
    const cardText = ce("h3");
    const priorityEl = ce("h3");
    const imgEl = ce("img");
    const div1 = ce("div");
    const div2 = ce("div");
    const btnCard = ce("button");

    cardEl.className = "card";
    cardId.className = "cardId";
    cardText.className = "cardText";
    imgEl.className = "cardImg";
    div1.className = "div1";
    div2.className = "div2";
    btnCard.className = "btnCard";

    i++;
    imgEl.setAttribute("src", `https://picsum.photos/200/100/?${i}`);
    imgEl.setAttribute("alt", "image");

    cardId.textContent = "ID: " + res.id;
    cardText.textContent = res.title;
    priorityEl.textContent = "Priorità: " + res.priority;
    btnCard.textContent = "Do Completed";

    if (res.completed === true) {
        cardEl.classList.add("completed");
        cardText.classList.add("completedText");
        btnCard.textContent = "Do Incompleted";
        btnCard.addEventListener("click", (e) => {
            btnCard.textContent = "Do Completed";
            res.completed = false;
            cardEl.classList.remove("completed");
            cardText.classList.remove("completedText");
        })
    } 
    if (res.completed === false) {
        btnCard.textContent = "Do Completed";
        btnCard.addEventListener("click", (e) => {
            btnCard.textContent = "Do Incompleted";
            res.completed = true;
            cardEl.classList.add("completed");
            cardText.classList.add("completedText");
        })
    }

    div1.append(cardId, cardText, btnCard);
    div2.append(priorityEl, imgEl);
    cardEl.append(div1, div2);
    const containerEl = qs(containerId);
    containerEl.append(cardEl);
}


GET(BASE_URL).then(res => {
    list = res.map(item => {
        item.priority = generateRandomInteger()
        return item;
    })
    filterItems(list) 
})

const filterItems = (list) => {
    highPriorityList = list.filter(item => item.priority >= 4)
    medPriorityList = list.filter(item => item.priority >=2 && item.priority <= 3)
    lowPriorityList = list.filter(item => item.priority <=1)
    highPriorityList.forEach(item => createCard(item, "#high"))
    console.log(highPriorityList)
    medPriorityList.forEach(item => createCard(item, "#med"))
    console.log(medPriorityList)
    lowPriorityList.forEach(item => createCard(item, "#low"))
    console.log(lowPriorityList)
}

const completedItems = (list) => {
    completedList = list.filter(item => item.completed === true)
    console.log(completedList);
    completedList.forEach(item => createCard(item, "#modal"))
}

btnEl.addEventListener("click", (e) => {
    modalEl.classList.remove("cancel_modal");
    modalEl.classList.add("modal");
    GET(BASE_URL).then(res => {
        list = res.map(item => {
            item.priority = generateRandomInteger()
            return item;
        })
        completedItems(list) 
    })
})

modalBtn.addEventListener("click", (e) => {
    modalEl.classList.remove("modal");
    modalEl.classList.add("cancel_modal");
})