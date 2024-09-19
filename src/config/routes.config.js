import expressListRoutes from "express-list-routes";
import RedisProvider from "../app/providers/redis.provider.js";

class RouterConfig
{
    static listRoutes (app)
    {
        return expressListRoutes( app );
    }

    static cacheRoutes ( app )
    {
        const routes = this.listRoutes( app ).map( ( route ) =>
        {
            return String(route.path).replace("/api/v1", "");
        } )

        const cache = new RedisProvider();

        cache.set( "routes", JSON.stringify( routes ) ).then( () =>
        {
            console.log( "Routes have been successfully cached" );
        })
    }
}

export default RouterConfig;