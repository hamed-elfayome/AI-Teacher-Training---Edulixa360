/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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
  			gradient: {
  				primary: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 50%, #0f766e 100%)',
  				secondary: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 50%, #be123c 100%)',
  				accent: 'linear-gradient(135deg, #a855f7 0%, #9333ea 50%, #7c3aed 100%)',
  				ai: 'linear-gradient(135deg, #14b8a6 0%, #a855f7 50%, #f43f5e 100%)',
  				premium: 'linear-gradient(135deg, #0a0f1a 0%, #1e293b 50%, #334155 100%)'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			arabic: [
  				'Cairo',
  				'Tajawal',
  				'system-ui',
  				'sans-serif'
  			],
  			display: [
  				'Cairo',
  				'system-ui',
  				'sans-serif'
  			],
  			body: [
  				'Cairo',
  				'system-ui',
  				'sans-serif'
  			]
  		},
  		fontSize: {
  			xs: [
  				'0.75rem',
  				{
  					lineHeight: '1rem'
  				}
  			],
  			sm: [
  				'0.875rem',
  				{
  					lineHeight: '1.25rem'
  				}
  			],
  			base: [
  				'1rem',
  				{
  					lineHeight: '1.5rem'
  				}
  			],
  			lg: [
  				'1.125rem',
  				{
  					lineHeight: '1.75rem'
  				}
  			],
  			xl: [
  				'1.25rem',
  				{
  					lineHeight: '1.75rem'
  				}
  			],
  			'2xl': [
  				'1.5rem',
  				{
  					lineHeight: '2rem'
  				}
  			],
  			'3xl': [
  				'1.875rem',
  				{
  					lineHeight: '2.25rem'
  				}
  			],
  			'4xl': [
  				'2.25rem',
  				{
  					lineHeight: '2.5rem'
  				}
  			],
  			'5xl': [
  				'3rem',
  				{
  					lineHeight: '1'
  				}
  			],
  			'6xl': [
  				'3.75rem',
  				{
  					lineHeight: '1'
  				}
  			],
  			'7xl': [
  				'4.5rem',
  				{
  					lineHeight: '1'
  				}
  			],
  			'8xl': [
  				'6rem',
  				{
  					lineHeight: '1'
  				}
  			],
  			'9xl': [
  				'8rem',
  				{
  					lineHeight: '1'
  				}
  			]
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
  			'edulixa-gradient': 'linear-gradient(135deg, #14b8a6 0%, #a855f7 50%, #f43f5e 100%)',
  			'ai-gradient': 'linear-gradient(135deg, #14b8a6 0%, #0d9488 25%, #a855f7 50%, #f43f5e 75%, #e11d48 100%)',
  			'premium-gradient': 'linear-gradient(135deg, #0a0f1a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)',
  			'glass-gradient': 'linear-gradient(135deg, rgba(20, 184, 166, 0.1) 0%, rgba(168, 85, 247, 0.1) 50%, rgba(244, 63, 94, 0.1) 100%)'
  		},
  		boxShadow: {
  			'glow-sm': '0 0 10px rgba(20, 184, 166, 0.3)',
  			'glow-md': '0 0 20px rgba(20, 184, 166, 0.4)',
  			'glow-lg': '0 0 30px rgba(20, 184, 166, 0.5)',
  			'glow-xl': '0 0 40px rgba(20, 184, 166, 0.6)',
  			'glow-coral': '0 0 20px rgba(244, 63, 94, 0.4)',
  			'glow-purple': '0 0 20px rgba(168, 85, 247, 0.4)',
  			premium: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(20, 184, 166, 0.1)'
  		},
  		animation: {
  			float: 'float 6s ease-in-out infinite',
  			'float-slow': 'float 8s ease-in-out infinite',
  			glow: 'glow 2s ease-in-out infinite alternate',
  			'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
  			'slide-up': 'slideUp 0.5s ease-out',
  			'fade-in': 'fadeIn 0.6s ease-out',
  			'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  			'spin-slow': 'spin 20s linear infinite',
  			'bounce-slow': 'bounce 3s infinite',
  			wiggle: 'wiggle 1s ease-in-out infinite',
  			'gradient-shift': 'gradient-shift 8s ease infinite',
  			scan: 'scan 2s linear infinite'
  		},
  		keyframes: {
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0px)'
  				},
  				'50%': {
  					transform: 'translateY(-20px)'
  				}
  			},
  			glow: {
  				'0%': {
  					boxShadow: '0 0 5px #14b8a6, 0 0 10px #14b8a6'
  				},
  				'100%': {
  					boxShadow: '0 0 20px #14b8a6, 0 0 30px #14b8a6, 0 0 40px #0d9488'
  				}
  			},
  			'glow-pulse': {
  				'0%, 100%': {
  					boxShadow: '0 0 20px rgba(20, 184, 166, 0.4)'
  				},
  				'50%': {
  					boxShadow: '0 0 40px rgba(20, 184, 166, 0.8), 0 0 60px rgba(20, 184, 166, 0.4)'
  				}
  			},
  			slideUp: {
  				'0%': {
  					transform: 'translateY(30px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			},
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			'gradient-shift': {
  				'0%, 100%': {
  					backgroundPosition: '0% 50%'
  				},
  				'50%': {
  					backgroundPosition: '100% 50%'
  				}
  			},
  			scan: {
  				'0%': {
  					transform: 'translateY(-100%)'
  				},
  				'100%': {
  					transform: 'translateY(100vh)'
  				}
  			},
  			wiggle: {
  				'0%, 100%': {
  					transform: 'rotate(-3deg)'
  				},
  				'50%': {
  					transform: 'rotate(3deg)'
  				}
  			}
  		},
  		backdropBlur: {
  			xs: '2px'
  		},
  		spacing: {
  			'18': '4.5rem',
  			'88': '22rem',
  			'128': '32rem'
  		},
  		borderRadius: {
  			'4xl': '2rem',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
