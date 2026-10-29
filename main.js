// Barra de navegación: fondo al hacer scroll y menú móvil
const nav = document.getElementById("nav");
const toggle = document.getElementById("navToggle");

const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 20);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", open);
});
document.querySelectorAll("#navLinks a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

// Aparición escalonada al entrar en pantalla
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      io.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => {
  const siblings = [...el.parentElement.querySelectorAll(":scope > .reveal")];
  el.style.transitionDelay = `${siblings.indexOf(el) * 110}ms`;
  io.observe(el);
});

// Código QR apuntando a la URL publicada
const siteUrl = location.protocol.startsWith("http")
  ? location.origin + location.pathname.replace(/index\.html$/, "")
  : "https://juanlatorrre.github.io/jlancor/";

if (window.QRCode) {
  new QRCode(document.getElementById("qrcode"), {
    text: siteUrl,
    width: 440,
    height: 440,
    colorDark: "#14213D",
    colorLight: "#FFFFFF",
    correctLevel: QRCode.CorrectLevel.M,
  });
}

document.getElementById("qrDownload").addEventListener("click", () => {
  const canvas = document.querySelector("#qrcode canvas");
  if (!canvas) return;
  const link = document.createElement("a");
  link.download = "qr-jlancor.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

document.getElementById("year").textContent = new Date().getFullYear();
