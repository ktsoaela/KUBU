document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const itemName = this.innerText;
            document.querySelector('.selected-nav-item').innerText = itemName;
        });
    });
});
