// TODO: Write code to define and export the Employee class
class Employee{
    constructor(name, ID, email){
        this.name = name;
        this.id = ID;
        this.email = email;
    }

   getName(){
       return this.name;
   }

   getId(){
       return this.id;
   }

   getEmail(){
    return this.email;
   }

   getRole(){
       return "Employee";
   }
}

module.exports = Employee;