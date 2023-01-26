<template>
    <form class="needs-validation row g-3" novalidate="">
        <b-accordion class="w-100">
            <b-accordion-item title="Type" visible>
                <div class="form-floating">
                    <b-form-select
                        v-model="type"
                        :options="typeOptions"
                        size="sm"
                        class="form-select"
                    >
                    </b-form-select>
                    <label for="typeInput">Select an item type</label>

                    <div class="invalid-feedback">
                        Please select a valid type.
                    </div>
                </div>
            </b-accordion-item>
            <b-accordion-item title="Type Details">
                <div class="col">
                    <div class="form-floating mb-3">
                        <input
                            type="text"
                            class="form-control"
                            id="titleInput"
                            v-model="title"
                            placeholder="Enter the title"
                        />
                        <label for="titleInput">Title</label>
                        <div class="invalid-feedback">
                            Title must be between 1 and 255 characters.
                        </div>
                    </div>

                    <div class="form-floating mb-3">
                        <textarea
                            class="form-control"
                            placeholder="Abstract"
                            id="abstractInput"
                            v-model="abstract"
                        ></textarea>
                        <label for="abstractInput">Abstract</label>
                        <div class="invalid-feedback">
                            Abstract is mandatory
                        </div>
                    </div>

                    <div class="row">
                        <div class="col" id="authorlist">
                            <div
                                class="form-floating mb-3"
                                v-for="(author, index) in authors"
                                :key="index"
                            >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="authorInput1"
                                    placeholder="Author name"
                                    v-model="authors[index]"
                                />
                                <label for="authorInput1">Author name</label>
                                <div class="invalid-feedback">
                                    You need at least one author, with a name
                                    between 1 and 50 characters.
                                </div>
                            </div>
                        </div>

                        <div class="col-1">
                            <button
                                class="btn btn-primary mb-1"
                                id="addauthorbutton"
                                type="button"
                                @click="addAuthor()"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-plus-lg"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                                    />
                                </svg>
                            </button>

                            <button
                                class="btn btn-danger"
                                id="removeauthorbutton"
                                type="button"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-dash"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </b-accordion-item>
            <b-accordion-item title="Upload">
                <div class="mb-3">
                    <label for="fileInput" class="form-label"
                        >Upload file</label
                    >
                    <input class="form-control" type="file" id="fileInput" />
                    <div class="invalid-feedback">
                        File can only be .pdf, doc or docx.
                    </div>
                </div>
            </b-accordion-item>
        </b-accordion>
        <button
            class="w-100 btn btn-primary btn-lg"
            type="button"
            id="submit"
            @click="submit()"
        >
            Submit
        </button>
    </form>
</template>

<script setup>
import { ref } from "vue";

let type = ref("monograf");
let typeOptions = [
    {
        value: "client_report",
        text: "Client Report",
    },

    {
        value: "article",
        text: "Article",
    },
    {
        value: "monograf",
        text: "Monograf",
    },
];

function printTypeValue() {
    console.log(type.value);
}

let title = ref("");
let abstract = ref("");
let authors = ref([""]);
let file = ref("");

function submit() {
    console.log(title.value, abstract.value);
    authors.value.forEach((author) => {
        console.log(`AUTHOR: ${author}`);
    });
}

function addAuthor() {
    authors.value.push("");
}
</script>
