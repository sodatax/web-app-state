export const vistorCount = (req, res, next) => {
    //cookie parser will add all cookies to the req.cookies object
    console.log(req.cookies);

    if(req.cookies.visited){
        const visited = Number(req.cookies.visited) + 1;
        res.cookie("visited", visited, { maxAge: 30 * 60 * 1000 })
        console.log("Visited subsequently")
    }else{
        res.cookie("visited", 1, { maxAge: 30 * 60 * 1000 }) //invalidated in 30 mins
        console.log("Visited first time")
    }

    res.cookie("client", "Aesoh");
    res.cookie("country", "United States of America");

    //move to the next middleware
    next();
}