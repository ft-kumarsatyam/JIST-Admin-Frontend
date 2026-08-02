# Full screen redesign — deferred

> Created by Satyam Kumar

**Decision date:** August 2026  
**Status:** Deferred until after Phase 3 (custom fields) ships

## Recommendation

Do **not** redesign the main JIST screens (work items, board, project home) in this fork yet.

## Why

1. Phase 1 (design-token rebrand) already turns the product into Khelo Tech colours, logos, and name for a small fraction of the cost of a layout redesign.
2. A full redesign edits the files upstream changes most often, permanently raising the cost of every monthly `upstream` merge.
3. Custom fields, Bitbucket commits, and time tracking deliver user-visible capability; a redesign does not.

## Revisit criteria

Reassess after Phase 3 is in production for at least one cycle, and only if:

- Merge conflict volume from `upstream` is still manageable, **and**
- Product/Tech leadership has a concrete UX problem that tokens and navigation tweaks cannot solve.

Until then, prefer navigation/IA tweaks and token-level polish over structural layout rewrites.
