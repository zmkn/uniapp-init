<template>
  <view class="content">
    <view class="text-container">
      <text class="title">{{ title }}</text>
    </view>
    <view class="button-container">
      <button type="primary" @click="testAsyncMethod()">测试异步方法</button>
      <button type="primary" @click="testSyncMethod()">测试同步方法</button>
      <button type="primary" @click="gotoNativePage()">跳转原生Activity</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
const title = ref("首页");

function testAsyncMethod() {
  // #ifdef APP-PLUS
  const testModule = uni.requireNativePlugin('TestModule');
  testModule.testAsyncFunc({
    'name': 'unimp',
    'age': 1
  },
    (responses: any) => {
      uni.showToast({
        title: JSON.stringify(responses),
        duration: 5000
      })
    })
  // #endif
}

function testSyncMethod() {
  // #ifdef APP-PLUS
  const testModule = uni.requireNativePlugin('TestModule');
  var responses = testModule.testSyncFunc({
    'name': 'unimp',
    'age': 1
  })
  uni.showToast({
    title: JSON.stringify(responses),
    duration: 5000
  })
  // #endif
}

function gotoNativePage() {
  // #ifdef APP-PLUS
  const testModule = uni.requireNativePlugin('TestModule');
  testModule.gotoNativePage();
  // #endif
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.text-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  :deep(uni-button) {
    margin: 20rpx;
  }
}

.title {
  font-size: 24rpx;
  color: #8f8f94;
}
</style>
