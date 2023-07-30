const p1 = document.getElementById("msg01");
const p2 = document.getElementById("msg02");

fetch("/api/config")
  .then((res) => res.json())
  .then((res) => {
    fetch(res.pathBackend1)
      .then((res) => res.json())
      .then((res) => {
        p1.innerHTML = res.msg01;
        p2.innerHTML = res.msg02;
      });
  });
