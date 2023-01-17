class Ready {
    authorsNo = 1;
    /**
     * Methods
     */
    constructor(document) {
        this.document = document;
        this.submit = document.querySelector("#submit");
        this.typeSelect = document.querySelector("#typeInput");
        this.titleInput = document.querySelector("#titleInput");
        this.abstractInput = document.querySelector("#abstractInput");
        this.authorInputs = [document.querySelector("#authorInput1")];
    }

    init() {
        this.step1();
        this.addAuthorInput();
        this.removeAuthorInput();

        this.submit.removeAttribute("disabled");
    }
    addAuthorInput() {
        const button = this.document.querySelector("#addauthorbutton");
        button.addEventListener("click", () => {
            this.authorsNo++;
            const newAuthorDiv = document.createElement("div");
            newAuthorDiv.setAttribute("class", "form-floating mb-3");

            const newAuthorInput = document.createElement("input");
            newAuthorInput.setAttribute("type", "text");
            newAuthorInput.id = `authorInput${this.authorsNo}`;
            newAuthorInput.setAttribute("class", "form-control");
            newAuthorInput.setAttribute("placeholder", "Author");
            this.authorInputs.push(newAuthorInput);

            const newAuthorLabel = document.createElement("label");
            newAuthorLabel.setAttribute("for", `authorInput${this.authorsNo}`);
            newAuthorLabel.innerHTML = "Author Name";
            newAuthorDiv.appendChild(newAuthorInput);
            newAuthorDiv.appendChild(newAuthorLabel);
            this.document
                .querySelector("#authorlist")
                .appendChild(newAuthorDiv);
        });
    }

    /*
     *  TODO: New method for creating the validation
     */

    removeAuthorInput() {
        const button = this.document.querySelector("#removeauthorbutton");
        button.addEventListener("click", () => {
            if (this.authorsNo <= 1) {
                return false;
            }
            const input = this.document.querySelector(
                `#authorInput${this.authorsNo}`
            );
            this.authorInputs = this.authorInputs.filter(
                (input) => input.id !== `authorInput${this.authorsNo}`
            );

            input.parentElement.remove();
            this.authorsNo--;
        });
    }

    /**
     * Gets the select option for step 1
     */
    step1() {
        this.getStep1data().then((step1response) => {
            step1response.forEach((item) => {
                let option = document.createElement("option");
                option.innerHTML = item.label;
                option.setAttribute("value", item.value);
                this.typeSelect.appendChild(option);
            });
        });
    }

    /**
     * call server API to retrieve step 1 data
     * @returns {Array}
     */
    async getStep1data() {
        const url = "./data/step1.json";

        const response = await fetch(url);
        const data = await response.json();

        return data;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const ready = new Ready(document);
    ready.init();
});
