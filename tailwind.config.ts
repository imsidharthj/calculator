
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom neumorphic colors (updated for dark theme)
				neugray: {
					light: '#2e2e2e',
					DEFAULT: '#1E1E1E',
					dark: '#171717',
				},
				neutext: {
					DEFAULT: '#FFFFFF',
					muted: '#B0B0B0',
				},
				neuaccent: {
					DEFAULT: '#F8A300',
					light: '#FFC04D',
					special: '#6495ED',
					number: '#B0B0B0',
				}
			},
			boxShadow: {
				'neu-flat': '4px 4px 8px #171717, -4px -4px 8px #252525',
				'neu-pressed': 'inset 2px 2px 4px #171717, inset -2px -2px 4px #252525',
				'neu-concave': 'inset 4px 4px 8px #252525, inset -4px -4px 8px #171717',
			},
			backgroundImage: {
				'calculator-gradient': 'linear-gradient(135deg, #f9c5d1 0%, #c4b5fd 50%, #a5b4fc 100%)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'button-press': {
					'0%': { transform: 'scale(1)', boxShadow: '6px 6px 12px #171717, -6px -6px 12px #252525' },
					'50%': { transform: 'scale(0.98)', boxShadow: 'inset 2px 2px 5px #171717, inset -2px -2px 5px #252525' },
					'100%': { transform: 'scale(1)', boxShadow: '6px 6px 12px #171717, -6px -6px 12px #252525' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'button-press': 'button-press 0.2s ease-out forwards'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
