export default {
  mode: "spa",
  router: {
    base: process.env.NODE_ENV === "GH_PAGES" ? "/hindu-art/" : "/"
  }
}