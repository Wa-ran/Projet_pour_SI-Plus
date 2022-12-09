module.exports = class User {

  constructor(data) {
    // data: {
    //   pseudo: (String)
    //   password: (String)
    // }
    this.pseudo = data.pseudo;
    this.password = data.password;
  };

  beforeSend() { // Is call before the object is send to the client
    delete this.password; // OWASP - Identification and Authentication Failures : do not resend the password
  };
};
