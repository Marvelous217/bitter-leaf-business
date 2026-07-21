// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
const rootEl = document.documentElement;

if (themeToggle) {
  themeToggle.addEventListener('click', function () {
    const isDark = rootEl.getAttribute('data-theme') === 'dark';
    if (isDark) {
      rootEl.removeAttribute('data-theme');
      localStorage.setItem('kfg-theme', 'light');
    } else {
      rootEl.setAttribute('data-theme', 'dark');
      localStorage.setItem('kfg-theme', 'dark');
    }
  });
}

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const siteNav = document.getElementById('site-nav');

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', function () {
    const isOpen = siteNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      siteNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// WhatsApp number to send orders to (Gambia country code +220)
const WHATSAPP_NUMBER = '2202669653';

const form = document.getElementById('order-form');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  const quantity = form.quantity.value.trim();
  const location = form.location.value.trim();
  const notes = form.notes.value.trim();

  const items = Array.from(form.querySelectorAll('input[name="item"]:checked'))
    .map((input) => input.value);

  if (!name || !phone || !quantity) {
    alert('Please fill in your name, phone number, and what you need before sending.');
    return;
  }

  if (items.length === 0) {
    alert('Please choose at least one item you would like to order.');
    return;
  }

  const lines = [
    'Hello Kotu Fresh Greens, I would like to place an order:',
    '',
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Items: ${items.join(', ')}`,
    `Quantity: ${quantity}`,
  ];

  if (location) lines.push(`Pickup / location: ${location}`);
  if (notes) lines.push(`Notes: ${notes}`);

  const message = encodeURIComponent(lines.join('\n'));
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  window.open(url, '_blank');
});
