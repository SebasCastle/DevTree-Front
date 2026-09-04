export type User = {
    handle: string
    name: string
    email:string
    password: string
    description: string
    image: string
    links: string
}

export type UserHandle = Pick<User, 'description' | 'handle' | 'image' | 'links' | 'name'>

export type RegisterForm = Pick<User, 'handle' | 'name' | 'email'>  &{
    password: string
    password_confirmation: string
}

export type LoginForm = Pick<User, 'email'>&{
    password: string
}

export type ProfileForm = Pick<User, 'handle' | 'description'>

export type SocialLink = {
    id: number,
    name: string,
    url: string,
    enabled: boolean
}

export type DevTreeLinks = Pick<SocialLink,'name' | 'url' | 'enabled'>