import users from "./localDB";

export const addUser = (userObj) => {
    users.push(userObj);
}

export const getAllUsers = () => {
    return users;
}

export const checkIfUserExists = (username) => {
    for(let i = 0; i < users.length; i++) {
        if(users[i].username == username) {
            return true;
        }
    }

    return false;
}

export const isUserValid = (username, password) => {
    for(let i = 0; i < users.length; i++) {
        if(users[i].username == username && users[i].password == password) {
            return users[i];
        }
    }

    return false;
}