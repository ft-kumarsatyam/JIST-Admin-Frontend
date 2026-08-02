/**
 * Copyright (c) 2026 JIST and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as React from "react";
import jistBrandUrl from "./jist-brand.png";

type Props = {
  className?: string;
  width?: string | number;
  height?: string | number;
  alt?: string;
};

/** Full JIST brand image used for logos / lockups across the product. */
export function KheloBrandImage({ className = "h-10 w-auto", width, height, alt = "JIST" }: Props) {
  const style: React.CSSProperties = { objectFit: "contain" };
  if (height != null) {
    style.height = typeof height === "number" ? `${height}px` : height;
  }
  if (width != null) {
    style.width = typeof width === "number" ? `${width}px` : width;
  } else if (height != null) {
    style.width = "auto";
  }

  const src = typeof jistBrandUrl === "string" ? jistBrandUrl : (jistBrandUrl as { src: string }).src;

  return <img src={src} alt={alt} className={className} style={style} />;
}

/** Preferred export name */
export const JistBrandImage = KheloBrandImage;
