const eyeOpen = "./icons/eyeOpen.svg";
const eyeHide = "./icons/eyeHide.svg";
// NOTE why was it being imported? I have a problem with ES6 files and local server rendering
// FIXME: frist its show a big wye in all of the screen, later it goes to its correct size, maybe CSS inline styling directly in the HTMLS
// NOTE: parece que esto triggea un pop up para que guarde mi contraseña?

export function setupPasswordToggle(toggleButtonId, inputId, iconId) {
  /**
   * Modern browsers (Chrome, Firefox, Safari, Edge) automatically inject their own eye icon into password fields to allow users to toggle password visibility.

2. Why it appears:
You have autocomplete="current-password" on your input field SO i NEED TO RESET THAT FUNCTIONALITY OR ERASE MY BUTTON
   */
  const toggleButton = document.getElementById(toggleButtonId);
  const passwordInput = document.getElementById(inputId);
  const eyeIcon = document.getElementById(iconId);

  if (!toggleButton || !passwordInput || !eyeIcon) return;

  // Inicializa el ícono con estilos
  // TODO: lo inicializo con estilos porque aparecía muy grande pero se tendrá que sustituir por su archivo CSS
  // todo: lo he hecho con inline porque si no aparecía ultra grande
  // eyeIcon.src = eyeHide;
  // eyeIcon.style.width = "10px";
  // eyeIcon.style.height = "15px";
  // eyeIcon.style.cursor = "pointer";
  // eyeIcon.style.objectFit = "contain";
  // ??

  toggleButton.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    eyeIcon.src = isPassword ? eyeOpen : eyeHide;
  });
}
