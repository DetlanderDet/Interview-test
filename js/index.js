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
        this.submitButton = document.querySelector("#submit");
        this.uploadInput = document.querySelector("#fileInput");
    }

    init() {
        this.step1();
        this.addAuthorInput();
        this.removeAuthorInput();
        this.submitForm();

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

            const invalidFeedback = document.createElement("div");
            invalidFeedback.setAttribute("class", "invalid-feedback");
            invalidFeedback.innerHTML = "Author name must be between 1 and 50 characters.";
            
            newAuthorDiv.appendChild(newAuthorInput);
            newAuthorDiv.appendChild(newAuthorLabel);
            newAuthorDiv.appendChild(invalidFeedback);
            this.document
                .querySelector("#authorlist")
                .appendChild(newAuthorDiv);
        });
    }

    submitForm() {
        this.submitButton.addEventListener("click", (e) => {
            console.log(e);
            e.preventDefault();
            let result = this.validateForm();
            console.log(result);
        });
    }

    validateForm() {
        let result = true;
        if (this.titleInput.value.length > 0 && this.titleInput.value.length <= 255) {
            this.titleInput.classList.add("is-valid");
            this.titleInput.classList.remove("is-invalid");
        }else {
            this.titleInput.classList.add("is-invalid");
            this.titleInput.classList.remove("is-valid");
            result = false;
        }

        if (this.abstractInput.value.length > 0){
            this.abstractInput.classList.add("is-valid");
            this.abstractInput.classList.remove("is-invalid");
        }else {
            this.abstractInput.classList.add("is-invalid");
            this.abstractInput.classList.remove("is-valid");
            result = false;
        }

        this.authorInputs.forEach((authorInput) => {
            if (authorInput.value.length > 0 && authorInput.value.length <= 50) {
                authorInput.classList.add("is-valid");
                authorInput.classList.remove("is-invalid");
            } else {
                authorInput.classList.add("is-invalid");
                authorInput.classList.remove("is-valid");
                result = false;
            }
        });

        // Allowing file type
        const allowedExtensions = /(\.pdf|\.doc|\.docx)$/i;
    
        if(!allowedExtensions.exec(this.uploadInput.value)){
            this.uploadInput.classList.add("is-invalid");
            this.uploadInput.classList.remove("is-valid");
            result = false;
        } else{
            this.uploadInput.classList.add("is-valid");
            this.uploadInput.classList.remove("is-invalid");
        }

        return result;
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
