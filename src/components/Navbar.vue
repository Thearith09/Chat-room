<template>
  <nav v-if="user">
    <div>
      <p class="displayName">Hey there, {{ user.displayName }}</p>
      <p class="email">Currently logged in as {{ user.email }}</p>
    </div>
    <button @click="handleLogout">Logout</button>
  </nav>
</template>

<script>
import useLogout from "../composables/logout";
import { useRouter } from "vue-router";
import getUser from "../composables/getUser";

export default {
  setup() {
    const { error, logout } = useLogout();
    const router = useRouter();
    const { user } = getUser();

    const handleLogout = async () => {
      await logout();
      router.push({ name: "Welcome" });
    };

    return { error, handleLogout, user };
  },
};
</script>

<style>
.displayName {
  color: rgb(1, 5, 219);
  font-weight: bold;
}
</style>
