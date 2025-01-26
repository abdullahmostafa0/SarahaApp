import * as bcrypt from "bcrypt"


export const generateHash = ({plainText = "", salt = process.env.SALT} = {})=>{

    const hash = bcrypt.hashSync(plainText, parseInt(salt))
    console.log(plainText)
    return hash;
}

export const compareHash = ({plainText = "", hashValue = ""} = {})=>{

    const hash = bcrypt.compareSync(plainText, hashValue)
    return hash
}