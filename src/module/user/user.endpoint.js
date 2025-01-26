import { roleTypes } from "../../middleware/auth.middleware.js";


export const endPoint = {
    profile: [roleTypes.User, roleTypes.Admin]
}