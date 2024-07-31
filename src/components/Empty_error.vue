<template>
    <!-- Display a row with a message when there is no data -->
    <v-row>
        <v-col>
            <div
                style="
                    color: var(--main-color);
                    background-color: var(--secound-color);
                    font-size: 20px;
                    font-weight: bold;
                    width: 100%;
                    padding: 10px;
                    border-redius: 5px;
                "
                class="text-center mt-2"
            >
                <p>
                    {{ text }}
                </p>
            </div>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props: ["text"],
    data() {
        return {};
    },
};
</script>
