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
          <v-text-field v-model="customerName" :rules="nameRules" label="*Name" required>{{this.$props.customerName}}</v-text-field>
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
          <v-text-field v-model="age" :rules="ageRules" label="Age" required>{{this.$props.age}}</v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" lg="4" style="padding:0"></v-col>
        <v-col cols="4" lg="4" style="padding:0">
          <v-text-field v-model="address" label="Address" required>{{this.$props.address}}</v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" lg="4" style="padding:0"></v-col>
        <v-col cols="4" lg="4" style="padding:0">
          <v-btn class="ma-2" outlined normal fab color="indigo" v-on:click="updateCustomer">
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
export default {
  data: () => ({
    valid: false,
    customerName: "",
    number: "",
    address: "",
    nameRules: [
      v => !!v || "Name is required",
      v => v.length <= 100 || "Name must be less than 10 characters"
    ],
    age: "",
    ageRules: [a => (a > 0 && a <= 100) || "Age must be between 0 and 100"]
  }),
  methods: {
    updateCustomer: function() {
      this.$axios
        .put(
          `http://localhost:8080/customer/`+this.$props.customerCode,
          {
            customer_code: this.$props.customerCode,
            customer_name: this.customerName,
            sex: this.sex,
            age: this.age,
            address: this.address
          },
          {
            headers: {
              "Content-type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
          }
        )
        .then(() => {
          this.$router.push({ name: "home" });
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    listCustomer: function() {
      this.$router.push({ name: "home" });
    }
  },
  props: {
    customerCode: {
      type: String,
      required: true,
      default: "hello"
    },
    customerName: {
      type: String,
    },
    sex: {
      type: String,
      default: "Male"
    },
    age: {
      type: Number,
      default: 0
    },
    address: {
      type: String
    }
  }
};
import "@/assets/styles/style.css";
</script>
