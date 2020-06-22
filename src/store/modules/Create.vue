<template>
  <v-form v-model="valid" style="margin-top:0">
    <v-container style="padding:0">
      <v-row style="padding:0">
        <v-col cols="4" lg="4"></v-col>
        <v-col cols="4" lg="4">
          <img alt="Vue logo" cols="4" lg="4" src="@/assets/create.png" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" lg="4" style="padding:0"></v-col>
        <v-col cols="4" lg="4" style="padding:0">
          <input type="hidden" ref="codeField" :value="this.rndCode" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" lg="4" style="padding:0"></v-col>
        <v-col cols="4" lg="4" style="padding:0">
          <v-text-field v-model="name" :rules="nameRules" label="*Name" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" lg="4"></v-col>
        <v-col cols="4" lg="4">
          <v-radio-group v-model="sex" label="Sex">
            <v-radio class="sex_radio" label="Male" :value="'Male'"></v-radio>
            <v-radio class="sex_radio" label="Female" :value="'Female'"></v-radio>
            <v-radio class="sex_radio" label="None" :value="'None'"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" lg="4" style="padding:0"></v-col>
        <v-col cols="4" lg="4" style="padding:0">
          <v-text-field v-model="age" :rules="ageRules" label="Age" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" lg="4" style="padding:0"></v-col>
        <v-col cols="4" lg="4" style="padding:0">
          <v-text-field v-model="address" label="Address" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" lg="4" style="padding:0"></v-col>
        <v-col cols="4" lg="4" style="padding:0">
          <v-btn class="ma-2" outlined normal fab color="indigo" v-on:click="createCustomer">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="4" lg="4" style="padding:0">
          <v-btn class="ma-2" outlined normal fab color="indigo" v-on:click="listCustomer">
            <v-icon>mdi-format-list-bulleted-square</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import ApiService from "@/common/api.service";
export default {
  data: () => ({
    valid: false,
    name: "",
    number: "",
    address: "",
    nameRules: [
      v => !!v || "Name is required",
      v => v.length <= 10 || "Name must be less than 10 characters"
    ],
    age: "",
    ageRules: [a => (a > 0 && a <= 100) || "Age must be between 0 and 100"]
  }),
  methods: {
    rndStr: function(len) {
      let text = "";
      let chars = "abcdefghijklmnopqrstuvwxyz";

      for (let i = 0; i < len; i++) {
        text += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      return text;
    },
    createCustomer: function() {
      ApiService.post(`customer`, {
        customer_code: this.rndStr(127),
        customer_name: this.name,
        sex: this.sex,
        age: this.age,
        address: this.address
      })
        .then(() => {
          this.$router.push({ name: "home" });
        })
        .catch(e => {
          this.$router.push({
            name: "error",
            params: { status: e.response.status }
          });
        });
    },
    listCustomer: function() {
      this.$router.push({ name: "home" });
    }
  },
  computed: {
    rndCode() {
      return this.rndStr(10);
    },
    currentToken() {
      return this.$store.state.auth.token;
    }
  },
  mounted() {
    if (!this.currentToken) {
      this.$router.push({ name: "login" });
    }
  }
};
import "@/assets/styles/style.css";
</script>
