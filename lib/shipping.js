'use strict';

const Client = require('@liqd-js/client');

class WebergencyShippingAPI
{
    #webroot; #clientID; #clientSecret; #auth;

    constructor( clientID, clientSecret )
    {
        this.#webroot       = 'https://api.shipping.webergency.com/';// 'http://localhost:8080/';
        this.#clientID      = clientID;
        this.#clientSecret  = clientSecret;
        this.#auth          = 'Basic ' + Buffer.from( this.#clientID + ':' + this.#clientSecret, 'utf8' ).toString('base64');
    }

    async request( method, path, options )
    {
        //let response = await Client[ method.toLowerCase() ]( 'https://api.shipping.webergency.com/' + path, 
        let response = await Client[ method.toLowerCase() ]( this.#webroot + path, 
        {
            ...options,
            headers: 
            {
                Authorization: this.#auth
            }
        });

        return response.json;
    }

    url( path )
    {
        return this.#webroot + path;
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

    async labels( id, options )
    {
        let labels = await this.#ctx.api.request( 'GET', 'shipment/' + id + '/labels', { query: options });

        labels && ( labels.url = this.#ctx.api.url( labels.url ));

        return labels;
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