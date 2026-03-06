(function () {
  var currentImages = [];
  var currentIndex = 0;

  var lightbox = document.getElementById('lightbox');
  var lightboxImg = lightbox.querySelector('.lightbox-img');
  var lightboxCounter = lightbox.querySelector('.lightbox-counter');

  function openLightbox(images, index) {
    currentImages = images;
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    lightboxImg.src = currentImages[currentIndex].src;
    lightboxImg.alt = currentImages[currentIndex].alt || '';
    lightboxCounter.textContent = (currentIndex + 1) + ' / ' + currentImages.length;
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateLightbox();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateLightbox();
  }

  // Attach click handlers per gallery so each group is self-contained
  document.querySelectorAll('.photo-gallery').forEach(function (gallery) {
    var thumbs = Array.from(gallery.querySelectorAll('.gallery-thumb'));
    thumbs.forEach(function (thumb, i) {
      thumb.addEventListener('click', function () {
        openLightbox(thumbs, i);
      });
    });
  });

  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox-prev').addEventListener('click', showPrev);
  lightbox.querySelector('.lightbox-next').addEventListener('click', showNext);

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });
})();
