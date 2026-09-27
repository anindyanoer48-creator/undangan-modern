# DESIGN DIRECTION: Minimalist Modern Wedding Invitation

## Identity & Concept
- **Kind**: Wedding Invitation Website (Undangan Pernikahan Digital Statis)
- **Style**: Modern Minimalist with Editorial Architectural Nuance (Kinfolk / Scandinavian aesthetic)
- **Theme**: Dominant White, Crisp, Warm Stone & Porcelain Whites, Minimal Champagne/Gold Accents
- **Dials**: ENERGY 1 (Calm, intimate, elegant) / RHYTHM 2 (Varied editorial layout) / MOTION 2 (Smooth transitions, scroll reveals, floating audio widget)

## Color Palette
- Background Primary: `#FFFFFF` (Pure White)
- Background Secondary: `#FAFAF9` (Warm Alabaster / Milk White)
- Surface / Card: `#FFFFFF` with hairline borders `#E7E5E4` (Stone 200)
- Text Primary: `#1C1917` (Deep Obsidian Charcoal, WCAG AAA 15.8:1 contrast on white)
- Text Secondary: `#57534E` (Warm Charcoal Slate, WCAG AA 5.2:1 contrast on white)
- Muted Detail: `#78716C` (Stone 500)
- Accent: `#A38350` / `#94733C` (Refined Champagne Gold, used sparingly on badges, active nav, and hairpins)

## Typography
- Display / Headings: `Cormorant Garamond` (Google Font: 400, 500, 600, 700) for timeless, high-fashion wedding typography
- Body / UI / Controls: `Plus Jakarta Sans` (Google Font: 300, 400, 500, 600) for clean modern legibility

## Audio Behavior
- Track: "Payung Teduh - Akad" (AAC m4a with WebM fallback)
- Autoplay on initial load attempted; fallback to "Buka Undangan" entry button to comply with browser autoplay security policies
- Floating interactive turntable / music disc controller with real-time soundwave animation and play/pause controls

## Antislop Compliance Checklist
- No em dashes in copy (R-02)
- No generic purple/blue gradients or stacked trend cliches (R-01)
- All interactive controls fully functional (R-26)
- Mobile-first responsive layout with min 44px tap targets (R-03)
- Real time RSVP & Guestbook storing to localStorage (R-27)
- 1-click clipboard copy for gift banking accounts with toast notifications
