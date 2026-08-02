/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import { CircleCheck } from "lucide-react";
import React from "react";
import { E_PASSWORD_STRENGTH } from "@plane/constants";
import { cn, getPasswordStrength, getPasswordCriteria } from "@plane/utils";
import { getStrengthInfo, getFragmentColor } from "./helper";

export interface PasswordStrengthIndicatorProps {
  password: string;
  showCriteria?: boolean;
  isFocused?: boolean;
}

export function PasswordStrengthIndicator({
  password,
  showCriteria = true,
  isFocused = false,
}: PasswordStrengthIndicatorProps) {
  const strength = getPasswordStrength(password);
  const criteria = getPasswordCriteria(password);
  const strengthInfo = getStrengthInfo(strength);

  const isPasswordMeterVisible = isFocused || strength !== E_PASSWORD_STRENGTH.STRENGTH_VALID;

  if ((!password && !showCriteria) || !isPasswordMeterVisible) {
    return null;
  }

  return (
    <div className="space-y-3 rounded-xl border border-[#E8DFF8] bg-[#F7F3FC] p-3">
      {/* Strength Indicator */}
      <div className="space-y-2">
        <div className="flex w-full gap-1.5 transition-all duration-300 ease-linear">
          {[0, 1, 2].map((fragmentIndex) => (
            <div
              key={fragmentIndex}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-all duration-300 ease-in-out",
                getFragmentColor(fragmentIndex, strengthInfo.activeFragments)
              )}
            />
          ))}
        </div>

        {/* Strength Message */}
        {password && <p className={cn("text-[13px] font-semibold", strengthInfo.textColor)}>{strengthInfo.message}</p>}
      </div>

      {/* Criteria list */}
      {showCriteria && (
        <ul className="grid gap-1.5">
          {criteria.map((criterion) => (
            <li
              key={criterion.key}
              className={cn(
                "flex items-center gap-2 rounded-md px-2 py-1.5 text-[12px] font-medium",
                criterion.isValid ? "bg-[#ECFDF3] text-[#067647]" : "bg-white text-[#3F2271]"
              )}
            >
              <CircleCheck
                className={cn("h-3.5 w-3.5 shrink-0", criterion.isValid ? "text-[#12B76A]" : "text-[#9B8BB8]")}
              />
              <span>{criterion.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
