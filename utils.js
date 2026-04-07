// Shared utilities (non-module version)
(function(){
  let idCounter = 0;
  window.generateId = function() {
    return 'node-' + (++idCounter);
  };
})();

function buildNode(tbName, bName, parentId) {
  const newNode = document.createElement('div');
  newNode.className = 'node';

  const newConnector = document.createElement('div');
  newConnector.className = 'connector';
  
  if (bName === 'Detail') { //no connector line for specifier level since it is the last level
    newConnector.classList.add('no-line');
  }

  newConnector.dataset.id = generateId();
  newConnector.id = newConnector.dataset.id;
  if (parentId) newConnector.dataset.parentId = parentId;

  const newTextbox = document.createElement('input');
  newTextbox.type = 'text';
  newTextbox.className = 'short-text-' + tbName.toLowerCase();
  newTextbox.placeholder = tbName + ' Name';
  newTextbox.dataset.id = generateId();
  newTextbox.id = newTextbox.dataset.id;
  newTextbox.dataset.parentId = newConnector.dataset.id;

  const inputGroup = document.createElement('div');
  inputGroup.className = 'input-group';
  inputGroup.appendChild(newTextbox);

  newConnector.appendChild(inputGroup);

  if (bName !== 'Detail') {
    const newButton = document.createElement('button');
    newButton.className = 'typical-btn-' + bName.toLowerCase();
    newButton.textContent = "Add " + bName;
    newButton.dataset.id = generateId();
    newButton.id = newButton.dataset.id;
    newButton.dataset.parentId = newConnector.dataset.id;
    newConnector.appendChild(newButton);
  }

  newNode.appendChild(newConnector);

  return newNode;
}

window.buildNode = buildNode;