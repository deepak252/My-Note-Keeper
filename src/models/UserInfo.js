class UserInfo{
    constructor({uid,email,name}){
        this.id  = uid;
        this.name = name;
        this.email = email;
    }

    static fromJson =(json)=>UserInfo({
        id: json['id'],
        name: json['name'],
        email: json['email'],
    })

    toJson=()=>{
        return {
            'id': this.id,
            'name': this.name,
            'email': this.email
        }

    }
}

export default UserInfo;