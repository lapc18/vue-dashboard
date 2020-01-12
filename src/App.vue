<template>
  <v-app color="grey lighten-4">
    <Navbar />
    <v-content class="mx-4 mb-4">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import config from './firebaseConfig'
import Navbar from './components/Navbar'
import firebase from 'firebase/app'
firebase.initializeApp(config);

export default {
  name: 'App',
  components: { Navbar },
  data: () => ({
    //
  }),
};
</script>
