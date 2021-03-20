<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" required placeholder="Email" v-model="email" />
    <input type="password" required placeholder="Password" v-model="password" />
    <div class="error">{{ error }}</div>
    <button>Log in</button>
  </form>
</template>

<script>
import { ref } from "vue";
import useLogin from "../composables/useLogin";
import { useRouter } from "vue-router";

export default {
  setup(props, context) {
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const { error, login } = useLogin();

    const handleSubmit = async () => {
      await login(email.value, password.value);

      if (!error.value) {
        console.log("A user entered chat room");
        router.push({ name: "Chatroom" });
      }
    };

    return { email, password, handleSubmit, error };
  },
};
</script>

<style></style>
