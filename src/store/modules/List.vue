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
      <v-col cols="4" lg="4"></v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="customers"
      class="elevation-1"
      hide-default-footer
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
    <paginate :page="currentPage" :last="lastPage" v-on:childToParent="setDataFromChild" />
    <v-row></v-row>
  </v-container>
</template>
<script>
import Vue from "vue";
import paginate from "@/store/modules/paginate.vue";
import ApiService from "@/common/api.service";
export default {
  components: {
    paginate
  },
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
    lastPage: null,
    currentPage: 0
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
    },
    getList: function() {
      var pageSize = 3;
      ApiService.setHeader();
      ApiService.get(`customer`,
          {
            params: {
              size: pageSize,
              page: 0
            }
          }
        )
        .then(response => {
          var customerTemp = response.data.customers;
          for (let index = 0; index < customerTemp.length; index++) {
            Vue.set(customerTemp[index], "no", index + 1);
          }
          this.customers = customerTemp;
          this.lastPage = response.data.last_page;
          this.currentPage = response.data.current_page;
        })
        .catch(e => {
          
          this.$router.push({
            name: "error",
            params: { status: e.response.status }
          });
        });
    },
    setDataFromChild(value) {
      this.customers = value;
    }
  },
  mounted() {
    if (!this.currentToken) {
      this.$router.push({ name: "login" });
    }
    this.getList();
  },
  computed: {
    currentToken() {
      return this.$store.state.auth.token;
    }
  }
};
</script>
