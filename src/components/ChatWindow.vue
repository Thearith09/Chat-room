<template>
  <div class="chat-window">
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="documents" class="messages" ref="messages">
      <div
        class="single"
        v-for="document in formattedDocuments"
        :key="document.id"
      >
        <span class="created-at">{{ document.createdAt }}</span>
        <span class="name">{{ document.user }}</span>
        <span class="message">{{ document.message }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import getCollection from "../composables/getCollection";
import moment from "moment";
import { computed, ref, onUpdated } from "vue";

export default {
  setup() {
    const { error, documents } = getCollection("messages");

    const formattedDocuments = computed(() => {
      if (documents.value) {
        return documents.value.map((doc) => {
          let time = moment(doc.createdAt.toDate()).fromNow();
          return { ...doc, createdAt: time };
        });
      }
    });

    //auto-scroll to bottom of messages
    const messages = ref(null);
    onUpdated(() => {
      messages.value.scrollTop = messages.value.scrollHeight;
    });

    return { error, documents, formattedDocuments, messages };
  },
};
</script>

<style>
.chat-window {
  background: #fafafa;
  padding: 30px 20px;
  text-align: left;
}
.single {
  margin: 18px 0;
}
.created-at {
  display: block;
  color: #999;
  font-size: 12px;
  margin-bottom: 7px;
}
.name {
  font-weight: bold;
  font-size: 16px;
  color: rgb(1, 5, 219);
  margin-right: 6px;
  background: #ededf3;
  border-radius: 20px;
  padding: 7px;
}
.messages {
  max-height: 400px;
  overflow: auto;
}
</style>
