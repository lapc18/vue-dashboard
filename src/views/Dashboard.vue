<template>
  <div class="dashboard">
    <v-alert 
      transition="scale-transition" 
      v-model="alertValue" 
      dismissible
      colored-border
      :color="alert.color"
      icon="mdi-information"
      dark>{{alert.msg}}</v-alert>

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
            <div>{{ project.directedBy }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Category</div>
            <div>{{ project.category }}</div>
          </v-flex>
          <v-flex xs2 sm4 md2>
            <div class="">
              <v-btn icon dark class="warning ma-1"><v-icon>mdi-pencil</v-icon></v-btn>  
              <v-dialog v-model="dialogDelete" persistent max-width="290">
                <template v-slot:activator="{ on }">
                  <v-btn icon dark class="red ma-1" v-on="on"><v-icon>mdi-delete</v-icon></v-btn>
                </template>
                <v-card>
                  <v-card-title class="headline">DevLegnd</v-card-title>
                  <v-card-text>Are you sure you want to delete this row?</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="black darken-1" rounded text @click="dialogDelete = false">No</v-btn>

                    <v-btn color="red darken-1" rounded dark @click="onRemoveProject(project)">Delete</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>              
            </div> 
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>

      <v-dialog v-model="dialogAdd" persistent>		
        <template v-slot:activator="{ on }">		     
          <v-btn fab large right fixed dark bottom class="white--text" v-on="on">		  
            <v-icon>mdi-plus</v-icon>		      
          </v-btn>		        
        </template>
        <AddProjectForm @result="onCreateProject" />
      </v-dialog>
      
    </v-container>
  </div>
</template>

<script>
import AddProjectForm from "../views/forms/project/Create.vue";
//import EditProjectForm from "../views/forms/project/Edit.vue";

import firebase from 'firebase'
import 'firebase/database'

let db = firebase.database();
let projectsRef = db.ref('projects');
let teamRef = db.ref('team');

export default {
  firebase: {
    projects: projectsRef,
    team: teamRef,
  },
  components: { 
    AddProjectForm, 
    //EditProjectForm 
  
  },
  data: () => ({
    dialogAdd: false,
    dialogEdit: false,
    dialogDelete: false,
    projects: [],
    team: [],
    alert:{
      msg: '',
      color: '',
      icon: ''
    },
    alertValue: false
  }),
  methods: {
    sortBy(prop) {
      this.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },
    onCreateProject(dialog, msg){
      this.dialogAdd = dialog;
      this.showAlert(msg, 'green', 'mdi-check');
    },
    onRemoveProject(item){
      projectsRef.child(item['.key']).remove().then(()=>{
        this.alertValue = true;
        var msg = 'The project ' + item.projectName + 'has been deleted successfully';
        this.showAlert(msg, 'red', 'mdi-deleted');
      });
      this.dialogDelete = false;
    },
    showAlert(msg, color, icon){
       this.alert.msg = msg;
      this.alert.color = color;
      this.alert.icon = icon;
    }
  },
}
</script>
