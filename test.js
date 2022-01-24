
const shipping = new (require('./lib/shipping'))( 'XgltRtUcReqJugV4aZRLCQ', 'Wj2XW8nLaKqEU5KRGwwKT4peDXBVzt87' );

async function test()
{
    let shipment;
    
    shipment = await shipping.shipment.get( 1 ); console.log( shipment );

    let shipments = await shipping.shipment.list({ limit: 2 }); console.log( shipments );
    //shipment = await shipping.shipment.get({ reference: '123' }); console.log( shipment );
    
    return;
    
    let id = /*shipment =*/ await shipping.shipment.create(
    {
        sender  : 'gls:hk-green', // 'packeta:hk-green', 'dpd:hk-green'
        customer:
        {
            email   : 'radixxko@gmail.com',
            phone   : '+421951002063',
            name    : 'Tomáš Korenko',
            address : 'Šoltésovej 3381/4',
            zip     : '05801',
            city    : 'Poprad',
            country : 'SK'
        },
        packages: [{ weight: 1 }, { weight: 1 }, { weight: 1 }, { weight: 1 }, { weight: 1 }],
        reference : '231231',
        currency: 'EUR',
        value   : 254.30,
        data    : { point: { id: 139 }}
    });

    let labels = await shipping.shipment.labels( 312312312 );
}

test();