// Non-module version: relies on globals exposed by other scripts
// `generateId`, `createChild`, `addSiblingButton`, `addSibling` are expected on `window`.

window.addChild = function addChild(button) {
  const connector = button.closest('.connector');
  if (!connector) return;

  switch (button.className) {
    case 'typical-btn-room':
      createChild(button, 'Room', 'Area');
      break;
    case 'typical-btn-area':
      createChild(button, 'Area', 'Specifier');
      break;
    case 'typical-btn-specifier':
      createChild(button, 'Specifier', 'Detail');
      break;
  }
}

// on startup give ids to any existing elements so the tree can track them
function initializeExisting() {

  // ensure root has a sibling-add for top-level nodes
  const root = document.querySelector('#root');
  if (root && !root.querySelector(':scope > .typical-btn-sibling')) {
    const siblingAdd = document.createElement('button');
    siblingAdd.className = 'typical-btn-sibling';
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

  if (btn.classList.contains('typical-btn-sibling')) {
    window.addSiblingButton(btn);
  }
  else if (btn.classList.contains('typical-btn-room') ||
      btn.classList.contains('typical-btn-area') ||
      btn.classList.contains('typical-btn-specifier')) {
    window.addChild(btn);
  }
});