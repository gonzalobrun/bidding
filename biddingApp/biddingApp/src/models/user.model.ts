export class User {
    public _id: string;
    public name: string;
    public username: string;
    public password: string;
    public phone: string;
    public email: string;
    public country: string;
    public province: string;
    public city: string;
    public notifications: Array<any>;
    public isAdmin: boolean;

    constructor(userDataObj) {
        this._id = userDataObj._id || null;
        this.name = userDataObj.name;
        this.username = userDataObj.username;
        this.password = userDataObj.password || null;
        this.province = userDataObj.province;
        this.phone = userDataObj.phone;
        this.email = userDataObj.email;
        this.country = userDataObj.country;
        this.city = userDataObj.city;
        this.notifications = userDataObj.notifications;
        this.isAdmin = userDataObj.isAdmin
    }

    public static BuildEmpty(): User {
        const defaults = {
            _id: null,
            name: null,
            username: null,
            password: null,
            phone: null,
            email: null,
            country: null,
            city: null,
            notifications: [],
            isAdmin: false
        }
        
        return new User(defaults);
    }

    public get isLogged(): boolean {
        return !! this._id;
    }

}