<template>
  <div class="text-center">
    <v-pagination v-model="pagination" :length="lastPage" class="my-4" :total-visible="4" circle></v-pagination>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  data: () => ({
    pagination: null
  }),
  props: {
    page: {
      type: Number,
      default: 0
    },
    last: {
      type: Number,
      default: 6
    }
  },
  watch: {
    pagination: {
      handler(newVal, oldVal) {
        if (newVal != oldVal) {
          this.paginatePage(newVal);
        }
      }
    }
  },
  computed: {
    lastPage: {
      get() {
        if (this.$props.last < 6) {
          return this.$props.last + 1;
        } else {
          return 6;
        }
      }
    }
  },
  methods: {
    paginatePage(pageNumber) {
      var pageSize = 3;
      this.$axios
        .get(
          `http://localhost:8080/customer`,
          {
            params: {
              size: pageSize,
              page: pageNumber - 1
            }
          },
          {
            headers: {
              "Content-type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
          }
        )
        .then(response => {
          var customerTemp = response.data;
          var recordIndex = (pageNumber - 1) * pageSize;
          for (let index = 0; index < customerTemp.customers.length; index++) {
            Vue.set(customerTemp.customers[index], "no", recordIndex + index + 1);
          }
          this.$emit("childToParent", customerTemp.customers);
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  }
};
</script>