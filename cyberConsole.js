const phrases = [
  "red-team://recon",
  "nihongo://N3",
  "python://automation",
  "japan://career-path",
  "threat-hunt://signal",
  "github://nikhiltomar2712"
];

export function bootCyberConsole(root) {
  const stream = document.createElement("div");
  stream.className = "console-stream";
  root.appendChild(stream);

  let index = 0;
  const timer = window.setInterval(() => {
    const line = document.createElement("span");
    line.textContent = `${new Date().toLocaleTimeString()}  ${phrases[index % phrases.length]}  OK`;
    stream.appendChild(line);
    while (stream.children.length > 7) stream.removeChild(stream.firstElementChild);
    index += 1;
  }, 1350);

  return () => window.clearInterval(timer);
}

export function magneticButtons(scope) {
  const buttons = [...scope.querySelectorAll("[data-magnetic]")];
  const cleanups = buttons.map((button) => {
    const move = (event) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      button.style.transform = `translate(${x * 0.08}px, ${y * 0.14}px)`;
    };
    const leave = () => {
      button.style.transform = "";
    };
    button.addEventListener("pointermove", move);
    button.addEventListener("pointerleave", leave);
    return () => {
      button.removeEventListener("pointermove", move);
      button.removeEventListener("pointerleave", leave);
    };
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}
