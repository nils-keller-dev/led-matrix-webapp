import { Sun, SunDim } from "https://esm.sh/lucide-preact";
import { Slider } from "../islands/Slider.tsx";

export default function Home() {
  const handleSliderChange = (newValue: number) => {
    console.log("Slider value:", newValue);
  };

  return (
    <div class="bg-background text-primary h-full flex items-end">
      <div class="w-full p-7 pt-4 rounded-t-xl border border-secondary border-b-0">
        <div class="bg-secondary w-24 h-2 rounded-full mx-auto mb-7" />
        <span class="flex gap-3">
          <SunDim class="text-muted-foreground shrink-0" />
          <Slider
            min={0}
            max={100}
            onChange={handleSliderChange}
          />
          <Sun class="text-muted-foreground shrink-0" />
        </span>
      </div>
    </div>
  );
}
