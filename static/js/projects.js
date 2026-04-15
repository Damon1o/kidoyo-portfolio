var activeFilter = 'all';

function applyFilters() {
    var query = document.getElementById('projectSearch').value.trim().toLowerCase();
    var cols = document.querySelectorAll('.project-col');
    var delay = 0;

    // Show/hide clear button
    document.getElementById('searchClear').style.display = query ? 'block' : 'none';

    cols.forEach(function (col) {
        var catMatch = activeFilter === 'all' || col.getAttribute('data-cat') === activeFilter;
        var card = col.querySelector('.proj-card');

        var textMatch = true;
        if (query) {
            var searchText = (card.querySelector('.proj-name') ? card.querySelector('.proj-name').textContent : '') + ' ' +
                             (card.querySelector('.proj-type') ? card.querySelector('.proj-type').textContent : '') + ' ' +
                             (card.querySelector('.proj-desc') ? card.querySelector('.proj-desc').textContent : '') + ' ' +
                             Array.from(card.querySelectorAll('.proj-pill')).map(function (p) { return p.textContent; }).join(' ');
            textMatch = searchText.toLowerCase().indexOf(query) !== -1;
        }

        if (catMatch && textMatch) {
            col.classList.remove('hidden');
            card.style.animationDelay = delay + 'ms';
            card.style.animation = 'none';
            card.offsetHeight; // trigger reflow
            card.style.animation = 'fadeUp 0.35s ease both';
            delay += 40;
        } else {
            col.classList.add('hidden');
        }
    });
}

document.querySelectorAll('.filter-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
        activeFilter = this.getAttribute('data-filter');

        document.querySelectorAll('.filter-tab').forEach(function (t) { t.classList.remove('active'); });
        this.classList.add('active');

        applyFilters();
    });
});

document.getElementById('projectSearch').addEventListener('input', applyFilters);

document.getElementById('searchClear').addEventListener('click', function () {
    document.getElementById('projectSearch').value = '';
    applyFilters();
});

// Animate cards on load
document.querySelectorAll('.proj-card').forEach(function (card, i) {
    card.style.animationDelay = (i * 30) + 'ms';
});