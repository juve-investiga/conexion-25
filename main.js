'use strict';

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

const carusel_mis_exist = document.querySelector('.owl-carousel-mis');
if(!carusel_mis_exist) return;
  jQuery('.owl-carousel-mis').owlCarousel({
      items: 1,
      loop: false,
      margin: 10,
      nav: false,
      dots: true,
      autoplay: false,
  })

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PDF viewer ////////////////////////////////////////////////////////////////////////////////////
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

  class PDFViewer {
    constructor() {
      this.pdfViewerDiv = document.getElementById('pdf-viewer');
      this.container = document.getElementById('pdf-container');
      // this.pageNum = document.getElementById('page-num');
      // this.pageCount = document.getElementById('page-count');
      this.title = document.getElementById('mis-folleto-viewer-title');
      this.pdfDonwloadLink = document.querySelector('#download a');
      this.currentPage = 1;
      this.scale = 1.0;
      this.pdfDoc = null;
      this.loadingTask = null;

      this.bindEvents();
      this.loadFirstPDF();
    }

    bindEvents() {
      // document.getElementById('prev').onclick = () => this.prevPage();
      // document.getElementById('next').onclick = () => this.nextPage();
      // document.getElementById('zoom-in').onclick = () => this.zoom(0.25);
      // document.getElementById('zoom-out').onclick = () => this.zoom(-0.25);

      document.querySelectorAll('.mis-folleto-pdf').forEach(thumbnail => {
        thumbnail.onclick = () => {
          const pdfUrl = thumbnail.dataset.pdf;
          const pdfTitle = thumbnail.textContent.replace('Evidencia | ', '');
          this.title.textContent = pdfTitle;
          this.loadDocument(pdfUrl);
          this.pdfDonwloadLink.href = pdfUrl;
          this.pdfDonwloadLink.download = 'Juve investiga - Conexión 25 - ' + pdfTitle + '.pdf';
          this.pdfViewerDiv.scrollIntoView({
            behavior: 'smooth'
          });
        };
      });
    }

    async loadFirstPDF() {
      const firstThumbnail = document.querySelector('.mis-folleto-pdf');
      if (firstThumbnail) {
        const pdfUrl = firstThumbnail.dataset.pdf;
        await this.loadDocument(pdfUrl);
      }
    }

    async loadDocument(url) {
      await this.cleanup();

      try {
        this.loadingTask = pdfjsLib.getDocument(url);
        this.pdfDoc = await this.loadingTask.promise;

        // this.pageCount.textContent = this.pdfDoc.numPages;
        // this.currentPage = 1;

        await this.renderAllPages();
      } catch (error) {
        console.error('Error loading PDF:', error);
      }
    }

    async renderAllPages() {
      this.container.innerHTML = '';

      for (let pageNum = 1; pageNum <= this.pdfDoc.numPages; pageNum++) {
        const pageContainer = document.createElement('div');
        pageContainer.className = 'page-container';
        this.container.appendChild(pageContainer);

        try {
          const page = await this.pdfDoc.getPage(pageNum);
          const viewport = page.getViewport({
            scale: this.scale
          });

          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          pageContainer.appendChild(canvas);

          await page.render({
            canvasContext: context,
            viewport: viewport
          }).promise;
        } catch (error) {
          console.error(`Error rendering page ${pageNum}:`, error);
        }
      }

      // this.updatePageNumber();
    }

    async cleanup() {
      if (this.loadingTask) {
        await this.loadingTask.destroy();
      }

      if (this.pdfDoc) {
        await this.pdfDoc.cleanup();
        await this.pdfDoc.destroy();
      }

      this.pdfDoc = null;
      this.loadingTask = null;
      this.currentPage = 1;
    }

    // async zoom(delta) {
    //     this.scale += delta;
    //     if (this.scale < 0.5) this.scale = 0.5;
    //     if (this.scale > 3) this.scale = 3;
    //     await this.renderAllPages();
    // }

    // async prevPage() {
    //     if (this.currentPage > 1) {
    //         this.currentPage--;
    //         this.scrollToPage(this.currentPage);
    //     }
    // }

    // async nextPage() {
    //     if (this.currentPage < this.pdfDoc.numPages) {
    //         this.currentPage++;
    //         this.scrollToPage(this.currentPage);
    //     }
    // }

    // scrollToPage(pageNumber) {
    //     const pages = document.getElementsByClassName('page-container');
    //     if (pages[pageNumber - 1]) {
    //         pages[pageNumber - 1].scrollIntoView({
    //             behavior: 'smooth'
    //         });
    //         this.updatePageNumber();
    //     }
    // }

    // updatePageNumber() {
    //     this.pageNum.textContent = this.currentPage;
    // }
  }

new PDFViewer();



/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Do not touch below this ///////////////////////////////////////////////////////////////////////
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

});
