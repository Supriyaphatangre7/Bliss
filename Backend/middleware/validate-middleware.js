
export const validate=(schema)=>async(req,res,next)=>{
    try {
      const parseBody=await schema.parseAsync(req.body);
      req.body=parseBody
      return next();

    } catch (err) {
      const status=422;
      const message="fill the input properly";
      const extraDetails=err.issues.map((curElem)=>curElem.message);

      const error={
        status,
        message,
        extraDetails
      };
      next(error)
      console.log(error)
    }
}

export default validate