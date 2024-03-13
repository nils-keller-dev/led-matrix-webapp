import { JSX } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { useSignal } from "@preact/signals";

type DrawerProps = {
  children: JSX.Element;
  header: JSX.Element;
};

export function Drawer({ children, header }: DrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const hasCalculatedHeaderHeight = useSignal(false);
  const isExpanded = useSignal(false);

  const fullHeight = useSignal(0);
  const headerHeight = useSignal(0);

  useEffect(() => {
    if (!drawerRef.current) return;

    const height = drawerRef.current.clientHeight;

    if (!hasCalculatedHeaderHeight.value) {
      setDrawerHeight(height);
      headerHeight.value = height;
      hasCalculatedHeaderHeight.value = true;
    } else {
      fullHeight.value = height;
    }
  }, [hasCalculatedHeaderHeight.value]); // run again to calculate full height

  const onClick = () => {
    isExpanded.value = !isExpanded.value;

    const newHeight = isExpanded.value ? fullHeight.value : headerHeight.value;
    setDrawerHeight(newHeight);
  };

  const setDrawerHeight = (height: number) => {
    if (!drawerRef.current) return;

    drawerRef.current.style.setProperty(
      "--drawer-visible-height",
      `${height}px`,
    );
  };

  return (
    <div
      ref={drawerRef}
      onClick={onClick}
      class="w-full px-7 pt-4 pb-0 rounded-t-xl border border-secondary border-b-0 fixed top-full bg-background -translate-y-[--drawer-visible-height] transition-transform"
    >
      <div class="bg-secondary w-24 h-2 rounded-full mx-auto mb-7" />
      <div class="mb-7">
        {header}
      </div>
      <div class="mb-7">
        {hasCalculatedHeaderHeight.value && children}
      </div>
    </div>
  );
}
