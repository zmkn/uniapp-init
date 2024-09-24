import { Navigation } from "@/services/navigation";
import { onBackPress as _onBackPress } from "@dcloudio/uni-app";

declare const UniViewJSBridge: any;

export function onBackPress(
  hook: (options: Page.BackPressOption) => boolean = () => false
) {
  _onBackPress((options: Page.BackPressOption) => {
    // #ifdef APP-PLUS
    const from = options.from;
    if (from === "backbutton") {
      const navigation = Navigation.getInstance();
      const pages = navigation.getPages();
      if (pages.length > 1) {
        const route = pages[pages.length - 2].route;
        if (route !== "pages/transit/index") {
          return false;
        }
      }
      plus.runtime.quit();
      // 返回 true 阻止默认行为
      return true;
    }
    // #endif
    return hook(options);
  });
}
