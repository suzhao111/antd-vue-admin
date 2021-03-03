<template>
  <div>
    <p>测试页面</p>
    <div>
      <a-date-picker @change="onChange" />
      <a-month-picker @change="onChange" />
      <a-range-picker @change="onChange" />
      <a-week-picker @change="onChange" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
