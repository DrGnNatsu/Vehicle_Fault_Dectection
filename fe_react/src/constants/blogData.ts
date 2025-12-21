export const blogData = [
    {
        version: "0.2",
        date: "20 / 12 / 2025",
        sections: [
            {
                title: "New Features",
                items: [
                    "Integrated Zustand for global theme management",
                    "Added AfterNavigation component with user profile support",
                    "Implemented responsive CameraCard with preview state"
                ]
            },
            {
                title: "Improvements",
                items: [
                    "Enhanced AboutUsPage page with Vercel-inspired design",
                    "Separated CSS into semantic files using Tailwind @apply",
                    "Improved mobile responsiveness across all core components"
                ]
            }
        ],
        tags: [
            { label: "features", type: "features" as const },
            { label: "ui-ux", type: "tags" as const },
            { label: "performance", type: "security" as const }
        ]
    },
    {
        version: "0.1",
        date: "10 / 12 / 2025",
        sections: [
            {
                title: "Initial Release",
                items: [
                    "Basic project structure with React and Vite",
                    "Integration of shadcn/ui components",
                    "BeforeNavigation component with light/dark mode toggle"
                ]
            },
            {
                title: "Core Functionality",
                items: [
                    "Footer component with social links",
                    "AboutCard for highlighting key platform features",
                    "Initial routing setup for HomePage and About pages"
                ]
            }
        ],
        tags: [
            { label: "v0.1", type: "tags" as const },
            { label: "initial", type: "bugfixes" as const }
        ]
    }
];