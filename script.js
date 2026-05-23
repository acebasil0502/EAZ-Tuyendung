const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");
const applyForm = document.querySelector("#apply-form");
const scriptUrl =
  "https://script.google.com/macros/s/AKfycbzBjNIdd3G4ooR4OVz_641z214_kBus8PmtuPjl6Ik9EOlcuQwKfK-cHBDU3p-XSa5I2w/exec";

menuButton?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  window.setTimeout(() => toast.remove(), 2400);
}

applyForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(applyForm);
  const payload = Object.fromEntries(formData.entries());
  const button = applyForm.querySelector("button");

  button.disabled = true;
  button.textContent = "Đang gửi...";

  try {
    await fetch(scriptUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        name: payload.name,
        phone: "'" + payload.phone,
        email: payload.email,
        job_position: payload.job,
        message: payload.message,
        source: window.location.href,
        timestamp: new Date().toLocaleString("vi-VN"),
      }),
    });
    applyForm.reset();
    showToast("Đã ghi nhận thông tin ứng tuyển. EAZ sẽ liên hệ lại khi phù hợp.");
  } catch (error) {
    showToast("Chưa gửi được thông tin. Vui lòng thử lại sau.");
  } finally {
    button.disabled = false;
    button.textContent = "Gửi thông tin ứng tuyển";
  }
});
