// Imports for Test
var sleep = require('sleep');
var chai = require('chai');
chai.use(require('chai-string'));
var assert = chai.assert;

var testClass = require('./index2');
var MasterCardAPI = testClass.MasterCardAPI;

describe.skip('test MerchantPaymentTransferTest', function() {
before(function() {
	global.testUtil.resetAuthentication();
});
	it('351_CreatePayment_NON_TOKENIZED', function(done) {

		// 
		
		
		var requestData = {
  "partnerId": "ptnr_BEeCrYJHh2BXTXPy_PEtp-8DBOo",
  "merchant_payment_transfer": {
    "transfer_reference": "4002650802284270463820338922168704059847",
    "payment_type": "P2M",
    "funding_source": "DEBIT",
    "transaction_local_date_time": "2016-09-22T13:22:11-1730",
    "amount": "1800",
    "currency": "USD",
    "sender_account_uri": "pan:5013040000000018;exp\u003d2099-08;cvc\u003d123",
    "sender": {
      "first_name": "John",
      "middle_name": "Tyler",
      "last_name": "Jones",
      "date_of_birth": "1994-05-21",
      "address": {
        "line1": "21 Broadway",
        "line2": "Apartment A-6",
        "city": "OFallon",
        "country_subdivision": "MO",
        "postal_code": "63368",
        "country": "USA"
      },
      "phone": "11234565555",
      "email": "John.Jones123@abcmail.com"
    },
    "recipient_account_uri": "pan:5013040000000018;exp\u003d2099-08;cvc\u003d123",
    "recipient": {
      "first_name": "Jane",
      "middle_name": "Tyler",
      "last_name": "Smith",
      "merchant_category_code": "3005",
      "address": {
        "line1": "1 Main St",
        "line2": "Apartment 9",
        "city": "OFallon",
        "country_subdivision": "MO",
        "postal_code": "63368",
        "country": "USA"
      },
      "phone": "11234567890",
      "email": "Jane.Smith123@abcmail.com"
    },
    "payment_origination_country": "USA",
    "reconciliation_data": {
      "custom_field": [
        {
          "name": "ABC",
          "value": "123"
        },
        {
          "name": "DEF",
          "value": "456"
        },
        {
          "name": "GHI",
          "value": "789"
        }
      ]
    },
    "funding_transaction_reference": {
      "reference_number": "trn_8h4me233jk2",
      "network": "MONEYSEND"
    },
    "participant": {
      "card_acceptor_id": "CardAcceptor1",
      "card_acceptor_name": "TESTBANK"
    },
    "device_id": "DEVICE-1234",
    "location": "state:MO",
    "channel": "KIOSK",
    "participation_id": "TERMINAL34728",
    "additional_message": "mymessage",
    "mastercard_assigned_id": "1",
    "token_cryptogram": {
      "type": "CONTACTLESS_CHIP",
      "value": "hjjoutwsdgfdou124354ljlsdhgout96895"
    },
    "authentication_value": "ucaf:jJJLtQa+Iws8AREAEbjsA1MAAAA"
  }
};


		testClass.MerchantPaymentTransfer.create(requestData
		, function (error, data) {
			global.testUtil.putResponse("CreatePayment_NON_TOKENIZED", data);
			

			if (error) {
				console.log(error);
				throw error;
			}

			var ignoreAsserts = [];
			ignoreAsserts.push("merchant_transfer.id");
			ignoreAsserts.push("merchant_transfer.created");
			ignoreAsserts.push("merchant_transfer.transfer_reference");
			ignoreAsserts.push("merchant_transfer.transaction_history.data.transaction[0].id");
			ignoreAsserts.push("merchant_transfer.transaction_history.data.transaction[0].create_timestamp");
			ignoreAsserts.push("merchant_transfer.transaction_history.data.transaction[0].status_timestamp");
			ignoreAsserts.push("merchant_transfer.status_timestamp");
			ignoreAsserts.push("merchant_transfer.transaction_history.data.transaction[0].retrieval_reference");
			ignoreAsserts.push("merchant_transfer.transaction_history.data.transaction[0].system_trace_audit_number");
			ignoreAsserts.push("merchant_transfer.recipient.email");
			ignoreAsserts.push("merchant_transfer.original_status");
			ignoreAsserts.push("merchant_transfer.transaction_local_date_time");
			ignoreAsserts.push("merchant_transfer.funding_source");

			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.id", data, "mtrn_MQTGry0D_TGe8QTrWj4LtaydUUWM");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.resource_type", data, "merchant_transfer");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.transfer_reference", data, "4001650802284270463820338922168704059847");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.payment_type", data, "P2M");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.sender_account_uri", data, "pan:************0018");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.sender.first_name", data, "John");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.sender.middle_name", data, "Tyler");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.sender.last_name", data, "Jones");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.recipient_account_uri", data, "pan:************0018");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.recipient.first_name", data, "Jane");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.recipient.middle_name", data, "Tyler");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.recipient.last_name", data, "Smith");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.recipient.address.line1", data, "1 Main St");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.recipient.address.line2", data, "Apartment 9");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.recipient.address.city", data, "OFallon");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.recipient.address.country_subdivision", data, "MO");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.recipient.address.postal_code", data, "63368");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.recipient.address.country", data, "USA");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.recipient.phone", data, "11234567890");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.recipient.email", data, "John.Jones123@abcmail.com");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.recipient.merchant_category_code", data, "3005");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.transfer_amount.value", data, "1800");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.transfer_amount.currency", data, "USD");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.created", data, "2016-08-29T01:07:37-05:00");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.transaction_history.resource_type", data, "list");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.transaction_history.item_count", data, "1");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.transaction_history.data.transaction[0].id", data, "txn_SVDvtQk1mKcJefExHKpvVeLctXvJ");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.transaction_history.data.transaction[0].resource_type", data, "transaction");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.transaction_history.data.transaction[0].account_uri", data, "pan:************0018");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.transaction_history.data.transaction[0].transaction_amount.value", data, "1800");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.transaction_history.data.transaction[0].transaction_amount.currency", data, "USD");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.transaction_history.data.transaction[0].network", data, "STAR");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.transaction_history.data.transaction[0].type", data, "PAYMENT");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.transaction_history.data.transaction[0].create_timestamp", data, "2016-08-29T01:07:37-05:00");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.transaction_history.data.transaction[0].status", data, "APPROVED");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.transaction_history.data.transaction[0].status_reason", data, "APPROVED");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.transaction_history.data.transaction[0].status_timestamp", data, "2016-08-29T01:07:37-05:00");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.transaction_history.data.transaction[0].retrieval_reference", data, "624200192616");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.transaction_history.data.transaction[0].system_trace_audit_number", data, "926162");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.reconciliation_data.custom_field[0].name", data, "ABC");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.reconciliation_data.custom_field[0].value", data, "123");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.reconciliation_data.custom_field[1].name", data, "DEF");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.reconciliation_data.custom_field[1].value", data, "456");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.reconciliation_data.custom_field[2].name", data, "GHI");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.reconciliation_data.custom_field[2].value", data, "789");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.channel", data, "KIOSK");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.device_id", data, "DEVICE-1234");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.location", data, "state:MO");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.original_status", data, "APPROVED");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.status", data, "APPROVED");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.status_timestamp", data, "2016-08-29T01:07:37-05:00");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.payment_origination_country", data, "USA");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.transaction_local_date_time", data, "2016-09-22T13:22:11-05:30");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.funding_source", data, "DEBIT");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.participant.card_acceptor_id", data, "CardAcceptor1");
			global.testUtil.assertEqual(ignoreAsserts, "merchant_transfer.participant.card_acceptor_name", data, "TESTBANK");

			done();
		});
	});
        
});
