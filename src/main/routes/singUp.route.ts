import { Router } from "express"

export default (router: Router): void => {
  router.post("/signUp", (req, res) => {
    res.json({ ok: "ok" })
  })
}
