export class Publication {     
    public _id: string;
    public likesCount: number;
    public minimunPrice: number;
    public expired: boolean;
    public expirationDate: string;
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
    public creationDate: string;
    public owner: {
        username: string;
        id: string;
    };
    public categories: Array<any>;
    public comments: Array<any>;
    public imgURL: Array<string>;
    public offerers: Array<any>;
    public winner: {
        id: string,
        username: string
    }

    // Constructor 
    constructor(pubDataObj: any) {
        this._id = pubDataObj._id;
        this.likesCount = pubDataObj.likesCount;
        this.minimunPrice = pubDataObj.minimunPrice || null;
        this.expired = pubDataObj.expired;
        this.expirationDate = pubDataObj.expirationDate;
        this.title = pubDataObj.title;
        this.description = pubDataObj.description;
        this.status = pubDataObj.status;
        this.type = pubDataObj.type;
        this.location = pubDataObj.location
        this.countdownStarted = pubDataObj.countdownStarted;
        this.creationDate = pubDataObj.creationDate;
        this.owner = pubDataObj.owner
        this.categories = pubDataObj.categories;
        this.comments = pubDataObj.comments;
        this.imgURL = pubDataObj.imgURL;
        this.offerers = pubDataObj.offerers;
        this.winner = pubDataObj.winner;
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
            offerers: [],
            winner: {
                id: null,
                username: null
            }
        }
        
        return new Publication(defaults);
    };
    
    public get isExpired(): boolean {
        return this.expired;
    };

    public get isDonation(): boolean {
        return (this.type === 2);
    };

    public get isAuction(): boolean {
        return (this.type != 2);
    };
}  