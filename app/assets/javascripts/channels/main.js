window.addEventListener("load", function() {
  var slider = document.getElementById("area_importance");
  slider.addEventListener("input", function() {
    document.getElementById("output").innerHTML = this.value;
  })
})
