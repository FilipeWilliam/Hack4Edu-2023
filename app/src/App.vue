<template>
  <v-app>
    <router-view />

    <v-snackbar v-model="appStore.snackbar.isVisible" timeout="3000">{{ appStore.snackbar.message }}</v-snackbar>
  </v-app>
</template>

<script lang="ts" setup>
import { useAppStore } from './store/app';

const appStore = useAppStore();
</script>

<style>
.v-card {
  background-color: #FFF !important;
}
</style>