/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

export function FormHeader({ heading, subHeading }: { heading: string; subHeading: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[22px] leading-7 font-semibold tracking-[-0.02em] text-[#1A102B]">{heading}</span>
      <span className="text-[14px] leading-5 font-medium text-[#5B4B72]">{subHeading}</span>
    </div>
  );
}
