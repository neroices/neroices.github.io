/**
 * @typedef {Object} Project
 * @property {string} slug
 * @property {string} title
 * @property {string} description
 * @property {string[]} tags
 * @property {string} accent
 * @property {"personal" | "organization"} type
 * @property {string} year
 * @property {string} category
 * @property {string} body
 * @property {string} [org]
 * @property {string} [link]
 * @property {string} [preview]
 */

/** @type {Project[]} */
export const projects = [
  {
    slug: "waybar",
    title: "waybar",
    description: "Waybar Theme",
    tags: ["waybar", "theme", "Linux", "Sway", "Hyprland", "Niri"],
    accent: "var(--color-primary-container)",
    type: "personal",
    year: "2025",
    category: "Ricing & Themes",
    body: "Yet another waybar theme.",
    link: "https://github.com/mogura1n/waybar",
  },
  {
    slug: "firebrew",
    title: "firebrew",
    description:
      "Self-maintained homebrew repository for (un)available packages",
    tags: ["MacOS", "Homebrew", "Package Repository"],
    accent: "var(--color-quaternary-container)",
    type: "personal",
    year: "2025",
    category: "Utilities",
    body: "A homebrew repository for packages that are not available on the official homebrew repository.",
    link: "https://github.com/mogura1n/firebrew",
  },
  {
    slug: "moguraur",
    title: "moguraur",
    description: "Self-maintained archlinux user repository (WIP)",
    tags: ["Arch", "AUR", "Package Repository"],
    accent: "var(--color-tertiary-container)",
    type: "personal",
    year: "2025",
    category: "Utilities",
    body: "A self-maintained Arch User Repository (AUR) for custom PKGBUILDs and packages. Still work in progress.",
    link: "https://github.com/mogura1n/moguraur",
  },
  {
    slug: "wofi",
    title: "wofi",
    description: "Yet another wofi theme",
    tags: ["wofi", "theme", "Linux", "Sway", "Hyprland", "Niri"],
    accent: "var(--color-quinary-container)",
    type: "personal",
    year: "2025",
    category: "Ricing & Themes",
    body: "Yet another wofi theme.",
    link: "https://github.com/mogura1n/wofi",
  },
  {
    slug: "oi",
    title: "oi",
    description: "Simple yet unique landing page, built in with next.js",
    tags: ["next.js", "React", "TypeScript"],
    accent: "var(--color-secondary-container)",
    type: "personal",
    year: "2025",
    category: "Landing Pages",
    body: "It is a simple yet unique landing page, built in with next.js.",
    link: "https://github.com/mogura1n/oi",
    preview: "https://mogura1n.github.io/oi/",
  },
  {
    slug: "witaqua-org",
    title: "WitAqua",
    description: "A custom Android ROM based on LineageOS",
    tags: ["Android", "AOSP", "Custom ROM"],
    accent: "var(--color-quaternary-container)",
    type: "organization",
    year: "2024 - Present",
    category: "Android",
    body: "WitAqua is a custom Android ROM developed by Japanese Android enthusiasts. The primary goal of this ROM is to deliver a stock Android experience, free from unnecessary bloatware. It offers a clean, responsive system with a streamlined interface. While the ROM maintains the core features and simplicity of stock Android, it also includes several useful, carefully selected enhancements and additional features that improve usability and customization.",
    link: "https://github.com/WitAqua",
  },
  {
    slug: "hlcyn-org",
    title: "Halcyon",
    description: "Simple yet unique Android distribution",
    tags: ["Android", "AOSP", "Custom ROM"],
    accent: "var(--color-primary-container)",
    type: "organization",
    year: "2023 - Present",
    category: "Android",
    body: "Halcyon is a simple yet unique Android distribution. It focuses on delivering a clean, smooth, and unique experience, while maintaining the core features and simplicity of stock Android. It also includes several useful, carefully selected enhancements and additional features that improve usability and customization.",
    link: "https://github.com/halcyonproject",
  },
  {
    slug: "conqueros-org",
    title: "conquerOS",
    description: "Simple yet powerful CAF based Custom ROM",
    tags: ["Android", "AOSP", "CAF", "Custom ROM", "Community"],
    accent: "var(--color-tertiary-container)",
    type: "organization",
    year: "2021 - 2023",
    category: "Android",
    body: "conquerOS is a CAF Based Custom ROM with fair customization and less-boring UI. Aims stability and optimized performance to be a perfect replacement for OEM's Stock ROM.",
    link: "https://github.com/ConquerOS",
  },
  {
    slug: "kisodev-org",
    title: "Kiso Dev",
    description: "Small development group",
    tags: ["Organization", "Development"],
    accent: "var(--color-quinary-container)",
    type: "organization",
    year: "2024 - Present",
    category: "Organization",
    body: "Kiso Dev is a development group draws inspiration from Sony's legacy of using codenames based on Japanese rivers, like the Kumano devices. This reflects our commitment to both innovation, echoing the flow of a river, and building a strong foundation (基礎, Kiso in Japanese) for future projects, just like a development group would do.",
    link: "https://github.com/kisodev",
  },
];
