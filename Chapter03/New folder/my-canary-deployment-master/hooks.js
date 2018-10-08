const aws = require('aws-sdk');
const codedeploy = new aws.CodeDeploy({apiVersion: '2014-10-06'});

module.exports.pre = (event, context, callback) => {
  var deploymentId = event.DeploymentId;
  var lifecycleEventHookExecutionId = event.LifecycleEventHookExecutionId;

  console.log('We are running some integration tests before we start shifting traffic...');

  var params = {
      deploymentId: deploymentId,
      lifecycleEventHookExecutionId: lifecycleEventHookExecutionId,
      status: 'Succeeded' // status can be 'Succeeded' or 'Failed'
  };

  return codedeploy.putLifecycleEventHookExecutionStatus(params).promise()
    .then(data => callback(null, 'Validation test succeeded'))
    .catch(err => callback('Validation test failed'));
};

module.exports.post = (event, context, callback) => {
  var deploymentId = event.DeploymentId;
  var lifecycleEventHookExecutionId = event.LifecycleEventHookExecutionId;

  console.log('Check some stuff after traffic has been shifted...');

  var params = {
      deploymentId: deploymentId,
      lifecycleEventHookExecutionId: lifecycleEventHookExecutionId,
      status: 'Succeeded' // status can be 'Succeeded' or 'Failed'
  };

  return codedeploy.putLifecycleEventHookExecutionStatus(params).promise()
    .then(data => callback(null, 'Validation test succeeded'))
    .catch(err => callback('Validation test failed'));
};