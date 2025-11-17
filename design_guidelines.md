# Design Guidelines: Pocket Pal - Kanto Companion

## Design Approach
**Retro Game Boy-Inspired Interface** - A nostalgic, pixel-perfect companion experience inspired by classic Pokémon games with modern React implementation.

## Core Design Elements

### Typography
- **Primary Font**: `Press Start 2P` from Google Fonts for logo and headings
- **Body Text**: System font or readable sans-serif for longer text content
- **Hierarchy**: Large pixel-style headers for branding, smaller readable text for stats and descriptions

### Layout System
**Square Game Shell Container**: 400-500px centered viewport
- **Spacing**: Use Tailwind units of 2, 4, 8, 12, 16 for consistent rhythm (p-2, p-4, m-8, etc.)
- **Layout Structure**: Flexbox-based vertical flow
- **Borders**: Pixel-like borders with soft rounded corners
- **Shadow**: Subtle drop shadows for depth (no glassmorphism)

### Component Library

**Top Bar** (Fixed height ~60-80px):
- Left: Logo block with "Pocket Pal" (large) + "Kanto" (small subtitle)
- Right: Companion status showing Name, Level, and HP bar with outer rectangle + inner filled portion

**Main Companion Area** (Center, largest section):
- Type-based gradient background (specific mappings):
  - Grass: green → white linear gradient
  - Fire: orange/red → white
  - Water: blue → white  
  - Electric: yellow → white
  - (Continue for all Gen 1 types)
- Fixed-area image container for Pokémon GIF (placeholder: `/assets/[pokemon-name].gif`)
- Three action buttons below GIF: **Pet**, **Feed**, **Train**
  - Button states: Scale slightly on hover (1.05), subtle scale on active (0.95)
- Mood indicator line below buttons: "Mood: Happy/Sleepy/etc."

**Right Side Panel** (Vertical stack):
- Three circular dot buttons (20-30px each) stacked vertically
- Active dot visually highlighted (filled/larger/glowing)
- Panel content area below showing active panel:
  1. **Stats Panel**: Type(s), Nature, Friendship bar, XP bar with "XP to next level" text
  2. **Evolutions Panel**: Evolution chain display (Stage → Stage → Stage) with level requirements and "Ready to evolve!" indicator when conditions met
  3. **About Panel**: Recommended natures list, flavor description text, type strengths/weaknesses

**Bottom Tab Bar** (Height ~60px):
- Four tabs with icons/emoji placeholders:
  1. **Pokédex** (🔍 or book icon)
  2. **Items** (🎒 or bag icon)  
  3. **Trade/Shop** (🏪 or cart icon)
  4. **Settings** (⚙️ or gear icon)
- Active tab highlighted with border or background fill

**Tab Content Areas**:

1. **Pokédex Tab**: 
   - Scrollable grid layout (3-4 columns)
   - Each entry: ID number, name, colored type indicator
   - Seen/caught status badges
   - Click → Detail panel showing types, evolution chain, natures, "Set as Companion" button

2. **Items Tab**:
   - List/grid of inventory items
   - Each item: icon/emoji, name, quantity badge, short description

3. **Trade/Shop Tab**:
   - "Coming Soon" centered message
   - Locked icon visual
   - Minimal placeholder content

4. **Settings Tab**:
   - Toggle switches for Sound (on/off)
   - Theme dropdown/selector (Classic, Night modes)
   - "Reset Game Data" button with destructive styling (red border/text)

### Visual Styling

**Color System** (Type-based):
- No static color palette - backgrounds are dynamic gradients based on Pokémon type
- UI chrome: Light neutral tones (grays, whites) to not compete with type gradients
- Accent color: Classic Pokémon red for important CTAs

**Component Treatments**:
- Flat design with pixel borders (2-3px solid)
- Rounded corners: 8-12px on cards, 4-6px on buttons
- No gradients except type-based companion backgrounds
- Simple drop shadows for elevation (4-8px blur)

**Interactive States**:
- Buttons: Transform scale(1.05) on hover, scale(0.95) on active
- Dots: Glow effect or size increase when active
- HP/XP bars: Smooth width transitions
- Tab switches: Instant content swap with subtle fade

### Responsive Behavior
- Fixed 400-500px width optimized for Chrome popup
- Vertical scroll within tab content areas only
- All core UI fits within single viewport (no horizontal scroll)

### Empty States
- Pokédex unseen entries: "???" text with grayed placeholder
- Empty inventory: "No items yet" centered message
- Coming soon areas: Lock icon + explanatory text

### Data Display Patterns
- HP Bar: Outer container (100% width) + inner fill (percentage-based width)
- XP Bar: Similar pattern with different color
- Friendship: Horizontal bar or heart icons
- Stats: Label + value pairs in clean rows
- Evolution chains: Horizontal flow with arrows between stages

This design creates a nostalgic yet functional companion experience that feels authentic to classic Pokémon games while working seamlessly as both a web preview and Chrome extension popup.