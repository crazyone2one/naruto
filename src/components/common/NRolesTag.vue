<script setup lang="ts">
interface Props {
  type?: string
  roles: [any]
  effect?: string
}
withDefaults(defineProps<Props>(), {
  type: 'primary',
  effect: 'dark'
})
</script>
<template>
  <div>
    <span v-for="(role, index) in roles" :key="index">
      <el-tag :type="type" :effect="effect" color="" size="small">{{ role.name }}</el-tag>
      <br />
    </span>
  </div>
</template>
<style scoped lang="scss"></style>
