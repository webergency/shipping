
const shipping = new (require('./lib/shipping'))( 'XgltRtUcReqJugV4aZRLCQ', 'Wj2XW8nLaKqEU5KRGwwKT4peDXBVzt87' );

async function test()
{
    let shipment, shipments, labels;
    
    /** /shipment = await shipping.shipment.get( 2276556652513432 );
    
    console.log( shipment );/**/

    labels = await shipping.shipment.labels( 2276556652513432, { width: 152, height: 102 });

    console.log( labels );/**/

    //shipments = await shipping.shipment.list({ limit: 2 });

    //console.log( shipments );

    //return;
    
    /** /shipment = await shipping.shipment.create(
    {
        sender  : 'packeta:hk-green', // 'packeta:hk-green', 'dpd:hk-green'
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
        packages: [{ weight: 1 }, { weight: 1 }],
        reference : '7700001',
        currency: 'EUR',
        value   : 254.30,
        data    : { point: { id: 139 }}
    });

    console.log( shipment );/**/

    //let labels = await shipping.shipment.labels( 312312312 );
}

test();