<template>
    <div>
        <Offline_error>
            <template v-slot:default>
                <!-- News Section -->
                <svg
                    style="
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 245px;
                    "
                    v-if="loading1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 200 200"
                >
                    <radialGradient
                        id="a12"
                        cx=".66"
                        fx=".66"
                        cy=".3125"
                        fy=".3125"
                        gradientTransform="scale(1.5)"
                    >
                        <stop offset="0" stop-color="#336699"></stop>
                        <stop
                            offset=".3"
                            stop-color="#336699"
                            stop-opacity=".9"
                        ></stop>
                        <stop
                            offset=".6"
                            stop-color="#336699"
                            stop-opacity=".6"
                        ></stop>
                        <stop
                            offset=".8"
                            stop-color="#336699"
                            stop-opacity=".3"
                        ></stop>
                        <stop
                            offset="1"
                            stop-color="#336699"
                            stop-opacity="0"
                        ></stop>
                    </radialGradient>
                    <circle
                        transform-origin="center"
                        fill="none"
                        stroke="url(#a12)"
                        stroke-width="15"
                        stroke-linecap="round"
                        stroke-dasharray="200 1000"
                        stroke-dashoffset="0"
                        cx="100"
                        cy="100"
                        r="70"
                    >
                        <animateTransform
                            type="rotate"
                            attributeName="transform"
                            calcMode="spline"
                            dur="2"
                            values="360;0"
                            keyTimes="0;1"
                            keySplines="0 0 1 1"
                            repeatCount="indefinite"
                        ></animateTransform>
                    </circle>
                    <circle
                        transform-origin="center"
                        fill="none"
                        opacity=".2"
                        stroke="#336699"
                        stroke-width="15"
                        stroke-linecap="round"
                        cx="100"
                        cy="100"
                        r="70"
                    ></circle>
                </svg>
                <div class="right">
                    <div>
                        <v-breadcrumbs>
                            <v-breadcrumbs-item @click="$router.push('/')" link>
                                الرئيسية
                            </v-breadcrumbs-item>
                            <v-breadcrumbs-divider />
                            <v-breadcrumbs-item>الأخبار</v-breadcrumbs-item>
                        </v-breadcrumbs>
                    </div>
                </div>
                <Empty_error v-if="empty === true" :text="text0" />
                <!-- News Cards Container -->
                <v-container
                    class="box d-flex align-center justify-space-around"
                    v-if="(!loading1, empty === false)"
                >
                    <!-- News Card Loop -->
                    <v-card
                        class="feat"
                        v-for="New in News"
                        :key="New.id"
                        width="24%"
                        @click.="news.New_Information(New)"
                        @click="dialog_6 = true"
                    >
                        <v-lazy
                            :min-height="200"
                            :options="{ threshold: 0.5 }"
                            transition="fade-transition"
                        >
                            <!-- Image -->
                            <v-img :src="New.image" height="300" cover></v-img>
                        </v-lazy>
                        <!-- Title -->
                        <v-card-text
                            class="card_title d-flex justify-center flex-wrap"
                            style="z-index: 100"
                        >
                            {{ New.title }}
                        </v-card-text>

                        <!-- Time -->
                        <v-card-subtitle style="margin-top: 20px">
                            {{ New.time.toDate().toLocaleString() }}
                        </v-card-subtitle>

                        <!-- Description -->
                        <v-card-text>
                            <p style="color: var(--therd-color) !important">
                                {{ New.description }}
                            </p>
                        </v-card-text>
                    </v-card>
                    <!-- Display each photo -->
                    <v-dialog v-model="dialog_6" width="90%">
                        <v-card width="100%" class="popup">
                            <div
                                class="d-flex justify-space-between align-center title"
                            >
                                <div style="color: var(--main-color)">
                                    الصور
                                </div>
                                <v-btn
                                    icon="mdi-close"
                                    @click="dialog_6 = false"
                                ></v-btn>
                            </div>
                            <v-carousel
                                :show-arrows="false"
                                hide-delimiter-background
                                color="var(--main-color)"
                            >
                                <v-carousel-item
                                    class="pa-5"
                                    :src="news.Image_Information"
                                    height="400"
                                    cover
                                ></v-carousel-item>
                                <v-carousel-item
                                    class="pa-5"
                                    v-for="New in News"
                                    :key="New.id"
                                    :src="New.image"
                                    height="400"
                                    cover
                                ></v-carousel-item>
                            </v-carousel> </v-card
                    ></v-dialog>
                </v-container>
            </template>
        </Offline_error>
    </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { useNews } from "@/store/News.js";
import Offline_error from "@/components/Offline_error.vue";
import Empty_error from "@/components/Empty_error.vue";
export default defineComponent({
    inject: ["Emitter"],
    components: {
        Empty_error,
        Offline_error,
    },
    setup() {
        // Access the News store
        const news = useNews();

        // Initialize or fetch data on component setup
        news.Get_data();

        // Destructure reactive references and methods from News store
        const {
            New,
            loading,
            loading1,
            Get_data,
            text0,
            empty,
            News,
            New_Information,
            dialog_6,
        } = storeToRefs(news);

        // Return the necessary reactive properties and methods
        return {
            New,
            text0,
            empty,
            dialog_6,
            loading,
            New_Information,
            loading1,
            Get_data,
            news,
            News,
        };
    },
});
</script>

<style lang="scss" scoped>
.right {
    width: 90% !important;
    margin: auto;
    font-weight: bold;
    font-size: 20px;
    border-bottom: 5px solid var(--secound-color);
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .v-breadcrumbs-item:first-child {
        color: var(--main-color);
        cursor: pointer;
        font-size: 24px;
    }
    .v-breadcrumbs {
        padding: 16px 0;
    }
}

/* Box and Card Styling */
.box {
    flex-wrap: wrap !important;
    gap: 10px !important;
    align-items: stretch !important;
}
.card_title {
    color: var(--main-color);
    margin: auto;
    width: fit-content;
    border-bottom: 2px solid var(--main-color);
    font-weight: bold;
    font-size: 20px;
}
.v-img::before {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    border-style: solid;
    border-width: 0px 0px 130px 300px;
    border-color: transparent transparent white transparent;
    transition: 0.3s;
}
.v-card:hover .v-img::before {
    border-width: 0px 580px 270px 0;
}
.v-card {
    text-align: center !important;
}

/* Keyframe Animations */
@keyframes left-move {
    50% {
        left: 0;
        width: 12px;
        height: 12px;
    }
    100% {
        left: 0;
        border-radius: 0;
        width: 50%;
        height: 100%;
    }
}
@keyframes right-move {
    50% {
        right: 0;
        width: 12px;
        height: 12px;
    }
    100% {
        right: 0;
        border-radius: 0;
        width: 50%;
        height: 100%;
    }
}

.popup .title {
    padding: 20px 20px 0 !important;
    font-size: 23px;
    font-weight: bold;
    color: var(--main-color);
    position: relative;
    margin-bottom: 15px;
    &::before {
        content: "";
        position: absolute;
        bottom: -15px;
        height: 3px;
        width: calc(100% - 40px);
        background: var(--secound-color);
        left: 50%;
        transform: translateX(-50%);
    }
}
.v-btn--icon.v-btn--density-default {
    color: var(--main-color);
    width: auto;
    height: auto;
    box-shadow: none;
    &:hover {
        background: #fff;
    }
}
@media (max-width: 700px) {
    .box {
        flex-direction: column !important;
    }
    .feat {
        width: 100% !important;
    }
}

@media (min-width: 700px) and (max-width: 950px) {
    .feat {
        width: 47% !important;
    }
}
</style>
