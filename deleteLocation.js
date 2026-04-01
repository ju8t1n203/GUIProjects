//do the thing
//add event listeners for actionMode radio buttons
document.getElementById('mode').addEventListener('change', function(e) {
  if (e.target.name === 'actionMode') {
    const action = e.target.value;  
    // toggle delete mode class on root for styling
    document.getElementById('root').classList.toggle('delete-mode', action === 'delete');
    if (action === 'delete') {
        console.log('Delete mode activated');
    } else if (action === 'add') {
        console.log('Add mode activated');
    }
  }
});

document.addEventListener('click', function(e) {
  if (e.target.tagName === 'INPUT' && e.target.type === 'text') {
    const root = document.getElementById('root');
    if (root.classList.contains('delete-mode')) {
      const node = e.target.closest('.node');
      if (confirm('Are you sure you want to delete ' + e.target.value + ' and all its ' + node.querySelectorAll('.node').length + ' children?')) {
        if (node) node.remove();
      }
    }
  }
});
