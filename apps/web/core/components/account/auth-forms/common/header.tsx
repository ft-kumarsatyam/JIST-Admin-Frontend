/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

export function AuthFormHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[22px] font-semibold tracking-[-0.02em] text-[#1A102B]">{title}</span>
      <span className="text-[14px] leading-5 font-medium text-[#5B4B72]">{description}</span>
    </div>
  );
}
