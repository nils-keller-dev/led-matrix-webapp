import { useSignal } from "@preact/signals";
import { Sun, SunDim } from "https://esm.sh/lucide-preact";
import { Carousel } from "../islands/Carousel.tsx";
import { Drawer } from "../islands/Drawer.tsx";
import { Slider } from "../islands/Slider.tsx";

export default function Home() {
  const carouselItems = [
    {
      title: "Clock",
      hasSettingsIcon: true,
    },
    {
      title: "Music",
      hasSettingsIcon: false,
    },
    {
      title: "Image",
      hasSettingsIcon: true,
    },
    {
      title: "Text",
      hasSettingsIcon: true,
    },
    {
      title: "Idle",
      hasSettingsIcon: false,
    },
  ];

  const isDrawerOpen = useSignal(false);

  const onClickCarouselSettings = () => {
    isDrawerOpen.value = true;
  };

  const onChangeIsDrawerExpanded = (isExpanded: boolean) => {
    isDrawerOpen.value = isExpanded;
  };

  return (
    <div class="bg-background text-primary h-full flex items-center">
      <Carousel
        items={carouselItems}
        onClickSettings={onClickCarouselSettings}
      />
      <Drawer
        header={
          <div class="flex gap-3 flex-row">
            <SunDim class="text-muted-foreground shrink-0" />
            <Slider
              min={0}
              max={100}
            />
            <Sun class="text-muted-foreground shrink-0" />
          </div>
        }
        isExpanded={isDrawerOpen.value}
        onChangeIsExpanded={onChangeIsDrawerExpanded}
      >
        <div class="h-[100px] flex items-end justify-center text-muted-foreground">
          Hier könnte Ihre Werbung stehen
        </div>
      </Drawer>
    </div>
  );
}
