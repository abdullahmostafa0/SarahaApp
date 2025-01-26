import {Router} from 'express'
import * as resgisterService from "./services/register.service.js";
import * as loginService from "./services/login.service.js";
import { validation } from '../../middleware/validation.middleware.js';
import * as validators from './auth.validation.js';

const router = Router();

router.post("/signup", validation(validators.signupSchema), resgisterService.signup);
router.post("/login", validation(validators.login), loginService.login);
router.patch("/confirm-email",  resgisterService.confirmEmail);
router.patch("/forget-password1", validation(validators.forgetPassword1), resgisterService.forgetPassword1);
router.patch("/forget-password2", validation(validators.forgetPassword2), resgisterService.forgetPassword2);
router.patch("/forget-password3", validation(validators.forgetPassword3), resgisterService.forgetPassword3);
export default router