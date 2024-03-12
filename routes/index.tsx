import { useSignal } from "@preact/signals";
import { Slider } from "../islands/Slider.tsx";

export default function Home() {
  const count = useSignal(3);

  const handleSliderChange = (newValue: number) => {
    console.log("Slider value:", newValue);
  };

  return (
    <div class="px-4 py-8 mx-auto bg-background text-primary">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold">Welcome to Fresh</h1>
        <p class="my-4">
          Try updating this message in the
          <code class="mx-2">./routes/index.tsx</code> file, and refresh.
        </p>
        <Slider
          min={0}
          max={100}
          onChange={handleSliderChange}
        >
        </Slider>
      </div>
    </div>
  );
}
