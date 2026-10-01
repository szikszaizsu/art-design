// demo-site-5: mobile menu, language dropdown, price toggle (shell / turnkey)
const top_ = document.querySelector(".top");
const burger = document.querySelector(".burger");
burger.addEventListener("click", () => {
  const open = top_.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});
document.querySelectorAll(".menu a").forEach(a => a.addEventListener("click", () => {
  top_.classList.remove("open");
  burger.setAttribute("aria-expanded", false);
}));

const lang = document.querySelector(".lang");
document.addEventListener("click", e => { if (!lang.contains(e.target)) lang.open = false; });

const price = document.querySelector(".price");
const btns = price.querySelectorAll(".toggle button");
const setMode = m => {
  price.dataset.mode = m;
  btns.forEach(b => b.setAttribute("aria-pressed", b.dataset.set === m));
};
btns.forEach(b => b.addEventListener("click", () => setMode(b.dataset.set)));
price.querySelector(".sw").addEventListener("click", () => setMode(price.dataset.mode === "red" ? "key" : "red"));
