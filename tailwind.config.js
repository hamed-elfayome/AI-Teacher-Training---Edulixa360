/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './app/**/*.{ts,tsx,js,jsx}',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          '50': '#f8fafc',
          '100': '#f1f5f9',
          '200': '#e2e8f0',
          '300': '#cbd5e1',
          '400': '#94a3b8',
          '500': '#64748b',
          '600': '#475569',
          '700': '#334155',
          '800': '#1e293b',
          '850': '#0f172a',
          '900': '#0a0f1a',
          '950': '#020617'
        },
        edulixa: {
          teal: {
            '50': '#f0fdfa',
            '100': '#ccfbf1',
            '200': '#99f6e4',
            '300': '#5eead4',
            '400': '#2dd4bf',
            '500': '#14b8a6',
            '600': '#0d9488',
            '700': '#0f766e',
            '800': '#115e59',
            '900': '#134e4a'
          },
          coral: {
            '50': '#fff1f2',
            '100': '#ffe4e6',
            '200': '#fecdd3',
            '300': '#fda4af',
            '400': '#fb7185',
            '500': '#f43f5e',
            '600': '#e11d48',
            '700': '#be123c',
            '800': '#9f1239',
            '900': '#881337'
          },
          purple: {
            '50': '#faf5ff',
            '100': '#f3e8ff',
            '200': '#e9d5ff',
            '300': '#d8b4fe',
            '400': '#c084fc',
            '500': '#a855f7',
            '600': '#9333ea',
            '700': '#7c3aed',
            '800': '#6b21a8',
            '900': '#581c87'
          },
          green: {
            '50': '#f0fdf4',
            '100': '#dcfce7',
            '200': '#bbf7d0',
            '300': '#86efac',
            '400': '#4ade80',
            '500': '#22c55e',
            '600': '#16a34a',
            '700': '#15803d',
            '800': '#166534',
            '900': '#14532d'
          }
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        'arabic': ['Cairo', 'Tajawal', 'sans-serif'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

