const form = document.querySelector("form");
const notesSection = document.querySelector("#notes");
let notes = [];

form.addEventListener("submit", handleSubmit);
window.addEventListener("load", showNotes);

function handleSubmit(event) {
  event.preventDefault();
  const note = getFormData(event);
  note.id = Math.ceil(Math.random() * 100000000);

  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes(note);

  form.reset();
}

function getFormData() {
  const note = {};
  const formData = new FormData(form);
  formData.forEach((value, key) => {
    note[key] = value;
  });
  return note;
}

function renderNotes(index) {
  notesSection.innerHTML = "";
  notes.forEach((note) => {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("col-4", "note");
    noteDiv.innerHTML = `
  <button id="${index}" onclick="removeNote(${note.id})" type="button" class="btn btn-default btn-sm noteBtn">
  <span class="glyphicon glyphicon-trash" ></span>
</button>
  <p>${note.doDate}</p>
  <p>- ${note.doTime} -</p>
  <p>
    ${note.txt}
  </p>`;

    notesSection.appendChild(noteDiv);

    let date = getDate();
    let today = Date.parse(date)
    let noteDate = note.doDate;
    let doDate = Date.parse(noteDate)
    if( doDate < today){
      noteDiv.classList.add('text-danger' , 'fw-bold')
    }
  });
}

function showNotes() {
  notesSection.innerHTML = "";
  let localNotes = localStorage.getItem("notes");
  if (!localNotes) return;
  notes = JSON.parse(localNotes);
  notes.forEach(() => {
    renderNotes();
  });
}

function getDate() {
  let dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1;
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();

  let newdate = year + "-" + month + "-" + day;
  return newdate;
}

function removeNote(id) {
  const obj = JSON.parse(localStorage.getItem("notes"));
  for (let i = 0; i < obj.length; i++) {
    if (id == obj[i].id) {
      obj.splice(i, 1);

      localStorage.setItem("notes", JSON.stringify(obj));
    }
  }
  showNotes();
}
