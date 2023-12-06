export interface LoginInterface {
   name?: string,
   username: string,
   password: string
}
export interface AuthInterface extends LoginInterface {
   name?: string,
}
export interface TokenizeAuth extends AuthInterface {
   token: string
}