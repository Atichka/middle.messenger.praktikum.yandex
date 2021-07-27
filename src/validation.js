const forms = Array.from(document.forms);

const validations = {
    password: /\w+/,
    text: /\w+/,
};

for (const form of forms) {
    const fields = document.querySelectorAll('.form__field-name');
    for (const field of fields) {
        addBlurFocusListener(field);
    }

    form.addEventListener("submit", onSubmit);
}

function onSubmit(event) {
    event.preventDefault();
    const element = event.target;
    const formData = new FormData(element);
    let hasErrors = false;

    const fields = document.querySelectorAll('.form__field-name');
    for (const field of fields) {
        const input = field.querySelector('input');
        const isValid = validateInput(input, field);
        if (!isValid) {
            hasErrors = true;
        }
    }

    if (!hasErrors) {
        for (const [name, value] of formData) {
            console.log(`${name}: ${value}`);
        }
    }
}

function addBlurFocusListener(field) {
    const input = field.querySelector('input');
    input.addEventListener("focus", () => onFocus(field));
    input.addEventListener("blur", e => onBlur(e, field));
}

function onFocus(field) {
    field.classList.remove('field-error');
}

function onBlur(event, field) {
    validateInput(event.target, field);
}

function validateInput(input, field) {
    const type = input.type;
    const value = input.value;

    let regexp = /\w+/;
    if (type in validations) {
        regexp = validations[type];
    }

    const isValid = regexp.test(value);
    if (!isValid) {

        field.classList.add("field-error");
        return false;
    }
    return true;
}