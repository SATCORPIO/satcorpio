# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** SATCORP
**Generated:** 2026-04-02 18:25:00
**Category:** Tactical Command & Operations Hub
**Style:** Midnight Neural

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable | Uses |
|------|-----|--------------|------|
| Primary Dark | `#030508` | `--color-background` | Background base |
| Surface | `#070C11` | `--glass-bg` | Cards and panels (usually opaque/glass) |
| Tactical C2 | `#00FF41` | `--c2-green` | Primary accents, buttons, glowing elements |
| Threat | `#EF4444` | `--c2-red` | Errors, locked states |
| Warning | `#F59E0B` | `--c2-amber` | Warnings, intermediate info |
| Neutral Text | `#F8FAFC` | `--color-text` | Primary readable text |

### Divisonal Colors
- **KI-RA Studios (UE5):** `#00A8FF`
- **PULSE:** `#FF006E`
- **ANU:** `#EAB308`
- **KYRAX:** `#A855F7`

### Typography

- **Tactical/Headers:** Orbitron
- **Body:** Space Grotesk
- **Data/Monospace:** JetBrains Mono or Share Tech Mono
- **Military Base:** Rajdhani
- **Mood:** cybernetic, precision, imposing, high-fidelity, data-rich

### Shadow Depths (Spatial Engine)

| Level | CSS Variable | Usage |
|-------|--------------|-------|
| Glass Base | `--glass-bg` / `--glass-blur` | Spatial depth on tactical panels |
| Component | `--shadow-spatial-md`| Default spatial panel |
| Prominent | `--shadow-spatial-lg`| Hover states, top-level modals |
| Cyber Glow | `--shadow-spatial-glow`| Tactical UI accents |

---

## Component Specs

### UI Primitives

#### Tactical Spatial Panel (Glass)
```css
.spatial-panel {
  background: var(--glass-bg);
  backdrop-filter: blur(32px) saturate(1.8);
  border: 1px solid rgba(255, 255, 255, 0.08); /* --glass-border */
  border-radius: 8px;
  box-shadow: var(--shadow-spatial-md);
}
```

#### Buttons (Tactical Trigger)
```css
.btn-tactical {
  background: transparent;
  color: var(--c2-green);
  border: 1px solid rgba(0, 255, 65, 0.3);
  padding: 8px 16px;
  border-radius: 4px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  transition: all 0.2s ease;
  cursor: pointer;
}
.btn-tactical:hover {
  background: rgba(0, 255, 65, 0.1);
  box-shadow: 0 0 12px rgba(0, 255, 65, 0.2);
}
```

---

## Anti-Patterns (Do NOT Use)

- ❌ **Solid Bright Backgrounds** - Keep the UI dark, using light only as emissive glows.
- ❌ **Emojis** - Use geometric SVGs or Lucide icons.
- ❌ **Round/Playful Corners** - Border radii should be tight (2px, 4px, max 8px).
- ❌ **Instability** - Avoid animations that shift layout grids (`transform: scale` on grid items without strict z-index handling).
- ❌ **Desktop-Only Spacing** - Ensure Bento Grid collapses gracefully to 1-column on mobile.

## Pre-Delivery Checklist

- [ ] Mobile Layouts verified (stacking Bento, scrolling spatial cards).
- [ ] No layout shift during hover events.
- [ ] Accessible contrast ratios observed.
- [ ] All clickable entities utilize `cursor-pointer`.
