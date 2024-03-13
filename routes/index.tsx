import { Sun, SunDim } from "https://esm.sh/lucide-preact";
import { Carousel } from "../islands/Carousel.tsx";
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

  return (
    <div class="bg-background text-primary h-full flex items-center">
      <Carousel items={carouselItems} />
      <div class="w-full p-7 pt-4 rounded-t-xl border border-secondary border-b-0 fixed bottom-0 bg-background">
        <div class="bg-secondary w-24 h-2 rounded-full mx-auto mb-7" />
        <span class="flex gap-3 flex-row">
          <SunDim class="text-muted-foreground shrink-0" />
          <Slider
            min={0}
            max={100}
          />
          <Sun class="text-muted-foreground shrink-0" />
        </span>
      </div>
    </div>
  );
}
