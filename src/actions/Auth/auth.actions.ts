import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import Staff from '../../Interfaces/staff.interface';
import { useFetch } from '../../Utils/useFecth';
import { t } from 'i18next';
const AuthActions = {
    login: async ({ request }: ActionFunctionArgs) => {
        const data = await request.formData()
        console.log(data.entries());

        const credentials = {
            email: data.get('email'),
            password: data.get('password')
        }
        const user = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(credentials) })
        if (user.status == 401) {
            const body: any = await user.text();
            const error = JSON.parse(body);
            toast.error(error.message)
            return error
        }
        if (user.status == 422) {
            const body: any = await user.text();
            const error = JSON.parse(body);
            toast.error(error.message)
            return error;
        }
        if (user.status == 404){
            const body: any = await user.text();
            const error = JSON.parse(body);
            toast.error('Invalid credentials');
            return error;
        }

        if (user.status !== 201) {
            const body = await user.text();
            throw JSON.parse(body)
        }
        const userCreds = await user.json();
        localStorage.setItem('token', userCreds.access_token);
        
        
        //store creds
        const authFetch = useFetch()
        const profile = await authFetch.get('/api/auth/profile')
        localStorage.setItem('user', JSON.stringify({ user: profile }));
        toast('Welcome!', { autoClose: 1000 })
        // return redirect('/')
        return { user: profile, token: userCreds.access_token }
    },
    updateProfile: async ({ request }: ActionFunctionArgs) => {
        const fetch = useFetch()
        const data = await request.formData()
        console.log(data.entries());
        const submitData: Staff = {
            telephone_number: data.get('telephone_number')!.toString(),
            job_title: data.get('job_title')?.toString() ?? '1',
            name: data.get('name')!.toString(),
            first_surname: data.get('first_surname')!.toString(),
            second_surname: data.get('second_surname')!.toString(),
            date_of_birth: (new Date(data.get('date_of_birth')!.toString())).toISOString()
        }
        console.log('sending');
        const profile = (await fetch.put('/api/staff/profile', submitData)).data
        if (!profile.user_id) {
            toast.error('Error updating profile')
            return {}
        } else {
            toast.success('Profile updated!')
        }
        const localuser = JSON.parse(localStorage.getItem('user')!)
        localuser.user.profile = profile.data
        localStorage.setItem('user', JSON.stringify(localuser))
        return redirect('/')
    },
    getProfile: async ({ request }: LoaderFunctionArgs) => {
        const fetch = useFetch()
        const response = await fetch.get('/api/staff/profile')
        const localuser = JSON.parse(localStorage.getItem('user')!)
        localuser.user.profile = response.data
        localStorage.setItem('user', JSON.stringify(localuser))
        return response.data
    }
}
export default AuthActions