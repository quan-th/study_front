<template>
  <v-container>
    <v-row>
      <v-col cols="4" lg="4" style="margin: auto;">
        <v-btn class="ma-2" outlined large fab color="indigo" v-on:click="createCustomer">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="4" lg="4">
        <img alt="Vue logo" cols="4" lg="4" src="@/assets/list.png" />
      </v-col>
      <v-col cols="4" lg="4"></v-col>>
    </v-row>
    <v-app>
      <v-data-table
        :headers="headers"
        :items="customers"
        :items-per-page="5"
        class="elevation-1"
        hide-default-footer
        :pagination.sync="pagination"
        show-select
        @click:row="detail"
      >
        <template slot="items" slot-scope="props">
          <v-row v-on:click="detail(props.item)">
            <td class="text-xs-right">{{ props.item.no }}</td>
            <td class="text-xs-right">{{ props.item.customer_name }}</td>
            <td class="text-xs-right">{{ props.item.sex }}</td>
            <td class="text-xs-right">{{ props.item.age }}</td>
            <td class="text-xs-right">{{ props.item.address }}</td>
          </v-row>
          <!-- </router-link> -->
        </template>
      </v-data-table>
    </v-app>
    <v-row></v-row>
  </v-container>
</template>
<script>
import Vue from "vue";
export default {
  data: () => ({
    customerCode: null,
    headers: [
      {
        text: "No",
        value: "no",
        align: "start",
        sortable: false
      },
      {
        text: "Name",
        value: "customer_name",
        align: "start",
        sortable: false
      },
      {
        text: "Sex",
        value: "sex",
        align: "start",
        sortable: false
      },
      {
        text: "Age",
        value: "age",
        align: "start",
        sortable: false
      },
      {
        text: "Address",
        value: "address",
        align: "start",
        sortable: false
      }
    ],
    customers: [],
    dialog: false,
    pagination: {
      page: 2,
      itemsPerPage: 5,
      pageStart: 1,
      pageStop: 2
    }
  }),
  methods: {
    createCustomer: function() {
      this.$router.push({ name: "create" });
    },
    detail: function(customer) {
      this.$router.push({
        name: "detail",
        params: { customerCode: customer.customer_code }
      });
    }
  },
  mounted() {
    this.$axios
      .get(`http://localhost:8080/customer`, {
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(response => {
        var customerTemp = response.data;
        for (let index = 0; index < customerTemp.length; index++) {
          Vue.set(customerTemp[index], "no", index + 1);
        }
        this.customers = customerTemp;
        console.log(customerTemp);
      })
      .catch(e => {
        this.errors.push(e);
      });
  }
};
</script>
