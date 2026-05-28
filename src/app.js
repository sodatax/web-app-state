import express from "express";
import path from "path";

import indexRoutes from "./routers/index.routes.js";
import stateRoutes from "./routers/state.routes.js";
import multiFormRoutes from "./routers/form.routes.js";
import statusRoutes from "./routers/status.routes.js";
import cookieParser from "cookie-parser";
import { vistorCount } from "./middleware/middleware.js";
import session from 'express-session';

const app = express();

app.use(cookieParser());
app.use(session({
    secret: "6e092445-b4df-451c-837d-29934b81c1bd",
    resave: false,
    saveUnitialized: true,
    cookkie: {
        httpOnly: true, //don't allow access through JS
        secure: false, //requires HTTPS?
        maxAge: 20 * 60 * 1000 //20 minute timeout
    }
}));

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src", "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(vistorCount);

app.use(indexRoutes);
app.use(stateRoutes);
app.use(multiFormRoutes);
app.use(statusRoutes);

export default app;