<template>
  <div class="welcome container">
    <h1>Welcome To Our Chat Room</h1>
    <div v-if="showLoginForm">
      <h2>Log in</h2>
      <Login />
      <p>No account yet? <span @click="showLoginForm = false">Signup</span></p>
      <p>Login With</p>
      <img
        @click="loginWithGoogle"
        src="../../public/google.png"
        alt="facebook icon"
      />
      <img
        @click="loginWithFacebook"
        src="../../public/facebook.png"
        alt="google icon"
      />
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
import { useRouter } from "vue-router";
import { firebase } from "../firebase/config";
import useGoogleLogin from "../composables/useGoogleLogin";
import useFacebookLogin from "../composables/useFacebookLogin";

export default {
  name: "Home",
  components: {
    Signup,
    Login,
  },
  setup() {
    const router = useRouter();
    const showLoginForm = ref(true);

    const loginWithFacebook = async () => {
      const provider = new firebase.auth.FacebookAuthProvider();
      const { error, facebookLogin } = useFacebookLogin();
      await facebookLogin(provider);

      console.log(error.value);
      if (!error.value) {
        router.push({ name: "Chatroom" });
      }
    };

    const loginWithGoogle = async () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      const { error, googleLogin } = useGoogleLogin();
      await googleLogin(provider);

      if (!error.value) {
        router.push({ name: "Chatroom" });
      }
    };

    return { showLoginForm, loginWithGoogle, loginWithFacebook };
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
.welcome img {
  border: none;
  max-width: 30px;
  padding: 5px;
  cursor: pointer;
}
</style>
