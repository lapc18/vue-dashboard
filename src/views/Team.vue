<template>
  <div class="team">
    <v-subheader class="grey--text">Team</v-subheader>
    <v-container class="my-5">
      <v-layout row class="mb-3 px-4">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="black" v-on="on">
              <v-icon flat left small>mdi-account-plus</v-icon>
              <span class="caption">Add new</span>
          </v-btn>
          </template>
          <span>Add new member</span>
        </v-tooltip>
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
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="person in team" :key="person.id">
          <v-card flat class="text-center ma-3">
            <v-responsive class="pt-5">
              <v-avatar size="100" class="grey lighten-2">
                <v-img :src="`${person.img}`"></v-img>
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <v-card-title >{{person.name}}</v-card-title>
              <div class="grey--text">{{person.role}}</div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn link :href="`${person.socialNetwork.facebook}`" icon flat color="grey">
                <v-icon small left>mdi-facebook</v-icon>
              </v-btn>
              <v-btn link :href="`${person.socialNetwork.instagram}`" icon flat color="grey">
                <v-icon small left>mdi-instagram</v-icon>
              </v-btn>
              <v-btn link :href="`${person.socialNetwork.twitter}`" icon flat color="grey">
                <v-icon small left>mdi-twitter</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>

export default {
  data(){
    return {
      team: [
        { 
          id: 1, 
          name: 'Luís Adolfo Pimentel', 
          role: 'CEO & Lead Developer', 
          img: 'https://randomuser.me/api/portraits/men/85.jpg',
          socialNetwork: {
            facebook: 'http://facebook.com/lapx18',
            instagram: 'http://instagram.com/lapc18',
            twitter: 'http://twitter.com/lapx18',
          },
        },
        { 
          id: 2, 
          name: 'Adolfo Pimentel', 
          role: 'CEO & Lead Developer', 
          img: 'https://randomuser.me/api/portraits/men/85.jpg',
          socialNetwork: {
            facebook: 'http://facebook.com/lapx18',
            instagram: 'http://instagram.com/lapc18',
            twitter: 'http://twitter.com/lapx18',
          },
        },
        { 
          id: 3, 
          name: 'José Adolfo Pimentel', 
          role: 'CEO & Lead Developer', 
          img: 'https://randomuser.me/api/portraits/men/85.jpg',
          socialNetwork: {
            facebook: 'http://facebook.com/lapx18',
            instagram: 'http://instagram.com/lapc18',
            twitter: 'http://twitter.com/lapx18',
          },
        },
        { 
          id: 4, 
          name: 'Adalfis Pimentel', 
          role: 'CEO & Lead Developer', 
          img: 'https://randomuser.me/api/portraits/men/85.jpg',
          socialNetwork: {
            facebook: 'http://facebook.com/lapx18',
            instagram: 'http://instagram.com/lapc18',
            twitter: 'http://twitter.com/lapx18',
          },
        },
      ]
    }
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