<script setup lang="ts">
interface Pageable {
  page: number
  limit: number
  total: number
}
interface PaginationProps {
  small?: boolean
  pageable: Pageable
  handleSizeChange: (size: number) => void
  handleCurrentChange: (currentPage: number) => void
}
withDefaults(defineProps<PaginationProps>(), {
  small: false
})
</script>
<template>
  <div>
    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageable.total"
      :small="small"
      :current-page="pageable.page"
      :page-size="pageable.limit"
      :page-sizes="[10, 25, 50, 100]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<style scoped lang="scss"></style>
