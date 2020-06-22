<template>
  <v-form v-model="valid" style="margin-top:0">
    <v-container style="padding:0">
      <v-row style="padding:0">
        <v-col cols="4" lg="4"></v-col>
        <v-col cols="4" lg="4">
          <img alt="Vue logo" cols="4" lg="4" src="@/assets/error.png" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" lg="4" style="padding:0"></v-col>
        <v-col cols="4" lg="4" style="padding:0">
         <v-col cols="4" lg="4">
            <v-input label="Status:">{{status}}</v-input>
          </v-col>
        </v-col>
      </v-row>
       <v-row>
          <v-col cols="3" lg="3"></v-col>
          <v-col cols="6" lg="6" style="margin: auto;">
            <v-row>
              <v-col cols="4" lg="4"/>
              <v-col cols="4" lg="4"/>
              <v-col cols="4" lg="4">
                <v-btn class="ma-2" outlined normal fab color="indigo" v-on:click="listCustomer">
                  <v-icon>mdi-format-list-bulleted-square</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="3" lg="3" style="padding:0"></v-col>
        </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    status:0
  }),
  methods: {
    listCustomer: function() {
      this.$router.push({ name: "home" });
    }
  },
  props: {
    status: {
      type: String,
      required: true,
      default: "400"
    },
  }
};
</script>
