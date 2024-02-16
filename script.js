function checkAuth() {
    return localStorage.getItem('authenticated');
  }
  
  function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    if (username === 'user' && password === 'password') {
      localStorage.setItem('authenticated', true);
      document.getElementById('auth-container').style.display = 'none';
      document.getElementById('note-container').style.display = 'block';
      loadNotes();
    } else {
      alert('wrong username or password');
    }
  }
  
  function logout() {
    localStorage.removeItem('authenticated');
    document.getElementById('auth-container').style.display = 'block';
    document.getElementById('note-container').style.display = 'none';
  }
  
  function saveNote() {
    var noteText = document.getElementById('note-text').value;
    if (!noteText.trim()) {
      alert('Please enter a note!');
      return;
    }
  
    var notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(noteText);
    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes();
    document.getElementById('note-text').value = '';
  }
  
  function deleteNote(index) {
    var notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes();
  }
  
  function deleteAllNotes() {
    localStorage.removeItem('notes');
    loadNotes();
  }
  
  function loadNotes() {
    var notes = JSON.parse(localStorage.getItem('notes')) || [];
    var notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';
    notes.forEach(function(note, index) {
      var noteItem = document.createElement('div');
      noteItem.textContent = note;
      
      var deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'delete-button';
      deleteButton.onclick = function() {
        deleteNote(index);
      };
  
      noteItem.appendChild(deleteButton);
      notesList.appendChild(noteItem);
    });
  
    var deleteAllButton = document.getElementById('delete-all');
    if (notes.length > 0) {
      deleteAllButton.style.display = 'block';
    } else {
      deleteAllButton.style.display = 'none';
    }
  }
  
  window.onload = function() {
    if (checkAuth()) {
      document.getElementById('auth-container').style.display = 'none';
      document.getElementById('note-container').style.display = 'block';
      loadNotes();
    }
  };
  