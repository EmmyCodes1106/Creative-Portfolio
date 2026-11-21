import {
  ACCENT_STORAGE_KEY,
  DEFAULT_ACCENT,
  DEFAULT_THEME,
  INTRO_STORAGE_KEY,
  THEME_STORAGE_KEY,
} from "@/lib/theme";

const script = `(function(){var d=document.documentElement;var theme=${JSON.stringify(
  DEFAULT_THEME,
)};var accent=${JSON.stringify(DEFAULT_ACCENT)};try{var savedTheme=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(savedTheme==='light'||savedTheme==='dark'){theme=savedTheme;}var savedAccent=localStorage.getItem(${JSON.stringify(
  ACCENT_STORAGE_KEY,
)});if(['violet','blue','emerald','orange','rose'].indexOf(savedAccent)!==-1){accent=savedAccent;}if(sessionStorage.getItem(${JSON.stringify(
  INTRO_STORAGE_KEY,
)})==='seen'){d.classList.add('intro-seen');}}catch(e){}d.dataset.theme=theme;d.dataset.accent=accent;})();`;

export function ThemeScript() {
  return (
    <script
      // Runs before paint so a stored dark theme never flashes light first.
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}
