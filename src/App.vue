<script setup lang="ts">
import { Navigation } from "@/services/navigation";
import { onHide, onLaunch, onShow } from "@dcloudio/uni-app";

const navigation = Navigation.getInstance();

onLaunch((options?: App.LaunchShowOption) => {
  console.log("App Launch");
  if (options) {
    console.log("App Launch Options", JSON.stringify(options));
    const referrerInfo = options.referrerInfo;
    if (referrerInfo) {
      const extraData = referrerInfo.extraData
      if (extraData) {
        const redirectPath = extraData.redirectPath
        if (redirectPath && redirectPath.trim()) {
          navigation.reLaunch(redirectPath.trim())
        }
      }
    }
  }
});
onShow((options?: App.LaunchShowOption) => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>

<style>
@import "./common/scss/base.scss";
</style>
