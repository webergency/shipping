'use strict';

const Client = require('@liqd-js/client');

class WebergencyShippingAPI
{
    #clientID; #clientSecret;

    constructor( clientID, clientSecret )
    {
        this.#clientID      = clientID;
        this.#clientSecret  = clientSecret;
    }

    async request( method, path, options )
    {
        let response = await Client[ method.toLowerCase() ]( 'https://api.shipping.webergency.com/' + path, 
        {
            ...options,
            headers: 
            {

            }
        })
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
        return this.#ctx.api.request( 'GET', 'shipment', { query: { id }})
    }

    list( query )
    {
        return this.#ctx.api.request( 'GET', 'shipments', { query: { query }});
    }

    create( sender, shipment )
    {
        return this.#ctx.api.request( 'PUT', 'shipment', { body: { shipper, shipment }});
    }

    delete( id )
    {
        //throw 'not implemented'; // mozno ani nebude treba, ak tak priznak a az po case zmazat
    }
}

module.exports = class WebergencyShipping
{
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