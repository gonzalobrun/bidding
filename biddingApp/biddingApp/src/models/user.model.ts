export class User {
    public _id: string;
    public name: string;
    public username: string;
    public password: string;
    public country: string;
    public province: string;
    public city: string;

    constructor(userDataObj) {
        this._id = userDataObj._id || null;
        this.name = userDataObj.name;
        this.username = userDataObj.username;
        this.password = userDataObj.password || null;
        this.country = userDataObj.country;
        this.city = userDataObj.city;
    }

    public static BuildEmpty(): User {
        const defaults = {
            _id: null,
            name: null,
            username: null,
            password: null,
            country: null,
            city: null
        }
        
        return new User(defaults);
    }

    public get isLogged(): boolean {
        return !! this._id;
    }
}