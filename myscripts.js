function calculateSettingAsThemeString({
  localStorageTheme,
  systemSettingDark,
}) {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }

  if (systemSettingDark.matches) {
    return "dark";
  }

  return "light";
}

// FIX W ICON WOOO
function updateButton({ buttonEl, isDark, image }) {
  const newCta = isDark ? "Change to light theme" : "Change to dark theme";
  const newImg = isDark ? "images/moon.png" : "images/sun.png";

  buttonEl.setAttribute("aria-label", newCta);
  image.setAttribute("src", newImg);
}

function updateThemeOnEl({ theme }) {
  document.querySelector("html").setAttribute("data-theme", theme);
  if (document.getElementById("contact"))
    document.getElementById("contact").setAttribute("data-theme", theme);
}

document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector("[data-theme-toggle]");
  const themeImage = button.querySelector("img");

  const localStorageTheme = localStorage.getItem("theme");
  const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

  let currentThemeSetting = calculateSettingAsThemeString({
    localStorageTheme,
    systemSettingDark,
  });

  updateButton({
    buttonEl: button,
    isDark: currentThemeSetting === "dark",
    image: themeImage,
  });
  updateThemeOnEl({ theme: currentThemeSetting });

  button.addEventListener("click", (event) => {
    const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

    localStorage.setItem("theme", newTheme);
    updateButton({
      buttonEl: button,
      isDark: newTheme === "dark",
      image: themeImage,
    });
    updateThemeOnEl({ theme: newTheme });

    currentThemeSetting = newTheme;

    if (newTheme === "dark") {
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
    } else {
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    }
  });
});
