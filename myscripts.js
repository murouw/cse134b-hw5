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
  });
});

const items = [
  {
    link: "https://murou5.netlify.app/",
    image: "images/inception.png",
    alt: "Home page of this website",
    title: "This website!",
    description: "This website is my project for CSE 134B, although hopefully I'll be using it as my actual portfolio soon :D",
  },
  {
    link: "https://devpost.com/software/soupersaurus",
    image: "images/soupasaurus.png",
    alt: "Landing page of game with chef dinosaur character",
    title: "Soupasaurus",
    description: "A personality quiz and dinosaurus adventure game in one created with friends at LA Hacks 2024.",
  },
  {
    link: "https://github.com/murouw/cultivate",
    image: "images/cultivate.png",
    alt: "Cultivate landing page",
    title: "Cultivate",
    description: "Gamified gratitude journal made with friends as part of an ACM project.",
  },
  {
    link: "https://github.com/murouw/ersp",
    image: "images/ersp-small.png",
    alt: "ERSP research presentation poster",
    title: "ERSP at UCSD",
    description: "Research on LLM vulnerabilities under Professor Earlence Fernandes at UCSD.",
  }
];

if (!localStorage.getItem("portfolioItems")) {
  localStorage.setItem("portfolioItems", JSON.stringify(items));
}
