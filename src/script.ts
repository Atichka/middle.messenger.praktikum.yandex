const forms: HTMLFormElement[] = Array.from(document.forms);

forms.forEach((form) => {
    form.addEventListener('submit', (e: Event) => {
        e.preventDefault();
        const formData: any = new FormData(form);
        let obj: Record<string, unknown> = {};
        for (let [name, value] of formData) {
            obj[name] = value;
        }
        console.log(obj);
    });
});
