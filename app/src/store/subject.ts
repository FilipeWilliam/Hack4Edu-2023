import api from "@/plugins/api";
import { defineStore } from "pinia";

export const useSubjectStore = defineStore('subject', {
    state: () => ({
        currentSubject: {}
    }),
    actions: {
        read(payload: string) {
            return new Promise((resolve, reject) => {
                api.get('/subjects/' + payload)
                    .then((response) => {
                        response.data.result.UserSubject = response.data.result.UserSubject.filter((i) => i.user.type === 5);
                        this.currentSubject = response.data.result;
                        resolve(response.data.result);
                    })
                    .catch(reject);
            });
        }
    },
});
