<template>
  <v-fab-trasition>
    <v-dialog v-model="dialog" persistent>
      <template v-slot:activator="{ on }">
        <v-btn fab large right fixed dark bottom class="white--text" v-on="on">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Add New Project</v-card-title>
        <v-card-text>
          <v-form class="px-3">
            <v-row>
              <v-col>
                <v-text-field
                  label="Project name"
                  required
                  v-model="projectName"
                  prepend-icon="mdi-folder"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-select
                  required
                  v-model="select"
                  :items="responsibles"
                  item-text="name"
                  item-value="id"
                  label="Responsible name"
                  prepend-icon="mdi-account"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-menu v-model="menuStart" :close-on-content-click="false" max-width="290">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      :value="computedStartDate"
                      clearable
                      label="Start Date"
                      v-on="on"
                      prepend-icon="mdi-calendar"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="startDate" @change="menuStart = false"></v-date-picker>
                </v-menu>
              </v-col>

              <v-col>
                <v-menu v-model="menuDue" :close-on-content-click="false" max-width="290">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      :value="computedDueDate"
                      clearable
                      label="Due Date"
                      v-on="on"
                      prepend-icon="mdi-calendar"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="dueDate" @change="menuDue = false"></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-textarea label="Description" v-model="description" prepend-icon="mdi-pencil"></v-textarea>
              </v-col>
            </v-row>

            <div>
              <v-btn class="ma-2" rounded text @click="cancel()">
                <v-icon left>mdi-close-circle</v-icon>Cancel
              </v-btn>
              <v-btn dark color="dark" class="ma-2" rounded>
                <v-icon left>mdi-content-save</v-icon>Save
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-fab-trasition>
</template>

<script>
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

export default {
  data() {
    return {
      //TODO: make web call to get responsibles array
      responsibles: [
        { id: "1", name: "DevLegnd" },
        { id: "2", name: "Jose Adolfo Pimentel" },
        { id: "3", name: "Luís Adolfo Pimentel" },
        { id: "4", name: "Luis" },
        { id: "5", name: "Pimentel" }
      ],
      dialog: false,
      projectName: "",
      select: null,
      description: "",
      startDate: null,
      dueDate: null,
      menuStart: false,
      menuDue: false
    };
  },
  methods: {
    cancel() {
        this.dialog = false
    }
  },
  computed: {
    computedStartDate() {
      return this.startDate
        ? format(parseISO(this.startDate), "MM/dd/yyyy")
        : "";
    },
    computedDueDate() {
      return this.dueDate ? format(parseISO(this.dueDate), "MM/dd/yyyy") : "";
    }
  }
};
</script>