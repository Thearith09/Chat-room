<template>
  <form @submit.prevent="handleSubmit">
    <input
      type="text"
      required
      placeholder="Display name"
      v-model="displayName"
    />
    <input type="text" required placeholder="Email" v-model="email" />
    <input type="password" required placeholder="Password" v-model="password" />
    <div class="error">{{ error }}</div>
    <button>Sing up</button>
  </form>
</template>

<script>
import { ref } from "vue";
import useSignup from "../composables/useSignup";
import { useRouter } from "vue-router";

export default {
  setup(props, context) {
    const displayName = ref("");
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const { signup, error } = useSignup();

    const handleSubmit = async () => {
      await signup(email.value, password.value, displayName.value);

      if (!error.value) {
        console.log("A user entered chat room");
        router.push({ name: "Chatroom" });
      }
    };

    return { displayName, email, password, handleSubmit, error };
  },
};
</script>
