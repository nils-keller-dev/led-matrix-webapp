import { ArrowLeft, ArrowRight } from "https://esm.sh/lucide-preact";
import { IconButton } from "../components/IconButton.tsx";
import { Settings2 } from "https://esm.sh/lucide-preact";

export function Carousel() {
  return (
    <div class="w-full p-7 aspect-square">
      <div class="text-7xl font-abril size-full  border border-secondary rounded-3xl flex items-center justify-center relative">
        Clock
        <IconButton class="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2">
          <ArrowLeft />
        </IconButton>
        <IconButton class="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
          <ArrowRight />
        </IconButton>
        <IconButton class="absolute top-2 right-2">
          <Settings2 />
        </IconButton>
      </div>
    </div>
  );
}
