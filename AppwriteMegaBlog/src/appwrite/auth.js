import conf from "../conf/conf.js"
import {Client, Account, ID} from "appwrite"

//class isliye banaya kyuki bad mai iske andar ke methods use kar sake objects bana ke!
export class AuthService {
    client = new Client(); // from documentation
    account;
//constructor isliye banaya kyuki jab bhi class se object banaye tabhi client and account setup ho  
    constructor(){
        this.client                              // from documentation
            .setEndpoint(conf.appwriteUrl)       // from documentation
            .setProject(conf.appwriteProjectId); // from documentation
        this.account = new Account(this.client); // from documentation
        //If by any chance you want to use some service other than appwrite you can just remove or replace this constructor with the new service (Firebase,etc..) 
    }

    async createAccount({email,password,name}) {
        try {
           const userAccount = await this.account.create(ID.unique(),email,password,name);// from documentation
           
           if(userAccount){
            //call another method
            //agar user ka account ban jata hai to sidha login call karlo
            return this.login({email,password});
            
           } else{
                return userAccount;
           }
        } catch (error) {
            throw error;
        }
    }


    //agar user ka account bana hua hai to login call karlo directly (login page ke liye)
    async login({email, password}){
        try {
            return await this.account.createEmailSession(email,password);         
        } catch (error) {
            throw error;
        }
    }

    //home page pe visit karne ke bad account / login hai ya nhi hai uski liye ye method hai
    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite Service :: getCurrentUser :: error", error);
        }
        return null; //kuch problem hua to null return kardega
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite Service :: logout :: error", error);
            
        }
    }

}

const authService = new AuthService();

// authService.account
// authService.login       ye sab ab use kar sakte hai

export default authService;
//object bhi export kardiya directly



//Under the hood kya ho rha hai vo sirf isi file ko pata hai 
//If kabhi Application change hoti hai ya koi backend service change hoti hai toh changes isi file mai hone sirf

// frontend ko sirf methods pata hai hum frontend se same parameters le sakte hai but behind the scenes appwrite/firebase/supabase jo use karna chahe kar sakte hai


//If in future whenever you want to build a authentication service using appwrite you can use this code directly
//If you want to add some methods you can add over here and use it in multiple projects as you like
