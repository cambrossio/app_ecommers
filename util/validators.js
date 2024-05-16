module.exports={
    isGoodPassword:(value)=>{
        const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}/;
        return regex.test(value);
    },
    emailValidate:(input) => {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(input);
      }
}