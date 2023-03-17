import { ActionFunctionArgs, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
const AuthActions = {
    login : async ({request}: ActionFunctionArgs)=>{
        const data = await request.formData()
        console.log(data.entries());
        
        const credentials = {
            email: data.get('email'),
            password: data.get('password')
        } 
        const user = await fetch('/api/auth/login', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(credentials)})
        if (user.status !== 201) {
            throw user            
        }
        const userCreds = await user.json();
        
        console.log({userCreds});
        
        localStorage.setItem('token', userCreds.access_token);
        //store creds
        toast('Welcome!', {autoClose:1000})
        return redirect('/')

        
    }
}
export default AuthActions