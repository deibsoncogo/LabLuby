import { Router } from "express"
import { adaptRoute } from "../adapters/express.route.adapter"
import { makeSingUpController } from "../factories/singUp/singUp.factory"

export default (router: Router): void => {
  router.post("/signUp", adaptRoute(makeSingUpController()))
}
