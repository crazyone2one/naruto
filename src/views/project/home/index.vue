<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'

type firdType = { grid: string; num: number }
const gridLists = ref<Array<firdType>>([
  { grid: 'cn', num: 1 },
  { grid: 'cn', num: 2 },
  { grid: 'cn', num: 3 },
  { grid: 'cn', num: 4 },
  { grid: 'cn', num: 5 },
  { grid: 'cn', num: 6 },
  { grid: 'cn', num: 7 },
  { grid: 'cn', num: 8 },
  { grid: 'cn', num: 9 }
])
const getEend = (e: any) => {
  console.log(e)
}
</script>
<template>
  <div class="drag-container">
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <template #header>
        <div>
          <span>grid列表拖拽</span>
        </div>
      </template>
      <!-- card body -->
      <draggable v-model="gridLists" item-key="id" animation="300" @change="getEend">
        <template #item="{ element }">
          <div :class="'item' + ' ' + 'item-' + element.num">
            {{ element.num }}
          </div>
        </template>
      </draggable>
    </el-card>
  </div>
</template>
<style scoped lang="scss"></style>
