'use strict';

module.exports = class WebergencyShipping extends require('@webergency/api')
{
    constructor( clientID, clientSecret )
    {
        super( 'https://api.shipping.webergency.com', clientID, clientSecret,
        {
            'shipment.create'   : ( $, shipment )     => $.client.request( 'PUT',      'shipment', { body: shipment }),
            'shipment.get'      : ( $, id )           => $.client.request( 'GET',      'shipment/' + id ),
            'shipment.list'     : ( $, query )        => $.client.request( 'GET',      'shipments', { query: { ...query }}),
            'shipment.delete'   : ( $, id )           => $.client.request( 'DELETE',   'shipment/' + id ),
            'shipment.labels'   : ( $, id, options )  => $.client.request( 'GET',      'shipment/' + id + '/labels', { query: options }).then( l => ( l.url && ( l.url = $.client.url( l.url )), l ))
        });

        Object.defineProperty( this, 'name', { value: 'WebergencyShipping' });
    }
}