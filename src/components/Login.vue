<template>
  <div class="relative">
    <div v-if="isPending" class="absolute">
      <Spinner />
    </div>
    <form @submit.prevent="handleSubmit">
      <input type="text" required placeholder="Email" v-model="email" />
      <input
        type="password"
        required
        placeholder="Password"
        v-model="password"
      />
      <div class="error">{{ error }}</div>
      <button>Log in</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import useLogin from "../composables/useLogin";
import { useRouter } from "vue-router";
import Spinner from "./Spinner";

export default {
  components: {
    Spinner,
  },
  setup(props, context) {
    const isPending = ref(false);
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const { error, login } = useLogin();

    const handleSubmit = async () => {
      isPending.value = true;
      await login(email.value, password.value);

      if (!error.value) {
        console.log("A user entered chat room");
        router.push({ name: "Chatroom" });
      }
      isPending.value = false;
    };

    return { email, password, handleSubmit, error, isPending };
  },
};
</script>

<style scoped>
.relative {
  position: relative;
}
.absolute {
  position: absolute;
  top: 3%;
  left: 48%;
}
</style>
