
let list = document.getElementById("list");
let submitButton = document.getElementById("submit")
let task = document.getElementById("task");
let category = document.getElementById("category");
let date = document.getElementById("date");
let statusFilter = document.getElementById("statusSelect")
let categoryFilter = document.getElementById("categorySelect")
let categoryOptions = new Set();
let items = [];

submitButton.addEventListener("click", () => {
    let item = [];
    item.task = task.value;
    item.category = category.value;
    item.date = date.value;

    items.push(item);
    categoryOptions.add(item.category);
    let newCategory = document.createElement("option");
    newCategory.innerHTML =  item.category;
    categoryFilter.appendChild(newCategory);

    task.value= "";
    category.value = "";
    date.value = "";
    // reset inputs

    list.innerHTML ="";
    // clear list before reloading
    showItems();
    
})

let createItems = (item) => {
 let listItem = document.createElement("li");
        let taskText = document.createElement("p");
        let categoryText = document.createElement("p");
        let dateText = document.createElement("p");
        let statusText = document.createElement("p");
        let statusButton = document.createElement("button");


        taskText.classList.add("inline");
        categoryText.classList.add("inline")
        dateText.classList.add("inline");

        let flexbox = document.createElement("div");
        flexbox.classList.add("flex-box");
        let taskContainer = document.createElement("div");
       taskContainer.classList.add("flex-box")
        
     
        taskText.textContent = "Task: " +item.task;
        categoryText.textContent = "Category: " + item.category;
        dateText.textContent = "Date: " + item.date;

const today = new Date();
const formattedToday = today.toISOString().split("T")[0];

console.log(item.date)

console.log(formattedToday)
statusText.textContent = item.date >= formattedToday ? "In Progress" : "Overdue";



        taskContainer.appendChild(taskText);
         taskContainer.appendChild(categoryText);
          taskContainer.appendChild(dateText);

          flexbox.appendChild(taskContainer);
          flexbox.appendChild(statusText);

          listItem.appendChild(flexbox);

          list.appendChild(listItem);
}
let showItems = () => {
    let filterItems;
    if (statusFilter.value == "Off" && categoryFilter.value == "Off") {
        filterItems = items;
    } else if (statusFilter.value == "Off") {
     filterItems = items.filter((item) => item.category == categoryFilter.value )
    }
    for (let item of filterItems) {
      createItems(item);

    }
}