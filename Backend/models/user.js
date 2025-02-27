



class User {
    #id;
    #name;
    #email;
    #password;
    #create_at;
    constructor (id, name, email, password){
        this.#id=id;
        this.#name=name;
        this.#email=email;
        this.#password=password;
        this.#create_at=Date.now;
    }
}