<template>
  <div class="chat-window">
    <div v-if="error" class="error">{{ error }}</div>
    <div v-else class="messages">
      <div class="single" v-for="document in documents" :key="document.id">
        <span class="created-at">{{ document.createdAt }}</span>
        <span class="name">{{ document.name }}</span>
        <span class="message">{{ document.message }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import getCollection from "../composables/getCollection";
export default {
  setup() {
    const { error, documents } = getCollection("messages");

    return { error, documents };
  },
};
</script>

<style></style>
