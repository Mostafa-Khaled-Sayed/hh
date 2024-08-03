import { query, collection, getDocs, limit, where } from "firebase/firestore";
import { defineStore } from "pinia";
import { db } from "../Firebase.js"; // Ensure the path is correct

export const useStudentStore = defineStore("student", {
    state: () => ({
        monthlyDta: [], // Array to store Certificate titles
        subjectArray: [], // Array to store Certificate titles
        AllSubjectsArray: [], // Array to store Certificate titles
        degreesBySubject: [],
    }),
    actions: {
        // Fetch student data by National ID
        async getStudent(nationalId) {
            try {
                const studentCollection = collection(db, "students");
                const q = query(
                    studentCollection,
                    where("National_id", "==", nationalId),
                    limit(1)
                );

                // Execute the query
                const querySnapshot = await getDocs(q);

                // Clear previous data
                this.monthlyDta = [];

                // Set to store unique Subject_Name values
                const uniqueSubjects = new Set();

                querySnapshot.docs.forEach((doc) => {
                    const monthly = doc.data().Results?.["1"]?.Monthly;
                    if (monthly) {
                        for (const monthKey in monthly) {
                            this.AllSubjectsArray.push(
                                monthly[monthKey].Degrees
                            );
                            // Store Certificate titles

                            this.monthlyDta.push(
                                monthly[monthKey].Certificate_title
                            );

                            const degrees = monthly[monthKey]?.Degrees;
                            if (degrees) {
                                degrees.forEach((degree) => {
                                    if (degree.Subject_Name) {
                                        uniqueSubjects.add(degree.Subject_Name);
                                    }
                                });
                            }
                        }
                    }
                });

                // Convert Set to Array to work with it if needed
                this.subjectArray = Array.from(uniqueSubjects);

                // Log data to verify
                console.log(
                    "Monthly Certificate Titles:",
                    this.AllSubjectsArray
                );
            } catch (error) {
                console.error("Error fetching documents:", error);
            }
        },

        getStudentDegreesBySubject(subjectName) {
            // Clear previous data
            this.degreesBySubject = [];

            console.log("Subject Name:", subjectName);

            // Assuming AllSubjectsArray is an array of arrays
            this.AllSubjectsArray.forEach((monthlyArray) => {
                let foundSubject = false;

                monthlyArray.forEach((item) => {
                    if (item.Subject_Name === subjectName) {
                        foundSubject = true;
                        console.log("value=>", item.Student_degree);
                        this.degreesBySubject.push(+item.Student_degree);
                    }
                });

                // Push 100 if the subject was not found for that month (if required)
                if (!foundSubject) {
                    this.degreesBySubject.push(0);
                }
            });

            console.log("Degrees by subject=>>>>>>", this.degreesBySubject);
        },
        // Optional: Fetch additional data related to subjects or certificates
        subjectData(subject) {
            const uniqueSubjects = new Set();
            const uniquemontholy = new Set();

            subject.docs.forEach((doc) => {
                const monthly = doc.data().Results?.["1"]?.Monthly;
                if (monthly) {
                    for (const monthKey in monthly) {
                        uniquemontholy.add(monthly[monthKey].Certificate_title);
                        const degrees = monthly[monthKey]?.Degrees;
                        if (degrees) {
                            degrees.forEach((degree) => {
                                if (degree.Subject_Name) {
                                    uniqueSubjects.add(degree.Subject_Name);
                                }
                            });
                        }
                    }
                }
            });

            console.log(
                "Unique Certificate Titles:",
                Array.from(uniquemontholy)
            );
            console.log("Unique Subject Names:", Array.from(uniqueSubjects));
        },
    },
});
