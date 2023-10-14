export function randomEmail() {
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var email = '';
    for (var i = 0; i < 10; i++) {
        var index = Math.floor(Math.random() * characters.length);
        email += characters[index];
    }
    email += '@gmail.com';
    return email;
}

