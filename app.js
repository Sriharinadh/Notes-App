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
  deletebtn.innerText = "Delete";

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

      // update UI
      li.firstChild.textContent = newText;

      // update array
      notes = notes.map(n => n === text ? newText : n);

      // update localStorage
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

// ✅ add note
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

// enter key
txtt.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    btnn.click();
  }
});