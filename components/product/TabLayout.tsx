import { useState } from "preact/compat";

interface Props {
  description: string;
  characteristics: string;
}

function TabLayout({ description, characteristics }: Props) {
  const [activeTab, setActiveTab] = useState("tab1");
  const formattedCharacteristics = characteristics.split("\r\n");
  function productDescription() {
    return (
      <div class="mt-4">
        <span class="text-sm text-primary font-light tracking-[.02em]">
          {description && (
            <div class="w-[90%] ml-[-4px] sm:ml-[9px]">{description}</div>
          )}
        </span>
      </div>
    );
  }

  function productCharacteristics() {
    return (
      <div class="mt-4">
        <ul class="pl-[27px]">
          {formattedCharacteristics.map((characteristic) => (
            <li class="list-disc marker:text-info">
              {characteristic}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const activeTabStyles = "";
  const deactiveTabStyles = "";

  const handleTab1 = () => {
    setActiveTab("tab1");
  };

  const handleTab2 = () => {
    setActiveTab("tab2");
  };

  return (
    <div class="">
      <ul class="cursor-pointer relative mx-2 mt-[30px] flex sm:flex-col md:flex-row justify-between text-xl md:text-2xl text-primary border-b-2 border-b-[rgba(0,0,0,.3)] border-b-solid">
        <li
          class={`${
            activeTab === "tab1" ? activeTabStyles : deactiveTabStyles
          } py-[6px] relative`}
          onClick={handleTab1}
        >
          Características
          {activeTab === "tab1"
            ? (
              <div
                class={`absolute border-b-2 border-b-primary border-b-solid bottom-0 w-full translate-y-[50%]`}
              >
              </div>
            )
            : ""}
        </li>
        <li
          class={`${
            activeTab === "tab2" ? activeTabStyles : deactiveTabStyles
          } py-[6px] relative`}
          onClick={handleTab2}
        >
          Descrição
          {activeTab === "tab2"
            ? (
              <div
                class={`absolute border-b-2 border-b-primary border-b-solid bottom-0 w-full translate-y-[50%]`}
              >
              </div>
            )
            : ""}
        </li>
      </ul>
      <div>
        {activeTab === "tab1" ? productCharacteristics() : productDescription()}
      </div>
    </div>
  );
}

export default TabLayout;
