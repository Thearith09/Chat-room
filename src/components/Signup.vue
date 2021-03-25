<template>
  <div class="relative">
    <div v-if="isPending" class="absolute">
      <Spinner />
    </div>
    <form @submit.prevent="handleSubmit">
      <input
        type="text"
        required
        placeholder="Display name"
        v-model="displayName"
      />
      <input type="text" required placeholder="Email" v-model="email" />
      <input
        type="password"
        required
        placeholder="Password"
        v-model="password"
      />
      <div class="error">{{ error }}</div>
      <button>Sing up</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import useSignup from "../composables/useSignup";
import { useRouter } from "vue-router";
import Spinner from "./Spinner";

export default {
  components: {
    Spinner,
  },
  setup(props, context) {
    const isPending = ref(false);
    const displayName = ref("");
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const { signup, error } = useSignup();

    const handleSubmit = async () => {
      isPending.value = true;
      await signup(email.value, password.value, displayName.value);

      if (!error.value) {
        console.log("A user entered chat room");
        router.push({ name: "Chatroom" });
      }

      isPending.value = false;
    };

    return { displayName, email, password, handleSubmit, error, isPending };
  },
};
</script>

<style scoped>
.relative {
  position: relative;
}
.absolute {
  position: absolute;
  top: 17%;
  left: 48%;
}
</style>
