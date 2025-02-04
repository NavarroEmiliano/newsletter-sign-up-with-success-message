const d = document;

const form = d.querySelector(".form");
const emailErrorMessageElement = d.querySelector(".email-error-message");
const emailInputElement = d.querySelector(".email-input");
const formContainerElement = d.querySelector(".form-container");
const successPopUpElement = d.querySelector(".success-popup");
const confirmationEmailElement = d.querySelector(".confirmation-message-email");
const dismissBtnElement = d.querySelector(".dismiss-btn");

if (form && emailInputElement && emailErrorMessageElement && formContainerElement && successPopUpElement && confirmationEmailElement && dismissBtnElement) {

  const emailValidator = (email) => {
    if (!email) return "Email is required";

    email = email.trim();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) return "Valid email required";

    if (email.length > 100) return "Email is too long";

    return "";
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const email = formData.get("email");

    const emailErrorMessage = emailValidator(email);

    if (emailErrorMessage) {
      showError(emailErrorMessage);
      return;
    }

    showSuccess(email);
  };

  const showError = (message) => {
    emailInputElement.classList.add("input-error");
    emailErrorMessageElement.innerText = message;
  };

  const showSuccess = (email) => {
    emailInputElement.classList.remove("input-error");
    formContainerElement.classList.add("hidden");
    successPopUpElement.classList.add("show-flex");
    emailErrorMessageElement.innerText = "";
    confirmationEmailElement.innerText = email;
  };

  const handleDismiss = () => {
    formContainerElement.classList.remove("hidden");
    successPopUpElement.classList.remove("show-flex");
    confirmationEmailElement.innerText = "";
    emailInputElement.value = "";
  };

  form.addEventListener("submit", handleFormSubmit);
  dismissBtnElement.addEventListener("click", handleDismiss);
}
