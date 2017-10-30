(function () {
  redraw();
  document.addEventListener('DOMSubtreeModified', redraw);

  function redraw() {
    const parts = location.pathname.substring(1).split('/');
    const user = parts[0];
    const repo = parts[1];
    const branch = parts[3];
    const path = parts.slice(4).join('/');

    if (!user || !/^\w[\w-]+$/.test(user)) {
      return;
    }

    // Sha Test
    if (/^[0-9a-f]{40}$/.test(branch)) {
      return;
    }

    const root = document.querySelector('.file-actions');
    if (!root) {
      return;
    }

    const group = document.querySelector('.file-actions > .BtnGroup');
    if (!group) {
      const group = document.createElement('div');
      group.className = 'BtnGroup';
      root.appendChild(group);
    }

    let a = document.querySelector('#prose');
    if (!a) {
      const link = document.createElement('a');
      link.id = 'prose';
      link.innerHTML = '<span class="prose-icon"></span>Edit in Prose';
      link.className = 'btn btn-sm BtnGroup-item';
      a = link.firstChild;
      group.insertBefore(link, group.firstChild);
    }

    a.href = 'http://prose.io/#' + user + '/' + repo + '/edit/' + branch + '/' + path;
  }
})();
