<template>
  <div class="container-fluid h-100">
    <div class="d-flex justify-content-center h-100 p-5">
      <div class="user_card px-5 py-4" style="background-color: #ffffff">
        <div class="d-flex justify-content-center pb-3">
          <div class="brand_logo_container">
            <img alt="Vue logo" src="../assets/logo.png" />
          </div>
        </div>
        <div class="d-flex justify-content-center pb-3">
          <h5>Please Sign In</h5>
        </div>

        <div class="d-flex justify-content-center form_container">
          <form @submit.prevent="sendToPrepPage">
            <div class="input-group mb-2">
              <div class="input-group-append">
                <span class="input-group-text">Username</span>
              </div>
              <input
                type="text"
                name="name"
                class="form-control input_user"
                placeholder="username"
                v-model="logindata.user"
              />
            </div>

            <div class="input-group mb-2">
              <div class="input-group-append">
                <span class="input-group-text">Password</span>
              </div>
              <input
                type="password"
                name="name"
                class="form-control input_pass"
                placeholder="password"
                v-model="logindata.password"
              />
            </div>
            
            <div class="input-group mb-1 text-danger">
              <small v-show="this.wrong">
                your username or password is incorrect
              </small>
            </div>
            <div class="d-flex justify-content-center mt-3 login_container">
              <button
                type="submit"
                name="button"
                class="btn-lg login_btn text-light"
                style="background-color: #58bcdd"
              >
                Enter Site
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import loginPageForm from '../components/loginPageForm.vue'

export default {
  name: "loginPage",
  data() {
    return {
      wrong: false,
      logindata: {},
    };
  },
  /*components: {
    loginPageForm
  },*/
  methods: {
    sendToPrepPage: function () {
      if (
        this.logindata.user == "kruyuan" &&
        this.logindata.password == "12345678"
      ) {
        this.$router.push("/faceReg");
      } else {
        this.wrong = true;
      }
    },
  },
};
</script>
