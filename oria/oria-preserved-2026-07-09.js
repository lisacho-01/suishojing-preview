(function () {
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if (!("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  document.querySelectorAll(".choice-grid").forEach(function (grid) {
    grid.addEventListener("click", function (event) {
      var choice = event.target.closest(".choice");
      if (!choice) return;

      Array.prototype.forEach.call(grid.querySelectorAll(".choice"), function (item) {
        item.classList.remove("is-selected");
      });
      choice.classList.add("is-selected");

      var quiz = choice.closest(".quiz");
      if (!quiz) return;

      var selectedGroups = Array.prototype.filter.call(quiz.querySelectorAll(".choice-grid"), function (item) {
        return item.querySelector(".choice.is-selected");
      });

      if (selectedGroups.length > 0) {
        var note = quiz.querySelector(".result-note");
        if (note) note.classList.add("is-visible");
      }
    });
  });
}());
