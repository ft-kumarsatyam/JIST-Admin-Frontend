/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import { E_PASSWORD_STRENGTH } from "@plane/constants";

export interface StrengthInfo {
  message: string;
  textColor: string;
  activeFragments: number;
}

/**
 * Get strength information including message, color, and active fragments.
 * Colors are explicit so the meter stays readable on light auth cards
 * even when the app theme is dark.
 */
export const getStrengthInfo = (strength: E_PASSWORD_STRENGTH): StrengthInfo => {
  switch (strength) {
    case E_PASSWORD_STRENGTH.EMPTY:
      return {
        message: "Please enter your password",
        textColor: "text-[#5B4B72]",
        activeFragments: 0,
      };
    case E_PASSWORD_STRENGTH.LENGTH_NOT_VALID:
      return {
        message: "Password is too short",
        textColor: "text-[#B42318]",
        activeFragments: 1,
      };
    case E_PASSWORD_STRENGTH.STRENGTH_NOT_VALID:
      return {
        message: "Password is weak",
        textColor: "text-[#B54708]",
        activeFragments: 2,
      };
    case E_PASSWORD_STRENGTH.STRENGTH_VALID:
      return {
        message: "Password is strong",
        textColor: "text-[#067647]",
        activeFragments: 3,
      };
    default:
      return {
        message: "Please enter your password",
        textColor: "text-[#5B4B72]",
        activeFragments: 0,
      };
  }
};

/**
 * Get fragment color based on position and active state
 */
export const getFragmentColor = (fragmentIndex: number, activeFragments: number): string => {
  if (fragmentIndex >= activeFragments) {
    return "bg-[#E8DFF8]";
  }

  switch (activeFragments) {
    case 1:
      return "bg-[#D92D20]";
    case 2:
      return "bg-[#F79009]";
    case 3:
      return "bg-[#12B76A]";
    default:
      return "bg-[#E8DFF8]";
  }
};
