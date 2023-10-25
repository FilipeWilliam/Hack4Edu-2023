import api from "@/plugins/api";
import { defineStore } from "pinia";

export const useUserTaskStore = defineStore('userTask', {
  actions: {
    answerQuestion(payload: any) {
      return new Promise((resolve, reject) => {
        api.post("/user-task/" + payload.userTaskId + '/questions', payload)
          .then((response) => {
            resolve(response.data);
          })
          .catch(reject);
      });
    },
  },
});
