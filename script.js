var thumb = document.getElementById('scrollbar-thumb');
var positionText = document.getElementById('scrollbar-position');

var startY;
var startTop;

thumb.addEventListener('mousedown', function (e) {
  startY = e.clientY;
  startTop = parseInt(window.getComputedStyle(thumb).top);

  document.addEventListener('mousemove', dragThumb);
  document.addEventListener('mouseup', stopDrag);
});

function dragThumb(e) {
  var deltaY = e.clientY - startY;
  var newTop = startTop + deltaY;

  if (newTop < 0) {
    newTop = 0;
  } else if (newTop > (scrollbar.offsetHeight - thumb.offsetHeight)) {
    newTop = scrollbar.offsetHeight - thumb.offsetHeight;
  }

  thumb.style.top = newTop + 'px';

  var percentage = (newTop / (scrollbar.offsetHeight - thumb.offsetHeight)) * 100;
  positionText.textContent = Math.round(percentage);
}

function stopDrag() {
  document.removeEventListener('mousemove', dragThumb);
  document.removeEventListener('mouseup', stopDrag);
}
