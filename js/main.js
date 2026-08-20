document.addEventListener("DOMContentLoaded", () => {
  const copyButtons = document.querySelectorAll(".btn-copy");
  const toast = document.getElementById("copy-toast");
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");

    if (toastTimer) clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2800);
  }

  copyButtons.forEach(button => {
    button.addEventListener("click", async () => {
      const code = button.getAttribute("data-code");
      if (!code) return;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(code);
        } else {
          const textArea = document.createElement("textarea");
          textArea.value = code;
          textArea.style.position = "fixed";
          textArea.style.left = "-999999px";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand("copy");
          textArea.remove();
        }

        const originalText = button.querySelector("span").textContent;
        button.classList.add("copied");
        button.querySelector("span").textContent = "Copied!";

        showToast(`Copied code: ${code}`);

        setTimeout(() => {
          button.classList.remove("copied");
          button.querySelector("span").textContent = originalText;
        }, 2200);

      } catch (err) {
        showToast("Unable to copy code to clipboard");
      }
    });
  });
});
