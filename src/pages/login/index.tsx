import Head from 'next/head'
import { useContext, useState } from 'react'
import styles from './styles.module.scss'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../contexts/AuthContext'

export default function Login(){

    const { register, handleSubmit } = useForm()
    const { signIn } = useContext(AuthContext)

    async function handleSignIn(){
        await signIn(credentials)
    }

    const [ credentials, setCredentials ] = useState({
        user: '',
        password: '',
    })

    function handleChange(e){
        setCredentials({
            ...credentials,
            [e.target.getAttribute('name')]: e.target.value,
        })
    }

    return(
        <div
        className={styles.wrapper}
        >
            <Head>
                <title>Login</title>
            </Head>
            <form
            className={styles.loginContainer}
            onSubmit={handleSubmit(handleSignIn)}
            >
                <h1
                className={styles.titleLogin}
                >
                    Login
                </h1>
                <div
                className={styles.inputContainer}
                >
                    <label>
                        usuario
                    </label>
                    <input 
                    {...register('user')}
                    type="text"
                    name='user'
                    value={credentials.user}
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <div
                className={styles.inputContainer}
                >
                    <label>
                        password
                    </label>
                    <input 
                    {...register('password')}
                    type="password"
                    name='password'
                    value={credentials.password}
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <button
                className={styles.submitButton}
                >
                    entrar
                </button>
            </form>
        </div>
    )
}

