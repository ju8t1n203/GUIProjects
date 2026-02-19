/**
 * Reads the tree and returns all textboxes and buttons
 * @returns {Object} Object with 'textboxes' and 'buttons' arrays
 */
window.readTree = function readTree() {
    //need to read classes of site, room, area and specifier for both textboxes and buttons to make this work
  const textboxes = Array.from(document.querySelectorAll('input[type="text"].site-input'));
  const buttons = Array.from(document.querySelectorAll('button.room-button'));
  return { textboxes, buttons };
}

/**
 * Adds a new branch by replacing a button with a connector containing a textbox and new button
 * @param {HTMLElement} button - The button element to replace
 */

function createBranch(){

}



window.addBranch = function addBranch(button) {
  const connector = button.closest('.connector');
  if (!connector) return;

  //make a case select based on the class of the button to determine what type of branch to add
  switch (button.className) {
    case 'room-button':
        const newConnector = document.createElement('div');
        newConnector.className = 'connector';
          
        const newTextbox = document.createElement('input');
        newTextbox.type = 'text';
        newTextbox.className = 'area-input';
        newTextbox.placeholder = 'Area name';
          
        const newButton = document.createElement('button');
        newButton.className = 'specifier-button';
        newButton.textContent = 'Add Specifier';
        newButton.onclick = function() { window.addBranch(this); };
          
        newConnector.appendChild(newTextbox);
        newConnector.appendChild(newButton);
    break;
    case 'area-button':
    // Add area-specific logic here
    break;
    case 'specifier-button':
    // Add specifier-specific logic here
    break;
  }

  
  // Replace the button with the new connector
  button.replaceWith(newConnector);
}

// Initialize click handlers on page load
document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('button.child-button');
  buttons.forEach(button => {
    button.onclick = function() { window.addBranch(this); };
  });
});