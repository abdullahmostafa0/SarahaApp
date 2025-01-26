import {Router} from 'express'
import * as userService from "./services/user.service.js";
import { authentication, authorization } from '../../middleware/auth.middleware.js';
import { endPoint } from './user.endpoint.js';
import { validation } from '../../middleware/validation.middleware.js';
import * as validators from './user.validation.js';

const router = Router();

router.get("/userProfile", authentication() ,authorization(endPoint.profile), userService.userProfile);
router.patch("/update-profile", validation(validators.updateProfile), authentication() ,authorization(endPoint.profile), userService.updateProfile);
router.patch("/update-password", validation(validators.updatePassword), authentication() ,authorization(endPoint.profile), userService.updatePassword);
router.delete("/freeze-account",  authentication() ,authorization(endPoint.profile), userService.freezeAccount);
router.get("/:userId/profile", validation(validators.shareProfile), userService.shareProfile);
export default router