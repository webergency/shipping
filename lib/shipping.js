'use strict';

const Client = require('@liqd-js/client');

class WebergencyShippingAPI
{
    #clientID; #clientSecret; #auth;

    constructor( clientID, clientSecret )
    {
        this.#clientID      = clientID;
        this.#clientSecret  = clientSecret;
        this.#auth          = 'Basic ' + Buffer.from( this.#clientID + ':' + this.#clientSecret, 'utf8' ).toString('base64');
    }

    async request( method, path, options )
    {
        //let response = await Client[ method.toLowerCase() ]( 'https://api.shipping.webergency.com/' + path, 
        let response = await Client[ method.toLowerCase() ]( 'http://localhost:8080/' + path, 
        {
            ...options,
            headers: 
            {
                Authorization: this.#auth
            }
        });

        return response.json;
    }
}

class WebergencyShippingShipment
{
    #ctx;

    constructor( ctx )
    {
        this.#ctx = ctx;
    }

    get( id )
    {
        return this.#ctx.api.request( 'GET', 'shipment/' + id );
    }

    list( query )
    {
        return this.#ctx.api.request( 'GET', 'shipments', { query: { ...query }});
    }

    create( shipment )
    {
        return this.#ctx.api.request( 'PUT', 'shipment', { body: shipment });
    }

    delete( id )
    {
        return this.#ctx.api.request( 'DELETE', 'shipment/' + id )
    }
}

module.exports = class WebergencyShipping
{
    #ctx;

    constructor( clientID, clientSecret )
    {
        this.#ctx = 
        {
            shipping: this,
            api     : new WebergencyShippingAPI( clientID, clientSecret )
        };

        Object.defineProperty( this, 'shipment', { value: new WebergencyShippingShipment( this.#ctx )});
    }
}