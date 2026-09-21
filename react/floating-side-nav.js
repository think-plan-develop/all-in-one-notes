(function () {
  var sideNav = document.querySelector('.side-nav');
  if (!sideNav) return;

  var source = document.querySelector('.toc, nav:not(.side-nav), [role="navigation"]:not(.side-nav)');
  var links = source ? Array.from(source.querySelectorAll('a[href^="#"]')) : [];
  var sections = [];

  if (links.length) {
    links = links.map(function (link) {
      var target = document.querySelector(link.getAttribute('href'));
      return target ? { target: target, label: link.textContent.trim() } : null;
    }).filter(Boolean);
  } else {
    sections = Array.from(document.querySelectorAll('h2, h3')).filter(function (heading) {
      return !heading.closest('.side-nav, header, script, style');
    });
    if (!sections.length) {
      sections = Array.from(document.querySelectorAll('[id]')).filter(function (element) {
        return !element.closest('.side-nav, header, script, style, svg') && element.id !== 'search';
      });
    }
    var usedIds = new Set(Array.from(document.querySelectorAll('[id]')).map(function (element) { return element.id; }));
    links = sections.map(function (section, index) {
      if (!section.id) {
        var base = (section.textContent || 'section').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section';
        var id = base;
        var suffix = 2;
        while (usedIds.has(id)) id = base + '-' + suffix++;
        section.id = id;
        usedIds.add(id);
      }
      return { target: section, label: section.textContent.trim() || 'Section ' + (index + 1) };
    });
  }

  links.forEach(function (item) {
    var link = document.createElement('a');
    link.href = '#' + item.target.id;
    link.textContent = item.label;
    link.addEventListener('click', function (event) {
      event.preventDefault();
      item.target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    sideNav.appendChild(link);
    item.link = link;
  });

  if (!links.length) return;

  var update = function () {
    sideNav.classList.toggle('show', window.scrollY > 200);
    var current = links[0];
    links.forEach(function (item) {
      if (item.target.getBoundingClientRect().top <= 160) current = item;
    });
    links.forEach(function (item) {
      item.link.classList.toggle('active', item === current);
    });
  };

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
