import api from "@/plugins/api";
import { defineStore } from "pinia";
import { useAppStore } from "./app";
import { userTypes } from "./user";

const appStore = useAppStore();

export const useTaskStore = defineStore('task', {
  state: () => ({
    allTasks: [],
    registerTask: {
      questions: [
        {
          title: '',
          alternative1: '',
          alternative2: '',
          alternative3: '',
          alternative4: '',
          correctAlternative: null,
          level: null
        }
      ]
    }
  }),
  actions: {
    create(payload: object) {
      return new Promise((resolve, reject) => {
        api.post("/tasks", payload)
          .then((response) => resolve(response.data))
          .catch(reject);
      });
    },
    list() {
      let query: any = {};
      let path: string = '';
      let appUser = (appStore.appUser as any);

      if (appUser.type === userTypes.Student) {
        query.userId = (appStore.appUser as any).id;
        path = '/user-tasks';
      } else {
        path = '/tasks';
      }

      return new Promise((resolve, reject) => {
        api.get(path + "?" + new URLSearchParams(query).toString())
          .then((response) => {
            this.allTasks = response.data.result;
            resolve(response.data);
          })
          .catch(reject);
      });
    },
    read(payload: any) {
      return new Promise((resolve, reject) => {
        api.get("/tasks/" + payload)
          .then((response) => {
            response.data.result.periodStart = response.data.result.periodStart.substring(0, 19);
            response.data.result.periodEnd = response.data.result.periodEnd.substring(0, 19);
            this.registerTask = response.data.result;
            resolve(response.data);
          })
          .catch(reject);
      });
    },
    update(payload: any) {
      return new Promise((resolve, reject) => {
        api.put("/tasks/" + payload.id, payload)
          .then((response) => resolve(response.data))
          .catch(reject);
      });
    },
    delete(id: any) {
      return new Promise((resolve, reject) => {
        api.delete("/tasks/" + id)
          .then((response) => resolve(response.data))
          .catch(reject);
      });
    },
  },
});
