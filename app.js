function saveNote() {
  const note = document.getElementById('note').value;
  if (!note) return;
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.push({ text: note, date: new Date().toISOString() });
  localStorage.setItem('notes', JSON.stringify(notes));
  document.getElementById('note').value = '';
  displayNotes();
}

function displayNotes() {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  const container = document.getElementById('saved-notes');
  container.innerHTML = '<h2>Saved Notes:</h2>';
  notes.forEach((note, index) => {
    container.innerHTML += `
      <div>
        <p>${note.text}</p>
        <small>${new Date(note.date).toLocaleString()}</small>
        <button onclick="deleteNote(${index})">Delete</button>
        <hr>
      </div>
    `;
  });
}

function deleteNote(index) {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(notes));
  displayNotes();
}

window.onload = displayNotes;



