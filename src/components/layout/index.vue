<script setup lang="ts">
import MenuAside from '@/components/layout/menu/index.vue'
import HeaderMenu from '@/components/layout/header/index.vue'
</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <menu-aside />
      </el-aside>
      <el-container>
        <el-header>
          <header-menu />
        </el-header>
        <el-main>
          <section class="main-box">
            <router-view v-slot="{ Component }">
              <transition name="fade">
                <component :is="Component" />
              </transition>
            </router-view>
          </section>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style scoped lang="scss">
.el-container {
  display: flex;
  width: 100%;
  min-width: 970px;
  height: 100%;
  .el-aside {
    width: auto;
    overflow: inherit;
  }
  .el-header,
  .el-footer {
    height: auto;
    padding: 0;
  }
  .el-main {
    box-sizing: border-box;
    padding: 8px 8px;

    /* 防止切换出现横向滚动条 */
    overflow-x: hidden;
    background: #f0f2f5;
    .main-box {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 10px;
      overflow: auto;
      overflow-x: hidden !important;
      background-color: #ffffff;
      border-radius: 4px;
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
      &::-webkit-scrollbar {
        background-color: white;
      }
    }
  }
}
</style>
