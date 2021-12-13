import { createContext, useEffect, useState } from 'react'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { api } from '../services/api'
import Router from 'next/router'
import { redirect } from 'next/dist/next-server/server/api-utils'
import router from 'next/router'

type User = {
    name: string;
}

type SignInData = {
    user: string;
    password: string;
}

type AuthContextType = {
    isAuthenticated: boolean;
    user: User;
    signIn: (data: SignInData) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider ({ children }) {

    const [ user, setUser ] = useState<User | null>(null)

    const [ isAuthenticated, setIsAuthenticated ] = useState(!!user);

    useEffect(() => {
        const { 'mundialhub.token': token } = parseCookies()
        const { 'mundialhub.name': name } = parseCookies()

        console.log(token, name)

        if(token && name) {
            api.get(`/auth/check-token?name=${name}&token=${token}`)
            .then(response => {
                console.log(response)
                setUser(response.data.userResponse)
                setIsAuthenticated(true)
            }).catch(error => {
                console.log(error)
                if(error.response.data.code == 401) {
                    console.log(error.response.data.message)
                    destroyCookie(undefined, 'mundialhub.token')
                    router.push('/login')
                }
            })
        } else {
            destroyCookie(undefined, 'mundialhub.token')
            router.push('/login')
        }
    }, [])

    async function signIn ({ user, password }: SignInData) {

        const { token, userResponse } = await api({
            method: 'post',
            url: '/auth/login',
            data: {
                credentials: {
                    user: user,
                    password: password
                }
            }
        })
        .then(response => {
            return response.data
        }).catch(error => {
            alert(error.response.data.message)
        })

        if(token.length > 0){
            setCookie(undefined, 'mundialhub.token', token, {
                maxAge: 60 * 60 * 4, // 4 hour
            })
            setCookie(undefined, 'mundialhub.name', userResponse.name, {
                maxAge: 60 * 60 * 4, // 4 hour
            })
    
            setUser(userResponse)
    
            Router.push('/')
        } else {
            Router.reload()
        }

    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}