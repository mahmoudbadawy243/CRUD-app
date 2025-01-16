let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let title = document.getElementById("title");
let total = document.getElementById("total");
let category = document.getElementById("category");
let count = document.getElementById("count");
let creat = document.getElementById("submit");
let mood = creat;
let temp;

// get total price =====================================================================================================================

function totally() {
  if (price.value != "") {
    total.innerHTML = +price.value + +taxes.value + +ads.value - discount.value;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}
// add product =====================================================================================================================

let arrayOfProduct;

if (localStorage.product) {
  arrayOfProduct = JSON.parse(localStorage.product);
} else {
  arrayOfProduct = [constArrayOfProduct];
}

creat.onclick = function () {
  let newProduct = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    category: category.value,
    count: count.value,
    total: total.innerHTML,
  };

  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    count.value < 100
  ) {
    if (mood == creat) {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          arrayOfProduct.push(newProduct);
        }
      } else {
        arrayOfProduct.push(newProduct);
      }
    } else {
      arrayOfProduct[temp] = newProduct;
      mood = creat;
      submit.innerHTML = "Creat";
      count.style.display = "block";
    }
    clearInputs();
  }

  localStorage.setItem("product", JSON.stringify(arrayOfProduct));
  display();
};

function clearInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
}

// Display =====================================================================================================================

function display() {
  let table = "";
  for (let i = 0; i < arrayOfProduct.length; i++) {
    table += `<tr>
            <td>${i + 1}</td>
            <td>${arrayOfProduct[i].title}</td>
            <td>${arrayOfProduct[i].price}</td>
            <td>${arrayOfProduct[i].taxes}</td>
            <td>${arrayOfProduct[i].ads}</td>
            <td>${arrayOfProduct[i].discount}</td>
            <td>${arrayOfProduct[i].total}</td>
            <td>${arrayOfProduct[i].category}</td>
            <td><button id="update" onclick="updateProduct(${i})" >Update</button></td>
            <td><button id="delete" onclick=deleteProduct(${i})>delete</button></td>
  </tr>`;
    document.getElementById("tbody").innerHTML = table;
  }
  totally();
}
display();







// Delete ======================================================================================================================================

function deleteProduct(i) {
  arrayOfProduct.splice(i, 1);
  localStorage.product = JSON.stringify(arrayOfProduct);
  display();
}

// Delete All ===============================================================================================================================
//
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
let deleteButton = document.getElementById("deleteAllProducts");
if (arrayOfProduct.length > 0) {
  deleteButton.innerHTML = `<button onclick="deleteAll()" >Delete All</button>`;
} else {
  deleteButton.innerHTML = "";
}

function deleteAll() {
  localStorage.clear();
  arrayOfProduct.splice(0);
  display();
}

// Update ========================================================================================================================================

function updateProduct(i) {
  title.value = arrayOfProduct[i].title;
  price.value = arrayOfProduct[i].price;
  taxes.value = arrayOfProduct[i].taxes;
  ads.value = arrayOfProduct[i].ads;
  discount.value = arrayOfProduct[i].discount;
  category.value = arrayOfProduct[i].category;
  totally();
  count.style.display = "none";
  submit.innerHTML = "Update";
  mood = update;
  temp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
// Search ========================================================================================================================================

let searchMood = title;
let search = document.getElementById("search");
function getSearchMood(id) {
  if (id == searchByTitle) {
    searchMood == title;
    search.placeholder = "search by title";
  } else {
    searchMood == category;
    search.placeholder = "search by category";
  }
  search.focus();
  search.value = "";
  display();
}

function searchProduct(value) {
  let table = "";
  for (let i = 0; i < arrayOfProduct.length; i++) {
    if (arrayOfProduct[i].title.toLowerCase().includes(value.toLowerCase())) {
      table += `<tr>
                <td>${i}</td>
                <td>${arrayOfProduct[i].title}</td>
                <td>${arrayOfProduct[i].price}</td>
                <td>${arrayOfProduct[i].taxes}</td>
                <td>${arrayOfProduct[i].ads}</td>
                <td>${arrayOfProduct[i].discount}</td>
                <td>${arrayOfProduct[i].total}</td>
                <td>${arrayOfProduct[i].category}</td>
                <td><button id="update" onclick="updateProduct(${i})" >Update</button></td>
                <td><button id="delete" onclick=deleteProduct(${i})>delete</button></td>
      </tr>`;
    } else {
      if (
        arrayOfProduct[i].category.toLowerCase().includes(value.toLowerCase())
      ) {
        table += `<tr>
                  <td>${i}</td>
                  <td>${arrayOfProduct[i].title}</td>
                  <td>${arrayOfProduct[i].price}</td>
                  <td>${arrayOfProduct[i].taxes}</td>
                  <td>${arrayOfProduct[i].ads}</td>
                  <td>${arrayOfProduct[i].discount}</td>
                  <td>${arrayOfProduct[i].total}</td>
                  <td>${arrayOfProduct[i].category}</td>
                  <td><button id="update" onclick="updateProduct(${i})" >Update</button></td>
                  <td><button id="delete" onclick=deleteProduct(${i})>delete</button></td>
        </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
