var activeFilter = 'all';

function applyFilters() {
    var query = document.getElementById('projectSearch').value.trim().toLowerCase();
    var cols = document.querySelectorAll('.project-col');
    var visibleCount = 0;
    var delay = 0;

    cols.forEach(function (col) {
        var catMatch = activeFilter === 'all' || col.getAttribute('data-cat') === activeFilter;
        var name = (col.querySelector('.proj-name') || {}).textContent || '';
        var desc = (col.querySelector('.proj-desc') || {}).textContent || '';
        var searchMatch = !query || name.toLowerCase().indexOf(query) !== -1 || desc.toLowerCase().indexOf(query) !== -1;

        if (catMatch && searchMatch) {
            col.classList.remove('hidden');
            var card = col.querySelector('.proj-card');
            card.style.animationDelay = delay + 'ms';
            card.style.animation = 'none';
            card.offsetHeight; // trigger reflow
            card.style.animation = 'fadeUp 0.35s ease both';
            delay += 40;
            visibleCount++;
        } else {
            col.classList.add('hidden');
        }
    });

    var noResults = document.getElementById('searchNoResults');
    if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
}

document.querySelectorAll('.filter-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
        activeFilter = this.getAttribute('data-filter');

        document.querySelectorAll('.filter-tab').forEach(function (t) { t.classList.remove('active'); });
        this.classList.add('active');

        applyFilters();
    });
});

var searchInput = document.getElementById('projectSearch');
var searchClear = document.getElementById('searchClear');

if (searchInput) {
    searchInput.addEventListener('input', function () {
        if (searchClear) {
            searchClear.style.display = this.value ? 'block' : 'none';
        }
        applyFilters();
    });
}

if (searchClear && searchInput) {
    searchClear.addEventListener('click', function () {
        searchInput.value = '';
        searchClear.style.display = 'none';
        searchInput.focus();
        applyFilters();
    });
}

// Animate cards on load
document.querySelectorAll('.proj-card').forEach(function (card, i) {
    card.style.animationDelay = (i * 30) + 'ms';
});