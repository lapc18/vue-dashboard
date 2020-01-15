<template>
  <v-card>
    <v-card-title>Add New Project</v-card-title>
    <v-card-text>
      <!-- <v-alert 
                transition="scale-transition" 
                v-model="alertValue" 
                dismissible
                colored-border
                color="success"
                icon="mdi-check"
      dark>Your project was saved successfully!</v-alert>-->
      <v-form class="px-3" ref="form">
        <div class="text-center">
          <v-container grid-list-xl>
            <div>
              <input
                type="file"
                ref="file"
                :name="uploadFieldName"
                @change="onFileChange($event.target.name, $event.target.files)"
                style="display:none"
              />
              <v-avatar
                @click="launchFilePicker()"
                size="150px"
                v-ripple
                v-if="!image"
                class="grey lighten-3 mb-3"
              >
                <span>Click to add image</span>
              </v-avatar>
              <v-avatar size="150px" v-else class="mb-3">
                <img :src="imageURL" alt="avatar" />
              </v-avatar>
            </div>
          </v-container>
        </div>
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
              v-model="newProject.category"
              :items="categories"
              :rules="selectRules"
              item-text="name"
              item-value="id"
              label="Category"
              prepend-icon="mdi-shape"
            ></v-select>
          </v-col>
          <v-col>
            <v-select
              required
              v-model="newProject.directedBy"
              :items="team"
              :rules="selectRules"
              item-text="name"
              item-value="id"
              label="Responsible name"
              prepend-icon="mdi-account"
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-textarea
              label="Description"
              v-model="newProject.description"
              :rules="inputRules"
              prepend-icon="mdi-pencil"
            ></v-textarea>
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
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import {bus} from '../../../main.js'

let db = firebase.database();
let storage = firebase.storage();
let projectRef = db.ref("projects");
let teamRef = db.ref("team");

export default {
  props: {
    type: String,
    model: Boolean,
    _key: String
  },
  firebase: {
    projects: projectRef,
    team: teamRef
  },
  data() {
    return {
      team: [],
      categories: [{ name: "App" }, { name: "Design" }, { name: "Web" }],
      imageURL: "",
      fieldName: "",
      image: null,
      key: "",
      alertValue: false,
      newProject: {
        img: "",
        projectName: "",
        directedBy: "",
        category: "",
        description: ""
      },
      inputRules: [
        v => v.length >= 3 || "This field should has 3 characters minimun."
      ],
      selectRules: [
        v => v.length > 0 || "You should select one of these items..."
      ]
    };
  },
  methods: {
    cancel() {
      this.model = false;
      this.$validator.reset();
      this.$emit("dialog", false);
    },
    submit() {
      if (this.$refs.form.validate()) {
        console.log(this.newProject);
        projectRef
          .push(this.newProject)
          .then(data => {
            //this.alertValue = true; //TODO: add notifications
            this.model = false;
            this.newProject.img = "";
            this.newProject.projectName = "";
            this.newProject.directedBy = "";
            this.newProject.category = "";
            this.newProject.description = "";
            this.key = data.key;
            return data.key;
          })
          .then(key => {
            const extension = this.fieldName.slice(
              this.fieldName.lastIndexOf(".")
            );
            return storage
              .ref("projects/" + key + "." + extension)
              .put(this.image);
          })
          .then(uploadTaskSnapshot => {
            return uploadTaskSnapshot.ref.getDownloadURL();
          })
          .then(imageUrl => {
            projectRef.child(this.key).update({
              img: imageUrl
            });
          });
        this.$validator.reset();
        bus.$emit("dialog", false);
      }
    },
    launchFilePicker() {
      this.$refs.file.click();
    },
    onFileChange(fieldName, file) {
      this.image = file[0];
      this.fieldName = file[0].name;
      this.imageURL = URL.createObjectURL(this.image);
    }
  }
};
</script>