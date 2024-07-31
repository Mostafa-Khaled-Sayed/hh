<template>
    <div>
        <!-- Header Section -->
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
                <stop offset=".3" stop-color="#336699" stop-opacity=".9"></stop>
                <stop offset=".6" stop-color="#336699" stop-opacity=".6"></stop>
                <stop offset=".8" stop-color="#336699" stop-opacity=".3"></stop>
                <stop offset="1" stop-color="#336699" stop-opacity="0"></stop>
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
                    <v-breadcrumbs-item>الوظائف</v-breadcrumbs-item>
                </v-breadcrumbs>
            </div>
        </div>

        <!-- Main Content Container -->
        <v-container>
            <!-- Iterate over Jobs -->
            <div class="feat" v-for="Job in Jobs" :key="Job.id">
                <div>
                    <!-- Job Header -->
                    <div class="header">
                        <div class="small_container">
                            <div class="title">{{ Job.title }}</div>
                        </div>
                        <div class="time">
                            <font-awesome-icon :icon="['fas', 'clock']" />
                            <div>{{ Job.time.toDate().toLocaleString() }}</div>
                        </div>
                    </div>

                    <!-- Job Details -->
                    <div class="body">
                        <div class="title">متطلبات العمل</div>
                        <ul>
                            <li>{{ Job.description }}</li>
                        </ul>
                    </div>
                </div>

                <!-- Apply Button -->
                <div
                    class="footer"
                    @click="(jobs.dialog_2 = true), jobs.Job_Information(Job)"
                >
                    التقديم على الوظيفة
                </div>

                <!-- Apply Dialog -->
                <v-dialog v-model="dialog_2" width="90%">
                    <v-card width="100%" class="popup">
                        <div
                            class="d-flex justify-space-between align-center title mb-4"
                        >
                            <div style="color: var(--main-color)">
                                التقديم على الوظيفة
                            </div>
                            <v-btn icon @click="dialog_2 = false">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </div>

                        <!-- Form for Job Application with validation -->
                        <form
                            ref="form"
                            @submit.prevent="
                                jobs.Add_Apply(jobs.Id_Information)
                            "
                            class="ma-auto mt-4"
                        >
                            <!-- Job Title Input -->
                            <v-text-field
                                v-model="jobs.Title_Information"
                                type="text"
                                label="الوظيفة"
                                variant="outlined"
                                required
                                :rules="[(v) => !!v || 'يجب إدخال اسم الوظيفة']"
                            ></v-text-field>

                            <!-- Name Input -->
                            <v-text-field
                                v-model="jobs.Apply.name"
                                type="text"
                                label="الاسم"
                                variant="outlined"
                                required
                                :rules="[(v) => !!v || 'يجب إدخال الاسم']"
                            ></v-text-field>

                            <!-- Email Input -->
                            <v-text-field
                                v-model="jobs.Apply.email"
                                type="email"
                                label="البريد الالكتروني"
                                variant="outlined"
                                required
                                :rules="[
                                    (v) => !!v || 'يجب إدخال البريد الإلكتروني',
                                    (v) =>
                                        /.+@.+\..+/.test(v) ||
                                        'البريد الإلكتروني غير صحيح',
                                ]"
                            ></v-text-field>

                            <!-- Phone Input -->
                            <v-text-field
                                v-model="jobs.Apply.phone"
                                type="text"
                                label="التليفون"
                                variant="outlined"
                                required
                                :rules="[
                                    (v) => !!v || 'يجب إدخال رقم الهاتف',
                                    (v) =>
                                        /^\d{10}$/.test(v) || 'الرقم غير صحيح',
                                ]"
                                :minlength="11"
                            ></v-text-field>

                            <!-- CV File Input -->
                            <v-file-input
                                v-model="jobs.Apply.CV"
                                label="السيرة الذاتية"
                                variant="outlined"
                                required
                                prepend-icon="mdi-paperclip"
                                @input="jobs.upload_CV"
                            ></v-file-input>

                            <!-- Progress Bar for CV Upload -->
                            <v-progress-linear
                                v-if="jobs.Apply.CV"
                                :value="jobs.progress"
                                color="blue-grey"
                                height="25"
                            >
                                <template v-slot:default="{ value }">
                                    <strong>{{ Math.ceil(value) }}%</strong>
                                </template>
                            </v-progress-linear>
                            <!-- Short Description Textarea -->
                            <v-textarea
                                v-model="jobs.Apply.description"
                                label="وصف قصير"
                                variant="outlined"
                                required
                                rows="4"
                                no-resize
                                :minlength="10"
                                :maxlength="150"
                                :rules="[(v) => !!v || 'يجب إدخال وصف قصير']"
                            ></v-textarea>

                            <!-- Slider for Description Length -->
                            <v-slider
                                v-model="jobs.Apply.description.length"
                                :max="150"
                                step="1"
                                disabled
                                thumb-label="always"
                            ></v-slider>

                            <!-- Submit Button -->
                            <v-btn
                                class="d-flex align-center mt-4 mb-4"
                                type="submit"
                                :loading="loading"
                                :disabled="loading"
                                style="
                                    width: 100%;
                                    padding: 20px;
                                    letter-spacing: normal;
                                    font-weight: bold;
                                    font-size: 19px;
                                    background: var(--main-color);
                                    color: #fff;
                                "
                            >
                                تقديم
                            </v-btn>
                        </form>
                    </v-card>
                </v-dialog>
            </div>
        </v-container>
    </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { useJobs } from "@/store/job.js";

