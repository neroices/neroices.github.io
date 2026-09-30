/**
 * @typedef {Object} AcceptedMethod
 * @property {string} id
 * @property {string} name
 * @property {string} type
 * @property {string} handle
 * @property {string} href
 * @property {string} description
 * @property {string} accent
 * @property {string} badge
 * @property {string} icon
 * @property {string} [buttonText]
 * @property {string[]} benefits
 */

/** @type {AcceptedMethod[]} */
export const acceptedMethods = [
  {
    id: "github",
    name: "GitHub Sponsors",
    type: "international",
    handle: "@neroices",
    href: "https://github.com/sponsors/neroices",
    description:
      "Tip once or sponsor monthly, whatever works best for you.",
    accent: "var(--color-primary-container)",
    badge: "Monthly or one-time",
    icon: "github",
    buttonText: "Sponsor on GitHub",
    benefits: [
      "GitHub Sponsor Badge",
    ],
  },
  {
    id: "liberapay",
    name: "Liberapay",
    type: "international",
    handle: "@neroices",
    href: "https://liberapay.com/neroices",
    description:
      "An alternative way to support if you don't have a GitHub account or don't use GitHub.",
    accent: "var(--color-tertiary-container)",
    badge: "Monthly or one-time",
    icon: "liberapay",
    buttonText: "Support via Liberapay",
    benefits: [
      "Support My Work",
    ],
  },
];

export const supportMethods = acceptedMethods;

/** @type {string[]} */
export const supporters = [
  "Soralis0912",
  "Jonathan",
  "MeChai",
];

export const donors = supporters;
