(function() {
  // Inject styles
  var style = document.createElement('style');
  style.textContent = `
    #tourenup-btn {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: #C3E54B;
      border: none;
      cursor: pointer;
      z-index: 99999;
      font-size: 26px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #tourenup-iframe {
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 390px;
      height: 560px;
      border: none;
      border-radius: 16px;
      z-index: 99998;
      box-shadow: 0 8px 32px rgba(0,0,0,0.25);
      display: none;
    }
    @media (max-width: 480px) {
      #tourenup-iframe {
        width: calc(100vw - 16px);
        height: calc(100dvh - 100px);
        bottom: 80px;
        right: 8px;
      }
    }
  `;
  document.head.appendChild(style);

  // Create button
  var btn = document.createElement('button');
  btn.id = 'tourenup-btn';
  btn.innerHTML = '💬';
  document.body.appendChild(btn);

  // Create iframe
  var iframe = document.createElement('iframe');
  iframe.id = 'tourenup-iframe';
  iframe.src = 'https://concierge-xi.vercel.app';
  document.body.appendChild(iframe);

  // Toggle
  var isOpen = false;
  btn.addEventListener('click', function() {
    isOpen = !isOpen;
    iframe.style.display = isOpen ? 'block' : 'none';
    btn.innerHTML = isOpen ? '✕' : '💬';
    btn.style.backgroundColor = '#C3E54B';
  });
})();
