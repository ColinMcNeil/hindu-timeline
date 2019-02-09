export default {
  mode: "spa",
  router: {
    base: process.env.DEPLOY_ENV === "GH_PAGES" ? "/hindu-timeline/" : "/"
  }
}
