function navigateTo(page) {
  switch (page) {
    case 'home':
      window.location.href = 'index.html';
      break;
    case 'tv':
      window.location.href = 'televisions.html';
      break;
    case 'about':
      window.location.href = 'about.html';
      break;
  }
}

// Highlight current page
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;

  if (path.includes('televisions')) {
    document.getElementById('nav-tv')?.classList.add('active');
  } else if (path.includes('about')) {
    document.getElementById('nav-about')?.classList.add('active');
  } else {
    document.getElementById('nav-home')?.classList.add('active');
  }

  document.getElementById('year').textContent =
    new Date().getFullYear();
});
