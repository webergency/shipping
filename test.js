
const shipping = new (require('./lib/shipping'))( 'XgltRtUcReqJugV4aZRLCQ', 'Wj2XW8nLaKqEU5KRGwwKT4peDXBVzt87' );

async function test()
{
    let shipment;
    
    shipment = await shipping.shipment.get( 1234 ); console.log( shipment );
    shipment = await shipping.shipment.get({ reference: '123' }); console.log( shipment );
    
    return;
    
    shipment = await shipping.shipment.create(
    {
        shipper     : 'dpd-sk',
        sender      : { uid: 'hk-green', url: 'https://hk-green.sk' },
        customer    :
        {
            email   : 'radixxko@gmail.com',
            phone   : '+421951002063',
            name    : 'Tomáš Korenko',
            address : 'Šoltésovej 3381/4',
            zip     : '05801',
            city    : 'Poprad',
            country : 'SK'
        },
        packages    : 
        [
            { weight: 1, width: 10, height: 10, depth: 10 },
            { reverse: true }
        ],
        reference   : '54000021',
        currency    : 'EUR',
        value       : 251.45,
        cod         : true,
    });

    let labels = await shipping.shipment.labels( 312312312 );
}

test();