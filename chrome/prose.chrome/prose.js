(function () {
  redraw();
  document.addEventListener('DOMSubtreeModified', redraw);

  function redraw() {
    var parts = location.pathname.substring(1).split('/');
    var user = parts[0];
    var repo = parts[1];
    var branch = parts[3];
    var path = parts.slice(4).join('/');

    if (!user || !/^\w[\w-]+$/.test(user)) return;

    // Sha Test
    if (/^[0-9a-f]{40}$/.test(branch)) return;

    var root = document.querySelector('.actions');
    if (!root) return;

    var group = document.querySelector('.actions > .button-group');
    if (!group) {
      group = document.createElement('div');
      div.className = 'button-group';
      root.appendChild(group);
    }

    var a = document.querySelector('#prose');
    if (!a) {
      var link = document.createElement('a');
      link.id = 'prose';
      link.innerHTML = '<span class="prose-icon"></span>Edit in prose';
      link.className = 'minibutton';
      a = link.firstChild;
      group.insertBefore(link, group.firstChild);
    }

    a.href = 'http://prose.io/#' + user + '/' + repo + '/edit/' + branch + '/' + path;
  }
})();