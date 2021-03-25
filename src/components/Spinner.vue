<template>
  <div class="spin"></div>
</template>

<script>
export default {};
</script>

<style>
.spin {
  display: block;
  width: 40px;
  height: 40px;
  margin: 30px auto;
  border: 4px solid transparent;
  border-radius: 50%;
  border-top-color: rgb(166, 166, 168);
  animation: spin 0.9s ease-in-out infinite;
}
@keyframes spin {
  to {
    transform: rotateZ(360deg);
  }
}
</style>
