window.readTree = function readTree() {
  //eventuially wil;l be used to upload tree information to the server but for now just returns the current tree structure as an object
  const textboxes = Array.from(document.querySelectorAll('input[type="text"].site-input'));
  const buttons = Array.from(document.querySelectorAll('button.room-button'));
  return { textboxes, buttons };
}

function createBranch(button, tbName, bName) {

  const newConnector = document.createElement('div');
  const newTextbox = document.createElement('input');
  const newButton = document.createElement('button');

  newConnector.className = 'connector';
          
  newTextbox.type = 'text';
  newTextbox.className = tbName.toLowerCase() + '-input';
  newTextbox.placeholder = tbName+ ' Name';
          
  newButton.className = bName.toLowerCase() + '-button';
  newButton.textContent = bName;
  newButton.onclick = function() { window.addBranch(this); };
          
  button.replaceWith(newConnector);
  newConnector.appendChild(newTextbox);
  if (bName == 'Detail') return; //ensures trhat specifier is the deepest level
  newConnector.appendChild(newButton);


  //replace the button with the new connector
}

window.addBranch = function addBranch(button) {
  const connector = button.closest('.connector');
  if (!connector) return;

  switch (button.className) {
    case 'room-button':
      createBranch(button, 'Room', 'Area');
      break;
    case 'area-button':
      createBranch(button, 'Area', 'Specifier');
      break;
    case 'specifier-button':
      createBranch(button, 'Specifier', 'Detail');
      break;
  }
}

//initialize click handlers on page load
document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('button.room-button, button.area-button, button.specifier-button');
  buttons.forEach(button => {
    button.onclick = function() { window.addBranch(this); };
  });
});