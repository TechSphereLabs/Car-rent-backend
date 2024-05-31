export default fn =>(req,res,next)=>
                       Promise.resolve( fn(req,res,next) )
                              .catch( next );

// const asyncCatch = (fn) => (req, res, next) => {
//   Promise.resolve(fn(req, res, next)).catch(next);
// };
// export default asyncCatch;