<template>
  <div class="chat-window">
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="documents" class="messages" ref="messages">
      <div
        class="single"
        v-for="document in formattedDocuments"
        :key="document.id"
      >
        <div
          class="p-1 max-w-xs bg-white rounded-xl shadow-md flex items-center space-x-4"
        >
          <div class="flex-shrink-0">
            <svg
              class="w-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="break-all">
            <div class="text-xl font-medium text-blue-600">
              {{ document.user }}
            </div>
            <p class="text-gray-500">
              {{ document.message }}
            </p>
          </div>
        </div>
        <span class="created-at">{{ document.createdAt }}</span>
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
/*.name {
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
} */
</style>
