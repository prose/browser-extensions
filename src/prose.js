(function () {
  redraw();
  document.addEventListener('DOMSubtreeModified', redraw);

  function redraw() {
    const rootClass = 'body > div.application-main > div > main > div.container-lg.new-discussion-timeline.experiment-repo-nav.p-responsive > div.repository-content > div.Box.mt-3.position-relative > div.Box-header.py-2.d-flex.flex-column.flex-shrink-0.flex-md-row.flex-md-items-center > div.d-flex.py-1.py-md-0.flex-auto.flex-order-1.flex-md-order-2.flex-sm-grow-0.flex-justify-between';
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

    const root = document.querySelector(rootClass);
    if (!root) {
      return;
    }
    const group = document.querySelector(rootClass+' .BtnGroup');
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
      link.rel = 'nofollow';
      a = link.firstChild;
      group.insertBefore(link, group.firstChild);
    }

    a.href = 'http://prose.io/#' + user + '/' + repo + '/edit/' + branch + '/' + path;
  }
})();
