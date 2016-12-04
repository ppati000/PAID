setInterval(function () {
  "use strict";
  $.getJSON("/api/v1/health", function (result) {
    var percentage = result.health;
    var percentageString = !isNaN(percentage) ? percentage.toFixed(0) + "%" : "Loading.";
    $(".percentage").text(percentageString);
    setBackground(percentage);
  });
}, 1000);

var setBackground = function (percentage) {
  "use strict";

  if (isNaN(percentage)) {
    return;
  }

  var r = inRange(30, 150, (( 100 - percentage) / 100) * 255);
  var g = inRange(30, 150, (percentage / 100) * 255);
  var b = Math.min(0, r - 50);
  var colorString = "rgb(" + [r, g, b].map(function(n) { return n.toFixed(0); }).join(",") + ")";
  console.log(colorString);
  $(".health").css("background-color", colorString);
};

var inRange = function (a, b, number) {
  "use strict";
  return Math.max(a, Math.min(b, number));
};
