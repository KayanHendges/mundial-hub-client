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

        if(token) {
            api.get('/users.auth', {
                params: {
                    token: token
                }
            }).then(response => {
                setUser(response.data.user)
                setIsAuthenticated(true)
            }).catch(error => {
                if(error.response.data.code == 401) {
                    console.log(error.response.data.message)
                    destroyCookie(undefined, 'mundialhub.token')
                    router.reload
                }
            })
        }
    }, [])

    async function signIn ({ user, password }: SignInData) {

        const { token, user: userResponse } = await api.get('/users.login', {
            params: {
                user: user, 
                password: password
            }
        }).then(response => {
            return response.data
        }).catch(error => {
            alert(error.response.data.message)
        })

        if(token.length > 0){
            setCookie(undefined, 'mundialhub.token', token, {
                maxAge: 60 * 60 * 4, // 1 hour
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