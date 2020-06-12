export default {
    data: () => ({
      valid: false,
      name: "",
      nameRules: [
        v => !!v || "Name is required",
        v => v.length <= 10 || "Name must be less than 10 characters"
      ],
      age: "",
      ageRules: [a => (a > 0 && a <= 100) || "Age must be between 0 and 100"],
      postBody: ""
    }),
    methods: {
      submit: function() {
        alert(this.$refs.codeField.value);
        //   this.$router.push("/customer");
      },
      rndStr: function(len) {
        let text = "";
        let chars = "abcdefghijklmnopqrstuvwxyz";
  
        for (let i = 0; i < len; i++) {
          text += chars.charAt(Math.floor(Math.random() * chars.length));
        }
  
        return text;
      },
      createCustomer: function() {
        this.$axios
          .post(
            `http://localhost:8080/customer`,
            {
              customer_code: this.rndStr(127),
              customer_name: this.name,
              sex: this.sex,
              age: this.age,
              address: this.address
            },
            {
              headers: {
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "DELETE, POST, GET, PUT",
                "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
              }
            }
          )
          .then(response => {
            console.log(response);
          })
          .catch(e => {
            this.errors.push(e);
          });
      }
    },
    computed: {
      rndCode() {
        return this.rndStr(10);
      }
    }
  };
  
