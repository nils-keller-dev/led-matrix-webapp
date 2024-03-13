import { useSignal } from "@preact/signals";
import { ArrowLeft, ArrowRight, Settings2 } from "https://esm.sh/lucide-preact";
import { IconButton } from "../components/IconButton.tsx";

interface CarouselItem {
  title: string;
  hasSettingsIcon: boolean;
}

interface CarouselProps {
  items: CarouselItem[];
}

export function Carousel({
  items,
}: CarouselProps) {
  const activeItem = useSignal(0);

  const nextItem = () => {
    activeItem.value = (activeItem.value + 1) % items.length;
  };

  const previousItem = () => {
    activeItem.value = (activeItem.value - 1 + items.length) % items.length;
  };

  return (
    <div class="w-full p-7 aspect-square">
      <div class="text-7xl font-abril size-full  border border-secondary rounded-3xl flex items-center justify-center relative">
        {items[activeItem.value].title}
        <IconButton
          class="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2"
          onClick={previousItem}
        >
          <ArrowLeft />
        </IconButton>
        <IconButton
          class="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2"
          onClick={nextItem}
        >
          <ArrowRight />
        </IconButton>
        {items[activeItem.value].hasSettingsIcon && (
          <IconButton class="absolute top-2 right-2">
            <Settings2 />
          </IconButton>
        )}
      </div>
      <div class="flex justify-center gap-1 mt-2">
        {items.map((item, index) => (
          <div
            class={`size-2 rounded-full ${
              index === activeItem.value
                ? "bg-muted-foreground"
                : "bg-secondary"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
