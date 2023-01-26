<script setup>
import { ref } from "vue";
import Form from "./components/Form.vue";

let message = ref("Vite + Vue");
</script>

<template>
    <div class="container">
        <main>
            <div class="py-5 text-center">
                <h2>Upload Form</h2>
            </div>

            <div class="row g-5">
                <div class="col-2"></div>

                <div class="col-8">
                    <Form></Form>
                </div>

                <div class="col-2"></div>
            </div>
        </main>
    </div>
</template>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
}
.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
