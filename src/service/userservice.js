const {createUser,findUser}= require('../repository/userRepository')

async function registerUser(userDetails){

    const user = await findUser({
            email: userDetails.email,
            contactNumber: userDetails.mobileNumber

        });


if(user){
    throw{reason:"user with given email and mobile number already exist",statusCode:400}
};

const newUser = await createUser({
    email: userDetails.email,
    password: userDetails.password,
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    contactNumber: userDetails.mobileNumber

});


if(!newUser){
    throw{reason:"internal server error , cant create user",statusCode:500}
}

return newUser;
}

module.exports={
    registerUser
}