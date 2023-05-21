export class CreateUserDto {
    // public id: number;
    public username: string;
    public contact: string;
    public gender: boolean;
    public password: string;
    public name: string;
}

export class GetUserDto {
    public id: number;
    public username: string;
    public name: string;
    public contact: string;
    public gender: boolean;
    public roleId: string;
    public roleName: string;
}

export class AppSessionDto{
    public  userId: number;
    public  username: string;
    public  name: string;
    public  roleName: string;
    public  allRoles: string[];
    public  isLogged?: boolean;
}
  
export class AuthDto{
    public username: string | undefined;
    public password: string | undefined;
}


export class ChangePassword {
    public previousPassword: string;
    public newPassword: string;
}