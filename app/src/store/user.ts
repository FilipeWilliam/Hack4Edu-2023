import api from "@/plugins/api";
import { defineStore } from "pinia";

export const enum userTypes {
  System = 1,
  SystemAdmin = 2,
  Admin = 3,
  Teacher = 4,
  Student = 5,
}

export const useUserStore = defineStore("user", {
  state: () => ({
    userTypes: [
      { id: userTypes.Admin, label: "Administrador" },
      { id: userTypes.Teacher, label: "Professor" },
      { id: userTypes.Student, label: "Estudante" },
    ],
    allUsers: [],
  }),
  actions: {
    list(payload: any) {
      let query: any = {};

      if (payload) {
        query = {
          search: payload.search ? payload.search : "",
          customerId: payload.customerId,
        };

        if (query.search === "") {
          delete query.search;
        }
      }

      return new Promise((resolve, reject) => {
        api
          .get("/users?" + new URLSearchParams(query).toString())
          .then((response) => {
            this.allUsers = response.data.entities;
            resolve(response.data);
          })
          .catch(reject);
      });
    },
    create(payload: object) {
      return new Promise((resolve, reject) => {
        api
          .post("/users", payload)
          .then((response) => resolve(response.data))
          .catch(reject);
      });
    },
    update(payload: any) {
      return new Promise((resolve, reject) => {
        api
          .put("/users/" + payload.id, payload)
          .then((response) => resolve(response.data))
          .catch(reject);
      });
    },
    delete(id: any) {
      return new Promise((resolve, reject) => {
        api
          .delete("/users/" + id)
          .then((response) => resolve(response.data))
          .catch(reject);
      });
    },
  },
});
