# ADR 0005: Use Radix UI Primitives

- Status: Accepted
- Date: 2026-11-16

## Context

The project requires accessible interactive components while maintaining complete control over visual design.

Building every interaction from scratch introduces unnecessary accessibility and behavioral complexity.

Using a complete pre-designed component library could also restrict the desired visual identity.

## Decision

Use Radix UI primitives for complex accessible interactions and build the visual component system independently.

Examples:
- Dialogs.
- Dropdown menus.
- Tooltips.
- Popovers.
- Select menus.
- Tabs.

Use custom components for the project's visual elements.

## Alternatives Considered

- **shadcn/ui:** Useful component collection, but its default styling approach is not the foundation selected for this project.
- **Material UI:** Provides a complete visual system that may limit design flexibility.
- **Fully custom components:** Maximum control but requires implementing and maintaining accessibility behavior.

## Consequences

### Positive
- Accessible interaction foundations.
- Complete control over visual appearance.
- Reusable custom components.
- Better separation of behavior and presentation.

### Negative
- Styling and integration require additional work.
- Radix primitives do not automatically guarantee WCAG compliance.
- Accessibility still requires testing.
