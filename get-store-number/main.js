const Airtable = require('airtable');
// How to set environment variables locally and dependencies?

exports.handler = function (context, event, callback) {
    // Get function parameters defined from the Studio Flow Run Request
    const orderNumber = event.Body; 
    console.log('Order number is: ' + orderNumber);

    // callback(response_error, response_success)
    Airtable.configure({
        //endpointUrl: 'https://api.airtable.com',
        apiKey: context.AIRTABLE_API_KEY
    });
    var base = Airtable.base(context.AIRTABLE_BASE_ID);
    base(context.AIRTABLE_TABLE_NAME).select({
        view: 'Grid view',
        filterByFormula: "OrderNumber = " + orderNumber
    }).firstPage(function (err, records) {
        if (err) {
            console.error(err);
            return;
        }
        records.forEach(function (record) {
            // callback(error, success)
            // Passback JSON on success and access via {{widget.parsed.varName}}
            // e.g. {{widgets.get-order-status.parsed.orderStatus}}
            console.log('Order status is: ' + record.get('OrderStatus'));
            return callback(null, {
                orderNumber: record.get('OrderNumber'),
                storeNumber: record.get('StoreNumber'),
                store: record.get('Store'),
            });
        });
    });
};