export default defineComponent({
    setup() {
        const jobs = useJobs();
        jobs.Get_data();
        jobs.Get_Apply_data();

        // Destructuring reactive references and methods from Jobs store
        const {
            Job,
            loading,
            applies,
            progress,
            Apply,
            upload_CV,
            Get_applies,
            dialog_2,
            Get_Apply_data,
            Add_Apply,
            Job_Information,
            Get_data,
            Jobs,
            apply,
            loading1,
        } = storeToRefs(jobs);

        // Return the necessary reactive properties and methods
        return {
            Job,
            loading,
            applies,
            progress,
            Apply,
            upload_CV,
            Get_applies,
            dialog_2,
            Get_Apply_data,
            Add_Apply,
            Job_Information,
            Get_data,
            Jobs,
            jobs, // Ensure jobs is returned for template access
            apply,
            loading1,
        };
    },
});
</script>

<style lang="scss" scoped>
form {
    width: 96.5%;
    margin: auto;
}

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
.job {
    margin-bottom: 10px;
    .title {
        background: var(--main-color);
        padding: 10px 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 5px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        font-size: 20px;
    }
}

.box {
    flex-wrap: wrap !important;
    gap: 10px !important;
}

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
.btn {
    margin: auto !important;
    text-align: center;
    margin-top: 40px !important;
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

.v-container {
    margin: 20px auto !important;
    flex-wrap: wrap;
    padding: 0;
    justify-content: flex-start !important;
    flex-direction: column;
    gap: 40px;
    width: 90%;
    display: flex;
}

.feat {
    width: 100%;
    box-shadow: 0 0 10px #ddd;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 10px;
    justify-content: space-between;
    .header {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
        position: relative;
        svg {
            cursor: pointer;
            color: var(--main-color);
            &:hover {
                color: var(--therd-color);
            }
        }

        &::before {
            content: "";
            position: absolute;
            bottom: -5px;
            left: 50%;
            height: 4px;
            width: calc(100% - 20px);
            background: var(--secound-color);
            transform: translateX(-50%);
        }
        .small_container {
            display: flex;
            align-items: center;
            justify-content: space-between;

            & > div {
                font-size: 20px;
                font-weight: bold;
                color: var(--main-color);
                display: flex;
                align-items: center;
                gap: 10px;
                color: var(--main-color);
            }
        }
        .time {
            display: flex;
            align-items: center;
            gap: 5px;
            color: var(--therd-color);
            font-weight: bold;
            font-size: 14px;
        }
    }
    .body {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
        .title {
            font-size: 18px;
            font-weight: bold;
            color: var(--therd-color);
        }
        ul {
            color: var(--therd-color);
            font-weight: bold;
            font-size: 16px;
            li {
                list-style-type: square;
                list-style-position: inside;
            }
        }
    }
    .footer {
        background: var(--main-color);
        color: #fff;
        padding: 10px;
        border-radius: 5px;
        text-align: center;
        font-weight: bold;
        cursor: pointer;
        &:hover {
            background: var(--therd-color);
        }
    }
}

@media (max-width: 599px) {
}
@media (min-width: 600px) and (max-width: 768px) {
}
@media (min-width: 769px) {
    .v-container {
        flex-direction: row;
        gap: 15px;
        align-items: stretch !important;
    }

    .feat {
        width: 32%;
    }
}

img.pluse {
    width: 40px;
    cursor: pointer;
    &:hover {
        opacity: 0.7;
    }
}
.visible {
    opacity: 0;
    animation: fadeIn 1s ease-in-out forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
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
</style>
