// Non-module version: use globals `generateId` and `buildNode`
function addSiblingButton(button) {
  const container = button.closest('.children') || document.querySelector('#root');
  if (!container) return;
  const tbName = button.dataset.tbname || 'Item';
  const bName = button.dataset.bname || '';
  const parentId = button.dataset.parentId || '';

  const newNode = buildNode(tbName, bName, parentId);
  // insert the new node before the sibling-add button so the button stays last
  container.insertBefore(newNode, button);
}

function addSibling(button) {
  const node = button.closest('.node');
  if (!node) return;

  // determine parent container (should be a vertical level)
  const container = node.parentNode;
  const parentNode = container.closest('.node');
  const parentConnector = parentNode ? parentNode.querySelector('.connector') : null;
  const parentId = parentConnector ? parentConnector.dataset.id : '';

  // clone the whole node wrapper (includes its own children container if present)
  const newNode = node.cloneNode(true);
  // clear existing child nodes from clone so sibling starts empty
  const clonedChildren = newNode.querySelector('.children');
  if (clonedChildren) {
    clonedChildren.innerHTML = '';
    // assign fresh id/parent for the empty container
    clonedChildren.dataset.id = generateId();
    clonedChildren.id = clonedChildren.dataset.id;
    if (parentId) clonedChildren.dataset.parentId = parentId;
  }

  // re‑id the connector inside the clone
  const newConnector = newNode.querySelector('.connector');
  newConnector.dataset.id = generateId();
  newConnector.id = newConnector.dataset.id;
  if (parentId) newConnector.dataset.parentId = parentId;

  // clear and re‑id inputs/buttons in clone
  const textbox = newNode.querySelector('input[type="text"]');
  if (textbox) {
    textbox.value = '';
    textbox.dataset.id = generateId();
    textbox.id = textbox.dataset.id;
    textbox.dataset.parentId = newConnector.dataset.id;
  }
  newNode.querySelectorAll('button').forEach(btn => {
    btn.dataset.id = generateId();
    btn.id = btn.dataset.id;
    btn.dataset.parentId = newConnector.dataset.id;
  });

  // place the new node directly after the current one in the vertical container
  container.insertBefore(newNode, node.nextSibling);
}

// expose globals
window.addSiblingButton = addSiblingButton;
window.addSibling = addSibling;
