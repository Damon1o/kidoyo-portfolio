document.querySelectorAll('.filter-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
        var filter = this.getAttribute('data-filter');

        // Update active tab
        document.querySelectorAll('.filter-tab').forEach(function (t) { t.classList.remove('active'); });
        this.classList.add('active');

        // Show/hide cards
        var cols = document.querySelectorAll('.project-col');
        var delay = 0;
        cols.forEach(function (col) {
            if (filter === 'all' || col.getAttribute('data-cat') === filter) {
                col.classList.remove('hidden');
                col.querySelector('.proj-card').style.animationDelay = delay + 'ms';
                col.querySelector('.proj-card').style.animation = 'none';
                // Trigger reflow
                col.querySelector('.proj-card').offsetHeight;
                col.querySelector('.proj-card').style.animation = 'fadeUp 0.35s ease both';
                delay += 40;
            } else {
                col.classList.add('hidden');
            }
        });
    });
});

// Animate cards on load
document.querySelectorAll('.proj-card').forEach(function (card, i) {
    card.style.animationDelay = (i * 30) + 'ms';
});