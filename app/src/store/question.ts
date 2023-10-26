import api from "@/plugins/api";
import { defineStore } from "pinia";

export const useQuestionStore = defineStore('question', {
  state: () => ({
  }),
  actions: {
    listGPT(payload: string) {
      return new Promise((resolve, reject) => {
        api.get('/gpt-questions?theme=' + payload)
          .then((response) => {
            resolve(response.data.result);
          })
          .catch(reject);
      });
    }
  },
});
