document.addEventListener("DOMContentLoaded", function() {

  
/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', './assets/particles.json', function() {
  console.log('callback - particles.js config loaded');
});

const proj = document.querySelector('#atp');

proj.addEventListener('click', d => {
  if (d.target.open) {
    d.target.removeAttribute('open');
  } else {
    d.target.setAttribute('open', '');
  }
});


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
////////////  Video player  //////////////////////////////////////////////////////////////////////
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

  function broadcastVideo(silverScreen, videoID, videoStart, videoEnd, videoOrientation) {
    const divIframeBegin = videoOrientation !== 'v' ? '<div class="video-container"><iframe src="https://www.youtube.com/embed/' : '<div class="video-container-v"><iframe src="https://www.youtube.com/embed/';
    const divIframeEnd = 'autoplay=1&cc_load_policy=1&modestbranding=1&fs=1&start=' + videoStart + videoEnd + '&rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>';
    silverScreen.innerHTML = videoID.startsWith('PL') ? divIframeBegin + 'videoseries?list=' + videoID + '&' + divIframeEnd : divIframeBegin + videoID + '?' + divIframeEnd;
  }

  function playVideo() {
    const videoPlayer = document.querySelectorAll('[class*="video-player"]');
    if (!videoPlayer) return;
    for (let y = 0; y < videoPlayer.length; y++) {
      videoPlayer[y].addEventListener('click', function(e) {
        let video_id = e.currentTarget.dataset.videoId;
        let video_start = e.currentTarget.dataset.videoStart || '0';
        let video_end = e.currentTarget.dataset.videoEnd ? '&end=' + e.currentTarget.dataset.videoEnd : '';
        let video_orientation = e.currentTarget.dataset.videoOrientation || '';
        broadcastVideo(e.currentTarget, video_id, video_start, video_end, video_orientation);
      });
    }
  }

  playVideo();

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
////////////  owl video carousel  ////////////////////////////////////////////////////////////////
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

// Para evitar conflictos con otras librerías, se reemplazó el signo $ por jQuery

  // jQuery('#uncc-slider-videos.owl-carousel').owlCarousel({
  //     loop:true,
  //     margin:10,
  //     // nav:true,
  //     // dots:true,
  //     // responsive:{
  //     //       0:{ items:1 },
  //     //     768:{ items:2 },
  //     //     960:{ items:3 }
  //     // }
  // });

const carusel_bitacora_exist = document.querySelector('.owl-carousel-mis');
if(!carusel_bitacora_exist) return;
  jQuery('.owl-carousel-mis').owlCarousel({
      items: 1,
      loop: false,
      margin: 10,
      nav: false,
      dots: true,
      autoplay: false,
  })

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Do not touch below this ///////////////////////////////////////////////////////////////////////
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

});
