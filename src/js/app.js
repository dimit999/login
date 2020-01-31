import "bootstrap/dist/css/bootstrap.css";
import "../css/style.css";

import UI from "./config/ui.config";
import { validate } from "./helpers/validate";
import { showInputError, removeInputError } from "./views/form";
import { login } from "./services/auth.service";
import { notify } from "./views/notifications";

const { form, inputEmail, inputPassword } = UI;
const inputs = [inputEmail, inputPassword];
//Events
form.addEventListener("submit", e => {
  e.preventDefault(); //прекратить стандартное действие формы
  onSubmit();
});
inputs.forEach(el => el.addEventListener("focus", () => removeInputError(el)));

//Handlers
async function onSubmit() {
  const isValidForm = inputs.every(el => {
    const isValidInput = validate(el);
    if (!isValidInput) {
      const err = el.classList.contains("is-invalid");
      if (err) return;
      showInputError(el);
    }
    return isValidInput;
  });
  if (!isValidForm) return;

  try {
    await login(inputEmail.value, inputPassword.value);
    form.reset();
    notify({ msg: "Login success", className: "alert-success" });
  } catch (err) {
    notify({ msg: "Login failed", className: "alert-danger" });
  }
}
