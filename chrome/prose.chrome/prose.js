redraw();
document.addEventListener('DOMSubtreeModified', redraw);

function redraw() {
  var root = document.querySelector('.actions');
  if (!root) return;

  var group = document.querySelector('.button-group');
  if (!group) {
    group = document.createElement('div');
    div.className = 'button-group';
    root.appendChild(group);
  }

  var a = document.querySelector('#prose');
  if (!a) {
    var link = document.createElement('a');
    link.id = 'prose';
    link.innerHTML = '<span class="prose-icon"></span>Edit in Prose';
    link.className = 'minibutton';
    a = link.firstChild;
    group.insertBefore(link, group.firstChild);
  }

  var parts = location.pathname.substring(1).split('/'),
      user = parts[0],
      repo = parts[1],
      branch = parts[3],
      path = parts.slice(4).join('/');

  if (!user || !/^[a-z0-9][a-z0-9]*$/.test(user)) return;
  a.href = 'http://prose.io/#' + user + '/' + repo + '/edit/' + branch + '/' + path;
}
