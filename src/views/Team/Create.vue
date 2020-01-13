<template>
  <v-card>
    <v-card-title>Add New Member</v-card-title>
    <v-card-text>
      <!-- <v-alert
        transition="scale-transition"
        v-model="alertValue"
        dismissible
        colored-border
        color="success"
        icon="mdi-check"
        dark
      >Your membe was saved successfully!</v-alert>-->
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
              <v-avatar @click="launchFilePicker()" size="150px" v-ripple v-if="!avatar" class="grey lighten-3 mb-3">
                <span>Click to add avatar</span>
              </v-avatar>
              <v-avatar size="150px" v-ripple v-else class="mb-3">
                <img :src="imageURL" alt="avatar" />
              </v-avatar>
            </div>
          </v-container>
        </div>
        <v-row>
          <v-row>
            <v-col>
              <v-text-field
                label="Full name"
                required
                v-model="newMember.name"
                :rules="inputRules"
                prepend-icon="mdi-folder"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="Role"
                required
                v-model="newMember.role"
                :rules="inputRules"
                prepend-icon="mdi-folder"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-row>

        <v-row>
          <!-- <h3 class="grey--text">Social Networks</h3> -->
          <v-col>
            <v-text-field
              label="Facebook"
              required
              v-model="newMember.socialNetworks.facebook"
              :rules="linkRules"
              prepend-icon="mdi-facebook"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              label="Instagram"
              required
              v-model="newMember.socialNetworks.instagram"
              :rules="linkRules"
              prepend-icon="mdi-instagram"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              label="Twitter"
              required
              v-model="newMember.socialNetworks.twitter"
              :rules="linkRules"
              prepend-icon="mdi-twitter"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-textarea
              label="Description"
              v-model="newMember.description"
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
//import ImageInput from "../../components/ImageInput";
//import { VueAvatar } from "vue-avatar-editor-improved";
import firebase from "firebase";
import "firebase/database";

let db = firebase.database();
let storage = firebase.storage();
let teamRef = db.ref("team");

export default {
  components: {
    //ImageInput
    //VueAvatar
  },
  firebase: {
    team: teamRef
  },
  data() {
    return {
      key: '',
      uploadFieldName: 'file',
      avatar: null,
      saving: false,
      saved: false,
      team: [],
      alertValue: false,
      imageURL: '',
      newMember: {
        img: "",
        name: "",
        role: "",
        description: "",
        socialNetworks: {
          facebook: "",
          instagram: "",
          twitter: ""
        }
      },
      inputRules: [
        v => v.length >= 3 || "This field should has 3 characters minimun."
      ],
      linkRules: []
    };
  },
  methods: {
    cancel() {
      this.dialog = false;
    },
    submit() {
      if (this.$refs.form.validate()) {
        // if(this.avatar){this.onUpload(this.avatar.formData)}
        // console.log(this.newMember);
        // console.log(this.avatar);

        
        teamRef.push(this.newMember).then((data) => {
          //this.alertValue = true; //TODO: add notifications
          this.dialog = false;
          
          this.newMember.img = "";
          this.newMember.name = "";
          this.newMember.role = "";
          this.newMember.description = "";
          this.newMember.socialNetworks.facebook = "";
          this.newMember.socialNetworks.instagram = "";
          this.newMember.socialNetworks.twitter = "";
          this.key = data.key;
          return data.key;
        })
        .then(key => {
          const extension = this.fieldName.slice(this.fieldName.lastIndexOf('.'));
          return storage.ref('team/' + key + '.' + extension).put(this.avatar);
        })
        .then(uploadTaskSnapshot => {
          return uploadTaskSnapshot.ref.getDownloadURL();
        })
        .then(imageUrl => {
          teamRef.child(this.key).update({
            img : imageUrl
          });
        });
        this.$validator.reset();
      }
    },
    launchFilePicker(){
      this.$refs.file.click();
    },
    onFileChange(fieldName, file) {
      this.avatar = file[0];
      this.fieldName = file[0].name;
      this.imageURL = URL.createObjectURL(this.avatar);
    }
  }
};
</script>