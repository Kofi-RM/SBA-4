
let list = document.getElementById("list");
let submitButton = document.getElementById("submit")
let task = document.getElementById("task");
let category = document.getElementById("category");
let date = document.getElementById("date");
let statusFilter = document.getElementById("statusSelect")
let categoryFilter = document.getElementById("categorySelect")
let categoryOptions = new Set();
let items = [{task:"Go to store", category:"Errand", date:"2026-03-21", status:"In Progress"} 
   , {task:"Walk the cat", category:"Errand", date:"2026-03-23", status:"In Progress"} ,
   {task:"Go to bar", category:"Leisure", date:"2026-03-30", status:"In Progress"}
];


window.onclick = function(event) {
    if (event.target.matches('[name="option"]')) {
        console.log("we outside")
        var dropdowns = document.getElementsByName("updateStatus");
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
if (openDropdown.classList.contains('show')) {
    openDropdown.classList.remove('show');
}
        }
    }
}

let changeStatus = (e) => {
    let p = e.target.closest("div");
    let d = p.querySelector("div")
    let select = d.querySelector("select")
    console.log(select)
    console.log(d);
    select.addEventListener("change", () => {
    let id = Number(select.id);
    console.log("id:", id);
console.log("item at id:", items[id]);
    console.log(items[id].status)
    
    console.log(select.value)
     items[id].status = select.value;
    console.log(items);
   
    showItems();

    
    })
    select.classList.add("show");




}
let createItems = (item, count) => {
    
 let listItem = document.createElement("li");
        let taskText = document.createElement("p");
        let categoryText = document.createElement("p");
        let dateText = document.createElement("p");
        let statusText = document.createElement("p");
        let dropdown = document.createElement("div");
        dropdown.innerHTML =   `<select>

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
    //    taskContainer.classList.add("flex-box")

    let statusContainer = document.createElement("div");
    statusContainer.classList.add("flex-box")
        
     
        taskText.textContent = "Task: " +item.task;
        categoryText.textContent = "Category: " + item.category;
        dateText.textContent = "Date: " + item.date;
        statusText.textContent = item.status;
        // setting text content


    
select.addEventListener("change", (e) => {
    console.log("selected:", e.target.value);
    select.classList.remove("show");
});



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

let updateCategory = (category) => {
        let newCategory = document.createElement("option");
    newCategory.innerHTML =  category;
    categoryFilter.appendChild(newCategory);
} // adds category to dropdown

let showItems = () => {
      list.innerHTML ="";
    let categories = categoryFilter.children;
    let update = new Set();
  
    
    
    
    let filterItems;
    if (statusFilter.value == "Off" && categoryFilter.value == "Off") {
        filterItems = items;
    } else if (categoryFilter.value != "Off") {
     filterItems = items.filter((item) => item.category == categoryFilter.value )
    } else if (statusFilter != "Off") {
        filterItems = items.filter((item) => item.status == statusFilter.value )
    }
    let count = 0;
    for (let item of filterItems) {
      createItems(item, count);
      count++;
      categoryOptions.add(item.category);
    } // create listItem for each item

    let currentCategories = new Set();

    for (let i = 0; i < categories.length; i++) {
        currentCategories.add(categories[i].value);
    }

    let addCategories = categoryOptions.difference(currentCategories);

    for (let category of addCategories) {
    updateCategory(category);
}
}




showItems();
statusFilter.addEventListener("change", () => {
  
    showItems();
})

categoryFilter.addEventListener("change", () => {
  
    showItems();
})
submitButton.addEventListener("click", () => {
    let item = [];
    item.task = task.value;
    item.category = category.value;
    item.date = date.value;

    const today = new Date();
const formattedToday = today.toISOString().split("T")[0];


let status = item.date >= formattedToday ? "In Progress" : "Overdue";
item.status = status;
// Sets status to Overdue or In progress depending on date

    items.push(item);
    console.log(item);
    categoryOptions.add(item.category);


    task.value= "";
    category.value = "";
    date.value = "";
    // reset inputs

    list.innerHTML ="";
    // clear list before reloading
    showItems();
    
})


