const eyeOpen = "./icons/eyeOpen.svg";
const eyeHide = "./icons/eyeHide.svg";
// NOTE why was it being imported? I have a problem with ES6 files and local server rendering

export function setupPasswordToggle(toggleButtonId, inputId, iconId) {
  const toggleButton = document.getElementById(toggleButtonId);
  const passwordInput = document.getElementById(inputId);
  const eyeIcon = document.getElementById(iconId);

  if (!toggleButton || !passwordInput || !eyeIcon) return;

  // Inicializa el ícono con estilos
  // TODO: lo inicializo con estilos porque aparecía muy grande pero se tendrá que sustituir por su archivo CSS
  eyeIcon.src = eyeHide;
  eyeIcon.style.width = "20px";
  eyeIcon.style.height = "20px";
  eyeIcon.style.cursor = "pointer";
  eyeIcon.style.objectFit = "contain";
  // ??

  toggleButton.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    eyeIcon.src = isPassword ? eyeOpen : eyeHide;
  });
}