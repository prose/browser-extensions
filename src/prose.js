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
    const configFilePath = 'https://github.com/' + user + '/' + repo + '/blob/master/_prose.yml';

    // User test
    if (!user || !/^\w[\w-]+$/.test(user)) {
      return;
    }

    // Prose config file test
    fetch(configFilePath).then(function (response) {
      if (response.ok) {
        // Display nav button
        const nav = document.querySelector('.hx_reponav');
        const button = document.querySelector('#prose');
        if (!button) {
          const link = document.createElement('a');
          link.id = 'prose';
          link.innerHTML = '<span class="prose-icon"></span>Prose';
          link.title = 'Open in Prose';
          link.className = 'js-selected-navigation-item reponav-item';
          link.rel = 'nofollow';
          nav.appendChild(link);
          link.href = 'https://prose.io/#' + user + '/' + repo + '/';
        }
      } else {
        throw new Error(`Request rejected with status ${response.status}`);
      }
    }).catch(function (err) {
      //
    });

    // Sha test
    if (/^[0-9a-f]{40}$/.test(branch)) {
      return;
    }

    // Markdown file type test
    if (!/\.markdown|mdown|mkdn|mkd|md$/i.test(path)) {
      return;
    }

    // Edit button
    const root = document.querySelector(rootClass);
    if (!root) {
      return;
    }
    const group = document.querySelector(rootClass + ' .BtnGroup');
    if (!group) {
      const group = document.createElement('div');
      group.className = 'BtnGroup';
      root.appendChild(group);
    }
    let edit = document.querySelector('#prose-edit');
    if (!edit) {
      const link = document.createElement('a');
      link.id = 'prose-edit';
      link.innerHTML = '<span class="prose-icon"></span>Edit in Prose';
      link.className = 'btn btn-sm BtnGroup-item tooltipped tooltipped-n rgh-md-source';
      link.rel = 'nofollow';
      link.setAttribute('aria-label', 'Open file in Prose.io');
      edit = link.firstChild;
      group.insertBefore(link, group.firstChild);
    }
    edit.href = 'https://prose.io/#' + user + '/' + repo + '/edit/' + branch + '/' + path;
  }
})();
