<template>
  <nav>

    <v-snackbar v-model="snackbar" top :timeout="4000" color="success">
      <span>Awesome! You added a new project.</span>
      <v-btn text color="white" @click="snackbar = false">Close</v-btn>
    </v-snackbar>

    <v-app-bar flat app class="grey lighten-4">
     <v-app-bar-nav-icon class="gre--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
     <v-toolbar-title class="text-uppercase grey--text">
      <span class="font-weight-light">Projects</span>
      <span>Manager</span>
     </v-toolbar-title> 
     <v-spacer></v-spacer>

    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn text color="grey" v-on="on">
          <v-icon left>mdi-chevron-down</v-icon>
          <span>Menu</span>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="link in links" :key="link.text" router :to="link.route" >
          <v-list-item-title>{{ link.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

     <v-btn text color="grey" disabled>
      <span>Sign Out</span>
      <v-icon right>mdi-exit-to-app</v-icon>
     </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app class="primary">
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img src="/avatar-1.png">
          </v-avatar>
          <p class="text-center white--text subtitle-1 mt-1">
            {{ teamData[0].name }}
          </p>
        </v-flex>
        <v-flex class="mt-4 mb-3">
          <Popup @projectAdded="snackbar = true" :teamData="teamData"/>
        </v-flex>
      </v-layout>
      <v-list>
        <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-item-icon>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import Popup from './Popup'

export default {
  props: ['teamData'],
  components: { Popup },
  data() {
    return {
      drawer: false,
      links: [
        { icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/' },
        { icon: 'mdi-folder', text: 'My Projects', route: '/projects' },
        { icon: 'mdi-account', text: 'Team', route: '/team' },
      ],
      snackbar: false
    }
  }

};
</script>
