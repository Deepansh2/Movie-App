exports.userResponse = (users) =>{

    const userResult = [];
    users.forEach(user =>{
        userResult.push({
            name : user.name,
            userId : user.userId,
            email : user.email,
            userType : user.userType,
            userStatus : user.userStatus,
            createdAt : user.createdAt,
            updatedAt : user.updatedAt
        })
    })
    return userResult;
}