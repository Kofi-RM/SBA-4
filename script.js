
let list = document.getElementById("list");
let submitButton = document.getElementById("submit")
let task = document.getElementById("task");
let category = document.getElementById("category");
let date = document.getElementById("date");
let statusFilter = document.getElementById("statusSelect")
let categoryFilter = document.getElementById("categorySelect")
let categoryOptions = new Set();
let items = JSON.parse(localStorage.getItem("items")) || [];
;

let changeStatus = (e) => {
    let p = e.target.closest("div");
    let d = p.querySelector("div")
    let select = d.querySelector("select")

    select.addEventListener("change", () => {
    let id = Number(select.id);

    let i = localStorage.getItem("items");
    let itemsParse = JSON.parse(i);
    // get local storage

    console.log(itemsParse[id])
     itemsParse[id].status = select.value;
     // change valuei in local storage
    localStorage.setItem("items", JSON.stringify(itemsParse))
   
    showItems();
    // update
    
    })
    select.classList.add("show");
}

let updateCategory = (category) => {
        let newCategory = document.createElement("option");
    newCategory.innerHTML =  category;
    categoryFilter.appendChild(newCategory);
} // adds category to dropdown

let showItems = () => {
    let jsonItems = JSON.parse(localStorage.getItem("items"));
    console.log(jsonItems)
      list.innerHTML ="";
    let categories = categoryFilter.children;
    
    let filterItems;
    if (statusFilter.value == "Off" && categoryFilter.value == "Off") {
        filterItems = jsonItems;
    } else if (categoryFilter.value == "Off") {
     filterItems = jsonItems.filter((item) =>item.status == statusFilter.value )
    } else if (statusFilter.value == "Off") {
        filterItems = jsonItems.filter((item) => item.category == categoryFilter.value )
    } else {
        filterItems = jsonItems.filter((item) => item.status == statusFilter.value && item.category == categoryFilter.value)
        
    }

    let count = 0;
    if (filterItems) {
    for (let item of filterItems) {
      createItems(item, count);
      count++;
      if (item.category != "") {
      categoryOptions.add(item.category);
      }
    } // create listItem for each item
    }
    let currentCategories = new Set();

    for (let i = 0; i < categories.length; i++) {
        currentCategories.add(categories[i].value);
    }

    let addCategories = categoryOptions.difference(currentCategories);

    for (let category of addCategories) {
    updateCategory(category);
}
}


let createItems = (item, count) => {
    
 let listItem = document.createElement("li");
        let taskText = document.createElement("p");
        let categoryText = document.createElement("p");
        let dateText = document.createElement("p");
        let statusText = document.createElement("p");
        let dropdown = document.createElement("div");
        dropdown.innerHTML =   `<select>
    <option></option>
    <option>In Progress</option>
    <option>Completed</option>
    <option>Overdue</option>
   </select>`

        let select =  dropdown.querySelector("select");
        select.classList.add("hide");
       select.id = count;
         select.name = "updateStatus";
        
         statusText.id = `status${count}`
        let statusButton = document.createElement("button");
        statusButton.textContent = "Change status";
        statusButton.classList.add("status-button");
        statusButton.addEventListener("click", changeStatus)
        // creating elements

        taskText.classList.add("inline");
        categoryText.classList.add("inline")
        dateText.classList.add("inline");

        let flexbox = document.createElement("div");
        flexbox.classList.add("flex-box");

        let taskContainer = document.createElement("div");
  

    let statusContainer = document.createElement("div");
    statusContainer.classList.add("flex-box")
        
     
        taskText.textContent = "Task: " +item.task;
        categoryText.textContent = "Category: " + item.category;
        dateText.textContent = "Date: " + item.date;
        statusText.textContent = item.status;
        // setting text content


    
select.addEventListener("change", (e) => {

    select.classList.remove("show");
}); // remove dropdown after selecting



        taskContainer.appendChild(taskText);
         taskContainer.appendChild(categoryText);
          taskContainer.appendChild(dateText);

          flexbox.appendChild(taskContainer);
          statusContainer.appendChild(statusText);
          statusContainer.appendChild(statusButton);
          statusContainer.appendChild(dropdown);
          flexbox.appendChild(statusContainer);

          listItem.appendChild(flexbox);

          list.appendChild(listItem);
          // connecting elements to each other
}





statusFilter.addEventListener("change", () => {
    showItems();
})

categoryFilter.addEventListener("change", () => {
    showItems();
})

submitButton.addEventListener("click", () => {
    let item = {};
    item.task = task.value;
    item.category = category.value;
    item.date = date.value;

    const today = new Date();
const formattedToday = today.toISOString().split("T")[0];


let status = item.date >= formattedToday ? "In Progress" : "Overdue";
item.status = status;
// Sets status to Overdue or In progress depending on date

    console.log(items);
    console.log(item)
    items.push(item);
    console.log(items);
    console.log(JSON.stringify(items));
    localStorage.setItem("items", JSON.stringify(items));
let storedItems = JSON.parse(localStorage.getItem("items"));
console.log("Stored items:", storedItems);

    categoryOptions.add(item.category);


    task.value= "";
    category.value = "";
    date.value = "";
    // reset inputs

    list.innerHTML ="";
    // clear list before reloading
    showItems();
    
})


showItems(); // initialize items