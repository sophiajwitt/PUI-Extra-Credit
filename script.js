var thumb = document.getElementById('scrollbar-thumb');
var positionText = document.getElementById('scrollbar-position');
var scrollbar = document.getElementById('scrollbar');

var startY;
var startTop;
var interval;

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
  } else if (newTop > scrollbar.offsetHeight - thumb.offsetHeight) {
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

var arrowUp = document.getElementById('scrollbar-arrow-up');
var arrowDown = document.getElementById('scrollbar-arrow-down');

var scrollSpeed = 5;

arrowUp.addEventListener('mousedown', function () {
  scrollThumb(-scrollSpeed);
  interval = setInterval(function () {
    scrollThumb(-scrollSpeed);
  }, 100);
});

arrowDown.addEventListener('mousedown', function () {
  scrollThumb(scrollSpeed);
  interval = setInterval(function () {
    scrollThumb(scrollSpeed);
  }, 100);
});

arrowUp.addEventListener('mouseup', stopScroll);
arrowDown.addEventListener('mouseup', stopScroll);

function scrollThumb(scrollAmount) {
  var currentTop = parseInt(window.getComputedStyle(thumb).top);
  var newTop = currentTop + scrollAmount;

  if (newTop < 0) {
    newTop = 0;
  } else if (newTop > scrollbar.offsetHeight - thumb.offsetHeight) {
    newTop = scrollbar.offsetHeight - thumb.offsetHeight;
  }

  thumb.style.top = newTop + 'px';

  var percentage = (newTop / (scrollbar.offsetHeight - thumb.offsetHeight)) * 100;
  positionText.textContent = Math.round(percentage);
}

function stopScroll() {
  clearInterval(interval);
}
