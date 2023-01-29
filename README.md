# focus-keypress-lax

## WIP

**Goal:** To not show focus ring for primary mouse only users (common ux guy complaint, "looks ugly on my beautiful site, I'll just disable all outlines"). But show focus ring for keyboard users, for visual indication and accessability.

When element is focused if last user action was keypress, attribute `[data-focus-keypress-lax]` is applied.

**Note:** if mousedown element is input/textarea/\[contenteditable\], attribute is applied. It's good practice for inputs to recieve focus ring even on click/tap.

**Why?:** `:focus-visible` does the same thing except it falls short when developer or third-party library programmatically focuses element `el.focus` causing `:focus-visible` to trigger by default, which if we don't want focus ring to show on clicks, it will show. Does this mean this library won't add attribute on programmatic focus at all?? No if the user's last action of focusing elements was by keyboard, then programmatic focus will apply attribute keeping continuity.
