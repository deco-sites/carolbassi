import { useMemo } from "preact/hooks";

const useTerm = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(window.location?.search);
    return urlSearchParams.get("q") ?? "";
  }, []);

function NotFound() {
  const term = useTerm();

  return (
    <div class="container px-16 w-full flex flex-col justify-center items-center py-10 gap-[10px]">
      <div class="font-bold text-5xl text-warning">OOPS!</div>
      <div class="flex flex-col">
        <span class="text-base font-bold text-secondary-content">
          Não encontramos nenhum resultado para{" "}
          <span class="text-primary font-normal">"{term}"</span>
        </span>
        <span>O que eu faço?</span>
        <ul class="list-disc list-outside marker:text-info">
          <li>Verifique os termos digitados.</li>
          <li>Tente utilizar uma única palavra.</li>
          <li>Utilize termos genéricos na busca.</li>
          <li>Procure utilizar sinônimos ao termo desejado.</li>
        </ul>
      </div>
    </div>
  );
}

export default NotFound;
