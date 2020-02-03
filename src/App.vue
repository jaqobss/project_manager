<template>
  <v-app class="red">
    <Navbar :teamData="team"/>

    <v-content class="grey lighten-4 mx-4 mb-4">
      <router-view :teamData="team"/>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: { Navbar },

  data: () => ({
      team: [
          { name: 'Public User', role: 'For public use', avatar: '/avatar-1.png' },
          { name: 'Thomas Joyce', role: 'Graphic designer', avatar: '/avatar-2.png' },
          { name: 'Cynthia Duran', role: 'Developer', avatar: '/avatar-3.png' },
          { name: 'William Watkins', role: 'Social Media Exper', avatar: '/avatar-4.png' },
          { name: 'Debra Casey', role: 'Sales Guru', avatar: '/avatar-5.png'}
      ]
  })
};
</script>
