<template>
  <div class="dashboard">
    <v-subheader class="grey--text">Dashboard</v-subheader>

    <v-container class="my-5">
      <v-layout row class="mb-3 px-4">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="black" @click="sortBy('title')" v-on="on">
              <v-icon flat left small>mdi-folder</v-icon>
              <span class="caption">By project title</span>
            </v-btn>
          </template>
          <span>Sort list by projects name</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="dark" @click="sortBy('responsible')" v-on="on">
              <v-icon left small>mdi-account-multiple</v-icon>
              <span class="caption">By project responsible</span>
            </v-btn>
          </template>
          <span>Sort by project responsible</span>
        </v-tooltip>
      </v-layout>

      <v-card class flat v-for="project in projects" :key="project.id">
        <v-layout row wrap :class="`pa-3 ml-0 project ${project.status}`">
          <v-flex xs12 md6>
            <div class="caption grey--text">Project Title</div>
            <div>{{ project.projectName }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Responsible</div>
            <div>{{ project.memberId }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Due date</div>
            <div>{{ project.dueDate }}</div>
          </v-flex>
          <v-flex xs2 sm4 md2>
            <div class="right">
              <v-chip small dark class="white--text caption my-3">{{ project.status }}</v-chip>
            </div>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>

      <NewProjectForm />
    </v-container>
  </div>
</template>

<script>
import NewProjectForm from "../views/forms/Project.vue";

import firebase from 'firebase/app'
import 'firebase/database'


let db = firebase.database();

let projectsRef = db.ref('projects');
let teamRef = db.ref('team');

export default {
  firebase: {
    projects: projectsRef,
    team: teamRef,
  },
  components: { NewProjectForm },
  data: () => ({
    dialog: false,
    projects: [],
    team: []
  }),
  methods: {
    sortBy(prop) {
      this.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },
  },
}
</script>

<style>
.project.complete {
  border-left: 4px solid #3cd1c2;
}

.project.ongoing {
  border-left: 4px solid orange;
}

.project.overdue {
  border-left: 4px solid tomato;
}
</style>