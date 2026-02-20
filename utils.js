// Shared utilities (non-module version)
(function(){
  let idCounter = 0;
  window.generateId = function() {
    return 'node-' + (++idCounter);
  };
})();
