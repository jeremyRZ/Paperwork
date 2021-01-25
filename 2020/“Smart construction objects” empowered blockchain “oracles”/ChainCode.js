/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class FabSensor extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const Sensors = [
      {
		    "sender_name_auxiliary": "c1029",
		    "ip_sender": "203.160.68.83",
		    "time_server": "2016/11/5 10",
		    "lat": 23.1,
		    "lng": 114.11
		  },
		  {
		    "sender_name_auxiliary": "c1029",
		    "ip_sender": "203.160.68.38",
		    "time_server": "2016/11/6 13",
		    "lat": 22.46,
		    "lng": 114.05
		  },
		  {
		    "sender_name_auxiliary": "c1026",
		    "ip_sender": "182.239.66.83",
		    "time_server": "2016/11/6 13",
		    "lat": 23.1,
		    "lng": 114.11
		  }
        ];

        for (let i = 0; i < Sensors.length; i++) {
            Sensors[i].docType = 'Sensor';
            await ctx.stub.putState('Sensor' + i, Buffer.from(JSON.stringify(Sensors[i])));
            console.info('Added <--> ', Sensors[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async querySensor(ctx, SensorNumber) {
        const SensorAsBytes = await ctx.stub.getState(SensorNumber); // get the Sensor from chaincode state
        if (!SensorAsBytes || SensorAsBytes.length === 0) {
            throw new Error(`${SensorNumber} does not exist`);
        }
        console.log(SensorAsBytes.toString());
        return SensorAsBytes.toString();
    }

    async createSensor(ctx, SensorNumber, ip_sender, lat, sender_name_auxiliary, lng) {
        console.info('============= START : Create Item ===========');

        const Sensor = {
            sender_name_auxiliary,
            docType: 'item',
            ip_sender,
            lat,
            lng,
        };

        await ctx.stub.putState(SensorNumber, Buffer.from(JSON.stringify(Sensor)));
        console.info('============= END : Create Item ===========');
    }

    async queryAllSensors(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async changeSensorOwner(ctx, SensorNumber, newOwner) {
        console.info('============= START : changeItemOwner ===========');

        const SensorAsBytes = await ctx.stub.getState(SensorNumber); // get the Sensor from chaincode state
        if (!SensorAsBytes || SensorAsBytes.length === 0) {
            throw new Error(`${SensorNumber} does not exist`);
        }
        const Sensor = JSON.parse(SensorAsBytes.toString());
        Sensor.sender_name_auxiliary = newOwner;

        await ctx.stub.putState(SensorNumber, Buffer.from(JSON.stringify(Sensor)));
        console.info('============= END : changeItemOwner ===========');
    }

    async ChooseItem(){
      console.info('============= START : changeItemOwner ===========');
      for (i=0; i<Sensors.length;i++){
        for(j=i; j<Sensors[0].length; j++){
            if (Sensors[i].lat == Sensors[j].lat && Sensors[i].lng==Sensors[j].lng) {
              console.log(Sensors[i]);
            }
        }
      }
      console.info('============= END : changeItemOwner ===========');
    }

}

module.exports = FabSensor;
