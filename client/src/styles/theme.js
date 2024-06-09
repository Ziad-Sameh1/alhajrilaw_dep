export const themeOptions = (lang) => {
  return {
    palette: {
      primary: {
        main: "#7f1431",
        light: "#994359",
        dark: "#661026",
      },
      secondary: {
        main: "#F5F5F5",
      },
    },
    direction: "ltr",
    typography: {
      ...(lang === "ar"
        ? {
            fontFamily: ["Cairo", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
              fontFamily: ["Cairo", "sans-serif"].join(","),
              fontSize: 40,
            },
            h2: {
              fontFamily: ["Cairo", "sans-serif"].join(","),
              fontSize: 32,
            },
            h3: {
              fontFamily: ["Cairo", "sans-serif"].join(","),
              fontSize: 24,
            },
            h4: {
              fontFamily: ["Cairo", "sans-serif"].join(","),
              fontSize: 20,
            },
            h5: {
              fontFamily: ["Cairo", "sans-serif"].join(","),
              fontSize: 16,
            },
            h6: {
              fontFamily: ["Cairo", "sans-serif"].join(","),
              fontSize: 14,
            },
          }
        : {
            fontFamily: ["Poppins", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
              fontFamily: ["Poppins", "sans-serif"].join(","),
              fontSize: 40,
            },
            h2: {
              fontFamily: ["Poppins", "sans-serif"].join(","),
              fontSize: 32,
            },
            h3: {
              fontFamily: ["Poppins", "sans-serif"].join(","),
              fontSize: 24,
            },
            h4: {
              fontFamily: ["Poppins", "sans-serif"].join(","),
              fontSize: 20,
            },
            h5: {
              fontFamily: ["Poppins", "sans-serif"].join(","),
              fontSize: 16,
            },
            h6: {
              fontFamily: ["Poppins", "sans-serif"].join(","),
              fontSize: 14,
            },
          }),
    },
  };
};
