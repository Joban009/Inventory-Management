import {
  FaHeadphones,
  FaChair,
  FaShirt,
  FaPlug,
  FaBox,
} from "react-icons/fa6";

const DEFAULT = FaBox;

const RULES = [
  { test: (n) => n.includes("electronic"), icon: FaHeadphones },
  { test: (n) => n.includes("furniture"), icon: FaChair },
  { test: (n) => n.includes("apparel") || n.includes("clothing"), icon: FaShirt },
  { test: (n) => n.includes("accessor"), icon: FaPlug },
];

/**
 * Picks a row icon from category text only. JSON does not store icons.
 * Add a rule here when you introduce a new category wording.
 */
export function getIconForCategory(category) {
  const n = String(category ?? "")
    .toLowerCase()
    .trim();
  if (!n) return DEFAULT;
  for (const { test, icon } of RULES) {
    if (test(n)) return icon;
  }
  return DEFAULT;
}
