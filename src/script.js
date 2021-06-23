const forms = [...document.forms];

forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        let obj = {};
        for (let [name, value] of formData) {
            obj[name] = value;
        }
        console.log(obj);
    });
});