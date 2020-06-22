<template>
  <div class="text-center">
    <v-pagination v-model="pagination" :length="lastPage" class="my-4" :total-visible="8"></v-pagination>
  </div>
</template>
<script>
import Vue from "vue";
import ApiService from "@/common/api.service";
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
      handler(newVal) {
        this.paginatePage(newVal);
      }
    }
  },
  computed: {
    lastPage: {
      get() {
        return this.$props.last + 1;
      }
    }
  },
  methods: {
    paginatePage(pageNumber) {
      if (!this.$store.state.auth.token) {
        console.log(this.$store.state.auth.token);
        this.$router.push({ name: "login" });
      }
      var pageSize = 3;
      ApiService.get(`customer`,
          {
            params: {
              size: pageSize,
              page: pageNumber - 1
            }
          }
        )
        .then(response => {
          var customerTemp = response.data;
          var recordIndex = (pageNumber - 1) * pageSize;
          for (let index = 0; index < customerTemp.customers.length; index++) {
            Vue.set(
              customerTemp.customers[index],
              "no",
              recordIndex + index + 1
            );
          }
          this.$emit("childToParent", customerTemp.customers);
        })
        .catch(e => {
          this.$router.push({
            name: "error",
            params: { status: e.response.status }
          });
        });
    }
  },
  mounted() {
    if (!this.$store.state.auth.token) {
      this.$router.push({ name: "login" });
    }
  }
};
</script>