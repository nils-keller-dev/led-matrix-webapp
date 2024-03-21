import { useSignal } from "@preact/signals";
import { ArrowLeft, ArrowRight, Settings2 } from "lucide-preact";
import { IconButton } from "../components/IconButton.tsx";
import { h } from "preact";

interface CarouselItem {
  title: string;
  hasSettingsIcon: boolean;
}

interface CarouselProps {
  items: CarouselItem[];
  onClickSettings?: () => void;
}

export function Carousel({
  items,
  onClickSettings,
}: CarouselProps) {
  const activeItem = useSignal(0);

  const nextItem = () => {
    activeItem.value = (activeItem.value + 1) % items.length;
  };

  const previousItem = () => {
    activeItem.value = (activeItem.value - 1 + items.length) % items.length;
  };

  return (
    <div className="w-full p-7 aspect-square">
      <div className="text-7xl font-abril size-full  border border-secondary rounded-3xl flex items-center justify-center relative">
        {items[activeItem.value].title}
        <IconButton
          className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2"
          onClick={previousItem}
        >
          <ArrowLeft />
        </IconButton>
        <IconButton
          className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2"
          onClick={nextItem}
        >
          <ArrowRight />
        </IconButton>
        {items[activeItem.value].hasSettingsIcon && (
          <IconButton
            className="absolute top-2 right-2"
            onClick={onClickSettings}
          >
            <Settings2 />
          </IconButton>
        )}
      </div>
      <div className="flex justify-center gap-1 mt-2">
        {items.map((_, index) => (
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
