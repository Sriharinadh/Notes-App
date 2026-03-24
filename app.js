const btnn = document.querySelector(".btn");
const txtt = document.querySelector(".text");
const display = document.querySelector("#list");

let notes = [];


function createNote(text) {

  const li = document.createElement("li");
  const editbtn = document.createElement("button");
  const deletebtn = document.createElement("button");

  li.innerText = text;

  editbtn.innerText = "Edit";
  editbtn.classList.add("editt");
  deletebtn.innerText = "Delete";
  deletebtn.classList.add("delett");

  li.append(editbtn);
  li.append(deletebtn);

  display.appendChild(li);


  deletebtn.addEventListener("click", () => {
    notes = notes.filter(n => n !== text);
    localStorage.setItem("notes", JSON.stringify(notes));
    li.remove();
  });


  editbtn.addEventListener("click", () => {

    const newText = prompt("Enter Text");

    if (newText !== null && newText !== "") {


      li.firstChild.textContent = newText;


      notes = notes.map(n => n === text ? newText : n);


      localStorage.setItem("notes", JSON.stringify(notes));
    }

  });
}


window.addEventListener("DOMContentLoaded", () => {

  const stored = localStorage.getItem("notes");

  if (stored) {
    notes = JSON.parse(stored);

    notes.forEach(note => {
      createNote(note);
    });
  }

});


btnn.addEventListener("click", () => {

  const text = txtt.value;

  if (text === "") {
    alert("Enter Text");
    return;
  }

  notes.push(text);
  localStorage.setItem("notes", JSON.stringify(notes));

  createNote(text);

  txtt.value = "";

});


txtt.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    btnn.click();
  }
});