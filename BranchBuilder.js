// Non-module version: relies on globals exposed by other scripts
// `generateId`, `createChild`, `addSiblingButton`, `addSibling` are expected on `window`.

window.addChild = function addChild(button) {
  const connector = button.closest('.connector');
  if (!connector) return;

  switch (button.className) {
    case 'room-button':
      createChild(button, 'Room', 'Area');
      break;
    case 'area-button':
      createChild(button, 'Area', 'Specifier');
      break;
    case 'specifier-button':
      createChild(button, 'Specifier', 'Detail');
      break;
  }
}

// on startup give ids to any existing elements so the tree can track them
function initializeExisting() {
  // ensure each node wrapper has a children container
  document.querySelectorAll('.node').forEach(node => {
    let childContainer = node.querySelector(':scope > .children');
    if (!childContainer) {
      childContainer = document.createElement('div');
      childContainer.className = 'children level';
      node.appendChild(childContainer);
    }
    // id the children container
    if (!childContainer.dataset.id) childContainer.dataset.id = generateId();
    childContainer.id = childContainer.dataset.id;
    if (!childContainer.dataset.parentId) {
      const parentConn = node.querySelector('.connector');
      if (parentConn) childContainer.dataset.parentId = parentConn.dataset.id;
    }
    // ensure each children container has a single sibling-add button
    if (!childContainer.querySelector(':scope > .sibling-add')) {
      // try to derive tbName/bName from first child node
      const firstNode = childContainer.querySelector('.node');
      let tbName = 'Item', bName = '';
      if (firstNode) {
        const inp = firstNode.querySelector('input[type="text"]');
        if (inp && inp.className) tbName = inp.className.replace('-input','').replace(/(^|\-|\s)\w/g, s => s.toUpperCase());
        const branch = firstNode.querySelector('button.room-button, button.area-button, button.specifier-button');
        if (branch) bName = branch.className.replace('-button','').replace(/(^|\-|\s)\w/g, s => s.toUpperCase());
      }
      const siblingAdd = document.createElement('button');
      siblingAdd.className = 'sibling-add';
      siblingAdd.textContent = '+';
      siblingAdd.dataset.tbname = tbName;
      siblingAdd.dataset.bname = bName;
      siblingAdd.dataset.parentId = childContainer.dataset.parentId || '';
      siblingAdd.dataset.id = generateId();
      siblingAdd.id = siblingAdd.dataset.id;
      childContainer.appendChild(siblingAdd);
    }
  });

  // ensure root has a sibling-add for top-level nodes
  const root = document.querySelector('#root');
  if (root && !root.querySelector(':scope > .sibling-add')) {
    const siblingAdd = document.createElement('button');
    siblingAdd.className = 'sibling-add';
    siblingAdd.textContent = '+';
    siblingAdd.dataset.tbname = 'Site';
    siblingAdd.dataset.bname = 'Room';
    siblingAdd.dataset.parentId = '';
    siblingAdd.dataset.id = generateId();
    siblingAdd.id = siblingAdd.dataset.id;
    root.appendChild(siblingAdd);
  }

  // connectors get ids and parent relationships
  document.querySelectorAll('.connector').forEach(conn => {
    if (!conn.dataset.id) conn.dataset.id = generateId();
    conn.id = conn.dataset.id;
    if (!conn.dataset.parentId) {
      const parentNode = conn.closest('.node').parentElement;
      const parentWrapper = parentNode && parentNode.closest('.node');
      if (parentWrapper) {
        const parentConn = parentWrapper.querySelector('.connector');
        if (parentConn) conn.dataset.parentId = parentConn.dataset.id;
      }
    }
    conn.querySelectorAll('input, button').forEach(el => {
      if (!el.dataset.id) el.dataset.id = generateId();
      el.id = el.dataset.id;
      if (!el.dataset.parentId) el.dataset.parentId = conn.dataset.id;
    });
  });
}

document.addEventListener('DOMContentLoaded', initializeExisting);

// use event delegation so dynamically‑added connectors continue to work

document.addEventListener('click', function(e) {
  const btn = e.target;
  if (btn.tagName !== 'BUTTON') return;

  if (btn.classList.contains('sibling-add')) {
    window.addSiblingButton(btn);
  }
  else if (btn.classList.contains('room-button') ||
      btn.classList.contains('area-button') ||
      btn.classList.contains('specifier-button')) {
    window.addChild(btn);
  }
  else if (btn.classList.contains('delete-button')) {
    // placeholder for delete logic when implemented
    // could remove connector or reset value
    console.log('delete button clicked', btn);
  }
});