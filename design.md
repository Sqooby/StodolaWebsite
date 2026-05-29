# Design Brief — Roztoczańska Stodoła

## Kontekst

Strona dla domku letniskowego w Roztoczańskim Parku Narodowym. Stodoła = barn aesthetic. 10 osób, bania, las, cisza. Target: rodziny i grupy przyjaciół szukające ucieczki od miasta.

---

## Inspiracje zebrane z sieci

### Polskie serwisy domków letniskowych
- **M2 Summer House** (89studio.com.pl) — złoto + granat, ukośne headery, galerie z ramkami, podkreślenie premium
- **Architectu.pl** — nowoczesny dom letniskowy + styl stodoły: duże przeszklenia, naturalne drewno, blacha na dachu
- **homebook.pl** — naturalne materiały, drewniana elewacja w pionie, minimalizm

### Zagraniczne cabin rental sites
- **Kip Hideaways** — minimalistyczny, przytulny, jedno duże hero zdjęcie, cicha nawigacja
- **Piaule Catskills** — nature-first ethos, duże puste przestrzenie, ciemne akcenty na jasnym tle
- **EasyStay template** — earth tones, breathtaking property visuals, trust-building reviews
- **Cabin-core aesthetic** — drewno, ogień, miękkie światło, duże okna na las

### Wzorce UI
- Hero z pełnoekranowym zdjęciem lasu/stodoły + krótki tagline
- Modułowe sekcje: gallery → amenities → location → contact
- Dużo białej przestrzeni (breathing room)
- Earth tones: ciemna zieleń, ciepły brąz, krem/piasek, ciemny antracyt
- Galeria: wewnętrzne ramki na zdjęciach, grid masonry
- Ikony udogodnień: minimalistyczne, liniowe
- Formularz kontaktowy + widoczny telefon/email
- Google Maps embed dla lokalizacji
- Sticky nav disappearing on scroll, appearing on scroll-up

---

## Paleta kolorów

```
Tło główne:       #FAF7F2  (ciepły off-white / krem)
Tło sekcji alt:   #F0EBE3  (piasek)
Tekst główny:     #1C1917  (prawie czarny, ciepły)
Tekst drugorzędny:#6B5E52  (ciepły brąz-szary)
Akcent główny:    #3D5A3E  (ciemna leśna zieleń)
Akcent hover:     #2C4230  (głębsza zieleń)
Gold/amber:       #B8860B  (złoty akcent dla detali)
Linia/border:     #DDD5C8  (ciepły jasny beż)
```

---

## Typografia

```
Nagłówki:   "Playfair Display" serif — elegancja, leśny resort charakter
Body:        "Inter" lub system-ui — czytelność, nowoczesność
Tagline:     Playfair Display Italic, duże, rozstrzelony letter-spacing
```

---

## Sekcje strony

### 1. Hero
- Fullscreen (100vh), tło: zdjęcie domku/lasu z ciemnym overlayem
- Logo górny lewy, nav górny prawy
- Centrowany tekst: H1 "Roztoczańska Stodoła" + tagline "Tu odnajdziesz spokój"
- Scroll indicator (animowana strzałka w dół)
- Nav: glassmorphism lub transparentny → solid przy scrollu

### 2. Intro / O domku
- Krótki akapit (2-3 zdania) + kluczowe liczby: 4 pokoje · 10 osób · bania · las
- Poziomy pasek ze statystykami

### 3. Galeria
- Asymetryczny grid / masonry
- Hover: delikatne złote obramowanie + zoom
- Lightbox (GLightbox — już zintegrowany)

### 4. Udogodnienia
- Dwie kolumny, ikony SVG liniowe
- Tło: ciepły piasek (#F0EBE3)
- Featured highlight: "Bania z ciepłą wodą" — wyróżniony card

### 5. Lokalizacja
- Opis tekstowy + mapa embed
- Pobliskie atrakcje: szlaki Roztocza, parki

### 6. Kontakt / Rezerwacja
- Formularz + dane kontaktowe obok siebie (desktop) / stack (mobile)
- Ciemne tło (#1C1917) dla kontrastu i wyróżnienia sekcji

### 7. Footer
- Minimalistyczny: copyright + Instagram

---

## Styl wizualny

| Element | Decyzja |
|---------|---------|
| Border-radius | 4px (subtelny, nie bubbly) |
| Shadows | Delikatne, ciepłe (rgba brown) |
| Animacje | Fade-in on scroll, subtlekhover transitions 0.3s |
| Imagery | Pełne, ciemne, naturalne zdjęcia lasu |
| Ikony | Liniowe SVG, grubość 1.5px |
| Spacing | Duże paddingi, dużo oddechu |

---

## Mobile-first zasady

- Nav: hamburger → pełnoekranowe menu overlay
- Hero: wysokość 100svh (small viewport units)
- Galeria: 1 kolumna na mobile, 2 na tablet, 3 na desktop
- Formularz: full-width na mobile

---

## Cel konwersji

CTA: **"Zarezerwuj pobyt"** → scroll do formularza  
Sekondarne: Instagram link w footer  
Tertiary: bezpośredni email/telefon widoczny w sekcji kontakt
