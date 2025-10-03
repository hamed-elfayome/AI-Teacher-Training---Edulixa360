#!/bin/bash

# Add "use client" to all landing components that need it
COMPONENTS=(
  "components/landing/ContactForm.jsx"
  "components/landing/ParticleNetwork.jsx"
  "components/landing/PopupModal.jsx"
  "components/landing/ScrollProgress.jsx"
  "components/landing/Hero.jsx"
  "components/landing/Challenge.jsx"
  "components/landing/Solution.jsx"
  "components/landing/Benefits.jsx"
  "components/landing/ContactSection.jsx"
  "components/landing/Footer.jsx"
  "components/landing/SectionSeparator.jsx"
  "components/landing/Navbar.jsx"
  "components/landing/About.jsx"
  "components/landing/Features.jsx"
)

for file in "${COMPONENTS[@]}"; do
  if [ -f "$file" ]; then
    # Check if file doesn't already have "use client"
    if ! grep -q '"use client"' "$file"; then
      # Add "use client" at the beginning
      echo '"use client";
' | cat - "$file" > temp && mv temp "$file"
      echo "✅ Added 'use client' to $file"
    fi
  fi
done

echo "Done!"
