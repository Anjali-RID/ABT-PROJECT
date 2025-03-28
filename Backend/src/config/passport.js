import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import UserModel from "../models/userModel.js";


dotenv.config();

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
  },
  (accessToken, refreshToken, profile, done) => {
   // console.log("Google Profile:", profile._json);

    let {name,picture,email,email_verified}=profile._json
    let ab=async()=>{
        if(email_verified==true){
            let user={name,picture,email}
            console.log(user)
            let userEx=await UserModel.findOne({email})
            if(userEx){
                console.log("User All reday present")
            }else{
                let user=new UserModel({name,email,password:"google"})
                await user.save()
                console.log("User created")
            }
    
        }
    }
    ab()
    


    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
