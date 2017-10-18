export class Publication {     
    public _id: string;
    public likesCount: number;
    public minimunPrice: number;
    public expired: boolean;
    public expirationDate: Date;
    public title: string;
    public description: string;
    public status: number;
    public type: number;
    public location: {
        city: string;
        country: string;
        province: string;
    };
    public countdownStarted: boolean;
    public creationDate: Date;
    public owner: {
        username: string;
        id: number;
    };
    public categories: Array<number>;
    public comments: Array<object>;
    public imgURL: Array<string>;
    public offerers: Array<object>;

    // Constructor 
    constructor(pubDataObj: any) {
        this._id = pubDataObj._id;
        this.likesCount = pubDataObj.likesCount;
        this.minimunPrice = pubDataObj.minimunPrice;
        this.expired = pubDataObj.expired;
        this.expirationDate = pubDataObj.expirationDate;
        this.title = pubDataObj.title;
        this.description = pubDataObj.description;
        this.status = pubDataObj.status;
        this.type = pubDataObj.type;
        this.location.city = pubDataObj.location.city;
        this.location.country = pubDataObj.location.country;
        this.location.province = pubDataObj.location.province;
        this.countdownStarted = pubDataObj.countdownStarted;
        this.creationDate = pubDataObj.creationDate;
        this.owner.username = pubDataObj.owner.username;
        this.owner.id = pubDataObj.owner.id;
        this.categories = pubDataObj.categories;
        this.comments = pubDataObj.comments;
        this.imgURL = pubDataObj.imgURL;
        this.offerers = pubDataObj.offerers;
    }

    public static BuildEmpty(): Publication {
        const defaults = {
            _id : null,
            likesCount: null,
            minimunPrice: null,
            expired: false,
            expirationDate: null,
            title: null,
            description: null,
            status: null,
            type: null,
            location: {
                city: null,
                country: null,
                province: null,
            },
            countdownStarted: null,
            creationDate: null,
            owner: {
                username: null,
                id: null,
            },
            categories: [],
            comments: [],
            imgURL: [],
            offerers: []
        }
        
        return new Publication(defaults);
    }    
}  