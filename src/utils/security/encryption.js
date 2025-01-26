import CryptoJS from "crypto-js"


export const generateEncryption = ({plainText = "", signature = process.env.ENCRYPTION_SIGNTURE} = {})=>{

    const encryption = CryptoJS.AES.encrypt(plainText, signature).toString()
    
    return encryption;
}

export const generateDecryptoin = ({ciphenText = "", signature = process.env.ENCRYPTION_SIGNTURE} = {})=>{

    const decoded = CryptoJS.AES.decrypt(ciphenText, signature).toString(CryptoJS.enc.Utf8)
    return decoded;
}