<template>
  <div class="welcome container">
    <h1>Welcome To Our Chat Room</h1>
    <div v-if="showLoginForm">
      <h2>Log in</h2>
      <Login />
      <p>No account yet? <span @click="showLoginForm = false">Signup</span></p>
    </div>
    <div v-else>
      <h2>Sing up</h2>
      <Signup />
      <p>
        Already registered? <span @click="showLoginForm = true">Login</span>
      </p>
    </div>
  </div>
</template>

<script>
import Signup from "../components/Signup";
import Login from "../components/Login";
import { ref } from "vue";
export default {
  name: "Home",
  components: {
    Signup,
    Login,
  },
  setup() {
    const showLoginForm = ref(true);

    return { showLoginForm };
  },
};
</script>

<style>
.welcome {
  text-align: center;
  padding: 20px 0;
}
.welcome h1 {
  font-weight: bold;
  font-size: 30px;
  text-transform: uppercase;
}
.welcome h2 {
  font-weight: bold;
  font-size: 25px;
}
/* form style */
.welcome form {
  width: 300px;
  margin: 20px auto;
}
.welcome label {
  display: block;
  margin: 20px 0 10px;
}
.welcome input {
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #eee;
  outline: none;
  color: #999;
  margin: 10px auto;
}
.welcome span {
  text-decoration: underline;
  font-weight: bold;
  cursor: pointer;
}
.welcome button {
  margin: 20px auto;
}
</style>
