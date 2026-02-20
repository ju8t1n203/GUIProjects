// Non-module version: rely on global `generateId` and export globals on window
function buildNode(tbName, bName, parentId) {
  const newNode = document.createElement('div');
  newNode.className = 'node';

  const newConnector = document.createElement('div');
  newConnector.className = 'connector';
  newConnector.dataset.id = generateId();
  newConnector.id = newConnector.dataset.id;
  if (parentId) newConnector.dataset.parentId = parentId;

  const newTextbox = document.createElement('input');
  newTextbox.type = 'text';
  newTextbox.className = tbName.toLowerCase() + '-input';
  newTextbox.placeholder = tbName + ' Name';
  newTextbox.dataset.id = generateId();
  newTextbox.id = newTextbox.dataset.id;
  newTextbox.dataset.parentId = newConnector.dataset.id;

  const newMidButton = document.createElement('button');
  newMidButton.className = 'delete-button';
  newMidButton.textContent = '-';
  newMidButton.dataset.id = generateId();
  newMidButton.id = newMidButton.dataset.id;
  newMidButton.dataset.parentId = newConnector.dataset.id;

  const inputGroup = document.createElement('div');
  inputGroup.className = 'input-group';
  inputGroup.appendChild(newTextbox);

  newConnector.appendChild(inputGroup);
  newConnector.appendChild(newMidButton);

  if (bName !== 'Detail') {
    const newButton = document.createElement('button');
    newButton.className = bName.toLowerCase() + '-button';
    newButton.textContent = bName;
    newButton.dataset.id = generateId();
    newButton.id = newButton.dataset.id;
    newButton.dataset.parentId = newConnector.dataset.id;
    newConnector.appendChild(newButton);
  }

  newNode.appendChild(newConnector);

  // give the new node its own empty children container for future sub‑nodes
  const innerChildren = document.createElement('div');
  innerChildren.className = 'children level';
  innerChildren.dataset.id = generateId();
  innerChildren.id = innerChildren.dataset.id;
  innerChildren.dataset.parentId = newConnector.dataset.id;
  newNode.appendChild(innerChildren);

  return newNode;
}

function createChild(button, tbName, bName) {
  // locate the node wrapper containing the clicked button first
  const parentNode = button.closest('.node');
  if (!parentNode) return;
  const parentConnector = parentNode.querySelector('.connector');
  const parentId = parentConnector ? parentConnector.dataset.id : '';

  // when a child is added, the branch button is no longer needed
  // (prevents repeated additions from the same parent node).
  button.remove();

  // ensure there is a children container inside the node
  let childContainer = parentNode.querySelector(':scope > .children');
  if (!childContainer) {
    childContainer = document.createElement('div');
    childContainer.className = 'children level';
    parentNode.appendChild(childContainer);
    // record relationship
    if (parentId) childContainer.dataset.parentId = parentId;
    childContainer.dataset.id = generateId();
    childContainer.id = childContainer.dataset.id;
  }

  // build the new node that will be inserted into the child container
  // build and append a new node for this child level
  const newNode = buildNode(tbName, bName, parentId);
  childContainer.appendChild(newNode);

  // ensure there is exactly one sibling-add button at the bottom of this container
  let siblingAdd = childContainer.querySelector(':scope > .sibling-add');
  if (!siblingAdd) {
    siblingAdd = document.createElement('button');
    siblingAdd.className = 'sibling-add';
    siblingAdd.textContent = '+';
    siblingAdd.dataset.tbname = tbName;
    siblingAdd.dataset.bname = bName;
    siblingAdd.dataset.parentId = parentConnector ? parentConnector.dataset.id : '';
    siblingAdd.dataset.id = generateId();
    siblingAdd.id = siblingAdd.dataset.id;
    childContainer.appendChild(siblingAdd);
  } else {
    // update metadata in case it changed
    siblingAdd.dataset.tbname = tbName;
    siblingAdd.dataset.bname = bName;
    siblingAdd.dataset.parentId = parentConnector ? parentConnector.dataset.id : '';
  }
}

// expose to global scope for non-module usage
window.buildNode = buildNode;
window.createChild = createChild;