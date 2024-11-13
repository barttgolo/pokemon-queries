// import { Pokemon } from "@/components/pokemon";

export const App = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col gap-4 items-center justify-center">
      {/* <Pokemon /> */}
      <a href="jutro://Tabs/HomeTabs" target="_blank">
        Deeplink: "jutro://Tabs/HomeTabs"
      </a>

      <a
        href="intent://Tabs/HomeTabs;scheme=jutro;package=com.jutro.jutro;end"
        target="_blank"
      >
        Deeplink:
        "intent://Tabs/HomeTabs;scheme=jutro;package=com.jutro.jutro;end"
      </a>

      <a
        href="intent://Tabs/HomeTabs;scheme=jutro;package=com.jutro;end"
        target="_blank"
      >
        Deeplink: "intent://Tabs/HomeTabs;scheme=jutro;package=com.jutro;end"
      </a>
    </div>
  );
};
