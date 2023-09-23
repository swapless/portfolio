const fullscreenToggle = document.getElementById('fullscreenToggle');

fullscreenToggle.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(console.error);
    document.body.classList.add('fullscreen');
  } else {
    document.exitFullscreen();
    document.body.classList.remove('fullscreen');
  }
});

if (window.innerWidth <= 768) {
  // Add the scroll event listener only for screens with a width less than or equal to 768px
  window.addEventListener('scroll', () => {
    const title = document.querySelector('.title');
    const navbar = document.querySelector('.navbar');

    if (window.scrollY > title.offsetHeight) {
      navbar.classList.add('sticky');
    } else {
      navbar.classList.remove('sticky');
    }
  });
}
