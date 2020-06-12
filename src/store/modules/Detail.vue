<template>
<v-container>
  <v-form v-model="valid" style="margin-top:0">
    <v-container>
      <v-row>
        <v-col cols="4" lg="4"></v-col>
        <v-col cols="4" lg="4">
          <img alt="Vue logo" cols="4" lg="4" src="@/assets/create.png" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" lg="4"></v-col>
        <v-col cols="4" lg="4">
          <v-input label="Name:">{{customer.customer_name}}</v-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" lg="4"></v-col>
        <v-col cols="4" lg="4">
          <v-input label="Sex:">{{customer.sex}}</v-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" lg="4"></v-col>
        <v-col cols="4" lg="4">
          <v-input label="Age:">{{customer.age}}</v-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" lg="4"></v-col>
        <v-col cols="4" lg="4">
          <v-input label="Address:">{{customer.address}}</v-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" lg="3"></v-col>
        <v-col cols="6" lg="6" style="margin: auto;">
          <v-row>
            <v-col cols="4" lg="4" style="padding-right:10;">
              <v-btn class="ma-2" outlined normal fab color="indigo" v-on:click="deleteCustomer">
                <span class="v-btn__content">
                  <img src="@/assets/delete.png" />
                </span>
              </v-btn>
            </v-col>
            <v-col cols="4" lg="4">
              <v-btn class="ma-2" outlined normal fab color="indigo" v-on:click="updateCustomer">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-col>
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

    <v-container>
      <div class="text-center">
        <v-dialog v-model="dialog" persistent width="500" style="display:unset;">
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>Xóa?</v-card-title>
            <v-card-text>
              Bạn muốn xóa Customer này?
            </v-card-text>
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="handleDelete">Xóa</v-btn>
              <v-btn color="primary" text @click="handleNotDelete">Không</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-container>
    </v-container>
</template>

<script>
export default {
  name: "Detail",
  data: () => ({
    customer: null,
    dialog: false
  }),
  methods: {
    updateCustomer: function() {
      this.$router.push({ 
          name: "update",
          params: { 
            customerCode: this.customer.customer_code,
            customerName: this.customer.customer_name,
            sex: this.customer.sex,
            age: this.customer.age,
            address: this.customer.address,
            }
        });
    },
    listCustomer: function() {
      this.$router.push({ name: "home" });
    },
    deleteCustomer: function() {
      this.dialog = true;
    },
    handleDelete: function() {
      this.$axios
      .delete(`http://localhost:8080/customer/` + this.$props.customerCode, {
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(() => {
        this.$router.push({ name: "home"});
      })
      .catch(e => {
        this.errors.push(e);
        // Todo redirect to error screen
      });
    },
    handleNotDelete: function() {
      this.dialog = false;
    }
  },
  props: {
    customerCode: {
      type: String,
      required: true,
      default: "hello"
    }
  },
  mounted() {
    this.$axios
      .get(`http://localhost:8080/customer/` + this.$props.customerCode, {
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(response => {
        this.customer = response.data;
        console.log(response);
      })
      .catch(e => {
        this.errors.push(e);
      });
  }
};
import "@/assets/styles/style.css";
</script>
