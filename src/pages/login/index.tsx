import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../contexts/AuthContext'
import { GetServerSideProps } from 'next'
import { AlertContext } from '../../contexts/AlertContext'
import DefaultTextInput from '../../components/Inputs/DefaultTextInput'

export default function Login(props: {redirect?: string}){

    const { register, handleSubmit } = useForm()
    const { signIn } = useContext(AuthContext)
    const { setAddAlert } = useContext(AlertContext)

    const [ buttonStyle, setButtonStyle ] = useState({
        backgroundPosition: '99% 50%',
        transition: '.2s'
    })

    async function handleSignIn(){
        setTimeout(() => {
            setButtonStyle({
                backgroundPosition: '99% 50%',
                transition: '0s'
            })
        }, 0)


        setTimeout(() => {
            setButtonStyle({
                backgroundPosition: '20% 50%',
                transition: '.8s',
            })
        }, 0)
        await signIn({...credentials, redirect: props.redirect})
        .catch(erro => {
            console.log(erro)
            setAddAlert({
                alertType: 'error',
                milliseconds: 2000,
                message: erro
            })
            setCredentials({
                user: credentials.user,
                password: ''
            })
        })
        .finally(() => {
            setTimeout(() => {
                setButtonStyle({
                    backgroundPosition: '0% 50%',
                    transition: '.4s'
                })
            }, 0)
        })
    }

    const [ credentials, setCredentials ] = useState({
        user: '',
        password: '',
    })

    function handleChange(e){
        setButtonStyle({
            backgroundPosition: '99% 50%',
            transition: '.2s'
        })
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
                <DefaultTextInput
                label='usuário'
                name='user'
                value={credentials.user}
                onChange={(e) => handleChange(e)}
                />
                <DefaultTextInput
                type='password'
                label='senha'
                name='password'
                value={credentials.password}
                onChange={(e) => handleChange(e)}
                />
                <button
                className={styles.submitButton}
                style={buttonStyle}
                >
                    entrar
                </button>
            </form>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { redirect } = ctx.query
     
    return {
        props: {
            redirect: redirect? redirect : null
        }
    }
}