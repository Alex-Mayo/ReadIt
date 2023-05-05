let readingSpeed = 0;
let totalTime = 0;
let totalPages = 0;

let bookShelf = [];

const blankBook = {
    name: "",
    PageCount: 0,
    PagesRead: 0
};

let book = blankBook;

//Update readingSpeed
function updateReadingSpeed(){
    readingSpeed = totalPages/totalTime;
    readingSpeed = readingSpeed.toFixed(2);
}

//Write to file
function write(){
    localStorage.setItem("time", totalTime);
    localStorage.setItem("page", totalPages);
    localStorage.setItem("bookShelf", JSON.stringify(bookShelf));
}

function main(){
    read();
    document.getElementById("readingSpeed").innerHTML = readingSpeed + " pages per minute";
    document.getElementById("totalPages").innerHTML = totalPages + " pages";
    document.getElementById("totalMinutes").innerHTML = totalTime + " minutes";
}

//Read from file
function read(){
    totalTime = +localStorage.getItem("time");
    totalPages = +localStorage.getItem("page");
    if(totalTime == 0){totalTime = 0;}
    if(totalPages == null){totalpages = 0};

    bookShelf = JSON.parse(localStorage.getItem("bookShelf") || "[]");
    if(bookShelf == null){bookShelf = [];}

    updateReadingSpeed();
}



//Button for add book
function addBookButton(){
    let temp = document.getElementById("bookTitle").value;
    let oTemp = document.getElementById("newPages").value;
    addBook(temp, oTemp);

    write();
    window.location.href = "bookshelf.html";
}


//Creates a book and adds it to the bookshelf
function addBook(bookName, pages){

    book.name = bookName;
    book.PageCount = pages;
    bookShelf.push(book);
    book = blankBook;
}

//DropDown Options
function drop(){
    read();
    let sel = document.getElementById("selection");
    for(let i = 0; i < bookShelf.length; i++){
        let opt = bookShelf[i].name;
        let temp = document.createElement("option");
        temp.textContent = opt;
        temp.value = opt;
        sel.appendChild(temp);
    }
}

//Button for remove book
function removeBookButton(){
    let temp = document.getElementById("selection").value;
    removeBook(temp);

    write();
    window.location.href = "bookshelf.html";
}


//Removes a book from the bookshelf
function removeBook(bookName){
    for(let i = 0; i < bookShelf.length; i++){
        if(bookShelf[i].name === bookName){
            bookShelf.splice(i, 1);
        }
    }
}

//Button for add Reading Session
function addReadingButton(){
    let n = document.getElementById("selection").value;
    let min = +document.getElementById("newMinutes").value;
    let pg = +document.getElementById("newPRead").value;

    addReadingSession(min, pg, n);

    window.location.href = "main.html";
}


//Update total pages and minutes
//Update book information as well
function addReadingSession(minutes, pages, bookName){
    //Find book in bookshelf
    for(let i = 0; i < bookShelf.length; i++){
        if(bookName === bookShelf[i].name){
            book = bookShelf[i];
            book.PagesRead = book.PagesRead + pages;
        if(book.PagesRead > book.PageCount){
            book.PagesRead = book.PageCount;
        }
        bookShelf[i] = book;
        book = blankBook;
        break;
        }
    }

    totalTime = totalTime + minutes;
    totalPages = totalPages + pages;
    write();
    updateReadingSpeed();
}

//Displays Bookshelf in table format
function bookShelfTable(){
    read();
    const tbl = document.createElement("table");
    const tblHead = document.createElement("thead");
    const tblBody = document.createElement("tbody");

    //Table Header
    const header = document.createElement("tr");
    const title = document.createElement("th");
    const titleText = document.createTextNode("Title");
    title.appendChild(titleText);
    const pRead = document.createElement("th");
    const pReadText = document.createTextNode("Pages Read");
    pRead.appendChild(pReadText);
    const pCount = document.createElement("th");
    const pCountText = document.createTextNode("Page Count");
    pCount.appendChild(pCountText);
    const pLeft = document.createElement("th");
    const pLeftText = document.createTextNode("Pages Left");
    pLeft.appendChild(pLeftText);
    const percent = document.createElement("th");
    const percentText = document.createTextNode("Percentage Compete");
    percent.appendChild(percentText);

    header.appendChild(title);
    header.appendChild(pRead);
    header.appendChild(pCount);
    header.appendChild(pLeft);
    header.appendChild(percent);
    tblHead.appendChild(header);
    tbl.appendChild(tblHead);
      
    for (let i = 0; i < bookShelf.length; i++) {
        const row = document.createElement("tr");
        
        //Adds Book to row and adds row to table
        book = bookShelf[i];
        const cell = document.createElement("td");
        const cellText = document.createTextNode(book.name);
        cell.appendChild(cellText);
        row.appendChild(cell);
        const cell2 = document.createElement("td");
        const cell2Text = document.createTextNode(book.PagesRead);
        cell2.appendChild(cell2Text);
        row.appendChild(cell2);
        const cell3 = document.createElement("td");
        const cell3Text = document.createTextNode(book.PageCount);
        cell3.appendChild(cell3Text);
        row.appendChild(cell3);
        const cell4 = document.createElement("td");
        const cell4Text = document.createTextNode((book.PageCount - book.PagesRead));
        cell4.appendChild(cell4Text);
        row.appendChild(cell4);
        const cell5 = document.createElement("td");
        const cell5Text = document.createTextNode(Math.round((book.PagesRead / book.PageCount) * 100));
        cell5.appendChild(cell5Text);
        row.appendChild(cell5);
      
        tblBody.appendChild(row);
    }
      
    tbl.appendChild(tblBody);
    document.body.appendChild(tbl);
}

