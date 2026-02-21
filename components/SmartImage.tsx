import React, { useEffect, useMemo, useState } from "react";

export type SmartImageProps = {
  srcs: string[];
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
  decoding?: "async" | "auto" | "sync";
};

export const SmartImage: React.FC<SmartImageProps> = ({
  srcs,
  alt,
  className,
  loading = "lazy",
  decoding = "async",
}) => {
  const sourcesKey = useMemo(() => srcs.join("|"), [srcs]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [sourcesKey]);

  const src = srcs[index] ?? srcs[0] ?? "";

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      decoding={decoding}
      referrerPolicy="no-referrer"
      onError={() => {
        setIndex((i) => (i < srcs.length - 1 ? i + 1 : i));
      }}
    />
  );
};
