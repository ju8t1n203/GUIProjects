// Non-module version: rely on global `generateId` and export globals on window

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
window.createChild = createChild;