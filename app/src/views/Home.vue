<template>
  <v-app-bar color="primary" prominent>
    <v-app-bar-nav-icon variant="text" @click.stop="drawer.rail = !drawer.rail"></v-app-bar-nav-icon>

    <v-spacer></v-spacer>

    <v-layout>
      <v-spacer></v-spacer>
      <div>
        <v-avatar color="#FFF">
          <v-icon icon="mdi-account-circle"></v-icon>
        </v-avatar>

        {{ appStore.appUser.name }}
      </div>
      <v-btn @click="signOut">Sair</v-btn>
    </v-layout>
  </v-app-bar>

  <v-navigation-drawer color="secondary" v-model="drawer.open" permanent :rail="drawer.rail">
    <v-list density="compact" nav>
      <v-list-item v-for="route in drawer.menus" :prepend-icon="(route.meta!.menuIcon as string)"
        :title="(route.meta!.menuLabel as string)" :to="route.path"></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-main>
    <div class="content__wrapper">
      <router-view />
    </div>
  </v-main>
</template>

<script lang="ts" setup>
import router from '@/router';
import { useAppStore } from '@/store/app';
import { ref } from 'vue';

let appStore = useAppStore();
let allRoutes = router.getRoutes();
let loggedRoutes = allRoutes.find((route) => route.name === 'Home')!.children;
let currentPermissionRoutes = loggedRoutes.filter((route) => (route.meta?.permission as Array<any>)?.includes((appStore.appUser as any).type) && route.meta?.menuIcon);

const drawer = ref({
  open: true,
  rail: false,
  menus: [
    ...currentPermissionRoutes
  ]
})

let signOut = () => {
  appStore.signOut();
  router.push('/login');
}

</script>


<style>
.content__headline {
  background-color: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-on-primary))
}

.content__wrapper {
  padding: 20px;
}
</style>