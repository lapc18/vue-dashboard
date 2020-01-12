<template>
  
    <v-dialog v-model="dialog" persistent>
      <template v-slot:activator="{ on }">
        <v-btn fab large right fixed dark bottom class="white--text" v-on="on">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Add New Project</v-card-title>
        <v-card-text>
            <v-alert 
                    transition="scale-transition" 
                    v-model="alertValue" 
                    dismissible
                    colored-border
                    color="success"
                    icon="mdi-check"
                    dark>Your project was saved successfully!</v-alert>
          <v-form class="px-3" ref="form">
            <v-row>
              <v-col>
                <v-text-field
                  label="Project name"
                  required
                  v-model="newProject.projectName"
                  :rules="inputRules"
                  prepend-icon="mdi-folder"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-select
                  required
                  v-model="newProject.memberId"
                  :items="team"
                  :rules="selectRules"
                  item-text="name"
                  item-value="id"
                  label="Responsible name"
                  prepend-icon="mdi-account"
                ></v-select>
              </v-col>
           
              <!-- <v-col>
                <v-menu v-model="menuDue" :close-on-content-click="false" max-width="290">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      :value="computedDueDate"
                      :rules="dateRules"
                      clearable
                      label="Due Date"
                      v-on="on"
                      prepend-icon="mdi-calendar"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="newProject.dueDate" @change="menuDue = false"></v-date-picker>
                </v-menu>
              </v-col> -->
            </v-row>

            <v-row>
              <v-col>
                <v-textarea label="Description" v-model="newProject.description" :rules="inputRules" prepend-icon="mdi-pencil"></v-textarea>
              </v-col>
            </v-row>

            <div>
              <v-btn class="ma-2" rounded text @click="cancel()">
                <v-icon left>mdi-close-circle</v-icon>Cancel
              </v-btn>
              <v-btn type="submit" dark color="dark" class="ma-2" rounded @click.prevent="submit()">
                <v-icon left>mdi-content-save</v-icon>Save
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
 
</template>

<script>
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import firebase from 'firebase/app'
import 'firebase/database'

let db = firebase.database();
var projectRef = db.ref('projects');
var teamRef = db.ref('team');

export default {
  firebase:{
    projects: projectRef,
    team: teamRef,
  },
  data() {
    return {
      team: [],
      dialog: false,
      alertValue: false,
      image: {
        imageData: null,
        picture: null,
        uploadValue: 0,
      },
      newProject: {
        img: '',
        projectName: "",
        createdBy: '',
        description: "",
      },
      dateRules: [
          v => v.length != '' || 'Select a date!'
      ],
      inputRules: [
          v => v.length >= 3 || 'This field should has 3 characters minimun.'
      ],
      selectRules: [
          v => v.length > 0 || 'You should select one of these items...'
      ],
    };
  },
  methods: {
    cancel() {
        this.dialog = false;
    },
    submit(){
        if(this.$refs.form.validate()){
            console.log(this.newProject);
            projectRef.push(this.newProject)
            .then(() => 
            {
                //this.alertValue = true; //TODO: add notifications
                this.dialog = false;
                this.newProject = new {
                  img: '',
                  projectName: "",
                  createdBy: '',
                  description: "",
                }
            });
        }
    },
     
  },
  computed: {
    computedDueDate() {
      return this.newProject.dueDate ? format(parseISO(this.newProject.dueDate), "MM/dd/yyyy") 
      : "";
    },
    
  },
  
};
</script>