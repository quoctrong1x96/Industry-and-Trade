export class UserModel {
    public full_name: string = "";
    public username: string = "";
    public password: string = "";
    public user_id: number = 0;
    public token?: string = "";
    public refresh_token?: string = "";
    public user_role_id: number = 0;
    public imageUrl: string = "";
    public org_id: number;
    public positon: string = "";
    // constructor(data){
    //     Object.assign(this, data);
    // }
}