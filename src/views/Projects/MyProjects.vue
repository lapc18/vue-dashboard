<template>
  <div class="projects">
    <v-subheader class="grey--text">My Projects</v-subheader>

    <v-container class="my-5">
        
        <v-expansion-panels>
          <v-expansion-panel v-for="project in projects" :key="project.id">
            <v-expansion-panel-header disable-icon-rotate>
              <div class="headline">{{ project.title }}</div>
              <template v-slot:actions>
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-icon :color="`${getIconColor(project.status)}`" v-on="on">mdi-check</v-icon>
                  </template>
                  <span>{{project.status}}</span>
                </v-tooltip>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-card class="pa-5">
                <v-card-title class="title grey--text">{{ project.dueDate }}</v-card-title>
                <v-card-text class="font-weight-bold">{{ project.content }}</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn v-on="on" icon flat color="grey">
                        <v-icon small left>mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <span>Edit</span>
                  </v-tooltip>

                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn v-on="on" icon flat color="grey">
                        <v-icon small left>mdi-delete</v-icon>
                      </v-btn>
                    </template>
                    <span>Delete</span>
                  </v-tooltip>

                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn v-on="on" icon flat color="grey">
                        <v-icon small left>mdi-check</v-icon>
                      </v-btn>
                    </template>
                    <span>Complete</span>
                  </v-tooltip>
                  
                </v-card-actions>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        
    </v-container>

  </div>
</template>

<script>
export default {
  data() {
    return {
      projects: [
        {id: '1', title: 'Create Devlegnd Site', responsible: 'DevLegnd', dueDate: '31-12-2019', status: 'complete', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam nihil dolorem molestiae veniam officiis maxime id rem repudiandae error debitis fugiat dolorum, commodi delectus hic esse blanditiis soluta, minus architecto.'},
        {id: '2', title: 'Devlegnd Site', responsible: 'Jose Adolfo Pimentel', dueDate: '31-12-2019', status: 'ongoing', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam nihil dolorem molestiae veniam officiis maxime id rem repudiandae error debitis fugiat dolorum, commodi delectus hic esse blanditiis soluta, minus architecto.'},
        {id: '3', title: 'JL App', responsible: 'Luís Adolfo Pimentel', dueDate: '31-12-2019', status: 'ongoing', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam nihil dolorem molestiae veniam officiis maxime id rem repudiandae error debitis fugiat dolorum, commodi delectus hic esse blanditiis soluta, minus architecto.'},
        {id: '4', title: 'Call to Nikola Tesla', responsible: 'Luis', dueDate: '17-12-2019', status: 'ongoing', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam nihil dolorem molestiae veniam officiis maxime id rem repudiandae error debitis fugiat dolorum, commodi delectus hic esse blanditiis soluta, minus architecto.'},
        {id: '5', title: 'Site', responsible: 'Pimentel', dueDate: '31-12-2019', status: 'overdue', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam nihil dolorem molestiae veniam officiis maxime id rem repudiandae error debitis fugiat dolorum, commodi delectus hic esse blanditiis soluta, minus architecto.'},
      ],
    }
  },
  methods: {
    filter(){
      this.projects.filter((project) => project.responsible === 'Luís Adolfo Pimentel');
    },
    getIconColor(status){
      let color = '';
      switch(status){
        case 'complete': color = 'green'; 
        break;
        case 'overdue': color = 'red'; 
        break;
        case 'ongoing': color = 'blue'; 
        break;
      }
      return color;
    }
  }
}
</script>

<style scoped>

</style>