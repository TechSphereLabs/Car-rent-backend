import swaggerJSDoc from "swagger-jsdoc";
import SwaggerUiOptions  from "swagger-ui-express";
import { UserDoc } from "./user.swagger.js";


const Options={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Car Rental Api Documentation",
            description:"Rent car instantly",
            version:"0.1.9"
        },
        tags:[
            {name:"User",description:"Car Rental Users: Individuals, suppliers"},
        ],
        servers:[
            {url:"http://localhost:5000",description:"Local Server"}
        ],
        components:{
            securitySchemes:{
                token:{
                    type:"apiKey",
                    scheme:"bearer",
                    bearerFormat:"JWT",
                    name:"authorization",
                    in:"header"
                }
            }
        },
        paths:{...UserDoc}
    },
    apis:["./routes/*.js"]
}

const swaggerSpec = swaggerJSDoc(Options);

export function swaggerDocumentation(app){
    app.use("/",SwaggerUiOptions.serve,SwaggerUiOptions.setup(swaggerSpec,{customSiteTitle:"Car Rental Documentation"}));
}
