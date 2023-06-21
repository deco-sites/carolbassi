import Slider from "deco-sites/fashion/components/ui/Slider.tsx";
import SliderJS from "deco-sites/fashion/islands/SliderJS.tsx";
import type { HTML } from "deco-sites/std/components/types.ts";
import Quilltext from "deco-sites/std/components/QuillText.tsx";
import { useId } from "preact/hooks";

export interface Props {
  alerts: HTML[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
  /**
   * @format color
   * @description Alerts bar background color
   * @default #c4c4c4
   */
  backgroundColor: string;
}

function Alerts(
  { alerts = [], interval = 5, backgroundColor = "#c4c4c4" }: Props,
) {
  const id = useId();

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          #${id} .ql-editor {
            width: 100%;
          }`,
        }}
      />
      <div
        class="py-[5px] hidden lg:block"
        style={{ backgroundColor: backgroundColor }}
        id={id}
      >
        <Slider class="carousel carousel-center gap-6 scrollbar-none">
          {alerts.map((alert, index) => (
            <Slider.Item index={index} class="carousel-item w-full">
              <Quilltext html={alert} />
            </Slider.Item>
          ))}
        </Slider>

        <SliderJS rootId={id} interval={interval && interval * 1e3} />
      </div>
    </>
  );
}

export default Alerts;
