<template>
  <div class="team">
    <v-subheader class="grey--text">Team</v-subheader>
    <v-container class="my-5">
      <v-layout row class="mb-3 px-4">
        <!-- <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="black" v-on="on">
              <v-icon flat left small>mdi-account-plus</v-icon>
              <span class="caption">Add new</span>
          </v-btn>
          </template>
          <span>Add new member</span>
        </v-tooltip> -->
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="dark" v-on="on" @click="sortBy()">
              <v-icon left small>mdi-account-multiple</v-icon>
              <span class="caption">By name</span>
          </v-btn>
          </template>
          <span>Sort list by member name</span>
        </v-tooltip>
      </v-layout>
      <v-layout row wrap >
        <v-flex v-for="person in team" :key="person.id">
          <v-card flat class="text-center ma-3">
            <v-responsive class="pt-5">
              <v-avatar size="100" class="grey lighten-2">
                <v-img :src="`${person.img}`"></v-img>
              </v-avatar>
            </v-responsive>
            <v-card-text class="text-center">
              <h3>{{person.name}}</h3>
              <div class="grey--text">{{person.role}}</div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn link :href="`${person.socialNetworks.facebook}`" icon target="_blank" color="grey">
                <v-icon small>mdi-facebook</v-icon>
              </v-btn>
              <v-btn link :href="`${person.socialNetworks.instagram}`" icon target="_blank" color="grey">
                <v-icon small>mdi-instagram</v-icon>
              </v-btn>
              <v-btn link :href="`${person.socialNetworks.twitter}`" icon target="_blank" color="grey">
                <v-icon small>mdi-twitter</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <NewMember />
  </div>
</template>

<script>

import NewMember from '../views/forms/Member'
import firebase from 'firebase/app'
import 'firebase/database'

let db = firebase.database();

var teamRef = db.ref('team');

export default {
  components: {NewMember},
  data: () => ({
    team: []
  }),
  firebase:{
    team: teamRef
  },
  methods: {
    sortBy(){
      this.team.sort((a,b) => a['name'] > b['name'] ? 1 : -1);
    }
  }
}
</script>

<style>

</style>