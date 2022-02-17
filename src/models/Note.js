class Note{
    constructor({id,title,description,timeStamp, bookmarked, deleted}){
        this.id = id;
        this.title=title;
        this.description=description;
        this.bookmarked=bookmarked;
        this.deleted=deleted;
        this.timeStamp=timeStamp;
    }

    static fromJson(json){
        return new Note({
            id: json.id,
            title: json.title,
            description: json.description,
            bookmarked: json.bookmarked,
            deleted: json.deleted,
            timeStamp: json.timeStamp
        })
    }

    toJson(){
        return {
            'id' : this.id,
            'title': this.title,
            'description': this.description,
            'bookmarked': this.bookmarked,
            'deleted': this.deleted,
            'timeStamp': this.timeStamp
        }

    }
}

// Example
// let note = new Note({
//     id : "1",
//     title : "2",
//     description : "3",
//     timeStamp : "4",
// })
// console.log(note.id);


export default Note;