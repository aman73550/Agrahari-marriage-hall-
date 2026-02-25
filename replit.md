# Agrahari Restaurant & Shopping Centre - Landing Page

## Overview
Ultra-luxury single-page landing website for Agrahari Restaurant & Shopping Centre located in Dumariyaganj, Siddharth Nagar, Uttar Pradesh. Features a premium Gold & Charcoal dark theme inspired by 7-star hotel websites.

## Architecture
- **Frontend**: React + TypeScript with Vite
- **Backend**: Express.js (minimal, serves static content)
- **Styling**: Tailwind CSS with custom Gold/Charcoal theme
- **Animations**: Framer Motion for scroll reveals, parallax, and transitions

## Design System
- **Colors**: Deep Charcoal (#0a0a0a), Royal Gold (#D4AF37), Marble White
- **Fonts**: Playfair Display (headings/serif), Lato/Inter (body/sans-serif), Cormorant Garamond (alternate serif)
- **Theme**: Dark mode only, ultra-premium aesthetic
- **Spacing**: Generous negative space (150px+ between sections) for luxury feel

## Key Sections
1. **Hero** - Full-screen parallax background with fade-in animations
2. **About** - Brand story with stats (rating, guests, wings)
3. **Experience** - Three wings: Gourmet Atelier, Grand Imperial Ballroom, Boutique Gallery
4. **Reviews** - Auto-rotating testimonial carousel with gold star ratings
5. **Location** - Google Maps embed (grayscale) with concierge contact details
6. **Footer** - Minimal branding

## Features
- Glassmorphism navbar (transparent to dark on scroll)
- Parallax hero with Ken Burns-style effects
- Scroll-reveal animations (fade-in-up) via Framer Motion
- Mobile sticky bottom CTA bar
- Responsive hamburger menu
- Google Maps integration with direct link

## File Structure
- `client/src/pages/home.tsx` - Main landing page with all sections
- `client/src/App.tsx` - Router setup
- `client/public/images/` - AI-generated luxury interior images
- `client/src/index.css` - Theme variables (Gold/Charcoal)
- `tailwind.config.ts` - Extended with gold/charcoal color palettes

## External Links
- Google Maps: https://maps.app.goo.gl/fvJKZ1YgDREkeJm38
- Address: Ward No. 15, Near Shivam Guest House, Itwa Road, Dumariyaganj, Siddharth Nagar
