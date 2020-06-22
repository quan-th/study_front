<template>
  <div class="app">
    <v-container>
      <v-row style="float:right;">
        <v-col>
          <v-btn class="ma-2" outlined normal fab color="indigo" v-on:click="logOut">
            <span class="v-btn__content">
              <img src="@/assets/logout.png" />
            </span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  align-content: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
