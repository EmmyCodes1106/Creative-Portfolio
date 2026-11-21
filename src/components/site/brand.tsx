import Image from "next/image";

export function BrandWordmark({ className }: { className?: string }) {
  return (
    <>
      <Image
        src="/brand/wordmark-on-light.webp"
        alt="EmmyCodes"
        width={2046}
        height={336}
        preload
        sizes="200px"
        className={`brand-wordmark brand-wordmark-light ${className ?? ""}`}
      />
      <Image
        src="/brand/wordmark-on-dark.webp"
        alt="EmmyCodes"
        width={2022}
        height={331}
        preload
        sizes="200px"
        className={`brand-wordmark brand-wordmark-dark ${className ?? ""}`}
      />
    </>
  );
}
