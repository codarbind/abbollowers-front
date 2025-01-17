

export interface RegisterUser {
  email: string;
  username: string;
  password: string;
}


export interface LoginUser {
  email: string;
  password: string;
}


export interface UpdateAccount {
  bio: string;
}



export interface UserData {
  bio: string;
  username: string;
  email: string;
  isAccountOwner: boolean
  followers: { id: string; username: string }[];
  following: { id: string; username: string }[];
  userId:string
}