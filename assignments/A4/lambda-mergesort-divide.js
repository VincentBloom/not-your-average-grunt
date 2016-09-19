/**
 * Created by vanilla on 9/18/16.
 */
'use strict';

var aws = require('aws-sdk');
var lambda = new aws.Lambda({
  region: 'us-west-2'
});
var async = require('async');

module.exports.handler = function(event, context, cb) {

  if(event.num.length < 2) {
    event.message += " done!; ";
    return cb(null,
      event
    );
  }

  var middle = parseInt(event.num.length / 2);
  var left   = {
    'num' : event.num.slice(0, middle),
    'message' : event.message += " left: " + JSON.stringify(event.num.slice(0, middle)) + " ; "
  };

  var right  = {
    'num' :  event.num.slice(middle, event.num.length),
    'message' : event.message += " right: " + JSON.stringify(event.num.slice(middle, event.num.length)) + " ; "
  };

  var paramsLeft = {
    FunctionName: 'arn:aws:lambda:us-west-2:292274580527:function:vincent-recursiveLambda-vincent-rec-lambda',
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: JSON.stringify(left)
  };

  var paramsRight = {
    FunctionName: 'arn:aws:lambda:us-west-2:292274580527:function:vincent-recursiveLambda-vincent-rec-lambda',
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: JSON.stringify(right)
  };


  lambda.invoke(paramsLeft, function(err, data) {
    if (err) {
      context.fail(err);
    } else {
      event.message += " received left! " + data.Payload + " ; ";
      merge.left = JSON.parse(data.Payload);
      context.succeed();
    }
  });

  lambda.invoke(paramsRight, function(err, data) {
    if (err) {
      context.fail(err);
    } else {
      event.message += " received right! " + data.Payload + " ; ";
      merge.right = JSON.parse(data.Payload);
      context.succeed();
    }
    callback();
  });


  var asyncTasks = [];

  var merge = { left : [], right : [] };

  asyncTasks.push(function(callback){
    lambda.invoke(paramsLeft, function(err, data) {
      if (err) {
        context.fail(err);
      } else {
        event.message += " received left! " + data.Payload + " ; ";
        merge.left = JSON.parse(data.Payload);
        console.log('merge' + merge.left);
        context.succeed(JSON.parse(data.Payload));
      }
      callback();

    });
  });

  asyncTasks.push(function(callback){
    lambda.invoke(paramsRight, function(err, data) {
      if (err) {
        context.fail(err);
      } else {
        event.message += " received right! " + data.Payload + " ; ";
        merge.right = JSON.parse(data.Payload);
        console.log('merge' + merge.right);
        context.succeed(JSON.parse(data.Payload));

      }
      callback();
    });
  });

  var paramsMerge = {
    FunctionName: 'arn:aws:lambda:us-west-2:292274580527:function:vincent-recursiveLambda-vincent-merge-lamba',
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: JSON.stringify(merge)
  };

  async.parallel(asyncTasks, function() {
    event.message += " async tasks done. calling merge! ;";
    console.log(merge.left + merge.right);

    lambda.invoke(paramsMerge, function(err, data) {
      if (err) {
        context.fail(err);
      } else {
        event.message += " received merge! " + data.Payload + " ; ";
        console.log(JSON.parse(data.Payload));
        context.succeed(null, JSON.parse(data.Payload));
        console.log(event.message);
        return cb(null, data.Payload);

      }
    });
  });
};
