import { createContext, useEffect, useState } from 'react'
import { setCookie, parseCookies } from 'nookies'
import { api } from '../services/api'
import Router from 'next/router'
import { redirect } from 'next/dist/next-server/server/api-utils'

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
                }
            })
        }
    }, [])

    async function signIn ({ user, password }: SignInData) {
        var token = ''
        var userResponse = {
            name: ''
        }

        await api.get('users.login', {
            params: {
                user: user, 
                password: password
            }
        }).then(response => {
            token = response.data.token,
            userResponse.name = response.data.user.name
        })

        setCookie(undefined, 'mundialhub.token', token, {
            maxAge: 60 * 60 * 1, // 1 hour
        })

        api.defaults.headers['Authorization'] = `Bearer ${token}`

        setUser(userResponse)

        Router.push('/')
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}